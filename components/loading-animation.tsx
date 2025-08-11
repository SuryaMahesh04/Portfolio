"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0D]"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-8xl font-bold gradient-text"
          >
            <motion.span
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="inline-block"
            >
              SM
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
