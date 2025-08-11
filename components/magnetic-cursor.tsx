"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener("mousemove", moveCursor)

    // Add magnetic effect to interactive elements
    const magneticElements = document.querySelectorAll("[data-magnetic]")
    magneticElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      magneticElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="w-full h-full rounded-full bg-[#00FFAB] shadow-[0_0_20px_#00FFAB]" />
      </motion.div>
    </>
  )
}
