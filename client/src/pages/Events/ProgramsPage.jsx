import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Clock3, MapPin, Sparkles, Sun, Users, Trophy, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEventsContentQuery } from '@/hooks/useEventsContent'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const tabs = ['all', 'daily', 'weekly', 'monthly', 'yearly']

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
}

const SectionLabel = ({ children, light = false }) => (
  <div className={`mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${light ? 'text-white/40' : 'text-[#071544]/40'} md:mb-4`}>
    <span className={`h-[1px] w-4 ${light ? 'bg-white/20' : 'bg-[#071544]/20'}`} />
    {children}
  </div>
)

const ProgramsPage = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { events } = useEventsContentQuery()

  const currentTab = tabs.includes(location.hash.slice(1))
    ? location.hash.slice(1)
    : 'all'

  useEffect(() => {
    const hash = location.hash.slice(1)
    if (!hash) {
      navigate('/events/programs#all', { replace: true })
      return
    }

    const target = document.getElementById('events-tabs')
    if (!target) return

    requestAnimationFrame(() => {
      const navbarOffset = 80
      const top = target.getBoundingClientRect().top + window.scrollY - navbarOffset
      window.scrollTo({ top, behavior: 'smooth' })
    })
  }, [location.hash, navigate])

  const filteredEvents =
    currentTab === 'all'
      ? events
      : events.filter((event) => event.category === currentTab)

  return (
    <div className='min-h-screen bg-[#fafafa] font-["Outfit",sans-serif] text-[#111318] selection:bg-[#f6ab3c]/30'>
      <NavbarSection />

      {/* Hero Section - Refined & Flat */}
      <section className='relative isolate overflow-hidden bg-[#071544] pt-[136px] pb-10 md:pt-[140px] md:pb-20'>
        {/* Subtle Architectural Grid */}
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
              Community Engagement
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className='text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'
            >
              {t('eventsPage.heading')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='mx-auto mt-4 max-w-2xl text-balance text-[15px] font-normal leading-relaxed text-white/70 md:mt-6 md:text-lg'
            >
              {t('eventsPage.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>
      {/* Events Browser */}
      <section id='events-tabs' className='relative z-20 -mt-6 px-4 pb-16 md:-mt-8 md:px-6 md:pb-20'>
        <div className='container mx-auto max-w-[1200px]'>
          <div className='rounded-2xl border border-[#071544]/[0.15] bg-white p-3 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.02)] sm:p-4 md:rounded-3xl md:p-8'>
            <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8'>
              <div className='max-w-xl'>
                <SectionLabel>Live Calendar</SectionLabel>
                <h2 className='text-2xl font-semibold tracking-tight text-[#071544] md:text-4xl'>
                  {t('eventsPage.programsTitle')}
                </h2>
              </div>

              {/* Tab Switcher - Premium & Compact */}
              <div className='flex flex-wrap gap-1 rounded-lg bg-[#f8f9fa] p-1 border border-black/[0.04] md:rounded-xl'>
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => navigate(`/events/programs#${tab}`)}
                    className={`relative rounded-md px-3 py-1.5 text-[11px] font-medium capitalize transition-all duration-300 md:rounded-lg md:px-4 md:py-2 md:text-[12px] ${
                      currentTab === tab
                        ? 'bg-[#f6ab3c] text-white'
                        : 'text-[#5a677a] hover:text-[#071544] hover:bg-black/[0.02]'
                    }`}
                  >
                    {tab === 'all' ? t('eventsPage.tabs.all') : t(`eventsPage.tabs.${tab}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            <div className='mt-8 md:mt-10'>
              {filteredEvents.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-black/[0.03] rounded-2xl md:py-20 md:rounded-3xl'>
                  <div className='mb-3 rounded-full bg-[#f8f9fa] p-3 text-[#5a677a]/30 md:mb-4 md:p-4'>
                    <CalendarDays className='h-6 w-6 md:h-8 md:w-8' />
                  </div>
                  <p className='text-xs font-medium text-[#5a677a] md:text-sm'>
                    No events scheduled for this period.
                  </p>
                  <p className='mt-1 text-[10px] text-[#5a677a]/60 md:text-xs'>
                    Please check back later for updates.
                  </p>
                </div>
              ) : (
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6'>
                  {filteredEvents.map((event, index) => (
                    <motion.article
                      key={event.id}
                      custom={index}
                      initial='hidden'
                      whileInView='visible'
                      viewport={{ once: true, margin: '-40px' }}
                      variants={cardVariants}
                      className='group flex flex-col overflow-hidden rounded-xl border border-[#071544]/[0.15] bg-white transition-all duration-500 hover:border-[#f6ab3c]/40 hover:shadow-[0_32px_64px_-16px_rgba(7,21,68,0.06)] md:rounded-2xl'
                    >
                      {/* Image Container */}
                      <div className='relative aspect-[16/9] overflow-hidden bg-[#f8f9fa]'>
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                            loading='lazy'
                          />
                        ) : (
                          <div className='flex h-full w-full items-center justify-center text-[#5a677a]/10'>
                            <CalendarDays className='h-10 w-10' />
                          </div>
                        )}
                        <div className='absolute top-3 left-3 rounded-full border border-[#071544]/10 bg-white/80 backdrop-blur-md px-3 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-[#071544]/70 md:top-4 md:left-4 md:px-3.5 md:py-1 md:text-[10px]'>
                          {event.category || 'Featured'}
                        </div>
                      </div>

                      {/* Content */}
                      <div className='flex flex-1 flex-col p-4 md:p-6'>
                        <h3 className='text-lg font-semibold leading-tight text-[#071544] transition-colors group-hover:text-[#f6ab3c] md:text-xl'>
                          {event.title}
                        </h3>
                        
                        <div className='mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-[#5a677a] md:mt-5 md:text-[13px]'>
                          <div className='flex items-center gap-1.5'>
                            <CalendarDays className='h-3 w-3 text-[#f6ab3c]' />
                            <span>{event.date}</span>
                          </div>
                          <div className='flex items-center gap-1.5'>
                            <Clock3 className='h-3 w-3 text-[#f6ab3c]' />
                            <span>{event.time}</span>
                          </div>
                        </div>

                        <div className='mt-2 flex items-center gap-1.5 text-[12px] text-[#5a677a] md:mt-3 md:text-[13px]'>
                          <MapPin className='h-3 w-3 text-[#f6ab3c]' />
                          <span className='truncate'>{event.location}</span>
                        </div>

                        <p className='mt-3 line-clamp-2 text-[13px] font-normal leading-relaxed text-[#5a677a]/80 md:mt-4 md:line-clamp-3 md:text-[14px]'>
                          {event.description}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Programs - Refined Top Layout */}
      <section id='programs' className='bg-white px-4 py-20 md:px-6 md:py-32'>
        <div className='container mx-auto max-w-[1200px]'>
          <div className='mb-12 md:mb-20'>
            <SectionLabel>Institutional</SectionLabel>
            <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12'>
              <div className='max-w-2xl'>
                <h2 className='text-4xl font-semibold tracking-tight text-[#071544] md:text-5xl lg:text-6xl'>
                  Our Core <span className='text-[#f6ab3c]'>Programs</span>
                </h2>
                <p className='mt-6 text-[15px] font-normal leading-relaxed text-[#5a677a] md:text-lg'>
                  Discover our range of spiritual, educational, and community initiatives designed to foster growth and connection for all generations.
                </p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8'>
            {t('eventsPage.highlights', { returnObjects: true }).map((program, index) => {
              const icons = [Sun, CalendarDays, Users, Trophy]
              const Icon = icons[index % icons.length] || Sparkles
              
              return (
                <motion.article
                  key={program.title}
                  custom={index}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className='group relative flex flex-col overflow-hidden rounded-[2rem] border border-[#071544]/[0.15] bg-[#f8f9fa] p-8 transition-all duration-500 hover:border-[#f6ab3c]/40 hover:bg-white hover:shadow-[0_40px_80px_-16px_rgba(246,171,60,0.12)] md:p-10'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6ab3c]/10 text-[#f6ab3c] shadow-sm transition-all duration-500 group-hover:bg-[#f6ab3c] group-hover:text-white'>
                      <Icon className='h-7 w-7' />
                    </div>
                    <span className='text-[12px] font-bold tracking-[0.2em] text-[#071544]/20'>
                      0{index + 1}
                    </span>
                  </div>
                
                <div className='mt-10'>
                  <h3 className='text-2xl font-semibold tracking-tight text-[#071544] transition-colors duration-300 group-hover:text-[#f6ab3c] md:text-3xl'>
                    {program.title}
                  </h3>
                  <p className='mt-4 text-[15px] font-normal leading-relaxed text-[#5a677a] md:mt-5 md:text-lg'>
                    {program.description}
                  </p>
                </div>
              </motion.article>
            )})}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default ProgramsPage

