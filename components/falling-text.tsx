"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

interface FallingChar {
  id: number
  char: string
  x: number
  y: number
  speed: number
  opacity: number
  size: number
  color: string
  rotation: number
  rotationSpeed: number
}

interface FallingTextProps {
  text: string
  className?: string
  trigger?: boolean
}

export function FallingText({ text, className = "", trigger = false }: FallingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const [chars, setChars] = useState<FallingChar[]>([])
  const [isActive, setIsActive] = useState(false)

  const colors = ["#00FFAB", "#FF00E6", "#4D9EFF", "#FFFFFF"]

  const createFallingChar = useCallback(
    (char: string, startX: number): FallingChar => ({
      id: Math.random(),
      char,
      x: startX + (Math.random() - 0.5) * 100,
      y: -50,
      speed: Math.random() * 3 + 2,
      opacity: Math.random() * 0.8 + 0.2,
      size: Math.random() * 20 + 16,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4,
    }),
    [colors],
  )

  const startFalling = useCallback(() => {
    if (!containerRef.current || isActive) return

    setIsActive(true)
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const centerX = rect.width / 2

    // Create falling characters
    const newChars: FallingChar[] = []
    const textArray = text.split("")

    textArray.forEach((char, index) => {
      if (char !== " ") {
        // Create multiple instances of each character
        for (let i = 0; i < 3; i++) {
          setTimeout(
            () => {
              const fallingChar = createFallingChar(char, centerX)
              setChars((prev) => [...prev, fallingChar])
            },
            index * 100 + i * 50,
          )
        }
      }
    })

    // Clean up after animation
    setTimeout(() => {
      setIsActive(false)
      setChars([])
    }, 4000)
  }, [text, createFallingChar, isActive])

  const animate = useCallback(() => {
    setChars((prevChars) =>
      prevChars
        .map((char) => ({
          ...char,
          y: char.y + char.speed,
          rotation: char.rotation + char.rotationSpeed,
          opacity: char.opacity - 0.005,
        }))
        .filter((char) => char.y < window.innerHeight + 100 && char.opacity > 0),
    )

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (chars.length > 0) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [chars.length, animate])

  useEffect(() => {
    if (trigger) {
      startFalling()
    }
  }, [trigger, startFalling])

  return (
    <div ref={containerRef} className={`relative ${className}`} onClick={startFalling}>
      {chars.map((char) => (
        <motion.div
          key={char.id}
          className="absolute pointer-events-none font-bold will-change-transform"
          style={{
            left: char.x,
            top: char.y,
            fontSize: char.size,
            color: char.color,
            opacity: char.opacity,
            transform: `rotate(${char.rotation}deg)`,
            textShadow: `0 0 10px ${char.color}80`,
            zIndex: 100,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {char.char}
        </motion.div>
      ))}
    </div>
  )
}
