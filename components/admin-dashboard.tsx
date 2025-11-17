"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Calendar, Clock, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createSchedule, deleteSchedule, getFullSportsData } from "@/lib/actions/sports"
import type { FullSportsData } from "@/lib/types"
import Link from "next/link"

interface AdminDashboardProps {
  sportsData: FullSportsData
}

export function AdminDashboard({ sportsData: initialSportsData }: AdminDashboardProps) {
  const [sports, setSports] = useState<FullSportsData>(initialSportsData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [selectedSportId, setSelectedSportId] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  useEffect(() => {
    setSports(initialSportsData)
  }, [initialSportsData])

  const handleAddSchedule = async () => {
    if (!selectedCategoryId || !date || !time) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน")
      return
    }

    setIsLoading(true)
    try {
      const result = await createSchedule(selectedCategoryId, date, time)
      if (result.success) {
        alert("เพิ่มวันซ้อมสำเร็จ!")
        setIsAddDialogOpen(false)
        setSelectedSportId("")
        setSelectedCategoryId("")
        setDate("")
        setTime("")
        loadSports()
      } else {
        alert(result.error || "เกิดข้อผิดพลาด")
      }
    } catch (error) {
      console.error("Error adding schedule:", error)
      alert("เกิดข้อผิดพลาดในการเพิ่มวันซ้อม")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบวันซ้อมนี้? นักกีฬาทั้งหมดในวันนี้จะถูกลบด้วย")) return

    setIsLoading(true)
    try {
      const result = await deleteSchedule(scheduleId)
      if (result.success) {
        alert("ลบวันซ้อมสำเร็จ!")
        loadSports()
      } else {
        alert(result.error || "เกิดข้อผิดพลาด")
      }
    } catch (error) {
      console.error("Error deleting schedule:", error)
      alert("เกิดข้อผิดพลาดในการลบวันซ้อม")
    } finally {
      setIsLoading(false)
    }
  }

  const selectedCategories = sports.find((s) => s.id === selectedSportId)?.categories || []

  const loadSports = async () => {
    const data = await getFullSportsData()
    setSports(data)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">จัดการวันและเดือนสำหรับฝึกซ้อม</p>
        </div>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            กลับหน้าหลัก
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              เพิ่มวันซ้อมใหม่
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>เพิ่มวันซ้อมใหม่</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>ประเภทกีฬา</Label>
                <Select value={selectedSportId} onValueChange={setSelectedSportId}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภทกีฬา" />
                  </SelectTrigger>
                  <SelectContent>
                    {sports.map((sport) => (
                      <SelectItem key={sport.id} value={sport.id}>
                        {sport.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>หมวดหมู่</Label>
                <Select
                  value={selectedCategoryId}
                  onValueChange={setSelectedCategoryId}
                  disabled={!selectedSportId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกหมวดหมู่" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} - {category.subcategory}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>วันที่</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>เวลา (เช่น 18:00-20:00)</Label>
                <Input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="18:00-20:00"
                />
              </div>

              <Button onClick={handleAddSchedule} disabled={isLoading} className="w-full">
                {isLoading ? "กำลังเพิ่ม..." : "เพิ่มวันซ้อม"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {sports.map((sport) => (
          <Card key={sport.id}>
            <CardHeader>
              <CardTitle>{sport.name}</CardTitle>
              <CardDescription>จัดการตารางซ้อม</CardDescription>
            </CardHeader>
            <CardContent>
              {sport.categories?.map((category) => (
                <div key={category.id} className="mb-6 last:mb-0">
                  <h3 className="font-semibold mb-3 text-base">
                    {category.name} - {category.subcategory}
                  </h3>
                  <div className="grid gap-2">
                    {category.schedules?.length ? (
                      category.schedules.map((schedule) => (
                        <div
                          key={schedule.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">
                                {schedule.day_of_week} - {schedule.date}
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {schedule.time}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                นักกีฬา: {schedule.athletes?.length || 0} คน
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSchedule(schedule.id)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">ยังไม่มีตารางซ้อม</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
