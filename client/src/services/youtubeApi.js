const resolveApiBaseCandidates = () => {
  const bases = []
  const envBase = import.meta.env.VITE_API_BASE_URL
  const isLocalHost = typeof window !== 'undefined'
    && ['localhost', '127.0.0.1'].includes(window.location.hostname)

  if (envBase) {
    bases.push(envBase)
  }

  if (typeof window !== 'undefined') {
    bases.push(`${window.location.origin}/api`)
  }

  if (isLocalHost) {
    bases.push('http://localhost:8800/api')
  }

  return [...new Set(bases.map((base) => base.replace(/\/+$/, '')))]
}

const YOUTUBE_FEED_CACHE_KEY = 'youtube-feed-cache-v1'

const getCachedFeed = () => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(YOUTUBE_FEED_CACHE_KEY)
    if (!raw) {
      return null
    }

    return JSON.parse(raw)
  } catch {
    return null
  }
}

const setCachedFeed = (data) => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(YOUTUBE_FEED_CACHE_KEY, JSON.stringify(data))
  } catch {
    // Ignore quota or storage errors. Feed can still render from network.
  }
}

const parseResponse = async (response) => {
  const payload = await response.json().catch(() => ({}))

  if (!response.ok || payload.success === false) {
    throw new Error(payload.message ?? 'Failed to fetch YouTube videos.')
  }

  return payload.data
}

export const getLatestYoutubeFeed = async () => {
  const candidates = resolveApiBaseCandidates()
  let lastError = null

  for (const baseUrl of candidates) {
    try {
      const response = await fetch(`${baseUrl}/youtube/latest?maxResults=12`)
      const data = await parseResponse(response)
      setCachedFeed(data)
      return data
    } catch (error) {
      lastError = error
    }
  }

  const cached = getCachedFeed()
  if (cached) {
    return cached
  }

  throw new Error(
    lastError?.message
      || 'Unable to load YouTube feed right now. Please try again shortly.',
  )
}
