"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  shape: "cube" | "sphere" | "pyramid"
  animationDelay: number
}

export function Optimized3DElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  // Memoize elements to prevent recreation
  const memoizedElements = useMemo(() => {
    if (typeof window === "undefined") return []

    // Reduced number of elements for better performance
    const newElements: FloatingElement[] = []
    const colors = ["#00FFAB", "#FF00E6", "#4D9EFF"]
    const shapes: ("cube" | "sphere" | "pyramid")[] = ["cube", "sphere", "pyramid"]

    for (let i = 0; i < 8; i++) {
      // Reduced from 15 to 8
      newElements.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 40 + 15, // Smaller sizes
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        animationDelay: i * 0.2,
      })
    }

    return newElements
  }, [])

  useEffect(() => {
    setElements(memoizedElements)
  }, [memoizedElements])

  const renderShape = (element: FloatingElement) => {
    const baseStyle = {
      width: element.size,
      height: element.size,
      background: `linear-gradient(45deg, ${element.color}30, ${element.color}60)`, // Reduced opacity
      backdropFilter: "blur(5px)", // Reduced blur
      border: `1px solid ${element.color}40`,
    }

    switch (element.shape) {
      case "cube":
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: "6px",
              boxShadow: `0 0 15px ${element.color}20`, // Reduced glow
            }}
          />
        )
      case "sphere":
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: "50%",
              boxShadow: `0 0 20px ${element.color}30`,
            }}
          />
        )
      case "pyramid":
        return (
          <div
            style={{
              ...baseStyle,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              boxShadow: `0 0 18px ${element.color}25`,
            }}
          />
        )
      default:
        return null
    }
  }

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute will-change-transform"
          initial={{
            x: element.x,
            y: element.y,
            rotate: element.rotation,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: element.x + Math.sin(Date.now() * 0.0005 + element.id) * 30, // Reduced movement
            y: element.y + Math.cos(Date.now() * 0.0005 + element.id) * 20,
            rotate: element.rotation + 180, // Reduced rotation
            scale: 1,
            opacity: 0.5, // Reduced opacity
          }}
          transition={{
            duration: 15 + element.id, // Slower animations
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            scale: { duration: 1.5, delay: element.animationDelay },
            opacity: { duration: 1.5, delay: element.animationDelay },
          }}
          whileHover={{
            scale: 1.2, // Reduced hover scale
            transition: { duration: 0.2 },
          }}
        >
          {renderShape(element)}
        </motion.div>
      ))}
    </div>
  )
}
