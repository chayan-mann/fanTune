"use client"

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Shield, Heart} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function CTA(){
    return(
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
    )
}