import * as XLSX from "xlsx"

interface Athlete {
  id: string
  name: string
  number: string
  checkedIn: boolean
  faculty: string
}

interface ExportData {
  sportName: string
  subcategory: string
  date: string
  time: string
  dayOfWeek: string
  monthName: string
  athletes: Athlete[]
}

interface MonthlyExportData {
  sportName: string
  subcategory: string
  monthName: string
  schedules: Array<{
    date: string
    dayOfWeek: string
    time: string
    athletes: Athlete[]
  }>
}

export const exportToExcel = (data: ExportData) => {
  const fileName = `${data.sportName}_${data.subcategory}_${data.date}.xlsx`

  // Prepare data for Excel
  const excelData = data.athletes.map((athlete, index) => ({
    ลำดับที่: index + 1,
    ชื่อนักกีฬา: athlete.name,
    เบอร์: athlete.number,
    คณะ: athlete.faculty,
    เช็คชื่อ: athlete.checkedIn ? "✓" : "",
  }))

  // Create workbook
  const ws = XLSX.utils.json_to_sheet(excelData)
  const wb = XLSX.utils.book_new()

  // Set column widths
  ws["!cols"] = [
    { wch: 8 }, // ลำดับที่
    { wch: 25 }, // ชื่อนักกีฬา
    { wch: 8 }, // เบอร์
    { wch: 30 }, // คณะ
    { wch: 10 }, // เช็คชื่อ
  ]

  XLSX.utils.book_append_sheet(wb, ws, "Data")

  // Add title sheet
  const titleWs = XLSX.utils.aoa_to_sheet([
    [`สถิติการเข้าเช็คชื่อ - ${data.sportName} ${data.subcategory}`],
    [],
    [`วันที่: ${data.date} (${data.dayOfWeek})`],
    [`เวลา: ${data.time}`],
    [`เดือน: ${data.monthName}`],
    [],
    [`จำนวนทั้งหมด: ${data.athletes.length}`],
    [`เข้าร่วมแล้ว: ${data.athletes.filter((a) => a.checkedIn).length}`],
    [`ยังไม่เข้าร่วม: ${data.athletes.filter((a) => !a.checkedIn).length}`],
    [],
  ])

  XLSX.utils.book_append_sheet(wb, titleWs, "สรุป", 0)

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })
  const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })

  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  link.click()
  URL.revokeObjectURL(link.href)
}

export const exportMonthlyToExcel = (data: MonthlyExportData) => {
  const now = new Date()
  const exportTime = now.toLocaleString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  const fileName = `${data.sportName}_${data.subcategory}_${data.monthName.replace(/\s+/g, "_")}_${now.getTime()}.xlsx`

  const wb = XLSX.utils.book_new()

  // Create summary sheet with export info
  const summaryData: any[] = [
    [`สถิติการเข้าเช็คชื่อรายเดือน - ${data.sportName} ${data.subcategory}`],
    [],
    [`เดือน: ${data.monthName}`],
    [`วันที่ export: ${exportTime}`],
    [],
  ]

  // Calculate totals
  const totalAthletes = data.schedules.reduce((sum, schedule) => sum + schedule.athletes.length, 0)
  const totalCheckedIn = data.schedules.reduce(
    (sum, schedule) => sum + schedule.athletes.filter((a) => a.checkedIn).length,
    0,
  )

  summaryData.push(
    [`รวมทั้งสิ้น`, `${totalAthletes}`],
    [`เข้าร่วม`, `${totalCheckedIn}`],
    [`ยังไม่เข้าร่วม`, `${totalAthletes - totalCheckedIn}`],
    [`อัตราการเข้าร่วม`, `${totalAthletes > 0 ? ((totalCheckedIn / totalAthletes) * 100).toFixed(2) : 0}%`],
  )

  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData)
  summaryWs["!cols"] = [{ wch: 30 }, { wch: 15 }]
  XLSX.utils.book_append_sheet(wb, summaryWs, "สรุป", 0)

  // Create sheet with team/faculty statistics
  const allAthletesForTeamStats = data.schedules.reduce(
    (acc, schedule) => {
      schedule.athletes.forEach((athlete) => {
        const existing = acc.find((a) => a.id === athlete.id)
        if (existing) {
          existing.attendance += athlete.checkedIn ? 1 : 0
          existing.sessions += 1
        } else {
          acc.push({
            id: athlete.id,
            name: athlete.name,
            number: athlete.number,
            faculty: athlete.faculty,
            attendance: athlete.checkedIn ? 1 : 0,
            sessions: 1,
          })
        }
      })
      return acc
    },
    [] as Array<{
      id: string
      name: string
      number: string
      faculty: string
      attendance: number
      sessions: number
    }>,
  )

  // Group by faculty
  const athletesByFaculty = allAthletesForTeamStats.reduce(
    (acc, athlete) => {
      if (!acc[athlete.faculty]) {
        acc[athlete.faculty] = []
      }
      acc[athlete.faculty].push(athlete)
      return acc
    },
    {} as Record<string, typeof allAthletesForTeamStats>,
  )

  // Create individual athlete sheet with team grouping
  const athleteDetailData: any[] = []
  const rowIndex = 1

  Object.keys(athletesByFaculty)
    .sort()
    .forEach((faculty) => {
      const athletesInFaculty = athletesByFaculty[faculty]
      const totalInFaculty = athletesInFaculty.length
      const attendedInFaculty = athletesInFaculty.reduce((sum, a) => sum + a.attendance, 0)
      const totalSessions = athletesInFaculty.length > 0 ? athletesInFaculty[0].sessions : 0

      // Add faculty header
      athleteDetailData.push([`คณะ: ${faculty}`, "", "", "", "", ""])
      athleteDetailData.push([
        `รวม: ${totalInFaculty} คน`,
        `เข้าร่วม: ${attendedInFaculty}`,
        `อัตรา: ${totalInFaculty > 0 ? ((attendedInFaculty / (totalInFaculty * totalSessions)) * 100).toFixed(2) : 0}%`,
        "",
        "",
        "",
      ])
      athleteDetailData.push(["ลำดับที่", "ชื่อนักกีฬา", "เบอร์", "การเข้าร่วม (ครั้ง)", "รวมการฝึกซ้อม", "อัตราการเข้าร่วม"])

      // Add athletes in this faculty
      athletesInFaculty.forEach((athlete, index) => {
        const attendanceRate = athlete.sessions > 0 ? ((athlete.attendance / athlete.sessions) * 100).toFixed(2) : "0"
        athleteDetailData.push([
          index + 1,
          athlete.name,
          athlete.number,
          athlete.attendance,
          athlete.sessions,
          `${attendanceRate}%`,
        ])
      })

      // Add spacing between faculties
      athleteDetailData.push(["", "", "", "", "", ""])
      athleteDetailData.push(["", "", "", "", "", ""])
    })

  const athleteWs = XLSX.utils.aoa_to_sheet(athleteDetailData)
  athleteWs["!cols"] = [
    { wch: 8 }, // ลำดับที่
    { wch: 25 }, // ชื่อนักกีฬา
    { wch: 8 }, // เบอร์
    { wch: 15 }, // การเข้าร่วม (ครั้ง)
    { wch: 15 }, // รวมการฝึกซ้อม
    { wch: 15 }, // อัตราการเข้าร่วม
  ]
  XLSX.utils.book_append_sheet(wb, athleteWs, "สถิติรายบุคคล")

  // Create summary by faculty sheet
  const facultySummaryData: any[] = [["คณะ", "จำนวนนักกีฬา", "เข้าร่วมรวม", "ไม่เข้าร่วม", "อัตราการเข้าร่วม"]]

  Object.keys(athletesByFaculty)
    .sort()
    .forEach((faculty) => {
      const athletesInFaculty = athletesByFaculty[faculty]
      const totalInFaculty = athletesInFaculty.length
      const attendedInFaculty = athletesInFaculty.reduce((sum, a) => sum + a.attendance, 0)
      const totalSessions = athletesInFaculty.length > 0 ? athletesInFaculty[0].sessions : 0
      const totalPossible = totalInFaculty * totalSessions
      const attendanceRate = totalPossible > 0 ? ((attendedInFaculty / totalPossible) * 100).toFixed(2) : 0

      facultySummaryData.push([
        faculty,
        totalInFaculty,
        attendedInFaculty,
        totalPossible - attendedInFaculty,
        `${attendanceRate}%`,
      ])
    })

  const facultySummaryWs = XLSX.utils.aoa_to_sheet(facultySummaryData)
  facultySummaryWs["!cols"] = [
    { wch: 30 }, // คณะ
    { wch: 15 }, // จำนวนนักกีฬา
    { wch: 15 }, // เข้าร่วมรวม
    { wch: 15 }, // ไม่เข้าร่วม
    { wch: 15 }, // อัตราการเข้าร่วม
  ]
  XLSX.utils.book_append_sheet(wb, facultySummaryWs, "สรุปตามคณะ")

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })
  const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })

  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  link.click()
  URL.revokeObjectURL(link.href)
}
