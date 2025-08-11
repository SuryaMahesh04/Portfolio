"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface TypingAnimationProps {
  texts: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function TypingAnimation({
  texts,
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(pauseTimer)
    }

    if (!isDeleting && currentText === currentFullText) {
      setIsPaused(true)
      return
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false)
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      return
    }

    const timer = setTimeout(
      () => {
        if (isDeleting) {
          setCurrentText(currentFullText.substring(0, currentText.length - 1))
        } else {
          setCurrentText(currentFullText.substring(0, currentText.length + 1))
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timer)
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <div className={`inline-block ${className}`}>
      <span className="gradient-text font-bold">{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="inline-block w-1 h-8 bg-[#00FFAB] ml-1"
      />
    </div>
  )
}
