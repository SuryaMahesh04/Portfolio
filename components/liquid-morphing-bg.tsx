"use client"

import { useEffect, useRef } from "react"

export function LiquidMorphingBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let time = 0
    const colors = ["#00FFAB", "#FF00E6", "#4D9EFF"]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create liquid morphing shapes
      for (let i = 0; i < 3; i++) {
        const color = colors[i]
        const x = canvas.width * 0.5 + Math.sin(time * 0.01 + i * 2) * 200
        const y = canvas.height * 0.5 + Math.cos(time * 0.015 + i * 2) * 150

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 300)
        gradient.addColorStop(0, `${color}40`)
        gradient.addColorStop(1, `${color}00`)

        ctx.fillStyle = gradient
        ctx.beginPath()

        // Create organic, morphing shape
        const radius = 200 + Math.sin(time * 0.02 + i) * 50
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const r = radius + Math.sin(angle * 3 + time * 0.03) * 30
          const px = x + Math.cos(angle) * r
          const py = y + Math.sin(angle) * r

          if (angle === 0) {
            ctx.moveTo(px, py)
          } else {
            ctx.lineTo(px, py)
          }
        }

        ctx.closePath()
        ctx.fill()
      }

      time++
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3, filter: "blur(1px)" }}
    />
  )
}
