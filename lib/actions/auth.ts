"use server"

import { createServerClient } from "@/lib/supabase/server"

export async function loginUser(email: string, password: string) {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("[v0] Auth error:", error.message)
      return { success: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }
    }

    if (!data.user) {
      return { success: false, message: "ไม่สามารถเข้าสู่ระบบได้" }
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || data.user.email?.split("@")[0] || "User",
        role: data.user.user_metadata?.role || "user",
      },
    }
  } catch (error) {
    console.error("[v0] Login error:", error)
    return { success: false, message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" }
  }
}
