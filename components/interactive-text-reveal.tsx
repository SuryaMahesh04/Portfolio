"use client"

import { motion, useAnimation } from "framer-motion"
import { useState, useEffect } from "react"

interface InteractiveTextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function InteractiveTextReveal({ text, className = "", delay = 0 }: InteractiveTextRevealProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true)
      controls.start("visible")
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, controls])

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      scale: 0.5,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.3,
      y: -10,
      rotateY: 15,
      color: "#00FFAB",
      textShadow: "0 0 20px rgba(0, 255, 171, 0.8)",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className={`inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          initial="hidden"
          animate={controls}
          whileHover="hover"
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="inline-block cursor-pointer will-change-transform"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}
