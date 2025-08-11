"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState, useCallback } from "react"

interface OptimizedRippleProps {
  children: React.ReactNode
  className?: string
  color?: string
}

export function OptimizedRipple({ children, className = "", color = "#00FFAB" }: OptimizedRippleProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const createRipple = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev.slice(-2), { x, y, id }]) // Limit to 3 ripples max

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
    }, 600) // Reduced duration
  }, [])

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
            background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0 }}
          animate={{
            width: 200, // Reduced size
            height: 200,
            x: -100,
            y: -100,
            opacity: [0.6, 0],
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
