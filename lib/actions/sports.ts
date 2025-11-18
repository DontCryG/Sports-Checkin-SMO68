"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getAllSports() {
  try {
    const supabase = await createClient()

    const { data: sports, error } = await supabase.from("sports").select("*").order("name")

    if (error) {
      console.error("[v0] Error fetching sports:", error)
      return []
    }

    return sports || []
  } catch (error) {
    console.error("[v0] Error in getAllSports:", error)
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
      console.error("[v0] Error fetching categories:", error)
      return []
    }

    return categories || []
  } catch (error) {
    console.error("[v0] Error in getCategoriesBySport:", error)
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
      console.error("[v0] Error fetching schedules:", error)
      return []
    }

    return schedules || []
  } catch (error) {
    console.error("[v0] Error in getSchedulesByCategory:", error)
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
      console.error("[v0] Error fetching athletes:", error)
      return []
    }

    return athletes || []
  } catch (error) {
    console.error("[v0] Error in getAthletesBySchedule:", error)
    return []
  }
}

export async function toggleAthleteCheckIn(athleteId: string, checkedIn: boolean) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from("athletes").update({ checked_in: checkedIn }).eq("id", athleteId)

    if (error) {
      console.error("[v0] Error updating athlete check-in:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error in toggleAthleteCheckIn:", error)
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
      console.error("[v0] Error fetching full sports data:", sportsError)
      return []
    }

    return sports || []
  } catch (error) {
    console.error("[v0] Error in getFullSportsData:", error)
    return []
  }
}

export async function createSchedule(categoryId: string, date: string, time: string) {
  try {
    const supabase = await createClient()

    // Parse date to get month and day of week in Thai
    const dateObj = new Date(date)
    const monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ]
    const dayNames = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]
    
    const month = dateObj.toISOString().slice(0, 7) // YYYY-MM format
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
      console.error("[v0] Error creating schedule:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error in createSchedule:", error)
    return { success: false, error: "Failed to create schedule" }
  }
}

export async function deleteSchedule(scheduleId: string) {
  try {
    const supabase = await createClient()

    // First delete all athletes associated with this schedule
    await supabase.from("athletes").delete().eq("schedule_id", scheduleId)

    // Then delete the schedule
    const { error } = await supabase.from("schedules").delete().eq("id", scheduleId)

    if (error) {
      console.error("[v0] Error deleting schedule:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error in deleteSchedule:", error)
    return { success: false, error: "Failed to delete schedule" }
  }
}

export async function addAthlete(scheduleId: string, name: string, number: string, faculty: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("athletes")
      .insert({
        schedule_id: scheduleId,
        name,
        number,
        faculty,
        checked_in: false,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error adding athlete:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error in addAthlete:", error)
    return { success: false, error: "Failed to add athlete" }
  }
}

export async function updateAthlete(athleteId: string, name: string, number: string, faculty: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from("athletes").update({ name, number, faculty }).eq("id", athleteId)

    if (error) {
      console.error("[v0] Error updating athlete:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error in updateAthlete:", error)
    return { success: false, error: "Failed to update athlete" }
  }
}

export async function deleteAthlete(athleteId: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from("athletes").delete().eq("id", athleteId)

    if (error) {
      console.error("[v0] Error deleting athlete:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error in deleteAthlete:", error)
    return { success: false, error: "Failed to delete athlete" }
  }
}

export async function createCategory(
  sportId: string,
  name: string,
  subcategory: string,
  color?: string,
  icon?: string,
  scheduleText?: string
) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("categories")
      .insert({
        sport_id: sportId,
        name,
        subcategory: subcategory || "-", // Use "-" if empty
        color: color || "#3b82f6",
        icon: icon || "calendar",
        schedule_text: scheduleText || "-", // Add default schedule_text
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating category:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error in createCategory:", error)
    return { success: false, error: "Failed to create category" }
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    const supabase = await createClient()

    // First get all schedules for this category
    const { data: schedules } = await supabase.from("schedules").select("id").eq("category_id", categoryId)

    // Delete all athletes for these schedules
    if (schedules && schedules.length > 0) {
      const scheduleIds = schedules.map((s) => s.id)
      await supabase.from("athletes").delete().in("schedule_id", scheduleIds)
    }

    // Delete all schedules for this category
    await supabase.from("schedules").delete().eq("category_id", categoryId)

    // Finally delete the category
    const { error } = await supabase.from("categories").delete().eq("id", categoryId)

    if (error) {
      console.error("[v0] Error deleting category:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error in deleteCategory:", error)
    return { success: false, error: "Failed to delete category" }
  }
}
