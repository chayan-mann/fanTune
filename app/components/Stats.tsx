"use client"

import React from "react";
import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"


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

export default function StatsSection(){
    return(
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
    )
}