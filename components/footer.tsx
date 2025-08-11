"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/SuryaMahesh04", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/suryamahesh004/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/suryamahesh4/", label: "Instagram" },
    { icon: Mail, href: "mailto:suryamaheshguduri@gmail.com", label: "Email" },
  ]

  return (
    <footer className="glass border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <motion.h3 whileHover={{ scale: 1.05 }} className="text-2xl font-bold gradient-text mb-4">
              Surya Mahesh
            </motion.h3>
            <p className="text-gray-400">Director of Technology & Recruitment at Morphius AI</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#00FFAB]">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "About", "Projects", "Contact"].map((item) => (
                <Link key={item} href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                  <motion.div
                    whileHover={{ x: 5, color: "#00FFAB" }}
                    className="text-gray-400 hover:text-[#00FFAB] transition-colors"
                  >
                    {item}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#00FFAB]">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-[#00FFAB] transition-colors p-2 glass rounded-lg"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2024 Surya Mahesh. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
