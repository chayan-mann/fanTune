import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Basic health check
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: "Health check failed",
      },
      { status: 500 }
    );
  }
}
