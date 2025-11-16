"use client"

import { useState, useEffect } from "react"
import { SportsCheckInDb } from "@/components/sports-check-in-db"
import { LoginForm } from "@/components/login-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Sport } from "@/lib/types"

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
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse saved user:", error)
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

      if (response.ok) {
        const data = await response.json()
        const userData = { name: data.user.name, role: data.user.role }
        setUser(userData)
        localStorage.setItem("sportsCheckInUser", JSON.stringify(userData))
        setShowLoginForm(false)
      } else {
        alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ")
    }
  }

  const handleLogout = () => {
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
        <SportsCheckInDb initialData={sportsData} isReadOnly={!user} />
      </main>
      <Footer />
    </div>
  )
}
