import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { prismaClient } from "@/app/lib/db";

export async function GET(req: NextRequest) {
    // 1. Get the session, which includes the user's database ID
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({
            message: "Unauthenticated"
        }, {
            status: 403
        });
    }

    const streams = await prismaClient.stream.findMany({
        where: {
            userId: userId 
        },
        include: {
            _count: {
                select: {
                    upvotes: true
                }
            },
            upvotes: {
                where: {
                    userId: userId 
                }
            }
        }
    });

    return NextResponse.json({
        streams: streams.map(({ _count, ...rest }) => ({
            ...rest,
            upvotes: _count.upvotes,
            haveUpvoted: rest.upvotes.length > 0 
        }))
    });
}