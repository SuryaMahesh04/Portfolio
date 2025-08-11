"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

interface LiquidTextProps {
  text: string
  className?: string
  delay?: number
}

export function LiquidText({ text, className = "", delay = 0 }: LiquidTextProps) {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start("visible")
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, controls])

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0,
      filter: "blur(10px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.08,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
    hover: (i: number) => ({
      y: [0, -20, -10, -15, 0],
      scale: [1, 1.3, 1.1, 1.2, 1],
      rotateZ: [0, -10, 5, -5, 0],
      color: ["#FFFFFF", "#00FFAB", "#FF00E6", "#4D9EFF", "#00FFAB"],
      textShadow: [
        "0 0 0px transparent",
        "0 0 20px rgba(0, 255, 171, 0.8)",
        "0 0 30px rgba(255, 0, 230, 0.8)",
        "0 0 25px rgba(77, 158, 255, 0.8)",
        "0 0 20px rgba(0, 255, 171, 0.8)",
      ],
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <div
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          initial="hidden"
          animate={isHovered ? "hover" : "visible"}
          className="inline-block cursor-pointer will-change-transform"
          style={{
            transformOrigin: "center bottom",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}
