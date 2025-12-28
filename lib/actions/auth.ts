"use server"

import { createServerClient } from "@/lib/supabase/server"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

const SESSION_EXPIRATION_MS = 24 * 60 * 60 * 1000

export async function loginUser(email: string, password: string) {
  try {
    if (!email || !password) {
      return { success: false, message: "กรุณากรอกอีเมลและรหัสผ่าน" }
    }

    if (!email.includes("@")) {
      return { success: false, message: "รูปแบบอีเมลไม่ถูกต้อง" }
    }

    const supabase = await createServerClient()

    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .limit(1)

    if (error) {
      return { success: false, message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" }
    }

    if (!users || users.length === 0) {
      return { success: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }
    }

    const user = users[0]

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      return { success: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }
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
    return { success: false, message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" }
  }
}

export async function verifyAdminSession(): Promise<{ isAdmin: boolean; userId?: string }> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie?.value) {
      return { isAdmin: false }
    }

    const session = JSON.parse(sessionCookie.value)

    // Check expiration
    if (session.expiresAt < Date.now()) {
      cookieStore.delete("session")
      return { isAdmin: false }
    }

    return { isAdmin: session.role === "admin", userId: session.id }
  } catch {
    return { isAdmin: false }
  }
}

export async function getCurrentSession() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie?.value) {
      return null
    }

    const session = JSON.parse(sessionCookie.value)

    // Check expiration
    if (session.expiresAt < Date.now()) {
      cookieStore.delete("session")
      return null
    }

    return {
      id: session.id,
      email: session.email,
      name: session.name,
      role: session.role,
    }
  } catch {
    return null
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  return { success: true }
}
