export interface Athlete {
  id: string
  schedule_id: string
  name: string
  number: string
  faculty: string
  checked_in: boolean
  created_at?: string
  updated_at?: string
}

export interface Schedule {
  id: string
  category_id: string
  date: string
  month: string
  month_name: string
  day_of_week: string
  time: string
  athletes?: Athlete[]
  created_at?: string
}

export interface Category {
  id: string
  sport_id: string
  name: string
  subcategory: string
  icon: string
  color: string
  schedule_text: string
  schedules?: Schedule[]
  created_at?: string
}

export interface Sport {
  id: string
  name: string
  icon: string
  categories?: Category[]
  created_at?: string
}

export type FullSportsData = Sport[]
