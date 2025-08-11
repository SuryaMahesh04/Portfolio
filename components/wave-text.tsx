"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface WaveTextProps {
  text: string
  className?: string
  delay?: number
}

export function WaveText({ text, className = "", delay = 0 }: WaveTextProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const triggerWave = () => {
    setIsAnimating(false)
    setTimeout(() => setIsAnimating(true), 100)
  }

  return (
    <div className={`inline-block cursor-pointer ${className}`} onClick={triggerWave}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block will-change-transform text-white font-black"
          initial={{ y: 0, rotateZ: 0, scale: 1, color: "#FFFFFF" }}
          animate={
            isAnimating
              ? {
                  y: [0, -25, 0],
                  rotateZ: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                  color: ["#FFFFFF", "#00FFAB", "#FF00E6", "#4D9EFF", "#00FFAB", "#FFFFFF"],
                  textShadow: [
                    "0 0 10px rgba(255, 255, 255, 0.5)",
                    "0 0 25px rgba(0, 255, 171, 0.8)",
                    "0 0 30px rgba(255, 0, 230, 0.8)",
                    "0 0 25px rgba(77, 158, 255, 0.8)",
                    "0 0 20px rgba(0, 255, 171, 0.6)",
                    "0 0 10px rgba(255, 255, 255, 0.5)",
                  ],
                }
              : {
                  color: "#FFFFFF",
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                }
          }
          transition={{
            delay: index * 0.08,
            duration: 1.2,
            ease: "easeInOut",
            repeat: isAnimating ? 1 : 0,
          }}
          whileHover={{
            y: -8,
            scale: 1.2,
            color: "#00FFAB",
            textShadow: "0 0 25px rgba(0, 255, 171, 1), 0 0 50px rgba(0, 255, 171, 0.5)",
            transition: { duration: 0.2 },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}
