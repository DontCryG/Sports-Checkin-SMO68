import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const supabase = await createServerClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 })
    }

    if (!data.user) {
      return NextResponse.json({ error: "ไม่สามารถเข้าสู่ระบบได้" }, { status: 401 })
    }

    return NextResponse.json({
      user: {
        id: data.user.id,
        name: data.user.user_metadata?.name || data.user.email?.split("@")[0] || "User",
        email: data.user.email,
        role: data.user.user_metadata?.role || "user",
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" }, { status: 500 })
  }
}
