import React, { useEffect } from 'react'
import { ImageIcon, Radio, Video, ArrowRight, ExternalLink } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useSiteContentQuery } from '@/hooks/useContent'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const scrollTargets = ['photo-gallery', 'videos', 'live-kirtan']

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const SectionLabel = ({ children, light = false }) => (
  <div className={`mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] ${light ? 'text-white/40' : 'text-[#071544]/40'} md:mb-5`}>
    <span className={`h-px w-6 ${light ? 'bg-white/20' : 'bg-[#f6ab3c]/30'}`} />
    {children}
  </div>
)

const defaultMediaCardConfig = {
  'photo-gallery': {
    icon: ImageIcon,
    accent: '#f6ab3c',
    ctaUrl: 'https://www.instagram.com/ssgberlin_org/',
  },
  'videos': {
    icon: Video,
    accent: '#2c76f1',
    ctaUrl: 'https://www.youtube.com/channel/UCs953CyNH7x8SfZ-a2jAv6A',
  },
  'live-kirtan': {
    icon: Radio,
    accent: '#b33cff',
    ctaUrl: 'https://www.youtube.com/channel/UCs953CyNH7x8SfZ-a2jAv6A',
  },
}

const defaultMediaCardFallback = {
  icon: ImageIcon,
  accent: '#6366f1',
  ctaUrl: '#',
}

const defaultMediaCards = Object.values(defaultMediaCardConfig)

const MediaCenterPage = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { data: content } = useSiteContentQuery()

  const mediaCards = React.useMemo(() => {
    const translatedCards = t('mediaPage.cards', { returnObjects: true })

    if (Array.isArray(content?.media?.cards) && content.media.cards.length > 0) {
      return content.media.cards.map((card, index) => ({
        ...(defaultMediaCardConfig[card.id] ?? defaultMediaCardFallback),
        ...translatedCards[index % translatedCards.length],
        ...card,
      }))
    }

    return defaultMediaCards.map((card, index) => ({
      ...card,
      ...translatedCards[index],
    }))
  }, [content, t])

  const updates = React.useMemo(() => {
    const translatedUpdates = t('mediaPage.updates', { returnObjects: true })

    if (Array.isArray(content?.media?.updates) && content.media.updates.length > 0) {
      return content.media.updates.map((update, index) => ({
        ...translatedUpdates[index % translatedUpdates.length],
        ...update,
      }))
    }

    return translatedUpdates
  }, [content, t])

  useEffect(() => {
    const hash = location.hash.slice(1)
    if (!hash || !scrollTargets.includes(hash)) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.getElementById(hash)
    if (!target) return

    requestAnimationFrame(() => {
      const navbarOffset = 88
      const top = target.getBoundingClientRect().top + window.scrollY - navbarOffset
      window.scrollTo({ top, behavior: 'smooth' })
    })
  }, [location.hash])

  return (
    <div className='min-h-screen bg-[#fafafa] font-["Outfit",sans-serif] text-[#071544] selection:bg-[#f6ab3c]/30'>
      <div className='relative'>
        <NavbarSection />

        {/* Hero Section - Synchronized Architectural Style */}
        <section className='relative isolate overflow-hidden bg-[#071544] pt-[136px] pb-10 md:pt-[140px] md:pb-24'>
          {/* Subtle Geometric Grid */}
          <div className='absolute inset-0 z-0 opacity-[0.05]' 
               style={{ backgroundImage: 'linear-gradient(#fff 0.5px, transparent 0.5px), linear-gradient(90deg, #fff 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />
          
          <div className='container relative z-10 mx-auto px-5'>
            <div className='mx-auto max-w-4xl text-center'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#f6ab3c]/80'
              >
                <span className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c]/60' />
                Media Center
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'
              >
                {t('mediaPage.heading')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='mx-auto mt-4 max-w-2xl text-balance text-[15px] font-light leading-relaxed text-white/70 md:mt-6 md:text-lg'
              >
                {t('mediaPage.subtitle')}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Overlapping Primary Cards */}
        <section className='relative z-20 -mt-8 px-4 md:-mt-12 md:px-6'>
          <div className='container mx-auto max-w-[1200px]'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {mediaCards.map((card, index) => {
                const Icon = card.icon
                return (
                  <motion.article
                    key={card.id}
                    id={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className='group relative flex flex-col overflow-hidden rounded-[2rem] border border-[#071544]/05 bg-white p-8 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.02)] transition-all duration-500 hover:border-[#f6ab3c]/30 md:p-10'
                  >
                    <div className='flex items-center justify-between'>
                      <div 
                        className='flex h-14 w-14 items-center justify-center rounded-2xl text-white transition-all duration-500 group-hover:scale-110'
                        style={{ backgroundColor: card.accent }}
                      >
                        <Icon className='h-7 w-7' />
                      </div>
                      <ExternalLink className='h-5 w-5 text-[#071544]/10 transition-colors duration-500 group-hover:text-[#f6ab3c]' />
                    </div>

                    <div className='mt-8 flex-1'>
                      <h2 className='text-xl font-semibold tracking-tight text-[#071544] md:text-2xl'>
                        {card.title}
                      </h2>
                      <p className='mt-4 text-[15px] font-light leading-relaxed text-[#5a677a]'>
                        {card.description}
                      </p>
                    </div>

                    <div className='mt-10'>
                      <a
                        href={card.ctaUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#071544] px-6 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-500 shadow-sm active:scale-[0.98]'
                        style={{ '--hover-bg': card.accent }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = card.accent}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#071544'}
                      >
                        {card.buttonLabel}
                      </a>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Latest Updates Section */}
        <section className='py-16 md:py-24'>
          <div className='container mx-auto max-w-[1200px] px-4 md:px-6'>
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={sectionVariants}
              className='mb-12'
            >
              <SectionLabel>Recent Additions</SectionLabel>
              <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-5xl'>
                {t('mediaPage.updatesTitle')}
              </h2>
            </motion.div>

            <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12'>
              {updates.map((update, index) => (
                <motion.article
                  key={update.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className='group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-[#071544]/05 bg-white shadow-[0_40px_80px_-16px_rgba(7,21,68,0.04)] transition-all duration-500 hover:shadow-[0_40px_80px_-16px_rgba(7,21,68,0.08)]'
                >
                  <div className='p-6 md:p-8'>
                    <div className='mb-4 flex items-center gap-3'>
                      <span className='h-px w-8 bg-[#f6ab3c]/30' />
                      <span className='text-[10px] font-bold uppercase tracking-widest text-[#f6ab3c]'>New Release</span>
                    </div>
                    <h3 className='text-xl font-semibold tracking-tight text-[#071544] md:text-2xl'>
                      {update.title}
                    </h3>
                    <p className='mt-3 text-[14px] font-light leading-relaxed text-[#5a677a] md:text-base'>
                      {update.description}
                    </p>
                    <button
                      type='button'
                      className='mt-6 group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#071544] transition-all duration-500 hover:text-[#f6ab3c]'
                    >
                      {update.action}
                      <ArrowRight className='h-4 w-4 transition-transform duration-500 group-hover:translate-x-1' />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}

export default MediaCenterPage

