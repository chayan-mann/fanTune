import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
import { YT_REGEX } from "@/app/lib/utils";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";
const CreateStreamSchema = z.object({
    creatorId : z.string(),
    url : z.string()
})

export async function POST(req: NextRequest) {
    try{
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = data.url.match(YT_REGEX);
        if(!isYt) {
            return NextResponse.json({
                message : "Wrong URL format"
            }, {
                status: 411
            })
        }

        const extractedId = data.url.split("?v=")[1];
        const res = await youtubesearchapi.GetVideoDetails(extractedId);
        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: {width:number}, b:{width:number}) => a.width < b.width ? -1: 1);

        const stream = await prismaClient.stream.create({
            data :{
                userId: data.creatorId,
                url : data.url,
                extractedId,
                type : "Youtube",
                title: res.title ?? "Can't find video",
                smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url) ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
        bigImg:
          thumbnails[thumbnails.length - 1].url ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg"
            }
        });

        return NextResponse.json({
            ...stream,
            hasUpvoted: false,
            upvotes: 0
        })
    } catch(e) {
        console.log(e);
        return NextResponse.json({
            message : "Error while adding a stream"
        }, {
            status: 411
        })
    }
}

export async function GET(req: NextRequest){
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const session = await getServerSession();
        
    const user = await prismaClient.user.findFirst({
        where: {
            email : session?.user?.email ?? ""
        }
    });
    
    if(!user){
        return NextResponse.json({
            message : "Unauthenticated"
        }, {
            status : 403
        })
    }

    if(!creatorId){
        return NextResponse.json({
            message : "Error"
        }, {
            status : 411
        })
    }

    const streams = await prismaClient.stream.findMany({
        where: {
            userId : creatorId
        },
        include: {
            _count: {
                select: {
                    upvotes: true
                }
            },
            upvotes: {
                where : {
                    userId : user.id
                }
            }
        }
    })

    return NextResponse.json({
        streams: streams.map(({_count, ...rest})=>({
            ...rest,
            upvotes: _count.upvotes,
            haveUpvoted : rest.upvotes.length ? true: false
        }))
    })

}
