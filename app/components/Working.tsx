"use client"

import { motion } from "framer-motion";
import {Users, Radio, Heart, ArrowRight } from "lucide-react"


export default function Working(){
    return(
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
    )
}