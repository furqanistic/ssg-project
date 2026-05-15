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
  const [playingVideoId, setPlayingVideoId] = useState(null)
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
    <section className='relative bg-white px-5 py-12 md:px-8 md:py-16 overflow-hidden'>
      <div className='relative mx-auto w-full max-w-[1280px]'>

        <div className='flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-6 mb-6 md:mb-8'>
          <div className='md:col-span-8'>
            <div className='inline-flex items-center gap-2 rounded-full border border-[#f6ab3c]/20 bg-[#f6ab3c]/6 px-2.5 py-1'>
              <Youtube className='h-2.5 w-2.5 md:h-3 md:w-3 text-[#f6ab3c]' />
              <span className='flex items-center gap-1.5'>
                <span className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c]' />
                <span className='text-[9px] font-medium uppercase tracking-[0.2em] text-[#f6ab3c]'>BROADCASTS</span>
              </span>
            </div>
            <h2 className='mt-3 text-2xl font-medium leading-[1.08] tracking-tighter text-[#111318] sm:text-3xl md:text-4xl'>
              Latest Kirtan & Streams
            </h2>
            <p className='mt-1.5 max-w-2xl text-[14px] font-normal leading-[1.5] text-[#5a677a] md:text-[15px]'>
              Watch recent uploads and join us live on our official YouTube channel.
            </p>
          </div>

          <div className='md:col-span-4 flex items-end md:justify-end'>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href={CHANNEL_URL}
              target='_blank'
              rel='noreferrer'
              className='group inline-flex h-[40px] items-center gap-2.5 rounded-full bg-[#f09816] pl-4 pr-1.5 text-[10px] font-medium text-white transition-all duration-500 hover:bg-[#f1a52e] md:h-[44px] md:pl-5 md:pr-2 md:text-[11px]'
            >
              VISIT CHANNEL
              <span className='grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:scale-110 md:h-7 md:w-7'>
                <ExternalLink className='h-2.5 w-2.5 md:h-3 md:w-3' />
              </span>
            </motion.a>
          </div>
        </div>

        <div className='relative'>

          {isLoading ? (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='overflow-hidden rounded-2xl border border-[#111318]/[0.15] bg-white/50 p-3'>
                  <div className='relative aspect-video w-full overflow-hidden rounded-xl bg-[#111318]/5'>
                    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent' />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {!isLoading && resolvedVideoIds.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12 text-center'>
              <Youtube className='h-8 w-8 text-[#111318]/15 mb-2' />
              <p className='text-[14px] font-medium text-[#5a677a]'>No videos available at the moment.</p>
            </div>
          ) : null}

          {!isLoading && activeVideoId && resolvedVideoIds.length > 0 ? (
            <div className='flex flex-col gap-6 md:gap-8'>

              <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-start'>
                <div className='lg:col-span-8'>
                  {playingVideoId === activeVideoId ? (
                    <div className='relative overflow-hidden rounded-2xl border border-[#111318]/10 aspect-video'>
                      <iframe
                        src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                        title={videoMeta[activeVideoId]?.title || 'YouTube video player'}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        className='absolute inset-0 h-full w-full'
                      />
                    </div>
                  ) : (
                    <div className='group relative overflow-hidden rounded-2xl bg-[#111318]/5 border border-[#111318]/10'>
                      <img
                        src={thumbnailUrl(activeVideoId, 'maxresdefault.jpg')}
                        alt={videoMeta[activeVideoId]?.title || 'Featured'}
                        loading='lazy'
                        onLoad={() => setImgLoaded((p) => ({ ...p, [activeVideoId]: true }))}
                        className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03] ${
                          imgLoaded[activeVideoId] ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700' />

                      <button
                        type='button'
                        onClick={() => setPlayingVideoId(activeVideoId)}
                        className='absolute inset-0 flex items-center justify-center'
                      >
                        <div className='flex h-14 w-14 items-center justify-center rounded-full bg-white/90 transition-all duration-500 hover:scale-110 active:scale-95 md:h-16 md:w-16'>
                          <Play className='ml-0.5 h-5 w-5 fill-[#f09816] text-[#f09816] md:h-6 md:w-6' />
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                <div className='lg:col-span-4 flex flex-col gap-3 lg:pt-3'>
                  <div>
                    <span className='text-[9px] font-medium uppercase tracking-[0.2em] text-[#5a677a]/70'>NOW PLAYING</span>
                    <h3 className='mt-1.5 text-base font-medium leading-tight text-[#111318] line-clamp-3 md:text-lg'>
                      {videoMeta[activeVideoId]?.title || 'Latest video'}
                    </h3>
                    <p className='mt-1 text-[11px] font-medium text-[#5a677a]'>
                      {videoMeta[activeVideoId]?.authorName || 'Singh Sabha Gurdwara'}
                    </p>
                  </div>
                  <div className='h-px w-6 bg-[#f6ab3c]' />
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                    target='_blank'
                    rel='noreferrer'
                    className='group inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#f09816] transition-colors duration-500 hover:text-[#f1a52e]'
                  >
                    WATCH ON YOUTUBE
                    <ExternalLink className='h-2.5 w-2.5 transition-transform duration-500 group-hover:translate-x-1' />
                  </a>
                </div>
              </div>

              <div className='pt-6 border-t border-[#111318]/[0.15] md:pt-8'>
                <div className='flex items-center justify-between mb-3 md:mb-4'>
                  <h4 className='text-[10px] font-medium uppercase tracking-[0.2em] text-[#5a677a]/80'>RECENT BROADCASTS</h4>
                  <div className='flex items-center gap-1.5'>
                    <button
                      type='button'
                      onClick={() => scrollSlider('left')}
                      className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#111318]/10 bg-white text-[#5a677a] transition-all duration-500 hover:border-[#f6ab3c]/30 hover:text-[#f09816] active:scale-[0.95] md:h-9 md:w-9'
                    >
                      <ChevronLeft className='h-3.5 w-3.5 md:h-4 md:w-4' />
                    </button>
                    <button
                      type='button'
                      onClick={() => scrollSlider('right')}
                      className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#111318]/10 bg-white text-[#5a677a] transition-all duration-500 hover:border-[#f6ab3c]/30 hover:text-[#f09816] active:scale-[0.95] md:h-9 md:w-9'
                    >
                      <ChevronRight className='h-3.5 w-3.5 md:h-4 md:w-4' />
                    </button>
                  </div>
                </div>

                <div
                  ref={sliderRef}
                  className='flex gap-3 md:gap-4 overflow-x-auto pb-2 md:pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth'
                >
                  {resolvedVideoIds.map((videoId, index) => {
                    const isActive = videoId === activeVideoId
                    return (
                      <button
                        key={videoId}
                        type='button'
                        onClick={() => {
                          setActiveVideoId(videoId)
                          setPlayingVideoId(videoId)
                        }}
                        className={`group flex flex-col w-[200px] sm:w-[240px] md:w-[300px] shrink-0 snap-start gap-2 md:gap-3 text-left transition-all duration-500 ${
                          isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                        }`}
                      >
                        <div className={`relative aspect-video w-full overflow-hidden rounded-xl bg-[#111318]/5 border transition-all duration-500 md:rounded-2xl ${
                          isActive
                            ? 'border-[#f6ab3c]/40'
                            : 'border-[#111318]/[0.15] group-hover:border-[#111318]/15'
                        }`}>
                          <img
                            src={thumbnailUrl(videoId)}
                            alt={videoMeta[videoId]?.title || `Recent`}
                            loading='lazy'
                            className='h-full w-full object-cover transition-all duration-700 group-hover:scale-105'
                          />

                          {isActive && (
                            <div className='absolute top-2 left-2 rounded-full border border-[#f6ab3c]/20 bg-[#f6ab3c]/10 px-2 py-0.5 text-[7px] font-medium uppercase tracking-[0.15em] text-[#f09816] md:top-2.5 md:left-2.5 md:text-[8px]'>
                              Now Playing
                            </div>
                          )}

                          <div className={`absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 md:bottom-2.5 md:right-2.5 md:h-8 md:w-8 ${
                            isActive ? 'opacity-100 scale-110' : 'opacity-0'
                          }`}>
                            <Play className='ml-0.5 h-2.5 w-2.5 fill-[#f09816] text-[#f09816] md:h-3 md:w-3' />
                          </div>
                        </div>
                        <div className='flex flex-col px-0.5'>
                          <p className={`line-clamp-2 text-[12px] font-medium leading-snug transition-colors duration-500 md:text-[14px] ${
                            isActive ? 'text-[#f09816]' : 'text-[#111318] group-hover:text-[#f09816]'
                          }`}>
                            {videoMeta[videoId]?.title || `Recent Video ${index + 1}`}
                          </p>
                          <p className='mt-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-[#5a677a]/60 md:text-[10px]'>
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
