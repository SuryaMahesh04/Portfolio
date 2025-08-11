"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface MorphingTextProps {
  texts: string[]
  className?: string
  interval?: number
  delay?: number
}

export function MorphingText({ texts, className = "", interval = 3000, delay = 0 }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval, isVisible])

  return (
    <div className={`inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: -50, scale: 1.2, rotateX: 90 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {texts[currentIndex].split("").map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.5,
              }}
              whileHover={{
                scale: 1.2,
                y: -5,
                color: "#FF00E6",
                textShadow: "0 0 20px rgba(255, 0, 230, 0.8)",
                transition: { duration: 0.2 },
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
