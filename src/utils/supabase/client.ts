import { createBrowserClient } from '@supabase/ssr'
import { supabaseAnonKey, supabaseUrl } from '../constansts'

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
