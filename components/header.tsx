"use client"

import { LogOut, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeaderProps {
  user?: {
    name: string
    role: string
  } | null
  onLogout?: () => void
  onLoginClick?: () => void
}

export function Header({ user, onLogout, onLoginClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative h-8 w-8 md:h-10 md:w-10">
            <Image src="/logo.png" alt="Throne of the Diamond Logo" width={40} height={40} className="object-contain" />
          </div>
          <div>
            <h1 className="text-sm md:text-lg font-bold text-foreground">ระบบเช็คชื่อกีฬา</h1>
            <p className="hidden sm:block text-xs text-muted-foreground">Sports Check-in System</p>
          </div>
        </div>

        {user ? (
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <User className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
            </div>
            <div className="flex sm:hidden items-center justify-center rounded-lg bg-muted/50 p-2">
              <User className="h-5 w-5 text-primary" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline ml-2">ออกจากระบบ</span>
            </Button>
          </div>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={onLoginClick}
            className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
          >
            <LogIn className="h-4 w-4" />
            <span className="ml-2">เข้าสู่ระบบ</span>
          </Button>
        )}
      </div>
    </header>
  )
}
