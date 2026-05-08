import axios from 'axios'

/**
 * Used when `VITE_API_BASE_URL` is missing or empty (no localhost fallback).
 * Must match your server’s `/api` mount (see `server/src/app.js`). If you only
 * exposed `https://api.ssgberlin.de/auth`, set `VITE_API_BASE_URL` in env instead
 * so paths stay consistent with `/auth/...` and `/admin/...`.
 */
export const DEFAULT_API_BASE_URL = 'https://api.ssgberlin.de/api'

const raw = import.meta.env.VITE_API_BASE_URL
const baseURL = (
  typeof raw === 'string' && raw.trim() !== '' ? raw.trim() : DEFAULT_API_BASE_URL
).replace(/\/+$/, '')

// Do not set a global Content-Type: FormData uploads need the runtime to set
// multipart boundary; forcing application/json breaks /admin/content/upload-image.
export const axiosInstance = axios.create({
  baseURL,
})
