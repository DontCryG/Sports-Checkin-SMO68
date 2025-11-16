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
