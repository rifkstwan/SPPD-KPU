import { cmsHandlers } from "@/lib/auth-cms"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    return await cmsHandlers.GET(req)
  } catch (err: any) {
    console.error("NextAuth CMS GET error:", err)
    return new NextResponse(
      JSON.stringify({ error: err.message, stack: err.stack }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    return await cmsHandlers.POST(req)
  } catch (err: any) {
    console.error("NextAuth CMS POST error:", err)
    return new NextResponse(
      JSON.stringify({ error: err.message, stack: err.stack }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
