"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface HologramTextProps {
  text: string
  className?: string
  delay?: number
}

export function HologramText({ text, className = "", delay = 0 }: HologramTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const triggerGlitch = () => {
    setGlitchActive(true)
    setTimeout(() => setGlitchActive(false), 800)
  }

  return (
    <div className={`relative inline-block cursor-pointer ${className}`} onClick={triggerGlitch}>
      {/* Main text - Crystal Clear */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isVisible
            ? {
                opacity: 1,
                scale: 1,
              }
            : {}
        }
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block will-change-transform text-white font-black"
            initial={{ opacity: 0, y: 50 }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    y: 0,
                    color: "#FFFFFF",
                    textShadow: "0 0 20px rgba(0, 255, 171, 0.6), 0 0 40px rgba(0, 255, 171, 0.3)",
                  }
                : {}
            }
            animate={
              glitchActive
                ? {
                    x: [0, -2, 2, -1, 1, 0],
                    opacity: [1, 0.7, 1, 0.8, 1],
                    color: ["#FFFFFF", "#00FFAB", "#FF00E6", "#4D9EFF", "#FFFFFF"],
                    textShadow: [
                      "0 0 20px rgba(0, 255, 171, 0.6)",
                      "2px 0 0 #FF00E6, -2px 0 0 #4D9EFF",
                      "-1px 0 0 #FF00E6, 1px 0 0 #4D9EFF",
                      "0 0 20px rgba(0, 255, 171, 0.6)",
                    ],
                  }
                : isVisible
                  ? {
                      opacity: 1,
                      y: 0,
                      color: "#FFFFFF",
                      textShadow: "0 0 20px rgba(0, 255, 171, 0.6), 0 0 40px rgba(0, 255, 171, 0.3)",
                    }
                  : {}
            }
            transition={{
              delay: index * 0.05,
              duration: glitchActive ? 0.1 : 1,
              repeat: glitchActive ? 8 : 0,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.1,
              y: -3,
              color: "#00FFAB",
              textShadow: "0 0 30px rgba(0, 255, 171, 1), 0 0 60px rgba(0, 255, 171, 0.5)",
              transition: { duration: 0.2 },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtle hologram scan lines - Less intrusive */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 255, 171, 0.05) 3px,
            rgba(0, 255, 171, 0.05) 6px
          )`,
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Glitch layers - Only during glitch */}
      {glitchActive && (
        <>
          <motion.div
            className="absolute inset-0 text-[#FF00E6] opacity-50 font-black"
            animate={{
              x: [-1, 1, -0.5, 0.5, 0],
              opacity: [0.5, 0.2, 0.6, 0.3, 0.5],
            }}
            transition={{ duration: 0.1, repeat: 8 }}
          >
            {text}
          </motion.div>
          <motion.div
            className="absolute inset-0 text-[#4D9EFF] opacity-50 font-black"
            animate={{
              x: [1, -1, 0.5, -0.5, 0],
              opacity: [0.5, 0.3, 0.7, 0.2, 0.5],
            }}
            transition={{ duration: 0.1, repeat: 8 }}
          >
            {text}
          </motion.div>
        </>
      )}
    </div>
  )
}
