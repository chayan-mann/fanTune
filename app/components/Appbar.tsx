"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function Appbar() {
    const { data: session } = useSession();

    return (
        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-20 py-4">
            <div className="text-lg font-bold text-white">
                FanTune
            </div>
            <div>
                {session?.user ? (
                    <Button 
                        className="bg-purple-600 text-white hover:bg-purple-700" 
                        onClick={() => signOut()}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button 
                        className="bg-purple-600 text-white hover:bg-purple-700" 
                        onClick={() => signIn()}
                    >
                        Log in
                    </Button>
                )}
            </div>
        </div>
    );
}
