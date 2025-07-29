"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export function Appbar() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleWatchQueueClick = () => {
        if (session?.user) {
            router.push("/dashboard");
        } else {
            signIn();
        }
    };

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            {/* The main container is now a single centered flexbox with a smaller gap */}
            <div className="flex items-center justify-center gap-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white">
                
                {/* Logo */}
                <Link href='/' className="text-xl sm:text-2xl font-extrabold whitespace-nowrap bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text flex items-center gap-1 sm:gap-2">
                    <span className="text-2xl sm:text-3xl">♪</span>
                    FanTune
                </Link>

                {/* Nav Links - hidden on smaller screens to save space */}
                <div className="hidden sm:flex items-center gap-4">
                    <a href="#features" className="text-sm text-white hover:text-purple-300 transition-colors">
                        Features
                    </a>
                    <a href="#pricing" className="text-sm text-white hover:text-purple-300 transition-colors">
                        Pricing
                    </a>
                </div>

                {/* Buttons */}
                <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm"
                    onClick={handleWatchQueueClick}
                >
                    Youtube Watch
                </Button>

                {session?.user ? (
                    <Button
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm"
                        onClick={() => signOut()}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm"
                        onClick={() => signIn()}
                    >
                        Log in
                    </Button>
                )}
            </div>
        </div>
    );
}
