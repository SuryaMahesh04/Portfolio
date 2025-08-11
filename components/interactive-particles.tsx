"use client"

import { useEffect, useRef, useState } from "react"

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

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ["#00FFAB", "#FF00E6", "#4D9EFF"]

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 60 + Math.random() * 60,
      }
    }

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particlesRef.current.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Update particle
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Mouse attraction
        const dx = mousePos.x - particle.x
        const dy = mousePos.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          particle.vx += (dx / distance) * force * 0.1
          particle.vy += (dy / distance) * force * 0.1
        }

        // Boundary collision
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8

        // Friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Draw particle
        const alpha = 1 - particle.life / particle.maxLife
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle =
          particle.color +
          Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.fill()

        // Remove dead particles
        if (particle.life >= particle.maxLife) {
          particlesRef.current[index] = createParticle(Math.random() * canvas.width, Math.random() * canvas.height)
        }
      })

      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const alpha = (100 - distance) / 100
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(0, 255, 171, ${alpha * 0.3})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [mousePos.x, mousePos.y])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />
}
