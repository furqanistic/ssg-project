import { createClient } from '@supabase/supabase-js'
import { env } from './env.js'

const normalizeOrigin = (origin = '') => origin.trim().replace(/\/+$/, '')

export const allowedCorsOrigins = Array.from(
  new Set(
    [
      normalizeOrigin(env.FRONTEND_URL),
      'https://ssgberlin.de',
      'https://api.ssgberlin.de',
    ].filter(Boolean),
  ),
)

export const isAllowedCorsOrigin = (origin = '') => {
  return allowedCorsOrigins.includes(normalizeOrigin(origin))
}

export const supabasePublic = createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const adminKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_PUBLISHABLE_KEY

export const supabaseAdmin = createClient(env.SUPABASE_URL, adminKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Backward-compatible alias for existing imports.
export const supabase = supabaseAdmin
