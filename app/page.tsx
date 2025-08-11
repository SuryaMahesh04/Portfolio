"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { OptimizedRipple } from "@/components/optimized-ripple"
import { WaveText } from "@/components/wave-text"
import { HologramText } from "@/components/hologram-text"
import { MorphingText } from "@/components/morphing-text"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Rocket, Brain, Users } from "lucide-react"
import { useState, useMemo } from "react"

export default function Home() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, 25])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const [currentAnimation, setCurrentAnimation] = useState(0)

  const roles = useMemo(
    () => ["Technology Leader", "AI Innovator", "Team Builder", "Digital Transformer", "Code Architect"],
    [],
  )

  const skills = useMemo(
    () => ["React & Next.js", "AI & Machine Learning", "IoT Development", "Team Leadership", "System Architecture"],
    [],
  )

  const textAnimations = [
    { component: HologramText, name: "Hologram" },
    { component: WaveText, name: "Wave" },
  ]

  const CurrentTextComponent = textAnimations[currentAnimation].component

  const nextAnimation = () => {
    setCurrentAnimation((prev) => (prev + 1) % textAnimations.length)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 3.5, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Main Heading with Clear Text Animations */}
          <motion.div className="relative mb-12 mt-8">
            <motion.h1
              className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 relative text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              style={{
                lineHeight: "1.1",
                textShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
              }}
            >
              <CurrentTextComponent text="Hi, I'm Surya Mahesh" delay={4000} />
            </motion.h1>

            {/* Animation Switcher */}
            <motion.div
              className="flex justify-center gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5 }}
            >
              {textAnimations.map((animation, index) => (
                <motion.button
                  key={animation.name}
                  onClick={() => setCurrentAnimation(index)}
                  className={`px-6 py-2 text-sm font-semibold rounded-full border-2 transition-all ${
                    currentAnimation === index
                      ? "bg-[#00FFAB] text-black border-[#00FFAB] shadow-lg shadow-[#00FFAB]/30"
                      : "bg-transparent text-[#00FFAB] border-[#00FFAB]/50 hover:border-[#00FFAB] hover:bg-[#00FFAB]/10"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {animation.name}
                </motion.button>
              ))}
            </motion.div>

            {/* Floating Interactive Icons */}
            <motion.div
              className="absolute -top-2 -left-4 cursor-pointer"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              whileHover={{ scale: 1.5, rotate: 0 }}
              onClick={nextAnimation}
            >
              <Sparkles className="text-[#00FFAB] w-6 h-6 drop-shadow-lg" />
            </motion.div>

            <motion.div
              className="absolute top-0 -right-8 cursor-pointer"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              whileHover={{ scale: 1.5, rotate: 180 }}
              onClick={nextAnimation}
            >
              <Zap className="text-[#FF00E6] w-5 h-5 drop-shadow-lg" />
            </motion.div>
          </motion.div>

          {/* Dynamic Role Text */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-300 mb-6"
          >
            <MorphingText texts={roles} className="text-[#00FFAB]" interval={2500} delay={5500} /> at{" "}
            <span className="text-[#4D9EFF] font-bold">Morphius AI</span>
          </motion.h2>

          {/* Enhanced Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5.5 }}
            className="relative mb-8"
          >
            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              whileHover={{ color: "#ffffff" }}
              transition={{ duration: 0.2 }}
            >
              Leading technology innovation, building future-ready teams, and delivering{" "}
              <span className="text-[#00FFAB] font-semibold">impactful digital solutions</span> that shape tomorrow's
              world through cutting-edge <span className="text-[#FF00E6] font-semibold">AI and IoT technologies</span>.
            </motion.p>
          </motion.div>

          {/* Interactive Skills Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 6 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 6.2 + index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0, 255, 171, 0.3)",
                }}
                className="px-4 py-2 glass rounded-full border border-[#00FFAB]/30 text-[#00FFAB] text-sm font-semibold cursor-pointer"
                onClick={nextAnimation}
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 6.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
          >
            <Link href="/projects">
              <OptimizedRipple color="#00FFAB">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} data-magnetic>
                  <Button className="bg-gradient-to-r from-[#00FFAB] to-[#4D9EFF] text-black hover:from-[#4D9EFF] hover:to-[#00FFAB] px-10 py-4 text-xl font-bold rounded-full border-2 border-[#00FFAB] relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center">
                      <Brain className="mr-3" size={24} />
                      View My Work
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="ml-3" size={24} />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </OptimizedRipple>
            </Link>

            <Link href="/contact">
              <OptimizedRipple color="#FF00E6">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} data-magnetic>
                  <Button
                    variant="outline"
                    className="border-2 border-[#FF00E6] text-[#FF00E6] hover:bg-[#FF00E6] hover:text-black px-10 py-4 text-xl font-bold rounded-full bg-transparent backdrop-blur-sm relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#FF00E6] to-[#4D9EFF] opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0, rotate: 180 }}
                      whileHover={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center">
                      <Users className="mr-3" size={24} />
                      Get in Touch
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Rocket className="ml-3" size={24} />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </OptimizedRipple>
            </Link>
          </motion.div>

          {/* Interactive Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 7 }}
            className="text-center mt-12"
          >
            <motion.p
              className="text-gray-400 text-lg cursor-pointer"
              whileHover={{
                color: "#00FFAB",
                scale: 1.05,
                textShadow: "0 0 20px rgba(0, 255, 171, 0.5)",
              }}
              onClick={nextAnimation}
            >
              ✨ Click the buttons above to switch text animations ✨
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        
          
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-[#00FFAB] rounded-full mt-2"
            />
          </motion.div>
        
      

      {/* Enhanced Floating Elements */}
      <motion.div style={{ y: y2 }} className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            background: [
              "radial-gradient(circle, #00FFAB, transparent)",
              "radial-gradient(circle, #FF00E6, transparent)",
              "radial-gradient(circle, #00FFAB, transparent)",
            ],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-full h-full rounded-full blur-xl cursor-pointer"
          whileHover={{ scale: 1.5, opacity: 0.4 }}
          onClick={nextAnimation}
        />
      </motion.div>

      <motion.div style={{ y: y1 }} className="absolute bottom-20 right-10 w-32 h-32 opacity-15">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            background: [
              "conic-gradient(from 0deg, #FF00E6, #4D9EFF, #00FFAB, #FF00E6)",
              "conic-gradient(from 180deg, #4D9EFF, #00FFAB, #FF00E6, #4D9EFF)",
            ],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-full h-full rounded-full blur-2xl cursor-pointer"
          whileHover={{ scale: 1.5, opacity: 0.3 }}
          onClick={nextAnimation}
        />
      </motion.div>
    </div>
  )
}
