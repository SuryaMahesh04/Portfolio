"use client"

import { useEffect, useRef, useCallback } from "react"

export function OptimizedLiquidBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Reduce canvas resolution for better performance
    const dpr = Math.min(window.devicePixelRatio, 2)
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr * 0.5 // Reduced resolution
    canvas.height = rect.height * dpr * 0.5
    ctx.scale(dpr * 0.5, dpr * 0.5)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const time = timeRef.current
    const colors = ["#00FFAB", "#FF00E6", "#4D9EFF"]

    // Reduced number of shapes for better performance
    for (let i = 0; i < 2; i++) {
      const color = colors[i]
      const x = canvas.width * 0.5 + Math.sin(time * 0.005 + i * 2) * 100
      const y = canvas.height * 0.5 + Math.cos(time * 0.008 + i * 2) * 75

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 150)
      gradient.addColorStop(0, `${color}30`)
      gradient.addColorStop(1, `${color}00`)

      ctx.fillStyle = gradient
      ctx.beginPath()

      // Simplified shape calculation
      const radius = 100 + Math.sin(time * 0.01 + i) * 25
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    timeRef.current += 1
    animationRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
    }

    handleResize()
    animate()

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 will-change-transform"
      style={{ opacity: 0.2, filter: "blur(1px)" }}
    />
  )
}
