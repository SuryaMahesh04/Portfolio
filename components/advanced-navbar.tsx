"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]

export function AdvancedNavbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])
  const navbarBlur = useTransform(scrollY, [0, 100], [10, 20])

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", updateScrolled)
    return () => window.removeEventListener("scroll", updateScrolled)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 3 }}
      style={{
        backdropFilter: `blur(${navbarBlur}px)`,
        background: `rgba(13, 13, 13, ${navbarOpacity})`,
      }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: 360,
              background: "linear-gradient(45deg, #00FFAB, #FF00E6, #4D9EFF)",
            }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold gradient-text cursor-pointer"
            data-magnetic
          >
            <Link href="/">SM</Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item, index) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.2 + index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      boxShadow: "0 10px 30px rgba(0, 255, 171, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      pathname === item.href ? "text-[#00FFAB]" : "text-gray-300 hover:text-white"
                    }`}
                    data-magnetic
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-[#00FFAB]/20 to-[#4D9EFF]/20 rounded-full border border-[#00FFAB]/30"
                        style={{ boxShadow: "0 0 20px rgba(0, 255, 171, 0.3)" }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-full glass"
              data-magnetic
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          <motion.div
            className="glass rounded-lg mt-2 p-4 border border-white/10"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      x: 10,
                      backgroundColor: "rgba(0, 255, 171, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                      pathname === item.href
                        ? "text-[#00FFAB] bg-[#00FFAB]/10 border border-[#00FFAB]/30"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
