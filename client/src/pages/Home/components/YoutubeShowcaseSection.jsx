import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Play, Youtube } from 'lucide-react'
import { axiosInstance } from '@/lib/axiosInstance'
import { motion } from 'framer-motion'

const CHANNEL_ID = 'UCs953CyNH7x8SfZ-a2jAv6A'
const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`
const UPLOADS_PLAYLIST_ID = CHANNEL_ID.startsWith('UC') ? `UU${CHANNEL_ID.slice(2)}` : ''
const MAX_VIDEOS = 10
const DISCOVERY_TIMEOUT_MS = 12_000
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
  const { data: payload } = await axiosInstance.get(
    `https://www.youtube.com/oembed?url=${watchUrl}&format=json`,
  )

  return {
    title: payload?.title || 'YouTube Video',
    authorName: payload?.author_name || 'YouTube',
  }
}

const YoutubeShowcaseSection = () => {
  const discoveryNodeRef = useRef(null)
  const discoveryPlayerRef = useRef(null)
  const sliderRef = useRef(null)

  const [videoIds, setVideoIds] = useState([])
  const [activeVideoId, setActiveVideoId] = useState(FALLBACK_VIDEO_IDS[0])
  const [isLoading, setIsLoading] = useState(true)
  const [videoMeta, setVideoMeta] = useState({})
  const [imgLoaded, setImgLoaded] = useState({})

  const resolvedVideoIds = videoIds.length > 0 ? videoIds : FALLBACK_VIDEO_IDS.slice(0, MAX_VIDEOS)

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

    const boot = async () => {
      if (!UPLOADS_PLAYLIST_ID || !discoveryNodeRef.current) {
        if (isMounted) {
          stopDiscoveryLoading()
        }
        return
      }

      try {
        discoveryTimeoutId = window.setTimeout(() => {
          stopDiscoveryLoading()
        }, DISCOVERY_TIMEOUT_MS)

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
      } catch {
        if (isMounted) {
          stopDiscoveryLoading()
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

      if (discoveryTimeoutId) {
        window.clearTimeout(discoveryTimeoutId)
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
    <section className='relative bg-gray-50 px-4 py-12 md:px-6 md:py-16 lg:py-20 overflow-hidden'>
      <div className='relative mx-auto w-full max-w-[1280px]'>

        {/* Header */}
        <div className='flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-8 mb-8 md:mb-12'>
          <div className='md:col-span-8'>
            <div className='inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 md:px-3 md:py-1 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-red-600 ring-1 ring-red-600/10 bg-red-50'>
              <Youtube className='h-2.5 w-2.5 md:h-3 md:w-3' />
              <span className='flex items-center gap-1.5'>
                <span className='relative flex h-1.5 w-1.5 md:h-2 md:w-2'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75' />
                  <span className='relative inline-flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-red-600' />
                </span>
                BROADCASTS
              </span>
            </div>
            <h2 className='mt-3 md:mt-5 text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900'>
              Latest Kirtan & Streams
            </h2>
            <p className='mt-2 md:mt-4 text-sm md:text-lg leading-relaxed text-gray-500 max-w-2xl'>
              Watch recent uploads and join us live on our official YouTube channel.
            </p>
          </div>

          <div className='md:col-span-4 flex items-end md:justify-end'>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={CHANNEL_URL}
              target='_blank'
              rel='noreferrer'
              className='group inline-flex items-center gap-3 md:gap-5 rounded-full bg-gray-900 pl-4 md:pl-6 pr-1.5 md:pr-2 py-1.5 md:py-2 text-[11px] md:text-[13px] font-bold text-white transition-all duration-700 ease-[0.32,0.72,0,1] hover:bg-gray-800'
            >
              VISIT CHANNEL
              <div className='flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-700 group-hover:rotate-12 group-hover:bg-white/20'>
                <ExternalLink className='h-3 w-3 md:h-4 md:w-4 text-white' />
              </div>
            </motion.a>
          </div>
        </div>

        <div className='relative'>

          {isLoading ? (
            <div className='grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='overflow-hidden rounded-xl md:rounded-2xl border border-gray-100 bg-white p-3 md:p-4'>
                  <div className='relative aspect-video w-full overflow-hidden rounded-lg md:rounded-xl bg-gray-100'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent' />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {!isLoading && resolvedVideoIds.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 md:py-20 text-center'>
              <Youtube className='h-8 w-8 md:h-12 md:w-12 text-gray-300 mb-3 md:mb-4' />
              <p className='text-sm md:text-base text-gray-400 font-medium'>No videos available at the moment.</p>
            </div>
          ) : null}

          {!isLoading && activeVideoId && resolvedVideoIds.length > 0 ? (
            <div className='flex flex-col gap-6 md:gap-10'>

              {/* Hero Video */}
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-start'>
                <div className='lg:col-span-9'>
                  <div className='group relative overflow-hidden rounded-xl md:rounded-[2rem] bg-gray-100 aspect-video w-full ring-1 ring-gray-900/5'>
                    <img
                      src={thumbnailUrl(activeVideoId, 'maxresdefault.jpg')}
                      alt={videoMeta[activeVideoId]?.title || 'Featured'}
                      loading='lazy'
                      onLoad={() => setImgLoaded((p) => ({ ...p, [activeVideoId]: true }))}
                      className={`h-full w-full object-cover transition-all duration-1000 group-hover:scale-105 ${
                        imgLoaded[activeVideoId] ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700' />

                    <a
                      href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                      target='_blank'
                      rel='noreferrer'
                      className='absolute inset-0 flex items-center justify-center'
                    >
                      <div className='flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-full bg-white text-black transition-all duration-700 group-hover:scale-110 active:scale-95 ring-1 ring-gray-900/5'>
                        <Play className='ml-0.5 md:ml-1 h-5 w-5 md:h-8 md:w-8 fill-current text-red-600' />
                      </div>
                    </a>
                  </div>
                </div>

                <div className='lg:col-span-3 flex flex-col gap-3 md:gap-5 lg:pt-4'>
                  <div>
                    <span className='text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]'>NOW PLAYING</span>
                    <h3 className='mt-2 md:mt-3 text-base md:text-xl font-bold text-gray-900 leading-tight line-clamp-3'>
                      {videoMeta[activeVideoId]?.title || 'Latest video'}
                    </h3>
                    <p className='mt-2 md:mt-3 text-[11px] md:text-xs text-gray-500 font-medium'>
                      {videoMeta[activeVideoId]?.authorName || 'Singh Sabha Gurdwara'}
                    </p>
                  </div>
                  <div className='h-[2px] w-8 md:w-10 bg-red-600' />
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                    target='_blank'
                    rel='noreferrer'
                    className='group inline-flex items-center gap-1.5 md:gap-2 text-[10px] md:text-[12px] font-bold text-gray-900 uppercase tracking-widest hover:text-red-600 transition-colors'
                  >
                    WATCH ON YOUTUBE
                    <ExternalLink className='h-3 w-3 md:h-3.5 md:w-3.5 transition-all group-hover:translate-x-1' />
                  </a>
                </div>
              </div>

              {/* Slider */}
              <div className='pt-6 md:pt-10 border-t border-gray-200/60'>
                <div className='flex items-center justify-between mb-4 md:mb-6'>
                  <h4 className='text-sm md:text-base font-bold text-gray-900 tracking-wide'>RECENT BROADCASTS</h4>
                  <div className='flex items-center gap-1.5 md:gap-2'>
                    <button
                      type='button'
                      onClick={() => scrollSlider('left')}
                      className='inline-flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full ring-1 ring-gray-900/10 bg-white text-gray-600 transition-all hover:bg-gray-900 hover:text-white active:scale-95'
                    >
                      <ChevronLeft className='h-4 w-4 md:h-5 md:w-5' />
                    </button>
                    <button
                      type='button'
                      onClick={() => scrollSlider('right')}
                      className='inline-flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full ring-1 ring-gray-900/10 bg-white text-gray-600 transition-all hover:bg-gray-900 hover:text-white active:scale-95'
                    >
                      <ChevronRight className='h-4 w-4 md:h-5 md:w-5' />
                    </button>
                  </div>
                </div>

                <div
                  ref={sliderRef}
                  className='flex gap-3 md:gap-6 overflow-x-auto pb-4 md:pb-6 px-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth'
                >
                  {resolvedVideoIds.map((videoId, index) => {
                    const isActive = videoId === activeVideoId
                    return (
                      <button
                        key={videoId}
                        type='button'
                        onClick={() => setActiveVideoId(videoId)}
                        className={`group flex flex-col w-[200px] sm:w-[260px] md:w-[320px] shrink-0 snap-start gap-2 md:gap-4 text-left transition-all duration-500 ${
                          isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div className={`relative aspect-video w-full overflow-hidden rounded-xl md:rounded-[1.5rem] bg-gray-100 ring-1 transition-all duration-500 ${
                          isActive
                            ? 'ring-red-600/40'
                            : 'ring-gray-900/5 group-hover:ring-gray-900/20'
                        }`}>
                          <img
                            src={thumbnailUrl(videoId)}
                            alt={videoMeta[videoId]?.title || `Recent`}
                            loading='lazy'
                            className='h-full w-full object-cover transition-all duration-700 group-hover:scale-105'
                          />

                          {isActive && (
                            <div className='absolute top-2 left-2 md:top-3 md:left-3 rounded-full bg-red-600 px-1.5 py-0.5 md:px-2.5 md:py-0.5 text-[8px] md:text-[9px] font-bold text-white uppercase tracking-wider'>
                              Now Playing
                            </div>
                          )}

                          <div className={`absolute bottom-2 right-2 md:bottom-3 md:right-3 flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 ${
                            isActive ? 'opacity-100 scale-110' : 'opacity-0'
                          }`}>
                            <Play className='ml-0.5 h-3 w-3 md:h-4 md:w-4 fill-current text-red-600' />
                          </div>
                        </div>
                        <div className='flex flex-col px-0.5 md:px-1'>
                          <p className={`line-clamp-2 text-xs md:text-[15px] font-bold leading-snug transition-colors ${
                            isActive ? 'text-red-600' : 'text-gray-900 group-hover:text-red-600'
                          }`}>
                            {videoMeta[videoId]?.title || `Recent Video ${index + 1}`}
                          </p>
                          <p className='mt-1 md:mt-2 text-[9px] md:text-[11px] font-medium text-gray-400 uppercase tracking-wide'>
                            {videoMeta[videoId]?.authorName || 'YouTube'}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>
          ) : null}

        </div>

        <div ref={discoveryNodeRef} className='pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0' aria-hidden='true' />
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

export default YoutubeShowcaseSection
