"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

interface OptimizedTypewriterProps {
  text: string
  delay?: number
  className?: string
}

export function OptimizedTypewriter({ text, delay = 0, className = "" }: OptimizedTypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  const updateText = useCallback(() => {
    if (currentIndex < text.length) {
      setDisplayText(text.slice(0, currentIndex + 1))
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, text])

  useEffect(() => {
    const timer = setTimeout(updateText, delay + currentIndex * 50)
    return () => clearTimeout(timer)
  }, [updateText, delay, currentIndex])

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
