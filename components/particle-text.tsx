"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"

interface ParticleTextProps {
  text: string
  className?: string
  delay?: number
}

interface Particle {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  char: string
  color: string
}

export function ParticleText({ text, className = "", delay = 0 }: ParticleTextProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isFormed, setIsFormed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const colors = ["#00FFAB", "#FF00E6", "#4D9EFF", "#FFFFFF"]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return

      const newParticles: Particle[] = []
      const chars = text.split("")

      chars.forEach((char, index) => {
        if (char !== " ") {
          const targetX = index * 40
          const targetY = 0

          // Create multiple particles for each character
          for (let i = 0; i < 8; i++) {
            newParticles.push({
              id: Math.random(),
              x: Math.random() * 800 - 400,
              y: Math.random() * 600 - 300,
              targetX: targetX + (Math.random() - 0.5) * 20,
              targetY: targetY + (Math.random() - 0.5) * 20,
              char,
              color: colors[Math.floor(Math.random() * colors.length)],
            })
          }
        }
      })

      setParticles(newParticles)

      // Form the text after a short delay
      setTimeout(() => setIsFormed(true), 500)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay, colors])

  const explode = () => {
    setIsFormed(false)
    setParticles((prev) =>
      prev.map((particle) => ({
        ...particle,
        x: particle.targetX + (Math.random() - 0.5) * 400,
        y: particle.targetY + (Math.random() - 0.5) * 400,
      })),
    )

    setTimeout(() => setIsFormed(true), 1000)
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block cursor-pointer ${className}`}
      onClick={explode}
      style={{ height: "100px", minWidth: `${text.length * 40}px` }}
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute text-2xl font-bold will-change-transform"
          style={{
            color: particle.color,
            textShadow: `0 0 10px ${particle.color}80`,
          }}
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: isFormed ? particle.targetX : particle.x,
            y: isFormed ? particle.targetY : particle.y,
            opacity: 1,
            scale: 1,
            rotate: isFormed ? 0 : Math.random() * 360,
          }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{
            scale: 1.5,
            rotate: 360,
            transition: { duration: 0.3 },
          }}
        >
          {particle.char}
        </motion.span>
      ))}
    </div>
  )
}
