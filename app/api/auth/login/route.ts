import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

const SESSION_EXPIRATION_MS = 24 * 60 * 60 * 1000

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "กรุณากรอกอีเมลและรหัสผ่าน" }, { status: 400 })
    }

    const supabase = await createServerClient()

    // Query the users table directly
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .limit(1)

    if (error) {
      return NextResponse.json({ error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" }, { status: 500 })
    }

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "ไม่พบบัญชีผู้ใช้" }, { status: 401 })
    }

    const user = users[0]

    // Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 })
    }

    const sessionData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || "user",
      expiresAt: Date.now() + SESSION_EXPIRATION_MS,
    }

    const cookieStore = await cookies()
    cookieStore.set("session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_EXPIRATION_MS / 1000,
      path: "/",
    })

    // Return user data without sensitive fields
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" }, { status: 500 })
  }
}
