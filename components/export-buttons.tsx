"use client"

import { Button } from "@/components/ui/button"
import { FileSpreadsheet } from "lucide-react"
import { exportMonthlyToExcel } from "@/lib/export-utils"

interface Athlete {
  id: string
  name: string
  number: string
  checkedIn: boolean
  faculty: string
}

interface ExportButtonsProps {
  sportName: string
  subcategory: string
  date: string
  time: string
  dayOfWeek: string
  monthName: string
  athletes: Athlete[]
  isReadOnly?: boolean
  monthlySchedules?: Array<{
    date: string
    dayOfWeek: string
    time: string
    athletes: Athlete[]
  }>
}

export function ExportButtons({
  sportName,
  subcategory,
  date,
  time,
  dayOfWeek,
  monthName,
  athletes,
  isReadOnly = false,
  monthlySchedules = [],
}: ExportButtonsProps) {
  const handleMonthlyExcelExport = () => {
    exportMonthlyToExcel({
      sportName,
      subcategory,
      monthName,
      schedules: monthlySchedules,
    })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button
        onClick={handleMonthlyExcelExport}
        variant="outline"
        size="sm"
        disabled={isReadOnly || monthlySchedules.length === 0}
        className="text-xs sm:text-sm bg-transparent"
        title="Export สถิติเดือนทั้งหมด"
      >
        <FileSpreadsheet className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        Export Excel
      </Button>
    </div>
  )
}
