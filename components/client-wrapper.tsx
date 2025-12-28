"use client"

import { useState, useEffect } from "react"
import { SportsCheckInDb } from "@/components/sports-check-in-db"
import { LoginForm } from "@/components/login-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Sport } from "@/lib/types"

const SESSION_EXPIRATION_MS = 24 * 60 * 60 * 1000

interface UserData {
  name: string
  role: string
  expiresAt: number
}

interface ClientWrapperProps {
  sportsData: Sport[]
}

export function ClientWrapper({ sportsData }: ClientWrapperProps) {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("sportsCheckInUser")
    if (savedUser) {
      try {
        const userData: UserData = JSON.parse(savedUser)
        if (userData.expiresAt && userData.expiresAt > Date.now()) {
          setUser({ name: userData.name, role: userData.role })
        } else {
          // Session expired, remove it
          localStorage.removeItem("sportsCheckInUser")
        }
      } catch (error) {
        localStorage.removeItem("sportsCheckInUser")
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.user) {
        const userData: UserData = {
          name: data.user.name,
          role: data.user.role,
          expiresAt: Date.now() + SESSION_EXPIRATION_MS,
        }
        setUser({ name: userData.name, role: userData.role })
        localStorage.setItem("sportsCheckInUser", JSON.stringify(userData))
        setShowLoginForm(false)
      } else {
        alert(data.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง")
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ")
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch {
      // Continue with local logout even if server call fails
    }
    setUser(null)
    localStorage.removeItem("sportsCheckInUser")
    setShowLoginForm(true)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">กำลังโหลด...</div>
      </div>
    )
  }

  if (showLoginForm) {
    return <LoginForm onLogin={handleLogin} onCancel={() => setShowLoginForm(false)} />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} onLogout={handleLogout} onLoginClick={() => setShowLoginForm(true)} />
      <main className="flex-1 bg-background">
        <SportsCheckInDb initialData={sportsData} isReadOnly={!user} userRole={user?.role} />
      </main>
      <Footer />
    </div>
  )
}
