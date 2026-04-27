import { ApiError } from '../utils/ApiError.js'
import { env } from '../config/env.js'

const DEFAULT_CHANNEL_ID = 'UCs953CyNH7x8SfZ-a2jAv6A'
const REQUEST_TIMEOUT_MS = 10_000
const MAX_RETRIES = 2

const xmlDecode = (value = '') => {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

const extractTag = (block, tagName) => {
  const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`)
  const match = block.match(regex)
  return match ? xmlDecode(match[1].trim()) : ''
}

const extractAttribute = (block, tagName, attribute) => {
  const regex = new RegExp(`<${tagName}[^>]*${attribute}="([^"]+)"[^>]*>`, 'i')
  const match = block.match(regex)
  return match ? xmlDecode(match[1].trim()) : ''
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const fetchText = async (url) => {
  let lastError = null

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; GurudwaraSite/1.0)',
        },
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (!response.ok) {
        throw new ApiError(response.status, 'Failed to fetch YouTube feed.')
      }

      return await response.text()
    } catch (error) {
      lastError = error
      if (attempt < MAX_RETRIES) {
        await sleep(250 * (attempt + 1))
      }
    }
  }

  throw lastError || new ApiError(503, 'Unable to reach YouTube right now.')
}

const resolveThumbnail = (videoId, thumbnailUrl) => {
  if (thumbnailUrl) {
    return thumbnailUrl.replace(/https:\/\/i\d\.ytimg\.com/i, 'https://i.ytimg.com')
  }

  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

const fetchRssVideos = async ({ channelId, maxResults }) => {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
  const xml = await fetchText(rssUrl)

  const channelTitle = extractTag(xml, 'title') || 'YouTube'
  const entryMatches = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]

  const videos = entryMatches.slice(0, maxResults).map((match) => {
    const entry = match[1]
    const id = extractTag(entry, 'yt:videoId')

    return {
      id,
      title: extractTag(entry, 'title') || 'YouTube Video',
      description: extractTag(entry, 'media:description'),
      publishedAt: extractTag(entry, 'published') || null,
      thumbnail: resolveThumbnail(id, extractAttribute(entry, 'media:thumbnail', 'url')),
      channelTitle,
      isLive: false,
      isUpcoming: false,
      youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
    }
  }).filter((item) => item.id)

  return {
    channelTitle,
    videos,
  }
}

const detectLiveVideoId = async (channelId) => {
  const liveUrl = `https://www.youtube.com/channel/${channelId}/live`
  const html = await fetchText(liveUrl)

  const hasLiveMarker = (
    html.includes('"isLiveNow":true')
    || html.includes('BADGE_STYLE_TYPE_LIVE_NOW')
    || html.includes('"isLiveContent":true')
  )

  if (!hasLiveMarker) {
    return null
  }

  const idMatch = html.match(/"videoId":"([A-Za-z0-9_-]{11})"/)
  return idMatch ? idMatch[1] : null
}

export const getYoutubeFeed = async ({ channelId, maxResults = 12 }) => {
  const resolvedChannelId = channelId || env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID

  const [rssData, liveVideoId] = await Promise.all([
    fetchRssVideos({ channelId: resolvedChannelId, maxResults }),
    detectLiveVideoId(resolvedChannelId).catch(() => null),
  ])

  const videos = rssData.videos.map((video) => ({
    ...video,
    isLive: video.id === liveVideoId,
  }))

  let liveNow = null

  if (liveVideoId) {
    const existing = videos.find((video) => video.id === liveVideoId)

    if (existing) {
      liveNow = existing
    } else {
      liveNow = {
        id: liveVideoId,
        title: 'Live Stream',
        description: '',
        publishedAt: null,
        thumbnail: resolveThumbnail(liveVideoId),
        channelTitle: rssData.channelTitle,
        isLive: true,
        isUpcoming: false,
        youtubeUrl: `https://www.youtube.com/watch?v=${liveVideoId}`,
      }
      videos.unshift(liveNow)
    }
  }

  return {
    channelId: resolvedChannelId,
    channelUrl: `https://www.youtube.com/channel/${resolvedChannelId}`,
    liveNow,
    items: videos,
    fetchedAt: new Date().toISOString(),
  }
}
