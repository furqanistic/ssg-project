import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Play, Radio, Youtube } from 'lucide-react'

const CHANNEL_ID = 'UCs953CyNH7x8SfZ-a2jAv6A'
const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`
const LIVE_URL = `${CHANNEL_URL}/live`
const UPLOADS_PLAYLIST_ID = CHANNEL_ID.startsWith('UC') ? `UU${CHANNEL_ID.slice(2)}` : ''
const MAX_VIDEOS = 10
const DISCOVERY_TIMEOUT_MS = 12_000
const LIVE_PROBE_TIMEOUT_MS = 12_000
const FALLBACK_VIDEO_IDS = [
  'bdZWgAJI_RA',
  'atgHGou3Lx8',
  'hh44CIHbYPQ',
  '8HDEVrrlFow',
  'OLizxNnzFCc',
  'Yre0zDEGiPo',
  'Vj49uhSXOYM',
  'BI6ikete5Lw',
  'tLH0p9mVWs0',
  '0zykj0hOW2I',
]

let youtubeIframeApiPromise = null

const loadYoutubeIframeApi = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window is not available.'))
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT)
  }

  if (youtubeIframeApiPromise) {
    return youtubeIframeApiPromise
  }

  youtubeIframeApiPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]')

    const previousReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === 'function') {
        previousReady()
      }
      resolve(window.YT)
    }

    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.onerror = () => reject(new Error('Failed to load YouTube iframe API.'))
      document.head.appendChild(script)
    }

    window.setTimeout(() => {
      if (!window.YT?.Player) {
        reject(new Error('YouTube iframe API timed out.'))
      }
    }, 8000)
  })

  return youtubeIframeApiPromise
}

const thumbnailUrl = (videoId, quality = 'hqdefault.jpg') => {
  return `https://i.ytimg.com/vi/${videoId}/${quality}`
}

const fetchVideoOEmbedMeta = async (videoId) => {
  const watchUrl = encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)
  const response = await fetch(`https://www.youtube.com/oembed?url=${watchUrl}&format=json`)

  if (!response.ok) {
    throw new Error('Unable to load YouTube title.')
  }

  const payload = await response.json()
  return {
    title: payload?.title || 'YouTube Video',
    authorName: payload?.author_name || 'YouTube',
  }
}

const YoutubeShowcaseSection = () => {
  const discoveryNodeRef = useRef(null)
  const discoveryPlayerRef = useRef(null)
  const liveProbeNodeRef = useRef(null)
  const liveProbePlayerRef = useRef(null)
  const sliderRef = useRef(null)

  const [videoIds, setVideoIds] = useState([])
  const [activeVideoId, setActiveVideoId] = useState(FALLBACK_VIDEO_IDS[0])
  const [isLoading, setIsLoading] = useState(true)
  const [isLiveChecking, setIsLiveChecking] = useState(true)
  const [liveVideoId, setLiveVideoId] = useState('')
  const [videoMeta, setVideoMeta] = useState({})

  const resolvedVideoIds = videoIds.length > 0 ? videoIds : FALLBACK_VIDEO_IDS.slice(0, MAX_VIDEOS)
  const canShowSlider = resolvedVideoIds.length > 0

  const scrollSlider = (direction) => {
    if (!sliderRef.current) {
      return
    }

    const scrollAmount = sliderRef.current.clientWidth * 0.85
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    let isMounted = true
    let discoveryTimeoutId = null
    let liveTimeoutId = null

    const stopDiscoveryLoading = () => {
      if (!isMounted) {
        return
      }

      setIsLoading(false)
      if (discoveryPlayerRef.current) {
        discoveryPlayerRef.current.destroy()
        discoveryPlayerRef.current = null
      }
      if (discoveryTimeoutId) {
        window.clearTimeout(discoveryTimeoutId)
        discoveryTimeoutId = null
      }
    }

    const stopLiveProbe = (videoId = '') => {
      if (!isMounted) {
        return
      }

      setLiveVideoId(videoId)
      setIsLiveChecking(false)
      if (liveProbePlayerRef.current) {
        liveProbePlayerRef.current.destroy()
        liveProbePlayerRef.current = null
      }
      if (liveTimeoutId) {
        window.clearTimeout(liveTimeoutId)
        liveTimeoutId = null
      }
    }

    const boot = async () => {
      if (!UPLOADS_PLAYLIST_ID || !discoveryNodeRef.current || !liveProbeNodeRef.current) {
        if (isMounted) {
          stopDiscoveryLoading()
          stopLiveProbe('')
        }
        return
      }

      try {
        discoveryTimeoutId = window.setTimeout(() => {
          stopDiscoveryLoading()
        }, DISCOVERY_TIMEOUT_MS)

        liveTimeoutId = window.setTimeout(() => {
          stopLiveProbe('')
        }, LIVE_PROBE_TIMEOUT_MS)

        const YT = await loadYoutubeIframeApi()
        if (!isMounted || !discoveryNodeRef.current) {
          return
        }

        discoveryPlayerRef.current = new YT.Player(discoveryNodeRef.current, {
          width: '0',
          height: '0',
          playerVars: {
            listType: 'playlist',
            list: UPLOADS_PLAYLIST_ID,
            autoplay: 0,
            controls: 0,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              let attempts = 0

              const readPlaylist = () => {
                const playlist = event.target.getPlaylist?.() ?? []

                if (playlist.length > 0) {
                  const latest = playlist.slice(0, MAX_VIDEOS)
                  if (isMounted) {
                    setVideoIds(latest)
                    setActiveVideoId(latest[0])
                  }

                  stopDiscoveryLoading()
                  return
                }

                if (attempts < 12) {
                  attempts += 1
                  window.setTimeout(readPlaylist, 250)
                  return
                }

                if (isMounted) {
                  stopDiscoveryLoading()
                }
              }

              readPlaylist()
            },
            onError: () => {
              stopDiscoveryLoading()
            },
          },
        })

        liveProbePlayerRef.current = new YT.Player(liveProbeNodeRef.current, {
          width: '0',
          height: '0',
          videoId: 'live_stream',
          playerVars: {
            channel: CHANNEL_ID,
            autoplay: 0,
            controls: 0,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              let attempts = 0

              const checkLiveVideo = () => {
                const data = event.target.getVideoData?.() ?? {}
                const candidateId = typeof data.video_id === 'string' ? data.video_id : ''
                const isValidVideoId = /^[A-Za-z0-9_-]{11}$/.test(candidateId)

                if (isValidVideoId) {
                  stopLiveProbe(candidateId)
                  return
                }

                if (attempts < 12) {
                  attempts += 1
                  window.setTimeout(checkLiveVideo, 250)
                  return
                }

                stopLiveProbe('')
              }

              checkLiveVideo()
            },
            onError: () => {
              stopLiveProbe('')
            },
          },
        })
      } catch {
        if (isMounted) {
          stopDiscoveryLoading()
          stopLiveProbe('')
        }
      }
    }

    boot()

    return () => {
      isMounted = false

      if (discoveryPlayerRef.current) {
        discoveryPlayerRef.current.destroy()
        discoveryPlayerRef.current = null
      }

      if (liveProbePlayerRef.current) {
        liveProbePlayerRef.current.destroy()
        liveProbePlayerRef.current = null
      }

      if (discoveryTimeoutId) {
        window.clearTimeout(discoveryTimeoutId)
      }

      if (liveTimeoutId) {
        window.clearTimeout(liveTimeoutId)
      }
    }
  }, [])

  useEffect(() => {
    if (resolvedVideoIds.length === 0) {
      return
    }

    let isMounted = true

    const loadTitles = async () => {
      const idsToFetch = resolvedVideoIds.filter((id) => !videoMeta[id])
      if (idsToFetch.length === 0) {
        return
      }

      const results = await Promise.all(
        idsToFetch.map(async (id) => {
          try {
            const meta = await fetchVideoOEmbedMeta(id)
            return [id, meta]
          } catch {
            return [id, { title: 'YouTube Video', authorName: 'YouTube' }]
          }
        }),
      )

      if (!isMounted) {
        return
      }

      setVideoMeta((prev) => ({
        ...prev,
        ...Object.fromEntries(results),
      }))
    }

    loadTitles()

    return () => {
      isMounted = false
    }
  }, [resolvedVideoIds, videoMeta])

  return (
    <section className='bg-gray-50 px-4 pb-12 pt-12 md:px-6 md:pb-16 md:pt-16'>
      <div className='mx-auto w-full max-w-[1280px]'>
        <div className='relative overflow-hidden rounded-[24px] border border-gray-200/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-8 lg:p-10'>
          <div
            className='pointer-events-none absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-red-500/5 blur-[100px]'
            aria-hidden='true'
          />
          <div
            className='pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]'
            aria-hidden='true'
          />

          <div className='relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-2xl'>
              <div className='inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[13px] font-semibold text-red-600'>
                <Youtube className='h-4 w-4' />
                <span>YouTube Updates</span>
              </div>
              <h2 className='mt-4 text-[32px] font-bold tracking-tight text-gray-900 md:text-[40px]'>
                Latest Kirtan & Streams
              </h2>
              <p className='mt-2 text-[15px] leading-relaxed text-gray-500 md:text-[16px]'>
                Watch recent uploads and join us live on our official YouTube channel.
              </p>
            </div>

            <div className='flex items-center gap-3'>
              {canShowSlider ? (
                <div className='hidden items-center gap-2 md:flex'>
                  <button
                    type='button'
                    onClick={() => scrollSlider('left')}
                    className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 hover:text-gray-900'
                    aria-label='Previous videos'
                  >
                    <ChevronLeft className='h-5 w-5' />
                  </button>
                  <button
                    type='button'
                    onClick={() => scrollSlider('right')}
                    className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 hover:text-gray-900'
                    aria-label='Next videos'
                  >
                    <ChevronRight className='h-5 w-5' />
                  </button>
                </div>
              ) : null}

              <a
                href={CHANNEL_URL}
                target='_blank'
                rel='noreferrer'
                className='inline-flex h-11 items-center gap-2 rounded-full bg-gray-900 px-5 text-[15px] font-medium text-white shadow-sm transition hover:bg-gray-800 hover:shadow-md'
              >
                Visit Channel
                <ExternalLink className='h-4 w-4' />
              </a>
            </div>
          </div>

          {!isLiveChecking && liveVideoId ? (
            <div className='relative z-10 mt-8'>
              <a
                href={`${LIVE_URL}`}
                target='_blank'
                rel='noreferrer'
                className='group flex flex-col gap-3 rounded-[16px] border border-red-200 bg-gradient-to-r from-red-50 to-white px-4 py-3 transition hover:border-red-300 md:flex-row md:items-center md:justify-between md:px-5 md:py-4'
              >
                <div className='flex items-start gap-3 md:items-center md:gap-4'>
                  <span className='inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm shadow-red-600/20 md:text-[12px]'>
                    <Radio className='h-3.5 w-3.5' />
                    Live Kirtan
                  </span>
                  <p className='line-clamp-2 text-[14px] font-semibold leading-snug text-red-950 md:text-[16px] md:leading-normal'>
                    A livestream is currently active on YouTube.
                  </p>
                </div>

                <span className='inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-red-600 transition group-hover:text-red-700 md:text-[14px]'>
                  Watch Live
                  <ExternalLink className='h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </span>
              </a>
            </div>
          ) : null}

          <div className='relative z-10 mt-8'>
            {isLoading ? (
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`video-skeleton-${index}`}
                    className='overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm'
                  >
                    <div className='aspect-video animate-pulse bg-gray-100' />
                    <div className='space-y-3 p-5'>
                      <div className='h-3 w-24 animate-pulse rounded-full bg-gray-100' />
                      <div className='space-y-2'>
                        <div className='h-4 w-full animate-pulse rounded-md bg-gray-100' />
                        <div className='h-4 w-3/4 animate-pulse rounded-md bg-gray-100' />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {!isLoading && activeVideoId ? (
              <div className='overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-sm'>
                <div className='relative aspect-video w-full overflow-hidden bg-gray-100'>
                  <img
                    src={thumbnailUrl(activeVideoId, 'maxresdefault.jpg')}
                    alt={videoMeta[activeVideoId]?.title || 'Featured YouTube video'}
                    loading='lazy'
                    className='h-full w-full object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-gray-900/65 via-transparent to-transparent' />
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                    target='_blank'
                    rel='noreferrer'
                    className='absolute inset-0 flex items-center justify-center'
                    aria-label='Watch featured video on YouTube'
                  >
                    <span className='inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg backdrop-blur-sm'>
                      <Play className='ml-1 h-6 w-6 fill-current' />
                    </span>
                  </a>
                </div>
                <div className='flex items-center justify-between gap-3 px-4 py-3'>
                  <p className='line-clamp-2 text-[14px] font-semibold text-gray-900'>
                    {videoMeta[activeVideoId]?.title || 'Latest video'}
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-gray-800'
                  >
                    Watch
                    <ExternalLink className='h-3.5 w-3.5' />
                  </a>
                </div>
              </div>
            ) : null}

            {!isLoading && resolvedVideoIds.length > 0 ? (
              <div
                ref={sliderRef}
                className='mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
              >
                {resolvedVideoIds.map((videoId, index) => (
                  <button
                    key={videoId}
                    type='button'
                    onClick={() => setActiveVideoId(videoId)}
                    className={`group relative w-[72vw] shrink-0 snap-start overflow-hidden rounded-[16px] border text-left transition sm:w-[360px] ${
                      activeVideoId === videoId
                        ? 'border-red-500 shadow-[0_0_0_2px_rgba(239,68,68,0.15)]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className='relative aspect-video w-full overflow-hidden bg-gray-100'>
                      <img
                        src={thumbnailUrl(videoId)}
                        alt={videoMeta[videoId]?.title || `Recent video ${index + 1}`}
                        loading='lazy'
                        className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-gray-900/65 via-transparent to-transparent' />
                      <span className='absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-sm'>
                        <Play className='ml-0.5 h-4 w-4 fill-current' />
                      </span>
                    </div>
                    <div className='px-4 py-3'>
                      <p className='line-clamp-2 text-[14px] font-semibold text-gray-900'>
                        {videoMeta[videoId]?.title || `Recent Video ${index + 1}`}
                      </p>
                      <p className='mt-1 text-[12px] font-medium text-gray-500'>
                        {videoMeta[videoId]?.authorName || 'YouTube'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : null}

            {!isLoading && resolvedVideoIds.length > 0 ? (
              <div className='mt-4 flex items-center justify-center gap-2 md:hidden'>
                <button
                  type='button'
                  onClick={() => scrollSlider('left')}
                  className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50'
                  aria-label='Previous videos'
                >
                  <ChevronLeft className='h-5 w-5' />
                </button>
                <button
                  type='button'
                  onClick={() => scrollSlider('right')}
                  className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50'
                  aria-label='Next videos'
                >
                  <ChevronRight className='h-5 w-5' />
                </button>
              </div>
            ) : null}

            {!isLoading && resolvedVideoIds.length === 0 ? (
              <div className='flex items-center justify-center rounded-[16px] border border-dashed border-gray-300 bg-white px-6 py-12 text-center'>
                <p className='text-[15px] text-gray-500'>
                  Please visit our channel directly to watch videos.
                </p>
              </div>
            ) : null}
          </div>

          <div ref={discoveryNodeRef} className='pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0' aria-hidden='true' />
          <div ref={liveProbeNodeRef} className='pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0' aria-hidden='true' />
        </div>
      </div>
    </section>
  )
}

export default YoutubeShowcaseSection
