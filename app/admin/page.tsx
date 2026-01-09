"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getFullSportsData } from "@/lib/actions/sports"
import type { FullSportsData } from "@/lib/types"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)
  const [sportsData, setSportsData] = useState<FullSportsData>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("sportsCheckInUser")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.role === "admin") {
        setUser(userData)
        // Load sports data
        getFullSportsData().then((data) => {
          setSportsData(data)
          setIsLoading(false)
        })
      } else {
        // Not admin, redirect to home
        router.push("/")
      }
    } else {
      // Not logged in, redirect to home
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("sportsCheckInUser")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">กำลังโหลด...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} onLogout={handleLogout} />
      <main className="flex-1 bg-background">
        <AdminDashboard sportsData={sportsData} />
      </main>
      <Footer />
    </div>
  )
}
