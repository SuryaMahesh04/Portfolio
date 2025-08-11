"use client"

import { useEffect, useRef, useCallback } from "react"

interface MatrixRainProps {
  className?: string
  intensity?: number
}

export function MatrixRain({ className = "", intensity = 0.3 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?"
    const fontSize = 14
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = "rgba(13, 13, 13, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#00FFAB"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // Draw character
        ctx.fillStyle = `rgba(0, 255, 171, ${Math.random() * 0.8 + 0.2})`
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Reset drop randomly or when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const animateMatrix = () => {
      if (Math.random() < intensity) {
        draw()
      }
      animationRef.current = requestAnimationFrame(animateMatrix)
    }

    animateMatrix()
  }, [intensity])

  useEffect(() => {
    animate()

    const handleResize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  return (
    <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none z-0 ${className}`} style={{ opacity: 0.1 }} />
  )
}
