"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface TypewriterTextProps {
  text: string
  delay?: number
  className?: string
}

export function TypewriterText({ text, delay = 0, className = "" }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }
      },
      delay + currentIndex * 50,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  return (
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="inline-block w-1 h-8 bg-[#00FFAB] ml-1"
      />
    </motion.span>
  )
}
