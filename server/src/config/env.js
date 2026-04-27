import dotenv from 'dotenv'

dotenv.config()

const requiredEnv = ['SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY']

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
})

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 8800),
  FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_STORAGE_BUCKET: process.env.SUPABASE_STORAGE_BUCKET ?? 'dashboard-media',
  YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID ?? 'UCs953CyNH7x8SfZ-a2jAv6A',
}
