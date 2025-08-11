"use client"

import { motion, useScroll } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FFAB] via-[#FF00E6] to-[#4D9EFF] z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
    />
  )
}
