"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Appbar } from "@/app/components/Appbar"
import { Redirect } from "@/app/components/Redirect"
import FeaturesSection from "./components/Features"
import Pricing from "./components/Pricing"
import CTA from "./components/CTA"
import Working from "./components/Working"
import StatsSection from "./components/Stats"
import HeroSection from "./components/HeroSection"
import { TestimonialsSection } from "./components/Reviews"

const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  if (dimensions.width === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default function MusicStreamingLanding() {
  
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground dark:bg-gray-950 dark:text-gray-100">
      <Appbar />
      <Redirect />

      <main className="flex-1 relative w-full">
        <FloatingParticles />

        {/* Enhanced Hero Section */}
        <HeroSection/>

        <StatsSection/>
        <FeaturesSection/>
        <Working/>
        <TestimonialsSection/>
        <Pricing/>
        <CTA/>
      </main>
    </div>
  )
}
