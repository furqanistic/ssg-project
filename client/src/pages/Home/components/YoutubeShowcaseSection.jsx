import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, CircleDot, ExternalLink, Play, Radio, RefreshCw, Youtube } from 'lucide-react'
import { useYoutubeFeedQuery } from '@/hooks/useYoutubeFeed'

const FALLBACK_CHANNEL_ID = 'UCs953CyNH7x8SfZ-a2jAv6A'
const FALLBACK_CHANNEL_URL = `https://www.youtube.com/channel/${FALLBACK_CHANNEL_ID}`
const YOUTUBE_ID_REGEX = /^[A-Za-z0-9_-]{11}$/

const isYoutubeId = (value) => typeof value === 'string' && YOUTUBE_ID_REGEX.test(value)

const extractYoutubeIdFromUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return ''
  }

  try {
    const parsedUrl = new URL(url)
    const directVideoId = parsedUrl.searchParams.get('v')

    if (isYoutubeId(directVideoId)) {
      return directVideoId
    }

    const pathSegments = parsedUrl.pathname.split('/').filter(Boolean)
    const youtubePathIdIndex = pathSegments.findIndex((segment) => ['shorts', 'embed', 'live', 'v'].includes(segment))
    const youtubePathId = youtubePathIdIndex >= 0 ? pathSegments[youtubePathIdIndex + 1] : ''

    if (isYoutubeId(youtubePathId)) {
      return youtubePathId
    }

    const shortUrlId = parsedUrl.hostname.includes('youtu.be') ? pathSegments[0] : ''
    if (isYoutubeId(shortUrlId)) {
      return shortUrlId
    }
  } catch {
    const fallbackMatch = url.match(/(?:[?&]v=|youtu\.be\/|\/shorts\/|\/embed\/|\/live\/)([A-Za-z0-9_-]{11})/)
    return fallbackMatch?.[1] || ''
  }

  return ''
}

const extractYoutubeId = (video) => {
  const candidateIds = [
    video?.id,
    video?.id?.videoId,
    video?.videoId,
    video?.resourceId?.videoId,
    video?.snippet?.resourceId?.videoId,
    extractYoutubeIdFromUrl(video?.youtubeUrl),
  ]

  const validId = candidateIds.find(isYoutubeId)
  return validId || ''
}

const buildYoutubeThumbnailUrl = (videoId, quality = 'hqdefault.jpg') => {
  if (!isYoutubeId(videoId)) {
    return ''
  }

  return `https://i.ytimg.com/vi/${videoId}/${quality}`
}

const formatDate = (isoDate) => {
  if (!isoDate) {
    return ''
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoDate))
}

const normalizeVideo = (video) => {
  const id = extractYoutubeId(video)

  return {
    ...video,
    id,
    thumbnail: video?.thumbnail || buildYoutubeThumbnailUrl(id),
    youtubeUrl: video?.youtubeUrl || (id ? `https://www.youtube.com/watch?v=${id}` : FALLBACK_CHANNEL_URL),
    title: video?.title || 'YouTube Video',
    publishedAt: video?.publishedAt || null,
    isLive: Boolean(video?.isLive),
    isUpcoming: Boolean(video?.isUpcoming),
  }
}

const onThumbnailError = (event, videoId) => {
  const image = event.currentTarget
  const fallbackOrder = ['maxresdefault.jpg', 'hqdefault.jpg', 'mqdefault.jpg', 'default.jpg']

  if (!isYoutubeId(videoId)) {
    return
  }

  const currentIndex = Number(image.dataset.fallbackIndex || '0')

  if (currentIndex >= fallbackOrder.length) {
    return
  }

  image.dataset.fallbackIndex = String(currentIndex + 1)
  image.src = buildYoutubeThumbnailUrl(videoId, fallbackOrder[currentIndex])
}

const YoutubeShowcaseSection = () => {
  const { data, isPending, isFetching, isError, refetch } = useYoutubeFeedQuery()
  const scrollContainerRef = useRef(null)

  const feed = data ?? {
    channelUrl: FALLBACK_CHANNEL_URL,
    liveNow: null,
    items: [],
  }

  const videos = (feed.items ?? []).map(normalizeVideo)
  const liveNow = feed.liveNow ? normalizeVideo(feed.liveNow) : null

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 5)
    }
  }

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [videos])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current
      const scrollAmount = clientWidth * 0.8 // Scroll 80% of container width
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className='bg-gray-50 px-4 pb-12 pt-12 md:px-6 md:pb-16 md:pt-16'>
      <div className='mx-auto w-full max-w-[1280px]'>
        <div className='relative overflow-hidden rounded-[24px] border border-gray-200/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-8 lg:p-10'>
          
          <div className='pointer-events-none absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-red-500/5 blur-[100px]' aria-hidden='true' />
          <div className='pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]' aria-hidden='true' />

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
                Watch recent uploads and join us live on our official YouTube channel. Stay connected with the latest updates from the Gurudwara.
              </p>
            </div>

            <div className='flex items-center gap-3'>
              {!isPending && videos.length > 0 && (
                <div className='hidden items-center gap-2 md:flex'>
                  <button
                    type='button'
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700'
                    aria-label='Previous videos'
                  >
                    <ChevronLeft className='h-5 w-5' />
                  </button>
                  <button
                    type='button'
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700'
                    aria-label='Next videos'
                  >
                    <ChevronRight className='h-5 w-5' />
                  </button>
                </div>
              )}

              <a
                href={feed.channelUrl ?? FALLBACK_CHANNEL_URL}
                target='_blank'
                rel='noreferrer'
                className='inline-flex h-11 items-center gap-2 rounded-full bg-gray-900 px-5 text-[15px] font-medium text-white shadow-sm transition hover:bg-gray-800 hover:shadow-md'
              >
                Visit Channel
                <ExternalLink className='h-4 w-4' />
              </a>
            </div>
          </div>

          <div className='relative z-10 mt-8'>
            {liveNow ? (
              <a
                href={liveNow.youtubeUrl}
                target='_blank'
                rel='noreferrer'
                className='group flex flex-col justify-between gap-4 rounded-[16px] border border-red-200 bg-gradient-to-r from-red-50 to-white px-5 py-4 transition hover:border-red-300 md:flex-row md:items-center'
              >
                <div className='flex items-center gap-4'>
                  <span className='inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide text-white shadow-sm shadow-red-600/20'>
                    <span className='h-2 w-2 animate-pulse rounded-full bg-white' />
                    Live Now
                  </span>
                  <p className='line-clamp-1 text-[15px] font-semibold text-red-950 md:text-[16px]'>
                    {liveNow.title}
                  </p>
                </div>

                <span className='inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-red-600 transition group-hover:text-red-700'>
                  Watch Broadcast
                  <ExternalLink className='h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </span>
              </a>
            ) : (
              <div className='flex flex-col justify-between gap-4 rounded-[16px] border border-gray-200 bg-gray-50/50 px-5 py-4 sm:flex-row sm:items-center'>
                <div className='flex items-center gap-3 text-[14px] text-gray-500 md:text-[15px]'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-200/60'>
                    <Radio className='h-4 w-4 text-gray-500' />
                  </div>
                  Live broadcast is currently offline. Watch the newest videos below.
                </div>
                <button
                  type='button'
                  onClick={() => refetch()}
                  className='inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 shadow-sm transition hover:bg-gray-50'
                >
                  <RefreshCw className={`h-3.5 w-3.5 text-gray-500 ${isFetching ? 'animate-spin' : ''}`} />
                  Refresh Feed
                </button>
              </div>
            )}
          </div>

          <div className='relative z-10 mt-8'>
            {isPending ? (
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

            {isError && videos.length === 0 ? (
              <div className='flex items-center justify-center rounded-[16px] border border-gray-200 bg-gray-50 px-6 py-12 text-center'>
                <p className='text-[15px] text-gray-500'>
                  We are syncing videos from YouTube. Please check again in a moment.
                </p>
              </div>
            ) : null}

            {!isPending && !isError && videos.length === 0 ? (
              <div className='flex items-center justify-center rounded-[16px] border border-dashed border-gray-300 bg-white px-6 py-12 text-center'>
                <p className='text-[15px] text-gray-500'>
                  Videos will be visible here shortly.
                </p>
              </div>
            ) : null}

            {!isPending && videos.length > 0 ? (
              <div 
                ref={scrollContainerRef}
                onScroll={updateScrollState}
                className='flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
              >
                {videos.map((video, index) => (
                  <a
                    key={video.id || video.youtubeUrl || `${video.title}-${index}`}
                    href={video.youtubeUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='group relative flex w-[85vw] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]'
                  >
                    <div className='relative aspect-video w-full overflow-hidden bg-gray-100'>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        loading='lazy'
                        onError={(event) => onThumbnailError(event, video.id)}
                        className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                      />

                      <div className='absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100' />

                      <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                        <div className='flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg backdrop-blur-sm'>
                          <Play className='h-6 w-6 ml-1 fill-current' />
                        </div>
                      </div>

                      <div className='absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-sm transition-transform duration-300 group-hover:scale-0'>
                        <Play className='h-4 w-4 ml-0.5 fill-current' />
                      </div>

                      {video.isLive ? (
                        <span className='absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm'>
                          <CircleDot className='h-3 w-3' />
                          Live
                        </span>
                      ) : null}

                      {video.isUpcoming ? (
                        <span className='absolute left-3 top-3 inline-flex items-center rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm'>
                          Upcoming
                        </span>
                      ) : null}
                    </div>

                    <div className='flex flex-1 flex-col justify-between p-5'>
                      <div>
                        <p className='text-[13px] font-medium text-gray-500'>
                          {formatDate(video.publishedAt)}
                        </p>
                        <h3 className='mt-2 line-clamp-2 text-[16px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-600'>
                          {video.title}
                        </h3>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default YoutubeShowcaseSection
