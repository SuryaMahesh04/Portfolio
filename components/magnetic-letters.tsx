"use client"

import React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"

interface MagneticLettersProps {
  text: string
  className?: string
  delay?: number
}

export function MagneticLetters({ text, className = "", delay = 0 }: MagneticLettersProps) {
  const [isReady, setIsReady] = useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <MagneticLetter key={index} char={char} index={index} isReady={isReady} />
      ))}
    </div>
  )
}

function MagneticLetter({ char, index, isReady }: { char: string; index: number; isReady: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 300 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rotateX = useTransform(springY, [-50, 50], [10, -10])
  const rotateY = useTransform(springX, [-50, 50], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const maxDistance = 100

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance
      x.set(deltaX * force * 0.5)
      y.set(deltaY * force * 0.5)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className="inline-block cursor-pointer will-change-transform"
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0, rotateZ: 180 }}
      animate={
        isReady
          ? {
              opacity: 1,
              scale: 1,
              rotateZ: 0,
            }
          : {}
      }
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.2,
        color: "#00FFAB",
        textShadow: "0 0 20px rgba(0, 255, 171, 0.8)",
        transition: { duration: 0.2 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  )
}
