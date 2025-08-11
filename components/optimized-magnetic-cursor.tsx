"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function OptimizedMagneticCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Reduced spring stiffness for better performance
  const springConfig = { damping: 30, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setIsVisible(true)
    },
    [cursorX, cursorY],
  )

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  useEffect(() => {
    // Throttle mouse movement for better performance
    let ticking = false
    const throttledMoveCursor = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          moveCursor(e)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("mousemove", throttledMoveCursor, { passive: true })

    const magneticElements = document.querySelectorAll("[data-magnetic]")
    magneticElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter, { passive: true })
      el.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    })

    return () => {
      window.removeEventListener("mousemove", throttledMoveCursor)
      magneticElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [moveCursor, handleMouseEnter, handleMouseLeave])

  // Only render on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-50 will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full rounded-full bg-[#00FFAB] shadow-[0_0_10px_#00FFAB]" />
      </motion.div>
    </>
  )
}
