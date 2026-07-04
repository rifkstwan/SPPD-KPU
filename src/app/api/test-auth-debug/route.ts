import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const results: any = {
    database: "unknown",
    bcrypt: "unknown",
    env: {
      has_auth_secret: !!process.env.AUTH_SECRET,
      has_database_url: !!process.env.DATABASE_URL,
      node_env: process.env.NODE_ENV,
    }
  }

  // 1. Test Database
  try {
    const user = await prisma.user.findUnique({
      where: { email: "pegawai@kpu.go.id" }
    })
    results.database = {
      status: "success",
      userFound: !!user,
      userName: user?.nama,
    }
  } catch (err: any) {
    results.database = {
      status: "error",
      message: err.message,
      stack: err.stack,
    }
  }

  // 2. Test bcrypt
  try {
    const hash = await bcrypt.hash("password123", 10)
    const isValid = await bcrypt.compare("password123", hash)
    results.bcrypt = {
      status: "success",
      isValid,
    }
  } catch (err: any) {
    results.bcrypt = {
      status: "error",
      message: err.message,
      stack: err.stack,
    }
  }

  return NextResponse.json(results)
}
