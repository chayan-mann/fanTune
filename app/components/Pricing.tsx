"use client"

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react";

export default function Pricing() {
    return(
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
                  price: "₹999",
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
                  price: "₹1999",
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
                        Let&apos;s Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
    )
}