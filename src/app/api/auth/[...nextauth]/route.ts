import { handlers } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    return await handlers.GET(req)
  } catch (err: any) {
    console.error("NextAuth GET error:", err)
    return new NextResponse(
      JSON.stringify({ error: err.message, stack: err.stack }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handlers.POST(req)
  } catch (err: any) {
    console.error("NextAuth POST error:", err)
    return new NextResponse(
      JSON.stringify({ error: err.message, stack: err.stack }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}