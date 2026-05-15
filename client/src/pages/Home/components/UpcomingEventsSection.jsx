import React from 'react'
import { ArrowRight, CalendarDays, Clock3, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useEventsContentQuery } from '@/hooks/useEventsContent'
import { motion } from 'framer-motion'

const UpcomingEventsSection = () => {
  const { t } = useTranslation()
  const { events } = useEventsContentQuery()
  const featuredEvents = events.slice(0, 3)

  const formatDescription = (text) => {
    if (!text) return null
    const parts = text.split(/([⌚◇🔸\u{1F538}])/gu)
    return parts.map((part) => {
      if (part === '⌚' || part === '◇' || part === '🔸' || part === '\u{1F538}') return null
      return part
    }).filter(Boolean).join('')
  }

  return (
    <section className='relative overflow-hidden bg-white px-6 py-14 md:px-10 md:py-18 lg:py-20'>
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(17,19,24,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, white 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, white 0%, transparent 70%)',
        }}
      />

      <div className='relative mx-auto w-full max-w-[1400px]'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12'>
          <div className='max-w-[700px]'>
            <div className='inline-flex items-center gap-2 rounded-full border border-[#111318]/[0.15] bg-[#111318]/[0.03] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-[#111318]/60'>
              <span className='h-1 w-1 rounded-full bg-[#f6ab3c]' />
              Spiritual Engagements
            </div>
            <h2 className='mt-4 text-[32px] font-medium leading-[1.06] tracking-tighter text-[#111318] sm:text-[40px] md:text-[48px] lg:text-[56px]'>
              {t('home.events.title')}
            </h2>
            <p className='mt-2 max-w-lg text-[15px] font-normal leading-relaxed text-[#5a677a] md:text-[16px]'>
              {t('home.events.subtitle')}
            </p>
          </div>
          <Link
            to='/events/programs#all'
            className='group inline-flex h-[42px] items-center gap-2.5 rounded-full bg-[#f09816] px-5 text-[12px] font-medium text-white transition-all duration-500 hover:bg-[#f1a52e] md:h-[46px] md:px-6 md:text-[13px] shrink-0'
          >
            EXPLORE ALL
            <ArrowRight className='h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5' strokeWidth={2} />
          </Link>
        </div>

        {/* Event cards */}
        <div className='grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3'>
          {featuredEvents.length > 0 ? (
            featuredEvents.map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className='group relative flex flex-col rounded-2xl border border-[#111318]/[0.15] bg-white overflow-hidden transition-all duration-500 hover:bg-[#faf8f5]'
              >
                {/* Image */}
                {event.image ? (
                  <div className='relative aspect-[16/9] overflow-hidden'>
                    <img
                      src={event.image}
                      alt={event.title}
                      className='h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03]'
                      loading='lazy'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
                    <div className='absolute bottom-3 left-3'>
                      <span className='rounded-full border border-white/15 bg-white/80 px-2.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.15em] text-[#111318]/70'>
                        {event.date}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className='aspect-[16/9] flex items-center justify-center bg-[#111318]/[0.02]'>
                    <CalendarDays className='h-8 w-8 text-[#111318]/10' strokeWidth={1} />
                  </div>
                )}

                {/* Content */}
                <div className='flex flex-1 flex-col p-6 md:p-7'>
                  <h3 className='text-[17px] font-medium leading-tight text-[#111318] transition-colors duration-500 group-hover:text-[#f6ab3c] md:text-[19px]'>
                    {event.title}
                  </h3>

                  <div className='mt-4 flex flex-col gap-2'>
                    <div className='flex items-center gap-2.5 text-[12px] font-medium text-[#5a677a]'>
                      <Clock3 className='h-3.5 w-3.5 text-[#f6ab3c]/50' strokeWidth={1.5} />
                      <span>{event.time}</span>
                    </div>
                    <div className='flex items-center gap-2.5 text-[12px] font-medium text-[#5a677a]'>
                      <MapPin className='h-3.5 w-3.5 text-[#f6ab3c]/50' strokeWidth={1.5} />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {event.description && (
                    <p className='mt-4 text-[13px] font-normal leading-relaxed text-[#5a677a]/80 line-clamp-2 md:text-[14px]'>
                      {formatDescription(event.description)}
                    </p>
                  )}

                  <div className='mt-auto pt-5'>
                    <Link
                      to='/events/programs'
                      className='group/btn inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#f09816] transition-colors duration-500 hover:text-[#f1a52e]'
                    >
                      Discovery
                      <ArrowRight className='h-3 w-3 transition-transform duration-500 group-hover/btn:translate-x-0.5' strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className='lg:col-span-3 rounded-2xl border border-[#111318]/[0.15] bg-[#111318]/[0.02] px-6 py-16 text-center'>
              <CalendarDays className='h-8 w-8 text-[#111318]/10 mx-auto mb-4' strokeWidth={1} />
              <p className='text-[14px] font-medium text-[#111318]/40 uppercase tracking-[0.15em]'>No Upcoming Sessions</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default UpcomingEventsSection
