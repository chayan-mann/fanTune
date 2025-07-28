"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Gamepad2, Music, Mic, Sparkles, Headphones } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Gaming Streamer",
    icon: Gamepad2,
    content: "FanTune completely transformed my streams. My viewers are 10x more engaged now!",
    rating: 4,
  },
  {
    name: "Sarah Johnson",
    role: "Music Producer",
    icon: Music,
    content: "The real-time voting system is incredible. My fans love being part of the music selection.",
    rating: 5,
  },
  {
    name: "Luna Nightingale",
    role: "VTuber",
    icon: Sparkles,
    content: "FanTune is magical! It lets my community feel like they're truly part of the world we're building together. The interactive polls are seamless and so much fun.",
    rating: 5,
  },
  {
    name: "Ben Carter",
    role: "DJ & Live Set Streamer",
    icon: Headphones,
    content: "Managing song requests during a live set was always chaotic. FanTune automates it perfectly. My fans have become the best A&R team I could ask for!",
    rating: 5,
  },
  {
    name: "Mike Rodriguez",
    role: "Content Creator",
    icon: Mic,
    content: "Setup was so easy and the analytics help me understand my audience better than ever.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  // RECOMMENDATION: With 5 items, start with index 2 to have it centered on load.
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section className="w-full py-24 md:py-32 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Loved by Creators
          </h2>
          <p className="text-xl text-gray-300">
            See what top streamers are saying about FanTune
          </p>
        </div>

        <div className="relative h-[400px] md:h-[350px] max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => {
            const IconComponent = testimonial.icon;
            
            // THE FIX IS HERE: We define boolean flags for clarity
            const isCenter = index === activeIndex;
            const isLeft = index === (activeIndex - 1 + testimonials.length) % testimonials.length;
            const isRight = index === (activeIndex + 1) % testimonials.length;

            return (
              <motion.div
                key={index}
                className="absolute w-full max-w-lg cursor-pointer"
                style={{ top: 0, left: '50%' }}
                onClick={() => setActiveIndex(index)}
                initial={{ x: '-50%', opacity: 0 }}
                animate={{
                  x: isCenter ? '-50%' : isLeft ? '-100%' : isRight ? '0%' : '-50%',
                  scale: isCenter ? 1 : 0.8,
                  opacity: isCenter ? 1 : (isLeft || isRight) ? 0.4 : 0, // Other cards are now invisible
                  zIndex: isCenter ? 3 : (isLeft || isRight) ? 2 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="h-full border-gray-800 bg-gradient-to-br bg-white to-gray-900/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-purple-500 mb-4" />
                    <p className="text-black mb-6 italic">
                      {`"${testimonial.content}"`}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20">
                        <IconComponent className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-black">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-black">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}