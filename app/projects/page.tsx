"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RippleEffect } from "@/components/ripple-effect"
import { ExternalLink, Github, Smartphone, MapPin, Hand, Star, Zap, Rocket } from "lucide-react"
import { useState } from "react"

const projects = [
  {
    id: 1,
    title: "Taptivate",
    subtitle: "IoT Smart Shoe Technology",
    description: "Revolutionary IoT smart shoe with integrated safety and fitness tracking capabilities.",
    longDescription:
      "Taptivate represents the future of wearable technology, combining advanced IoT sensors with machine learning algorithms to create an intelligent footwear solution. The system monitors gait patterns, detects falls, tracks fitness metrics, and provides real-time safety alerts.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["IoT", "Machine Learning", "React Native", "Python", "TensorFlow", "Bluetooth"],
    features: [
      "Real-time gait analysis and correction",
      "Fall detection with emergency alerts",
      "Comprehensive fitness tracking",
      "Predictive health insights",
      "Mobile app integration",
      "Cloud-based analytics dashboard",
    ],
    color: "#00FFAB",
    icon: Smartphone,
    rating: 4.9,
    users: "10K+",
  },
  {
    id: 2,
    title: "AttendTrace",
    subtitle: "Geolocation Attendance System",
    description: "Advanced geolocation-based attendance tracking system with real-time monitoring.",
    longDescription:
      "AttendTrace revolutionizes workforce management through precise geolocation technology. The system ensures accurate attendance tracking while maintaining privacy and security standards, featuring advanced anti-spoofing mechanisms and comprehensive reporting.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "Node.js", "MongoDB", "GPS API", "WebRTC", "Docker"],
    features: [
      "Precise GPS-based check-in/out",
      "Geofencing capabilities",
      "Real-time location tracking",
      "Anti-spoofing security measures",
      "Comprehensive reporting dashboard",
      "Multi-platform support",
    ],
    color: "#FF00E6",
    icon: MapPin,
    rating: 4.7,
    users: "5K+",
  },
  {
    id: 3,
    title: "Gesture & Voice Control Interface",
    subtitle: "Hands-Free Computer Control",
    description: "Revolutionary hands-free computer control system using gesture and voice recognition.",
    longDescription:
      "This cutting-edge interface system enables complete computer control without traditional input devices. Using advanced computer vision and natural language processing, users can navigate, control applications, and perform complex tasks through intuitive gestures and voice commands.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Python", "OpenCV", "TensorFlow", "Speech Recognition", "MediaPipe", "PyQt"],
    features: [
      "Real-time gesture recognition",
      "Natural language voice commands",
      "Multi-application control",
      "Customizable gesture library",
      "Accessibility-focused design",
      "Cross-platform compatibility",
    ],
    color: "#4D9EFF",
    icon: Hand,
    rating: 4.8,
    users: "3K+",
  },
]

export default function Projects() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

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
            My Projects
          </motion.h1>
          <motion.p
            className="text-2xl text-gray-400 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Innovative solutions that push the boundaries of technology
          </motion.p>
        </motion.div>

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: `0 30px 80px ${project.color}40`,
                y: -20,
              }}
              className="glass border-white/10 rounded-2xl overflow-hidden group relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(45deg, ${project.color}10, transparent, ${project.color}05)`,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Project Image with Parallax Effect */}
              <div className="relative overflow-hidden h-56">
                <motion.img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Floating Icon */}
                <motion.div
                  className="absolute top-4 right-4 p-3 rounded-xl glass"
                  style={{ backgroundColor: `${project.color}20` }}
                  whileHover={{
                    rotate: 360,
                    scale: 1.2,
                    boxShadow: `0 0 30px ${project.color}60`,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <project.icon size={28} style={{ color: project.color }} />
                </motion.div>

                {/* Project Stats */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-4">
                  <motion.div
                    className="flex items-center space-x-1 glass px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Star size={16} style={{ color: project.color }} />
                    <span className="text-sm font-semibold" style={{ color: project.color }}>
                      {project.rating}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-1 glass px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-sm font-semibold text-white">{project.users}</span>
                    <span className="text-xs text-gray-400">users</span>
                  </motion.div>
                </div>
              </div>

              <CardContent className="p-8 relative z-10">
                <motion.h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: project.color }}
                  whileHover={{ scale: 1.05, textShadow: `0 0 20px ${project.color}80` }}
                >
                  {project.title}
                </motion.h3>

                <motion.p className="text-gray-400 font-medium mb-3" whileHover={{ color: "#ffffff" }}>
                  {project.subtitle}
                </motion.p>

                <motion.p className="text-gray-300 mb-6 leading-relaxed" whileHover={{ color: "#ffffff", scale: 1.02 }}>
                  {project.description}
                </motion.p>

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: techIndex * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Badge
                        className="text-xs font-semibold px-3 py-1"
                        style={{
                          backgroundColor: `${project.color}20`,
                          color: project.color,
                          borderColor: `${project.color}30`,
                        }}
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                  {project.technologies.length > 3 && (
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Badge className="bg-gray-700 text-gray-300 text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    </motion.div>
                  )}
                </div>

                {/* Enhanced CTA Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <RippleEffect color={project.color}>
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          boxShadow: `0 0 40px ${project.color}60`,
                        }}
                        whileTap={{ scale: 0.95 }}
                        data-magnetic
                      >
                        <Button
                          className="w-full font-bold py-3 rounded-xl relative overflow-hidden group"
                          style={{
                            backgroundColor: project.color,
                            color: "#000",
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                            whileHover={{ scale: 1.5 }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="relative z-10 flex items-center justify-center">
                            Learn More
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <Rocket className="ml-2" size={18} />
                            </motion.div>
                          </span>
                        </Button>
                      </motion.div>
                    </RippleEffect>
                  </DialogTrigger>

                  <DialogContent className="glass border-white/10 max-w-5xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle
                        className="text-4xl font-bold flex items-center gap-4 mb-6"
                        style={{ color: project.color }}
                      >
                        <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                          <project.icon size={40} />
                        </motion.div>
                        {project.title}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-8">
                      {/* Enhanced Project Image */}
                      <motion.div className="relative rounded-xl overflow-hidden" whileHover={{ scale: 1.02 }}>
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-80 object-cover"
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                          whileHover={{ opacity: 0.3 }}
                        />
                      </motion.div>

                      {/* Project Overview */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="text-2xl font-semibold mb-4 text-white flex items-center">
                          <Zap className="mr-2" style={{ color: project.color }} />
                          Project Overview
                        </h4>
                        <p className="text-gray-300 leading-relaxed text-lg">{project.longDescription}</p>
                      </motion.div>

                      {/* Key Features */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="text-2xl font-semibold mb-6 text-white flex items-center">
                          <Star className="mr-2" style={{ color: project.color }} />
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.features.map((feature, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              whileHover={{
                                x: 10,
                                scale: 1.02,
                                backgroundColor: `${project.color}10`,
                              }}
                              className="text-gray-300 flex items-center p-3 rounded-lg glass"
                            >
                              <motion.div
                                className="w-3 h-3 rounded-full mr-4"
                                style={{ backgroundColor: project.color }}
                                whileHover={{ scale: 1.5 }}
                              />
                              {feature}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Technologies Used */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h4 className="text-2xl font-semibold mb-6 text-white flex items-center">
                          <Rocket className="mr-2" style={{ color: project.color }} />
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {project.technologies.map((tech, techIndex) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + techIndex * 0.05 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              <Badge
                                className="px-4 py-2 text-sm font-semibold"
                                style={{
                                  backgroundColor: `${project.color}20`,
                                  color: project.color,
                                  borderColor: `${project.color}30`,
                                }}
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                        className="flex gap-4 pt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <RippleEffect color={project.color}>
                          <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1"
                            data-magnetic
                          >
                            <Button
                              className="w-full font-bold py-3 rounded-xl"
                              style={{
                                backgroundColor: project.color,
                                color: "#000",
                              }}
                            >
                              <Github className="mr-2" size={18} />
                              View Code
                            </Button>
                          </motion.div>
                        </RippleEffect>

                        <RippleEffect color={project.color}>
                          <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1"
                            data-magnetic
                          >
                            <Button
                              variant="outline"
                              className="w-full bg-transparent font-bold py-3 rounded-xl"
                              style={{
                                borderColor: project.color,
                                color: project.color,
                              }}
                            >
                              <ExternalLink className="mr-2" size={18} />
                              Live Demo
                            </Button>
                          </motion.div>
                        </RippleEffect>
                      </motion.div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
