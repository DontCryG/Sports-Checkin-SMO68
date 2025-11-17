"use server"

import { createServerClient } from "@/lib/supabase/server"
import bcrypt from "bcryptjs"

export async function loginUser(email: string, password: string) {
  try {
    const supabase = await createServerClient()

    // Query the users table directly
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1)

    if (error) {
      console.error("[v0] Database error:", error.message)
      return { success: false, message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" }
    }

    if (!users || users.length === 0) {
      return { success: false, message: "ไม่พบบัญชีผู้ใช้" }
    }

    const user = users[0]

    // Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    
    if (!isPasswordValid) {
      return { success: false, message: "รหัสผ่านไม่ถูกต้อง" }
    }

    // Return user data without sensitive fields
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || "user",
      },
    }
  } catch (error) {
    console.error("[v0] Login error:", error)
    return { success: false, message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" }
  }
}
