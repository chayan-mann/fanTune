"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Headphones, Music, Users, Play, Radio, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Appbar } from "@/app/components/Appbar"

export default function MusicStreamingLanding() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Add dark class to html element for dark mode
    document.documentElement.classList.add("dark");
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground dark:bg-gray-950 dark:text-gray-100">
      {/* Appbar now handles navigation & authentication buttons */}
      <Appbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center h-full">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Let Your Fans Choose Your Stream's Music
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                    FanTune connects creators with their audience through music. Let your fans vote on songs and
                    influence your stream's soundtrack in real-time.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="gap-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-1 border-gray-700 hover:bg-gray-800 hover:text-purple-400"
                    >
                      Learn More <Play className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 blur-xl"></div>
                <Image
                  src="/images/image.png"
                  width={550}
                  height={550}
                  alt="Music streaming interface showing fan interaction"
                  className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last border border-gray-800 bg-gray-900"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-sm text-white">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Engage Your Audience Through Music
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-800 bg-gray-950/50 p-6 backdrop-blur-sm">
                <div className="rounded-full bg-purple-500/10 p-3">
                  <Music className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Fan Song Requests</h3>
                <p className="text-center text-gray-400">
                  Let your fans submit and vote on song requests in real-time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-800 bg-gray-950/50 p-6 backdrop-blur-sm">
                <div className="rounded-full bg-pink-500/10 p-3">
                  <Users className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Community Voting</h3>
                <p className="text-center text-gray-400">Democratic music selection with an upvoting system.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-800 bg-gray-950/50 p-6 backdrop-blur-sm">
                <div className="rounded-full bg-purple-500/10 p-3">
                  <Headphones className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Seamless Integration</h3>
                <p className="text-center text-gray-400">
                  Works with major streaming platforms and broadcasting software.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="relative rounded-2xl border border-gray-800 bg-gray-950/50 p-8 backdrop-blur-sm overflow-hidden">
              <div className="relative flex flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                  Ready to Transform Your Streams?
                </h2>
                <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed">
                  Join creators who are engaging their audience through the power of music.
                </p>
                <div className="mx-auto w-full max-w-sm space-y-2">
                  <form className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="max-w-lg flex-1 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                    />
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                      Get Started
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500">No credit card required. Start with our free plan today.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
