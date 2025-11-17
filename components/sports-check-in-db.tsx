"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Circle, Users, Trophy, Calendar, ChevronRight, Eye, Search, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExportButtons } from "@/components/export-buttons"
import { AthleteManager, DeleteAthleteDialog } from "@/components/athlete-manager"
import { toggleAthleteCheckIn } from "@/lib/actions/sports"
import type { Sport, Athlete } from "@/lib/types"

interface SportsCheckInDbProps {
  initialData: Sport[]
  isReadOnly?: boolean
}

export function SportsCheckInDb({ initialData, isReadOnly = false }: SportsCheckInDbProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedMainSport, setSelectedMainSport] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null)
  const [sports, setSports] = useState<Sport[]>(initialData)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const sortSchedulesByDayOfWeek = (schedules: any[]) => {
    const dayOrder: Record<string, number> = {
      'จันทร์': 1,
      'อังคาร': 2,
      'พุธ': 3,
      'พฤหัสบดี': 4,
      'ศุกร์': 5,
      'เสาร์': 6,
      'อาทิตย์': 7,
    }
    
    return [...schedules].sort((a, b) => {
      const orderA = dayOrder[a.day_of_week] || 999
      const orderB = dayOrder[b.day_of_week] || 999
      return orderA - orderB
    })
  }

  useEffect(() => {
    const sport = searchParams.get("sport")
    const category = searchParams.get("category")
    const month = searchParams.get("month")
    const schedule = searchParams.get("schedule")

    if (sport) setSelectedMainSport(sport)
    if (category) setSelectedCategory(category)
    if (month) setSelectedMonth(month)
    if (schedule) setSelectedScheduleId(schedule)
  }, [searchParams])

  const updateURL = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.push(`?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    setSports(initialData)
  }, [initialData])

  const handleToggleCheckIn = async (athleteId: string, currentStatus: boolean) => {
    if (isReadOnly) return

    setIsUpdating(athleteId)

    setSports((prevSports) =>
      prevSports.map((sport) => ({
        ...sport,
        categories: sport.categories?.map((category) => ({
          ...category,
          schedules: category.schedules?.map((schedule) => ({
            ...schedule,
            athletes: schedule.athletes?.map((athlete) =>
              athlete.id === athleteId ? { ...athlete, checked_in: !currentStatus } : athlete,
            ),
          })),
        })),
      })),
    )

    try {
      await toggleAthleteCheckIn(athleteId, !currentStatus)
    } catch (error) {
      console.error("[v0] Failed to toggle check-in:", error)
      setSports((prevSports) =>
        prevSports.map((sport) => ({
          ...sport,
          categories: sport.categories?.map((category) => ({
            ...category,
            schedules: category.schedules?.map((schedule) => ({
              ...schedule,
              athletes: schedule.athletes?.map((athlete) =>
                athlete.id === athleteId ? { ...athlete, checked_in: currentStatus } : athlete,
              ),
            })),
          })),
        })),
      )
    } finally {
      setIsUpdating(null)
    }
  }

  const refreshAthletes = async () => {
    if (!selectedScheduleId) return

    try {
      const { getFullSportsData } = await import("@/lib/actions/sports")
      const updatedData = await getFullSportsData()
      setSports(updatedData)
    } catch (error) {
      console.error("[v0] Error refreshing athletes:", error)
    }
  }

  const totalCategories = sports.reduce((acc, sport) => acc + (sport.categories?.length || 0), 0)
  const totalAthletes = sports.reduce(
    (acc, sport) =>
      acc + (sport.categories?.reduce((sum, cat) => {
        return sum + (cat.schedules?.reduce((scheduleSum, schedule) => scheduleSum + (schedule.athletes?.length || 0), 0) || 0)
      }, 0) || 0),
    0,
  )

  const currentCategory = sports.flatMap((s) => s.categories || []).find((c) => c.id === selectedCategory)

  const availableMonths = currentCategory
    ? Array.from(new Set(currentCategory.schedules?.map((s) => s.month) || []))
        .map((month) => {
          const schedule = currentCategory.schedules?.find((s) => s.month === month)
          return { month, monthName: schedule?.month_name || "" }
        })
    : []

  const getMonthDayOrder = (month: string) => {
    const monthSchedules = currentCategory?.schedules?.filter((s) => s.month === month) || []
    if (monthSchedules.length === 0) return 999
    
    const dayOrder: Record<string, number> = {
      'จันทร์': 1,
      'อังคาร': 2,
      'พุธ': 3,
      'พฤหัสบดี': 4,
      'ศุกร์': 5,
      'เสาร์': 6,
      'อาทิตย์': 7,
    }
    
    const minOrder = Math.min(...monthSchedules.map(s => dayOrder[s.day_of_week] || 999))
    return minOrder
  }

  const sortedAvailableMonths = [...availableMonths].sort((a, b) => {
    const orderA = getMonthDayOrder(a.month)
    const orderB = getMonthDayOrder(b.month)
    if (orderA !== orderB) return orderA - orderB
    return a.month.localeCompare(b.month)
  })

  const monthSchedules = currentCategory && selectedMonth 
    ? sortSchedulesByDayOfWeek(currentCategory.schedules?.filter((s) => s.month === selectedMonth) || [])
    : []

  const currentSchedule = currentCategory?.schedules?.find((s) => s.id === selectedScheduleId)

  const checkedInCount = currentSchedule?.athletes?.filter((a) => a.checked_in).length || 0
  const totalCount = currentSchedule?.athletes?.length || 0

  const athletesByFaculty = currentSchedule
    ? (currentSchedule.athletes || []).reduce(
        (acc, athlete) => {
          if (!acc[athlete.faculty]) {
            acc[athlete.faculty] = []
          }
          acc[athlete.faculty].push(athlete)
          return acc
        },
        {} as Record<string, Athlete[]>,
      )
    : {}

  const filteredAthletesByFaculty = Object.keys(athletesByFaculty).reduce(
    (acc, faculty) => {
      const filteredAthletes = athletesByFaculty[faculty].filter((athlete) => {
        const query = searchQuery.toLowerCase().trim()
        if (!query) return true
        return (
          athlete.name.toLowerCase().includes(query) ||
          athlete.faculty.toLowerCase().includes(query) ||
          athlete.number.toLowerCase().includes(query)
        )
      })
      if (filteredAthletes.length > 0) {
        acc[faculty] = filteredAthletes
      }
      return acc
    },
    {} as Record<string, Athlete[]>,
  )

  const faculties = Object.keys(filteredAthletesByFaculty).sort()
  const hasSearchResults = faculties.length > 0
  const totalFilteredAthletes = faculties.reduce((sum, faculty) => sum + filteredAthletesByFaculty[faculty].length, 0)

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl font-bold text-balance bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            ระบบเช็คชื่อตารางกีฬา
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">ติดตามการเข้าร่วมฝึกซ้อมของนักกีฬาแต่ละประเภท</p>
        </div>

        {isReadOnly && (
          <Alert className="mb-4 sm:mb-6 border-primary/30 bg-primary/5">
            <Eye className="h-4 w-4" />
            <AlertDescription className="text-sm sm:text-base">
              คุณกำลังอยู่ในโหมดดูข้อมูลเท่านั้น กรุณาเข้าสู่ระบบเพื่อเช็คชื่อนักกีฬา
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-4 md:mb-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="rounded-xl bg-primary/20 p-2 sm:p-3">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">ประเภทกีฬา</p>
                <p className="text-xl sm:text-2xl font-bold text-card-foreground">{totalCategories}</p>
              </div>
            </div>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="rounded-xl bg-primary/20 p-2 sm:p-3">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">นักกีฬาทั้งหมด</p>
                <p className="text-xl sm:text-2xl font-bold text-card-foreground">{totalAthletes}</p>
              </div>
            </div>
          </Card>
        </div>

        {!selectedMainSport && (
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {sports.map((sport) => (
              <Card
                key={sport.id}
                className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer group"
                onClick={() => {
                  setSelectedMainSport(sport.id)
                  updateURL({ sport: sport.id, category: null, month: null, schedule: null })
                }}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="text-3xl sm:text-4xl md:text-5xl">{sport.icon}</div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-card-foreground">{sport.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {sport.categories?.length || 0} ประเภท
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {sport.categories?.map((cat) => (
                      <Badge key={cat.id} variant="secondary" className="text-xs">
                        {cat.subcategory}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedMainSport && !selectedCategory && (
          <div>
            <Button
              variant="ghost"
              className="mb-3 sm:mb-4 text-sm sm:text-base"
              onClick={() => {
                setSelectedMainSport(null)
                updateURL({ sport: null, category: null, month: null, schedule: null })
              }}
            >
              ← กลับไปเลือกกีฬา
            </Button>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
              {sports
                .find((s) => s.id === selectedMainSport)
                ?.categories?.map((category) => (
                  <Card
                    key={category.id}
                    className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer group"
                    onClick={() => {
                      setSelectedCategory(category.id)
                      setSelectedMonth(null)
                      setSelectedScheduleId(null)
                      updateURL({ category: category.id, month: null, schedule: null })
                    }}
                  >
                    <div className={`bg-gradient-to-r ${category.color} p-4 sm:p-6 rounded-t-xl`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="text-3xl sm:text-4xl">{category.icon}</div>
                          <div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                              {category.subcategory}
                            </h3>
                            <p className="text-xs sm:text-sm text-purple-100">{category.schedule_text}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <p className="text-xs sm:text-sm text-muted-foreground">ตารางฝึกซ้อม</p>
                        <p className="text-base sm:text-lg font-bold text-card-foreground">
                          {category.schedules?.length || 0} วัน
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {selectedCategory && !selectedMonth && currentCategory && (
          <div>
            <Button
              variant="ghost"
              className="mb-3 sm:mb-4 text-sm sm:text-base"
              onClick={() => {
                setSelectedCategory(null)
                setSelectedMonth(null)
                setSelectedScheduleId(null)
                updateURL({ category: null, month: null, schedule: null })
              }}
            >
              ← กลับไปเลือกประเภท
            </Button>
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm mb-4 sm:mb-6">
              <div className={`bg-gradient-to-r ${currentCategory.color} p-4 sm:p-6 rounded-t-xl`}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="text-3xl sm:text-4xl md:text-5xl">{currentCategory.icon}</div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      {currentCategory.name} - {currentCategory.subcategory}
                    </h2>
                    <p className="text-xs sm:text-sm text-purple-100">{currentCategory.schedule_text}</p>
                  </div>
                </div>
              </div>
            </Card>

            <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-3 sm:mb-4">เลือกเดือนที่ต้องการดูตาราง</h3>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {sortedAvailableMonths.map(({ month, monthName }) => {
                const monthScheduleCount = currentCategory.schedules?.filter((s) => s.month === month).length || 0
                const checkedInCount =
                  currentCategory.schedules
                    ?.filter((s) => s.month === month)
                    .reduce((sum, schedule) => sum + (schedule.athletes?.filter((a) => a.checked_in).length || 0), 0) ||
                  0
                const totalCount =
                  currentCategory.schedules
                    ?.filter((s) => s.month === month)
                    .reduce((sum, schedule) => sum + (schedule.athletes?.length || 0), 0) || 0

                return (
                  <Card
                    key={month}
                    className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer group"
                    onClick={() => {
                      setSelectedMonth(month)
                      updateURL({ month })
                    }}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="rounded-lg bg-primary/20 p-2 sm:p-3">
                            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-card-foreground">
                              {monthName}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">{monthScheduleCount} วันฝึกซ้อม</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-muted-foreground">การเข้าร่วมรวม</span>
                          <span className="font-semibold text-card-foreground">
                            {checkedInCount}/{totalCount}
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${totalCount > 0 ? (checkedInCount / totalCount) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {selectedMonth && !selectedScheduleId && currentCategory && (
          <div>
            <Button
              variant="ghost"
              className="mb-3 sm:mb-4 text-sm sm:text-base"
              onClick={() => {
                setSelectedMonth(null)
                setSelectedScheduleId(null)
                updateURL({ month: null, schedule: null })
              }}
            >
              ← กลับไปเลือกเดือน
            </Button>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm mb-4 sm:mb-6">
              <div className={`bg-gradient-to-r ${currentCategory.color} p-4 sm:p-6 rounded-t-xl`}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="text-3xl sm:text-4xl md:text-5xl">{currentCategory.icon}</div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      {currentCategory.name} - {currentCategory.subcategory}
                    </h2>
                    <p className="text-xs sm:text-sm text-purple-100">
                      {monthSchedules[0]?.month_name} • {currentCategory.schedule_text}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-3 sm:mb-4">เลือกวันที่ต้องการเช็คชื่อ</h3>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {monthSchedules.map((schedule) => {
                const checkedIn = schedule.athletes?.filter((a) => a.checked_in).length || 0
                const total = schedule.athletes?.length || 0
                const percentage = total > 0 ? (checkedIn / total) * 100 : 0

                return (
                  <Card
                    key={schedule.id}
                    className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer group"
                    onClick={() => {
                      setSelectedScheduleId(schedule.id)
                      updateURL({ schedule: schedule.id })
                    }}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="rounded-lg bg-primary/20 p-2 sm:p-3">
                            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-card-foreground">
                              {schedule.day_of_week}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">{schedule.date}</p>
                            <p className="text-xs text-muted-foreground">{schedule.time}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-muted-foreground">การเข้าร่วม</span>
                          <span className="font-semibold text-card-foreground">
                            {checkedIn}/{total}
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {selectedScheduleId && currentSchedule && currentCategory && (
          <div>
            <Button
              variant="ghost"
              className="mb-3 sm:mb-4 text-sm sm:text-base"
              onClick={() => {
                setSelectedScheduleId(null)
                setSearchQuery("")
                updateURL({ schedule: null })
              }}
            >
              ← กลับไปเลือกวัน
            </Button>
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className={`bg-gradient-to-r ${currentCategory.color} p-4 sm:p-6 rounded-t-xl`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-3xl sm:text-4xl md:text-5xl">{currentCategory.icon}</div>
                    <div>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                        {currentCategory.name} - {currentCategory.subcategory}
                      </h2>
                      <p className="text-xs sm:text-sm text-purple-100">
                        {currentSchedule.day_of_week} ({currentSchedule.date}) • {currentSchedule.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {checkedInCount}/{totalCount}
                    </div>
                    <p className="text-xs sm:text-sm text-purple-100">เช็คชื่อแล้ว</p>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 md:p-6">
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="ค้นหาชื่อนักกีฬา, คณะ, หรือเบอร์..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 sm:pl-10 pr-4 h-10 sm:h-12 text-sm sm:text-base border-primary/20 focus:border-primary/50 bg-background/50"
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 sm:h-8 px-2 text-xs sm:text-sm"
                          onClick={() => setSearchQuery("")}
                        >
                          ล้าง
                        </Button>
                      )}
                    </div>
                    {searchQuery && (
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                        พบ {totalFilteredAthletes} รายการจาก {totalCount} รายการทั้งหมด
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!isReadOnly && (
                      <AthleteManager scheduleId={selectedScheduleId} mode="add" onSuccess={refreshAthletes} />
                    )}
                    <ExportButtons
                      sportName={currentCategory.name}
                      subcategory={currentCategory.subcategory}
                      date={currentSchedule.date}
                      time={currentSchedule.time}
                      dayOfWeek={currentSchedule.day_of_week}
                      monthName={currentSchedule.month_name}
                      athletes={
                        currentSchedule.athletes?.map((a) => ({
                          id: a.id,
                          name: a.name,
                          number: a.number,
                          checkedIn: a.checked_in,
                          faculty: a.faculty,
                        })) || []
                      }
                      monthlySchedules={sortSchedulesByDayOfWeek(monthSchedules).map((s) => ({
                        id: s.id,
                        date: s.date,
                        month: s.month,
                        monthName: s.month_name,
                        dayOfWeek: s.day_of_week,
                        time: s.time,
                        athletes:
                          s.athletes?.map((a) => ({
                            id: a.id,
                            name: a.name,
                            number: a.number,
                            checkedIn: a.checked_in,
                            faculty: a.faculty,
                          })) || [],
                      }))}
                      isReadOnly={isReadOnly}
                    />
                  </div>
                </div>

                {searchQuery && !hasSearchResults && (
                  <div className="text-center py-8 sm:py-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-secondary mb-3 sm:mb-4">
                      <Search className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2">ไม่พบผลการค้นหา</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">ไม่พบนักกีฬาที่ตรงกับ "{searchQuery}"</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      className="text-xs sm:text-sm"
                    >
                      ล้างการค้นหา
                    </Button>
                  </div>
                )}

                {hasSearchResults && (
                  <div className="space-y-6">
                    {faculties.map((faculty) => (
                      <div key={faculty}>
                        <div className="mb-3 flex items-center gap-2 border-b border-primary/20 pb-2">
                          <Users className="h-5 w-5 text-primary" />
                          <h3 className="text-base sm:text-lg font-bold text-card-foreground">{faculty}</h3>
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {filteredAthletesByFaculty[faculty].filter((a) => a.checked_in).length}/
                            {filteredAthletesByFaculty[faculty].length}
                          </Badge>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          {filteredAthletesByFaculty[faculty].map((athlete) => (
                            <div
                              key={athlete.id}
                              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 rounded-lg border p-3 sm:p-4 transition-all hover:border-primary/50 ${
                                athlete.checked_in ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/30"
                              }`}
                            >
                              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                <div
                                  className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg font-bold text-xs sm:text-sm flex-shrink-0 ${
                                    athlete.checked_in
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-secondary text-secondary-foreground"
                                  }`}
                                >
                                  {athlete.number}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold text-card-foreground text-sm sm:text-base truncate">
                                    {athlete.name}
                                  </p>
                                  <p className="text-xs sm:text-sm text-muted-foreground">เบอร์ {athlete.number}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                                {athlete.checked_in && (
                                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                                    เข้าร่วมแล้ว
                                  </Badge>
                                )}
                                <Button
                                  variant={athlete.checked_in ? "outline" : "default"}
                                  size="sm"
                                  onClick={() => handleToggleCheckIn(athlete.id, athlete.checked_in)}
                                  disabled={isReadOnly || isUpdating === athlete.id}
                                  className={`text-xs sm:text-sm ${athlete.checked_in ? "border-primary/30 hover:bg-primary/10" : ""} ${isReadOnly ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                  {isUpdating === athlete.id ? (
                                    <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                  ) : athlete.checked_in ? (
                                    <>
                                      <CheckCircle2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                      {isReadOnly ? "เข้าร่วมแล้ว" : "ยกเลิก"}
                                    </>
                                  ) : (
                                    <>
                                      <Circle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                      {isReadOnly ? "ยังไม่เข้าร่วม" : "เช็คชื่อ"}
                                    </>
                                  )}
                                </Button>
                                {!isReadOnly && (
                                  <>
                                    <AthleteManager
                                      scheduleId={selectedScheduleId}
                                      athlete={athlete}
                                      mode="edit"
                                      onSuccess={refreshAthletes}
                                    />
                                    <DeleteAthleteDialog athlete={athlete} onSuccess={refreshAthletes} />
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
