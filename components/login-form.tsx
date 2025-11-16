"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, X } from "lucide-react"
import Image from "next/image"

interface LoginFormProps {
  onLogin: (email: string, password: string) => void
  onCancel?: () => void
}

export function LoginForm({ onLogin, onCancel }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      onLogin(email, password)
    } catch (err) {
      setError("เกิดข้อผิดพลาด")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />

      <Card className="relative w-full max-w-md border-border/50 bg-card/95 backdrop-blur">
        {onCancel && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <Image
              src="/logo-login.png"
              alt="Throne of the Diamond Logo"
              width={300}
              height={300}
              className="h-auto w-56 sm:w-64 md:w-72"
              priority
            />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">เข้าสู่ระบบ</CardTitle>
          <CardDescription className="text-sm sm:text-base text-muted-foreground">ระบบเช็คชื่อกีฬา</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground text-sm sm:text-base">
                อีเมล
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="กรอกอีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground text-sm sm:text-base">
                รหัสผ่าน
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>
            {error && <div className="rounded-md bg-destructive/10 p-2 text-sm text-destructive">{error}</div>}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
            >
              <LogIn className="mr-2 h-4 w-4" />
              เข้าสู่ระบบ
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
