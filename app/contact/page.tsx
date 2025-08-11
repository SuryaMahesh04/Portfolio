"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RippleEffect } from "@/components/ripple-effect"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle, Zap, Heart, Instagram } from "lucide-react"
import { useState } from "react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "suryamaheshguduri@gmail.com",
    href: "mailto:suryamaheshguduri@gmail.com",
    color: "#00FFAB",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8466045484",
    href: "tel:+918466045484",
    color: "#FF00E6",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, Telangana, India",
    href: "#",
    color: "#4D9EFF",
  },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/SuryaMahesh04", label: "GitHub", color: "#00FFAB" },
  { icon: Linkedin, href: "www.linkedin.com/in/suryamahesh004", label: "LinkedIn", color: "#FF00E6" },
  { icon: Instagram, href: "https://www.instagram.com/suryamahesh4/", label: "Instagram", color: "#4D9EFF" },
]

export default function Contact() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-2xl text-gray-400 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Let's discuss how we can work together to bring your ideas to life
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <RippleEffect color="#00FFAB">
              <Card className="glass border-white/10 p-10 relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#00FFAB]/5 via-transparent to-[#4D9EFF]/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />

                <CardContent className="p-0 relative z-10">
                  <motion.h2
                    className="text-4xl font-bold text-[#00FFAB] mb-8 flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <MessageCircle className="mr-3" size={36} />
                    </motion.div>
                    Send a Message
                  </motion.h2>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <motion.div className="space-y-3" whileHover={{ scale: 1.02 }}>
                        <Label htmlFor="name" className="text-gray-300 text-lg font-semibold">
                          Name
                        </Label>
                        <motion.div whileFocus={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 255, 171, 0.3)" }}>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="glass border-white/20 focus:border-[#00FFAB] focus:ring-[#00FFAB] bg-transparent text-white placeholder-gray-400 py-4 text-lg"
                            placeholder="Your name"
                            required
                          />
                        </motion.div>
                      </motion.div>

                      <motion.div className="space-y-3" whileHover={{ scale: 1.02 }}>
                        <Label htmlFor="email" className="text-gray-300 text-lg font-semibold">
                          Email
                        </Label>
                        <motion.div whileFocus={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 255, 171, 0.3)" }}>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="glass border-white/20 focus:border-[#00FFAB] focus:ring-[#00FFAB] bg-transparent text-white placeholder-gray-400 py-4 text-lg"
                            placeholder="your@email.com"
                            required
                          />
                        </motion.div>
                      </motion.div>
                    </div>

                    <motion.div className="space-y-3" whileHover={{ scale: 1.02 }}>
                      <Label htmlFor="subject" className="text-gray-300 text-lg font-semibold">
                        Subject
                      </Label>
                      <motion.div whileFocus={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 255, 171, 0.3)" }}>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="glass border-white/20 focus:border-[#00FFAB] focus:ring-[#00FFAB] bg-transparent text-white placeholder-gray-400 py-4 text-lg"
                          placeholder="What's this about?"
                          required
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div className="space-y-3" whileHover={{ scale: 1.02 }}>
                      <Label htmlFor="message" className="text-gray-300 text-lg font-semibold">
                        Message
                      </Label>
                      <motion.div whileFocus={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 255, 171, 0.3)" }}>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className="glass border-white/20 focus:border-[#00FFAB] focus:ring-[#00FFAB] bg-transparent text-white placeholder-gray-400 resize-none text-lg"
                          placeholder="Tell me about your project or idea..."
                          required
                        />
                      </motion.div>
                    </motion.div>

                    <RippleEffect color="#00FFAB">
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 50px rgba(0, 255, 171, 0.6)",
                          y: -5,
                        }}
                        whileTap={{ scale: 0.95 }}
                        data-magnetic
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-[#00FFAB] to-[#4D9EFF] text-black hover:from-[#4D9EFF] hover:to-[#00FFAB] font-bold py-4 text-xl rounded-xl relative overflow-hidden group"
                        >
                          <motion.div
                            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                            whileHover={{ scale: 1.5 }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="relative z-10 flex items-center justify-center">
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                >
                                  <Zap className="mr-2" size={24} />
                                </motion.div>
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2" size={24} />
                                Send Message
                              </>
                            )}
                          </span>
                        </Button>
                      </motion.div>
                    </RippleEffect>
                  </form>
                </CardContent>
              </Card>
            </RippleEffect>
          </motion.div>

          {/* Enhanced Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-10"
          >
            {/* Contact Information Card */}
            <RippleEffect color="#FF00E6">
              <Card className="glass border-white/10 p-10 relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#FF00E6]/5 via-transparent to-[#4D9EFF]/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />

                <CardContent className="p-0 relative z-10">
                  <motion.h2 className="text-4xl font-bold text-[#FF00E6] mb-8" whileHover={{ scale: 1.05 }}>
                    Contact Information
                  </motion.h2>

                  <div className="space-y-8">
                    {contactInfo.map((info, index) => (
                      <motion.a
                        key={index}
                        href={info.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.05,
                          x: 15,
                          boxShadow: `0 10px 40px ${info.color}30`,
                        }}
                        className="flex items-center space-x-6 p-6 glass rounded-xl border-white/10 hover:border-white/20 transition-all group/item"
                        data-magnetic
                      >
                        <motion.div
                          className="p-4 rounded-xl"
                          style={{ backgroundColor: `${info.color}20` }}
                          whileHover={{
                            rotate: 360,
                            scale: 1.2,
                            boxShadow: `0 0 30px ${info.color}60`,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <info.icon size={28} style={{ color: info.color }} />
                        </motion.div>

                        <div>
                          <p className="text-gray-400 text-sm font-medium">{info.label}</p>
                          <motion.p
                            className="font-bold text-lg"
                            style={{ color: info.color }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {info.value}
                          </motion.p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </RippleEffect>

            {/* Social Links Card */}
            <RippleEffect color="#4D9EFF">
              <Card className="glass border-white/10 p-10 relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#4D9EFF]/5 via-transparent to-[#00FFAB]/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />

                <CardContent className="p-0 relative z-10">
                  <motion.h2 className="text-4xl font-bold text-[#4D9EFF] mb-8" whileHover={{ scale: 1.05 }}>
                    Follow Me
                  </motion.h2>

                  <div className="flex space-x-6">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.3,
                          y: -10,
                          boxShadow: `0 20px 60px ${social.color}40`,
                          rotate: 5,
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="p-6 glass rounded-xl border-white/10 hover:border-white/20 transition-all"
                        style={{
                          backgroundColor: `${social.color}10`,
                        }}
                        data-magnetic
                      >
                        <social.icon size={32} style={{ color: social.color }} />
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </RippleEffect>

            {/* Call to Action Card */}
            <RippleEffect>
              <Card className="glass border-white/10 p-10 relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#00FFAB]/5 via-[#FF00E6]/5 to-[#4D9EFF]/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />

                <CardContent className="p-0 relative z-10">
                  <motion.h2
                    className="text-4xl font-bold gradient-text mb-6 flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Heart className="mr-3 text-[#FF00E6]" size={36} />
                    </motion.div>
                    Let's Build Something Amazing
                  </motion.h2>

                  <motion.p
                    className="text-gray-300 leading-relaxed text-lg"
                    whileHover={{ color: "#ffffff", scale: 1.02 }}
                  >
                    Whether you're looking to innovate with AI, build cutting-edge IoT solutions, or scale your
                    technology team, I'm here to help turn your vision into reality. Let's create the future together!
                  </motion.p>
                </CardContent>
              </Card>
            </RippleEffect>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
