import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

declare global {
  var __supabase_browser_client__: SupabaseClient | undefined
}

export function getSupabaseBrowserClient(): SupabaseClient {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseBrowserClient can only be called from the browser")
  }

  if (globalThis.__supabase_browser_client__) {
    return globalThis.__supabase_browser_client__
  }

  globalThis.__supabase_browser_client__ = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storageKey: "sb-sports-checkin-auth-token",
        persistSession: true,
        detectSessionInUrl: true,
      },
    },
  )

  return globalThis.__supabase_browser_client__
}

export function createClient() {
  return getSupabaseBrowserClient()
}
