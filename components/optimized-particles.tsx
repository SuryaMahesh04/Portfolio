"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

export function OptimizedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const lastMouseUpdate = useRef(0)

  const createParticle = useCallback((x: number, y: number): Particle => {
    const colors = ["#00FFAB", "#FF00E6", "#4D9EFF"]
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: 120 + Math.random() * 60,
    }
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Reduced particle count for better performance
    particlesRef.current.forEach((particle, index) => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life++

      // Simplified mouse interaction
      const dx = mousePos.x - particle.x
      const dy = mousePos.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        const force = (100 - distance) / 100
        particle.vx += (dx / distance) * force * 0.05
        particle.vy += (dy / distance) * force * 0.05
      }

      // Boundary collision
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.9
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.9

      // Friction
      particle.vx *= 0.995
      particle.vy *= 0.995

      // Draw particle (simplified)
      const alpha = Math.max(0, 1 - particle.life / particle.maxLife)
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle =
        particle.color +
        Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, "0")
      ctx.fill()

      // Remove dead particles
      if (particle.life >= particle.maxLife) {
        particlesRef.current[index] = createParticle(Math.random() * canvas.width, Math.random() * canvas.height)
      }
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [mousePos.x, mousePos.y, createParticle])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Reduced canvas resolution
    const dpr = Math.min(window.devicePixelRatio, 1.5)
    canvas.width = window.innerWidth * dpr * 0.7
    canvas.height = window.innerHeight * dpr * 0.7
    canvas.style.width = window.innerWidth + "px"
    canvas.style.height = window.innerHeight + "px"

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.scale(dpr * 0.7, dpr * 0.7)
    }

    // Reduced particle count
    particlesRef.current = []
    for (let i = 0; i < 30; i++) {
      particlesRef.current.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastMouseUpdate.current > 16) {
        // Throttle to ~60fps
        setMousePos({ x: e.clientX, y: e.clientY })
        lastMouseUpdate.current = now
      }
    }

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      canvas.width = window.innerWidth * dpr * 0.7
      canvas.height = window.innerHeight * dpr * 0.7
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(dpr * 0.7, dpr * 0.7)
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, createParticle])

  // Don't render on mobile for better performance
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 will-change-transform"
      style={{ opacity: 0.4 }}
    />
  )
}
