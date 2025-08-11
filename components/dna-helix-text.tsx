"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface DNAHelixTextProps {
  text: string
  className?: string
  delay?: number
}

export function DNAHelixText({ text, className = "", delay = 0 }: DNAHelixTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`relative inline-block ${className}`} style={{ perspective: "1000px" }}>
      {text.split("").map((char, index) => {
        const angle = (index * 30) % 360
        const radius = 20
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const z = Math.sin((angle * Math.PI) / 180) * radius

        return (
          <motion.span
            key={index}
            className="absolute inline-block cursor-pointer will-change-transform"
            style={{
              left: `${index * 40}px`,
              transformStyle: "preserve-3d",
            }}
            initial={{
              opacity: 0,
              x: 0,
              y: 100,
              z: 0,
              rotateY: 0,
            }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    x,
                    y: 0,
                    z,
                    rotateY: angle,
                  }
                : {}
            }
            transition={{
              delay: index * 0.1,
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              scale: 1.5,
              y: -20,
              rotateY: angle + 180,
              color: "#FF00E6",
              textShadow: "0 0 30px rgba(255, 0, 230, 0.8)",
              transition: { duration: 0.3 },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        )
      })}
    </div>
  )
}
