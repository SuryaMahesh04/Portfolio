"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]

export function OptimizedNavbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Simplified transforms
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])

  const updateScrolled = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    // Throttle scroll events
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrolled()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [updateScrolled])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 3 }}
      style={{
        backdropFilter: "blur(15px)",
        background: `rgba(13, 13, 13, ${navbarOpacity.get()})`,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 will-change-transform"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
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
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      pathname === item.href ? "text-[#00FFAB]" : "text-gray-300 hover:text-white"
                    }`}
                    data-magnetic
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-[#00FFAB]/20 to-[#4D9EFF]/20 rounded-full border border-[#00FFAB]/30"
                        transition={{ duration: 0.2 }}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-full glass"
              data-magnetic
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden"
        >
          <div className="glass rounded-lg mt-2 p-4 border border-white/10">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
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
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
