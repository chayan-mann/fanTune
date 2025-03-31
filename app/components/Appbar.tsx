"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";

export function Appbar() {
    const session = useSession();

    return (
        <div className="sticky top-0 z-40 w-full border-b border-gray-800 bg-background/95 backdrop-blur dark:bg-gray-950/90">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <div className="flex gap-2 items-center text-xl font-bold">
                    <Radio className="h-6 w-6 text-purple-500" />
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        FanTune
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="#features" className="transition-colors hover:text-purple-400">
                        Features
                    </Link>
                    <Link href="#pricing" className="transition-colors hover:text-purple-400">
                        Pricing
                    </Link>
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-2">
                    {session.data?.user ? (
                        <Button
                            variant="outline"
                            className="border-gray-700 hover:bg-gray-800 hover:text-purple-400"
                            onClick={() => signOut()}
                        >
                            Log out
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                className="border-gray-700 hover:bg-gray-800 hover:text-purple-400"
                                onClick={() => signIn()}
                            >
                                Log in
                            </Button>
                            {/* <Link href="/signup">
                                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                                    Sign up
                                </Button>
                            </Link> */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
