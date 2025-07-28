"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Play,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react"


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


export default function HeroSection(){
    const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut", // "easeOut" is a valid keyword for framer-motion
      },
    },
  }

    return(
        <section className="relative w-full py-20 md:py-32 lg:py-40 xl:py-48 bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-900 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <motion.div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 w-full" style={{ y, opacity }}>
            <motion.div
              className="grid gap-12 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px] items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex flex-col justify-center space-y-8" variants={itemVariants}>
                <motion.div className="space-y-6" variants={itemVariants}>
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-300">Revolutionizing Stream Interaction</span>
                  </motion.div>

                  <motion.h1
                    className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none"
                    variants={itemVariants}
                  >
                    <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                      Let Your Fans
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                      Choose Your
                    </span>
                    <br />
                    <span className="text-white">{"Stream's Music"}</span>
                  </motion.h1>

                  <motion.p className="max-w-[600px] text-xl text-gray-900 leading-relaxed" variants={itemVariants}>
                    {"FanTune connects creators with their audience through music. Let your fans vote on songs and influence your stream's soundtrack in real-time with our revolutionary platform."}
                  </motion.p>
                </motion.div>

                <motion.div className="flex flex-col gap-4 min-[400px]:flex-row" variants={itemVariants}>
                  <Link href="/signup">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-6 text-lg font-semibold shadow-2xl shadow-purple-500/25"
                      >
                        Get Started Free <ArrowRight className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </Link>

                  <Link href="#demo">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="gap-2 border-2 border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300 px-8 py-6 text-lg font-semibold backdrop-blur-sm bg-transparent"
                      >
                        Watch Demo <Play className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Trust indicators */}
                <motion.div className="flex items-center gap-8 pt-8" variants={itemVariants}>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-gray-900"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-900">10,000+ creators</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-900 ml-2">4.9/5 rating</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-75 blur-2xl animate-pulse" />
                <div className="relative">
                  <Image
                    src="/images/hero-section.jpeg"
                    width={600}
                    height={600}
                    priority
                    alt="Music streaming interface showing fan interaction"
                    className="relative mx-auto aspect-video overflow-hidden rounded-2xl object-cover border border-gray-700 bg-gray-900 shadow-2xl"
                  />
                  {/* Floating UI elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    🎵 Live Now
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                  >
                    👥 1.2k voting
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
    )
}