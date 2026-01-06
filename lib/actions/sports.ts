"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { verifyAdminSession } from "./auth"

export async function getAllSports() {
  try {
    const supabase = await createClient()

    const { data: sports, error } = await supabase.from("sports").select("*").order("name")

    if (error) {
      return []
    }

    return sports || []
  } catch (error) {
    return []
  }
}

export async function getCategoriesBySport(sportId: string) {
  try {
    const supabase = await createClient()

    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .eq("sport_id", sportId)
      .order("subcategory")

    if (error) {
      return []
    }

    return categories || []
  } catch (error) {
    return []
  }
}

export async function getSchedulesByCategory(categoryId: string) {
  try {
    const supabase = await createClient()

    const { data: schedules, error } = await supabase
      .from("schedules")
      .select("*")
      .eq("category_id", categoryId)
      .order("date")

    if (error) {
      return []
    }

    return schedules || []
  } catch (error) {
    return []
  }
}

export async function getAthletesBySchedule(scheduleId: string) {
  try {
    const supabase = await createClient()

    const { data: athletes, error } = await supabase
      .from("athletes")
      .select("*")
      .eq("schedule_id", scheduleId)
      .order("name")

    if (error) {
      return []
    }

    return athletes || []
  } catch (error) {
    return []
  }
}

export async function toggleAthleteCheckIn(athleteId: string, checkedIn: boolean) {
  try {
    if (!athleteId || typeof checkedIn !== "boolean") {
      return { success: false, error: "Invalid input" }
    }

    const supabase = await createClient()

    const { error } = await supabase.from("athletes").update({ checked_in: checkedIn }).eq("id", athleteId)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update check-in status" }
  }
}

export async function getFullSportsData() {
  try {
    const supabase = await createClient()

    // Get all data with a single query using joins
    const { data: sports, error: sportsError } = await supabase
      .from("sports")
      .select(
        `
        *,
        categories (
          *,
          schedules (
            *,
            athletes (*)
          )
        )
      `,
      )
      .order("name")

    if (sportsError) {
      return []
    }

    return sports || []
  } catch (error) {
    return []
  }
}

export async function createSchedule(categoryId: string, date: string, time: string) {
  try {
    const { isAdmin } = await verifyAdminSession()
    if (!isAdmin) {
      return { success: false, error: "ไม่มีสิทธิ์ในการดำเนินการ" }
    }

    if (!categoryId || !date || !time) {
      return { success: false, error: "กรุณากรอกข้อมูลให้ครบถ้วน" }
    }

    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return { success: false, error: "รูปแบบวันที่ไม่ถูกต้อง" }
    }

    const supabase = await createClient()

    const { data: existing } = await supabase
      .from("schedules")
      .select("id")
      .eq("category_id", categoryId)
      .eq("date", date)
      .limit(1)

    if (existing && existing.length > 0) {
      return { success: false, error: "มีตารางซ้อมในวันนี้อยู่แล้ว" }
    }

    const monthNames = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ]
    const dayNames = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]

    const month = dateObj.toISOString().slice(0, 7)
    const monthName = monthNames[dateObj.getMonth()]
    const dayOfWeek = dayNames[dateObj.getDay()]

    const { data, error } = await supabase
      .from("schedules")
      .insert({
        category_id: categoryId,
        date,
        month,
        month_name: monthName,
        day_of_week: dayOfWeek,
        time,
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error) {
    return { success: false, error: "Failed to create schedule" }
  }
}

export async function deleteSchedule(scheduleId: string) {
  try {
    const { isAdmin } = await verifyAdminSession()
    if (!isAdmin) {
      return { success: false, error: "ไม่มีสิทธิ์ในการดำเนินการ" }
    }

    if (!scheduleId) {
      return { success: false, error: "Invalid schedule ID" }
    }

    const supabase = await createClient()

    await supabase.from("athletes").delete().eq("schedule_id", scheduleId)

    const { error } = await supabase.from("schedules").delete().eq("id", scheduleId)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete schedule" }
  }
}

export async function addAthlete(scheduleId: string, name: string, number: string, faculty: string) {
  try {
    if (!scheduleId || !name?.trim() || !number?.trim() || !faculty?.trim()) {
      return { success: false, error: "กรุณากรอกข้อมูลให้ครบถ้วน" }
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("athletes")
      .insert({
        schedule_id: scheduleId,
        name: name.trim(),
        number: number.trim(),
        faculty: faculty.trim(),
        checked_in: false,
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true, data }
  } catch (error) {
    return { success: false, error: "Failed to add athlete" }
  }
}

export async function updateAthlete(athleteId: string, name: string, number: string, faculty: string) {
  try {
    if (!athleteId || !name?.trim() || !number?.trim() || !faculty?.trim()) {
      return { success: false, error: "กรุณากรอกข้อมูลให้ครบถ้วน" }
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from("athletes")
      .update({ name: name.trim(), number: number.trim(), faculty: faculty.trim() })
      .eq("id", athleteId)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update athlete" }
  }
}

export async function deleteAthlete(athleteId: string) {
  try {
    const { isAdmin } = await verifyAdminSession()
    if (!isAdmin) {
      return { success: false, error: "ไม่มีสิทธิ์ในการดำเนินการ" }
    }

    if (!athleteId) {
      return { success: false, error: "Invalid athlete ID" }
    }

    const supabase = await createClient()

    const { error } = await supabase.from("athletes").delete().eq("id", athleteId)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete athlete" }
  }
}

export async function createCategory(
  sportId: string,
  name: string,
  subcategory: string,
  color?: string,
  icon?: string,
  scheduleText?: string,
) {
  try {
    const { isAdmin } = await verifyAdminSession()
    if (!isAdmin) {
      return { success: false, error: "ไม่มีสิทธิ์ในการดำเนินการ" }
    }

    if (!sportId || !name?.trim() || !subcategory?.trim()) {
      return { success: false, error: "กรุณากรอกข้อมูลให้ครบถ้วน" }
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("categories")
      .insert({
        sport_id: sportId,
        name: name.trim(),
        subcategory: subcategory.trim(),
        color: color || "#3b82f6",
        icon: icon || "calendar",
        schedule_text: scheduleText || "-",
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error) {
    return { success: false, error: "Failed to create category" }
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    const { isAdmin } = await verifyAdminSession()
    if (!isAdmin) {
      return { success: false, error: "ไม่มีสิทธิ์ในการดำเนินการ" }
    }

    if (!categoryId) {
      return { success: false, error: "Invalid category ID" }
    }

    const supabase = await createClient()

    const { data: schedules } = await supabase.from("schedules").select("id").eq("category_id", categoryId)

    if (schedules && schedules.length > 0) {
      const scheduleIds = schedules.map((s) => s.id)
      await supabase.from("athletes").delete().in("schedule_id", scheduleIds)
    }

    await supabase.from("schedules").delete().eq("category_id", categoryId)

    const { error } = await supabase.from("categories").delete().eq("id", categoryId)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete category" }
  }
}
