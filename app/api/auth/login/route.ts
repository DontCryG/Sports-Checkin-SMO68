import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const supabase = await createServerClient()

    // Query the users table directly
    const { data: users, error } = await supabase.from("users").select("*").eq("email", email).limit(1)

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
