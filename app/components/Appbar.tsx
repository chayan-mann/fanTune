"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from 'next/link'

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
            <div className="flex items-center gap-6 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white">
            
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-extrabold whitespace-nowrap bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text flex items-center gap-2">
                        <span className="text-3xl">♪</span>
                        <Link href='/'>
                            FanTune
                        </Link>
                    </div>
                    <a href="#features" className="text-white hover:text-green-500">
                        Features
                    </a>
                    <a href="#pricing" className="text-white hover:text-green-500">
                        Pricing
                    </a>
                </div>

                {/* Center: Watch Queue */}
                <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
                    onClick={handleWatchQueueClick}
                >
                    Youtube Watch
                </Button>

                {/* Right: Auth */}
                {session?.user ? (
                    <Button
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
                        onClick={() => signOut()}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
                        onClick={() => signIn()}
                    >
                        Log in
                    </Button>
                )}
            </div>
        </div>
    );
}

