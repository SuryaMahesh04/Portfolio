"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  shape: "cube" | "sphere" | "pyramid"
}

export function Floating3DElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const newElements: FloatingElement[] = []
    const colors = ["#00FFAB", "#FF00E6", "#4D9EFF"]
    const shapes: ("cube" | "sphere" | "pyramid")[] = ["cube", "sphere", "pyramid"]

    for (let i = 0; i < 15; i++) {
      newElements.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 60 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      })
    }

    setElements(newElements)
  }, [])

  const renderShape = (element: FloatingElement) => {
    const baseStyle = {
      width: element.size,
      height: element.size,
      background: `linear-gradient(45deg, ${element.color}40, ${element.color}80)`,
      backdropFilter: "blur(10px)",
      border: `1px solid ${element.color}60`,
    }

    switch (element.shape) {
      case "cube":
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: "8px",
              boxShadow: `0 0 30px ${element.color}40, inset 0 0 20px ${element.color}20`,
            }}
          />
        )
      case "sphere":
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: "50%",
              boxShadow: `0 0 40px ${element.color}60, inset 0 0 30px ${element.color}30`,
            }}
          />
        )
      case "pyramid":
        return (
          <div
            style={{
              ...baseStyle,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              boxShadow: `0 0 35px ${element.color}50`,
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          initial={{
            x: element.x,
            y: element.y,
            rotate: element.rotation,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: element.x + Math.sin(Date.now() * 0.001 + element.id) * 50,
            y: element.y + Math.cos(Date.now() * 0.001 + element.id) * 30,
            rotate: element.rotation + 360,
            scale: 1,
            opacity: 0.7,
          }}
          transition={{
            duration: 20 + element.id * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            scale: { duration: 2, delay: element.id * 0.1 },
            opacity: { duration: 2, delay: element.id * 0.1 },
          }}
          whileHover={{
            scale: 1.5,
            rotate: element.rotation + 180,
            transition: { duration: 0.3 },
          }}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {renderShape(element)}
        </motion.div>
      ))}
    </div>
  )
}
