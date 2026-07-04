import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const envData = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "not set",
    AUTH_URL: process.env.AUTH_URL || "not set",
    APP_URL: process.env.APP_URL || "not set",
    VERCEL_URL: process.env.VERCEL_URL || "not set",
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL || "not set",
    headers: {
      host: req.headers.get("host"),
      x_forwarded_host: req.headers.get("x-forwarded-host"),
      x_forwarded_proto: req.headers.get("x-forwarded-proto"),
    }
  }

  return NextResponse.json(envData)
}
