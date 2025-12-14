import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // We don't throw here to avoid crashing build if envs are missing during build time
  console.warn('Missing Supabase environment variables')
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)
