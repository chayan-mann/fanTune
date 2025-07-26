"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Headphones,
  Music,
  Users,
  Play,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Sparkles,
  TrendingUp,
  Heart,
  Radio,
  CheckCircle,
  Quote,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Appbar } from "@/app/components/Appbar"
import { Redirect } from "@/app/components/Redirect"
import { TestimonialsSection } from "./components/Reviews"
// Floating particles component
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

// Animated counter component
const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function MusicStreamingLanding() {
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

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground dark:bg-gray-950 dark:text-gray-100">
      <Appbar />
      <Redirect />

      <main className="flex-1 relative w-full">
        <FloatingParticles />

        {/* Enhanced Hero Section */}
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
                    <span className="text-white">Stream's Music</span>
                  </motion.h1>

                  <motion.p className="max-w-[600px] text-xl text-gray-900 leading-relaxed" variants={itemVariants}>
                    FanTune connects creators with their audience through music. Let your fans vote on songs and
                    influence your stream's soundtrack in real-time with our revolutionary platform.
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
                    src="/images/image.png"
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

        {/* Stats Section */}
        <section className="w-full py-16 bg-gradient-to-r from-gray-900 via-purple-900/20 to-gray-900">
          <motion.div
            className="container mx-auto px-4 md:px-6 max-w-7xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: 10000, label: "Active Creators", suffix: "+" },
                { number: 500000, label: "Songs Played", suffix: "+" },
                { number: 2500000, label: "Fan Votes", suffix: "+" },
                { number: 99, label: "Uptime", suffix: ".9%" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent">
                    <AnimatedCounter end={stat.number} />
                    {stat.suffix}
                  </div>
                  <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Enhanced Features Section */}
        <section id="features" className="w-full py-24 md:py-32 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

          <motion.div
            className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-2">
                Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Engage Your Audience Through Music
              </h2>
              <p className="max-w-[800px] text-xl text-gray-300">
                Powerful features designed to transform how you interact with your community
              </p>
            </motion.div>

            <div className="grid max-w-6xl mx-auto gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Music,
                  title: "Fan Song Requests",
                  description: "Let your fans submit and vote on song requests in real-time with smart filtering.",
                  color: "purple",
                },
                {
                  icon: Users,
                  title: "Community Voting",
                  description: "Democratic music selection with an advanced upvoting system and queue management.",
                  color: "pink",
                },
                {
                  icon: Headphones,
                  title: "Seamless Integration",
                  description: "Works with major streaming platforms and broadcasting software out of the box.",
                  color: "purple",
                },
                {
                  icon: Zap,
                  title: "Real-time Updates",
                  description: "Instant synchronization across all devices with lightning-fast response times.",
                  color: "yellow",
                },
                {
                  icon: Shield,
                  title: "Content Moderation",
                  description: "Advanced AI-powered content filtering to keep your stream family-friendly.",
                  color: "green",
                },
                {
                  icon: TrendingUp,
                  title: "Analytics Dashboard",
                  description: "Detailed insights into your audience preferences and engagement metrics.",
                  color: "blue",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="h-full border-gray-800 bg-gradient-to-br from-gray-950/50 to-gray-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className={`rounded-full bg-${feature.color}-500/10 p-4 w-fit mx-auto`}>
                        <feature.icon className={`h-8 w-8 text-${feature.color}-500`} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-24 md:py-32 bg-gradient-to-b from-gray-900 to-gray-950">
          <motion.div
            className="container mx-auto px-4 md:px-6 max-w-7xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">How It Works</h2>
              <p className="text-xl text-gray-300 max-w-[600px] mx-auto">
                Get started in minutes with our simple three-step process
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Connect Your Stream",
                  description: "Link your streaming platform and music service in seconds",
                  icon: Radio,
                },
                {
                  step: "02",
                  title: "Share Your Room",
                  description: "Send your unique room code to fans so they can join and vote",
                  icon: Users,
                },
                {
                  step: "03",
                  title: "Let Fans Choose",
                  description: "Watch as your community votes on songs and shapes your stream",
                  icon: Heart,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center border-2 border-purple-500">
                      <span className="text-xs font-bold text-purple-400">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>

                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full">
                      <ArrowRight className="h-6 w-6 text-purple-500 mx-auto" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        {/* <section className="w-full py-24 md:py-32 bg-gray-900">
          <motion.div
            className="container mx-auto px-4 md:px-6 max-w-7xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Loved by Creators</h2>
              <p className="text-xl text-gray-300">See what top streamers are saying about FanTune</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Alex Chen",
                  role: "Gaming Streamer",
                  avatar: "/placeholder.svg?height=60&width=60",
                  content: "FanTune completely transformed my streams. My viewers are 10x more engaged now!",
                  rating: 4,
                },
                {
                  name: "Sarah Johnson",
                  role: "Music Producer",
                  avatar: "/placeholder.svg?height=60&width=60",
                  content: "The real-time voting system is incredible. My fans love being part of the music selection.",
                  rating: 5,
                },
                {
                  name: "Mike Rodriguez",
                  role: "Content Creator",
                  avatar: "/placeholder.svg?height=60&width=60",
                  content: "Setup was so easy and the analytics help me understand my audience better than ever.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-gray-800 bg-gradient-to-br from-gray-950/50 to-gray-900/50 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-purple-500 mb-4" />
                      <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                      <div className="flex items-center gap-3">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-white">{testimonial.name}</div>
                          <div className="text-sm text-gray-400">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section> */}
        <TestimonialsSection/>

        {/* Pricing Section */}
        <section id ="pricing" className="w-full py-24 md:py-32 bg-gradient-to-b from-gray-950 to-gray-900">
          <motion.div
            className="container mx-auto px-4 md:px-6 max-w-7xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-300">Choose the plan that fits your streaming needs</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "Free",
                  description: "Perfect for new streamers",
                  features: ["Up to 50 concurrent voters", "Basic song requests", "Community support"],
                  popular: false,
                },
                {
                  name: "Pro",
                  price: "$9.99",
                  period: "/month",
                  description: "For growing communities",
                  features: [
                    "Up to 500 concurrent voters",
                    "Advanced moderation",
                    "Custom branding",
                    "Priority support",
                  ],
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "$29.99",
                  period: "/month",
                  description: "For large streamers",
                  features: ["Unlimited voters", "White-label solution", "API access", "Dedicated support"],
                  popular: false,
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card
                    className={`h-full relative ${plan.popular ? "border-purple-500 bg-gradient-to-br from-purple-950/50 to-pink-950/50" : "border-gray-800 bg-gradient-to-br from-gray-950/50 to-gray-900/50"} backdrop-blur-sm`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-8 text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-400 mb-6">{plan.description}</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        {plan.period && <span className="text-gray-400">{plan.period}</span>}
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${plan.popular ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" : "bg-gray-800 hover:bg-gray-700"} text-white border-0`}
                        size="lg"
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="w-full py-24 md:py-32 bg-gradient-to-br from-gray-950 via-purple-950/30 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
          </div>

          <motion.div
            className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="relative border-gray-800 bg-gradient-to-br from-gray-950/80 to-gray-900/80 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10" />
              <CardContent className="relative p-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                    Ready to Transform Your Streams?
                  </h2>
                  <p className="max-w-[700px] mx-auto text-xl text-gray-300 mb-8">
                    Join thousands of creators who are engaging their audience through the power of music. Start your
                    free trial today and see the difference.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 backdrop-blur-sm"
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 font-semibold shadow-2xl shadow-purple-500/25"
                        size="lg"
                      >
                        Start Free Trial
                      </Button>
                    </motion.div>
                  </div>

                  <p className="text-sm text-gray-400">No credit card required • 14-day free trial • Cancel anytime</p>

                  <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-gray-800">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-300">SSL Secured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm text-gray-300">Instant Setup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-sm text-gray-300">24/7 Support</span>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
