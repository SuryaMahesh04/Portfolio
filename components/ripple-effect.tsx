"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

interface RippleEffectProps {
  children: React.ReactNode
  className?: string
  color?: string
}

export function RippleEffect({ children, className = "", color = "#00FFAB" }: RippleEffectProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev, { x, y, id }])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
    }, 1000)
  }

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={createRipple}>
      {children}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0 }}
          animate={{
            width: 400,
            height: 400,
            x: -200,
            y: -200,
            opacity: [0.8, 0],
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
