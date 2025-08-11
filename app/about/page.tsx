"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RippleEffect } from "@/components/ripple-effect"
import { Code, Users, Lightbulb, Target, Zap, Brain, Rocket, Shield, Database, Smartphone } from "lucide-react"

const skills = [
  { name: "AI & Machine Learning", icon: Brain, color: "#00FFAB", level: 95 },
  { name: "IoT Development", icon: Smartphone, color: "#FF00E6", level: 90 },
  { name: "Software Architecture", icon: Code, color: "#4D9EFF", level: 92 },
  { name: "Team Leadership", icon: Users, color: "#00FFAB", level: 88 },
  { name: "Innovation Strategy", icon: Lightbulb, color: "#FF00E6", level: 85 },
  { name: "Product Management", icon: Target, color: "#4D9EFF", level: 87 },
  { name: "Technology Strategy", icon: Rocket, color: "#00FFAB", level: 93 },
  { name: "Cybersecurity", icon: Shield, color: "#FF00E6", level: 82 },
  { name: "Database Design", icon: Database, color: "#4D9EFF", level: 89 },
]

const timeline = [
  {
    year: "2025",
    title: "Director of Technology & Recruitment",
    company: "Morphius AI",
    description:
      "Leading technology strategy, building high-performance teams, and driving AI innovation across multiple verticals.",
    achievements: [
      "Scaled engineering team by 200%",
      "Launched 3 major AI products",
      "Implemented cutting-edge recruitment processes",
    ],
    color: "#00FFAB",
  },
  {
    year: "2024",
    title: "3D Artist",
    company: "Adoclock Media Pvt Ltd",
    description:
      "Created high-quality 3D models, environments, and animations for various projects, blending artistic creativity with technical precision.",
    achievements: [
      "Designed and optimized 20+ detailed 3D assets for games, animations, and promotional content",
    "Produced realistic lighting, texturing, and rendering in Blender to enhance visual appeal",
    "Collaborated with clients and teams to bring creative visions to life within tight deadlines",
    ],
    color: "#FF00E6",
  },
]

export default function About() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, 25])

  return (
    <div className="min-h-screen pt-20 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Hero Section */}
        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-20 relative"
        >
          <motion.h1
            className="text-6xl sm:text-8xl font-black mb-8"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 50px rgba(0, 255, 171, 0.8)",
            }}
            style={{
              background: "linear-gradient(45deg, #00FFAB, #FF00E6, #4D9EFF)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            About Me
          </motion.h1>
          <motion.p
            className="text-2xl text-gray-400 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Passionate about technology, innovation, and building exceptional teams
          </motion.p>
        </motion.div>

        {/* Enhanced Bio Section */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <RippleEffect>
            <Card className="glass border-white/10 p-8 relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00FFAB]/5 via-[#FF00E6]/5 to-[#4D9EFF]/5 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.5 }}
              />
              <CardContent className="p-0 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} className="relative">
                    <motion.div
                      className="w-80 h-80 mx-auto lg:mx-0 rounded-full relative"
                      whileHover={{
                        boxShadow: "0 0 100px rgba(0, 255, 171, 0.5)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          background: [
                            "conic-gradient(from 0deg, #00FFAB, #FF00E6, #4D9EFF, #00FFAB)",
                            "conic-gradient(from 360deg, #00FFAB, #FF00E6, #4D9EFF, #00FFAB)",
                          ],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      <div className="absolute inset-2 rounded-full bg-[#0D0D0D] flex items-center justify-center">
                        <img
                          src="/picc.jpeg"
                          alt="Surya Mahesh"
                          className="w-72 h-72 rounded-full object-cover"
                        />
                      </div>
                    </motion.div>
                  </motion.div>

                  <div className="space-y-8">
                    <motion.h2
                      className="text-4xl font-bold text-[#00FFAB]"
                      whileHover={{
                        scale: 1.05,
                        textShadow: "0 0 30px rgba(0, 255, 171, 0.8)",
                      }}
                    >
                      Technology Leader & Innovator
                    </motion.h2>

                    <motion.div className="space-y-6">
                      <motion.p
                        className="text-lg text-gray-300 leading-relaxed"
                        whileHover={{ color: "#ffffff", scale: 1.02 }}
                      >
                        I'm a technology leader and innovator with expertise in AI, IoT, and software development. At
                        Morphius AI, I lead technology strategy, build high-performance teams, and drive innovation that
                        delivers real-world impact.
                      </motion.p>

                      <motion.p
                        className="text-lg text-gray-300 leading-relaxed"
                        whileHover={{ color: "#ffffff", scale: 1.02 }}
                      >
                        My passion lies in transforming complex challenges into elegant solutions, fostering
                        collaborative environments, and mentoring the next generation of tech leaders.
                      </motion.p>
                    </motion.div>

                    <div className="flex flex-wrap gap-3">
                      {["AI Specialist", "IoT Expert", "Team Builder"].map((badge, index) => (
                        <motion.div
                          key={badge}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          <Badge
                            className={`px-4 py-2 text-sm font-semibold ${
                              index === 0
                                ? "bg-[#00FFAB]/20 text-[#00FFAB] border-[#00FFAB]/30"
                                : index === 1
                                  ? "bg-[#FF00E6]/20 text-[#FF00E6] border-[#FF00E6]/30"
                                  : "bg-[#4D9EFF]/20 text-[#4D9EFF] border-[#4D9EFF]/30"
                            }`}
                          >
                            {badge}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </RippleEffect>
        </motion.div>

        {/* Enhanced Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-24"
        >
          <motion.h2 className="text-5xl font-bold text-center mb-16 gradient-text" whileHover={{ scale: 1.05 }}>
            Skills & Expertise
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  boxShadow: `0 20px 60px ${skill.color}40`,
                  y: -10,
                }}
                className="glass border-white/10 p-8 rounded-xl relative overflow-hidden group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{ background: `linear-gradient(45deg, ${skill.color}10, transparent)` }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: `${skill.color}20` }}
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <skill.icon size={32} style={{ color: skill.color }} />
                    </motion.div>

                    <motion.span
                      className="text-2xl font-bold"
                      style={{ color: skill.color }}
                      whileHover={{ scale: 1.2 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>

                  <h3 className="text-xl font-semibold mb-4" style={{ color: skill.color }}>
                    {skill.name}
                  </h3>

                  {/* Animated Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Career Timeline */}
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <motion.h2 className="text-5xl font-bold text-center mb-16 gradient-text" whileHover={{ scale: 1.05 }}>
            Career Journey
          </motion.h2>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative"
              >
                <RippleEffect color={item.color}>
                  <Card className="glass border-white/10 p-10 rounded-xl relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{ background: `linear-gradient(45deg, ${item.color}10, transparent)` }}
                      transition={{ duration: 0.5 }}
                    />

                    <CardContent className="p-0 relative z-10">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div>
                          <div className="flex items-center space-x-6 mb-4">
                            <motion.span
                              className="text-4xl font-black"
                              style={{ color: item.color }}
                              whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                              {item.year}
                            </motion.span>
                            <motion.div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: item.color }}
                              animate={{
                                scale: [1, 1.5, 1],
                                boxShadow: [
                                  `0 0 0 0 ${item.color}40`,
                                  `0 0 0 20px ${item.color}00`,
                                  `0 0 0 0 ${item.color}40`,
                                ],
                              }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            />
                          </div>
                          <motion.h3
                            className="text-3xl font-bold text-white mb-2"
                            whileHover={{ scale: 1.05, color: item.color }}
                          >
                            {item.title}
                          </motion.h3>
                          <motion.p
                            className="text-xl font-semibold mb-4"
                            style={{ color: item.color }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {item.company}
                          </motion.p>
                        </div>
                      </div>

                      <motion.p
                        className="text-gray-300 mb-6 leading-relaxed text-lg"
                        whileHover={{ color: "#ffffff" }}
                      >
                        {item.description}
                      </motion.p>

                      <div className="space-y-3">
                        <h4 className="text-xl font-semibold" style={{ color: item.color }}>
                          Key Achievements:
                        </h4>
                        <ul className="space-y-3">
                          {item.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ x: 10, scale: 1.02 }}
                              className="text-gray-300 flex items-center text-lg"
                            >
                              <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.3 }}>
                                <Zap size={20} style={{ color: item.color }} className="mr-3" />
                              </motion.div>
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </RippleEffect>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
