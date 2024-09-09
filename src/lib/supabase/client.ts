import { createBrowserClient } from "@supabase/ssr";

import { ENV } from "../config";

export function createClient() {
  return createBrowserClient(ENV.supabase.supabaseUrl, ENV.supabase.anonKey);
}
