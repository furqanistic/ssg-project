import React, { useEffect } from 'react'
import { ImageIcon, Radio, Video } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useSiteContentQuery } from '@/hooks/useContent'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const scrollTargets = ['photo-gallery', 'videos', 'live-kirtan']

const defaultMediaCards = [
  {
    id: 'photo-gallery',
    title: 'Photo Gallery',
    description:
      'Browse through albums organized by events, festivals, and community activities. Relive the beautiful moments from our celebrations.',
    buttonLabel: 'View Photo Albums',
    icon: ImageIcon,
    gradient: 'from-[#ff7a00] to-[#ff6200]',
    buttonClass: 'bg-[#f8a744] hover:bg-[#f29c33]',
  },
  {
    id: 'videos',
    title: 'Videos',
    description:
      'Watch recordings of Kirtan, educational sessions, event highlights, and special programs from our Gurudwara.',
    buttonLabel: 'Watch Videos',
    icon: Video,
    gradient: 'from-[#2c76f1] to-[#2664d4]',
    buttonClass: 'bg-[#3559a7] hover:bg-[#2f4f96]',
  },
  {
    id: 'live-kirtan',
    title: 'Live Kirtan',
    description:
      'Listen to live Kirtan streaming from our Gurudwara. Join us virtually for daily prayers and weekend programs.',
    buttonLabel: 'Listen Live',
    icon: Radio,
    gradient: 'from-[#b33cff] to-[#932ff3]',
    buttonClass: 'bg-[#a33af1] hover:bg-[#922de1]',
  },
]

const defaultUpdates = [
  {
    title: 'Vaisakhi 2026 Photo Album',
    description:
      '145 new photos from our recent Vaisakhi celebration have been added to the gallery.',
    action: 'View Album',
    actionClass: 'text-[#f39d2f] hover:text-[#ea951e]',
  },
  {
    title: 'New Educational Video Series',
    description:
      'Watch our new Gurbani Explained series to learn more about Sikh teachings and philosophy.',
    action: 'Watch Now',
    actionClass: 'text-[#2d4f9f] hover:text-[#2448b3]',
  },
]

const MediaCenterPage = () => {
  const location = useLocation()
  const { data: content } = useSiteContentQuery()
  const mediaCards = React.useMemo(() => {
    if (Array.isArray(content?.media?.cards) && content.media.cards.length > 0) {
      return content.media.cards.map((card, index) => ({
        ...defaultMediaCards[index % defaultMediaCards.length],
        ...card,
      }))
    }
    return defaultMediaCards
  }, [content])

  const updates = React.useMemo(() => {
    if (Array.isArray(content?.media?.updates) && content.media.updates.length > 0) {
      return content.media.updates.map((update, index) => ({
        ...defaultUpdates[index % defaultUpdates.length],
        ...update,
      }))
    }
    return defaultUpdates
  }, [content])

  useEffect(() => {
    const hash = location.hash.slice(1)
    if (!hash || !scrollTargets.includes(hash)) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.getElementById(hash)
    if (!target) {
      return
    }

    requestAnimationFrame(() => {
      const navbarOffset = 88
      const top =
        target.getBoundingClientRect().top + window.scrollY - navbarOffset

      window.scrollTo({ top, behavior: 'smooth' })
    })
  }, [location.hash])

  return (
    <div className='min-h-screen bg-white font-["Manrope","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='bg-[#3567c4] px-4 pb-16 pt-28 text-white md:px-6 md:pb-18 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[900px] text-center'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                Media Center
              </h1>
              <p className='mx-auto mt-5 max-w-[840px] text-[17px] leading-[1.65] text-white/90 md:text-[18px]'>
                Explore our collection of photos, videos, and live Kirtan
                streaming. Stay connected with our community through visual
                memories and spiritual content.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto grid max-w-[1280px] grid-cols-1 gap-6 xl:grid-cols-3'>
          {mediaCards.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.id}
                id={card.id}
                className='overflow-hidden rounded-[18px] border border-[#dbe1ea] bg-white shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
              >
                <div
                  className={`flex h-[220px] items-center justify-center bg-gradient-to-r ${card.gradient}`}
                >
                  <div className='flex h-20 w-20 items-center justify-center rounded-full bg-white/18 text-white'>
                    <Icon className='h-9 w-9 stroke-[2]' />
                  </div>
                </div>

                <div className='px-6 py-6'>
                  <h2 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318] md:text-[21px]'>
                    {card.title}
                  </h2>
                  <p className='mt-4 text-[15px] leading-[1.65] text-[#516075] md:text-[16px]'>
                    {card.description}
                  </p>
                  <button
                    type='button'
                    className={`mt-6 inline-flex h-10 w-full items-center justify-center rounded-[10px] text-[15px] font-semibold text-white transition ${card.buttonClass}`}
                  >
                    {card.buttonLabel}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <h2 className='text-center text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
            Latest Updates
          </h2>

          <div className='mt-10 grid grid-cols-1 gap-8 xl:grid-cols-2'>
            {updates.map((update, index) => (
              <article
                key={update.title}
                className='overflow-hidden rounded-[18px] border border-[#dbe1ea] bg-white shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
              >
                <div className='h-[340px] bg-[#edf1f7]' />
                <div className='px-6 py-6'>
                  <h3 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318]'>
                    {update.title}
                  </h3>
                  <p className='mt-4 text-[15px] leading-[1.65] text-[#516075] md:text-[16px]'>
                    {update.description}
                  </p>
                  <button
                    type='button'
                    className={`mt-5 text-[15px] font-semibold transition ${update.actionClass}`}
                  >
                    {update.action} {index === 0 ? '->' : '->'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default MediaCenterPage
