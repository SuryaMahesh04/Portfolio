import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { OptimizedNavbar } from "@/components/optimized-navbar"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { LoadingAnimation } from "@/components/loading-animation"
import { OptimizedMagneticCursor } from "@/components/optimized-magnetic-cursor"
import { OptimizedLiquidBg } from "@/components/optimized-liquid-bg"
import { OptimizedParticles } from "@/components/optimized-particles"
import { Optimized3DElements } from "@/components/optimized-3d-elements"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Surya Mahesh - Director of Technology & Recruitment",
  description:
    "Leading technology innovation, building future-ready teams, and delivering impactful digital solutions.",
  generator: "v0.dev",
  icons: {
    icon: "/icon.png", // or .png/.svg
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0D0D0D] text-white overflow-x-hidden cursor-none`}>
        <LoadingAnimation />
        <OptimizedMagneticCursor />
        <ScrollProgress />
        <OptimizedLiquidBg />
        <OptimizedParticles />
        <Optimized3DElements />
        <OptimizedNavbar />
        <main className="min-h-screen relative z-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
