"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface GlitchTextProps {
  text: string
  className?: string
  trigger?: boolean
}

export function GlitchText({ text, className = "", trigger = false }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?~`"

  const startGlitch = () => {
    if (isGlitching) return

    setIsGlitching(true)
    let iterations = 0
    const maxIterations = 10

    const glitchInterval = setInterval(() => {
      setGlitchText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (Math.random() < 0.3) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            }
            return char
          })
          .join(""),
      )

      iterations++
      if (iterations >= maxIterations) {
        clearInterval(glitchInterval)
        setGlitchText(text)
        setIsGlitching(false)
      }
    }, 50)
  }

  useEffect(() => {
    if (trigger) {
      startGlitch()
    }
  }, [trigger])

  return (
    <motion.div className={`relative cursor-pointer ${className}`} onClick={startGlitch} whileHover={{ scale: 1.02 }}>
      <motion.span
        className="relative z-10"
        animate={
          isGlitching
            ? {
                x: [0, -2, 2, -1, 1, 0],
                textShadow: [
                  "0 0 0 transparent",
                  "2px 0 0 #FF00E6, -2px 0 0 #00FFAB",
                  "-2px 0 0 #FF00E6, 2px 0 0 #00FFAB",
                  "0 0 0 transparent",
                ],
              }
            : {}
        }
        transition={{ duration: 0.1, repeat: isGlitching ? 5 : 0 }}
      >
        {glitchText}
      </motion.span>

      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-[#FF00E6] opacity-70"
            animate={{ x: [-2, 2, -1, 1, 0] }}
            transition={{ duration: 0.1, repeat: 5 }}
          >
            {glitchText}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-[#00FFAB] opacity-70"
            animate={{ x: [2, -2, 1, -1, 0] }}
            transition={{ duration: 0.1, repeat: 5 }}
          >
            {glitchText}
          </motion.span>
        </>
      )}
    </motion.div>
  )
}
