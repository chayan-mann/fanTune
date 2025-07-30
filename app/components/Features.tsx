"use client"

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Users, Headphones, Zap, Shield, TrendingUp } from "lucide-react";
import Image from "next/image"; // ✅ Add this import

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  image: string;
};

const features: Feature[] = [
  {
    icon: Music,
    title: "Fan Song Requests",
    description: "Let your fans submit and vote on song requests in real-time with smart filtering.",
    color: "purple",
    image: "/images/fan-request.jpg"
  },
  {
    icon: Users,
    title: "Community Voting",
    description: "Democratic music selection with an advanced upvoting system and queue management.",
    color: "pink",
    image: "/images/landing-page.jpg"
  },
  {
    icon: Headphones,
    title: "Seamless Integration",
    description: "Works with major streaming platforms and broadcasting software out of the box.",
    color: "purple",
    image: "/images/spotify-yt.avif"
  },
  {
    icon : Zap,
    title : "Real-time Updates",
    description: "Instant synchronization across all devices with lightning-fast response times.",
    color : "yellow",
    image : "/images/realtime.jpg"
  },
  {
    icon: Shield,
    title: "Content Moderation",
    description: "Advanced AI-powered content filtering to keep your stream family-friendly.",
    color: "green",
    image: "/images/ai.jpg"
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Detailed insights into your audience preferences and engagement metrics.",
    color: "white",
    image: "/images/data.png"
  },
];

interface SmallFeatureCardProps {
  feature: Feature;
  index: number;
}

const SmallFeatureCard = ({ feature, index }: SmallFeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="w-full h-full"
  >
    <Card className="h-full border-gray-800 bg-black hover:border-purple-500/50 transition-all duration-300 overflow-hidden group">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-center tracking-tight text-white">{feature.title}</h3>
          <p className="text-gray-400 text-center leading-relaxed">{feature.description}</p>
        </div>
        <div className="mt-4 relative h-40 md:h-48 lg:h-56 rounded-lg bg-gray-900/50 overflow-hidden">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function FeaturesSection() {
  return (
    // Add a font-sans class if you have a font like Inter configured in tailwind.config.js
    <section id="features" className="w-full py-24 md:py-32 bg-black relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-black to-black" />
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Map over all six features to render them in the grid */}
          {features.map((feature, index) => (
            <SmallFeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

