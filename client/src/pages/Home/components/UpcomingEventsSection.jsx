import React from 'react'
import { ArrowRight, CalendarDays, Clock3, MapPin, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useEventsContentQuery } from '@/hooks/useEventsContent'
import { motion, useScroll, useTransform } from 'framer-motion'

const MagneticIcon = ({ icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.3, rotate: 15 }}
    className='flex h-8 w-8 items-center justify-center rounded-xl bg-[#f5a437]/10'
  >
    <Icon className='h-4 w-4 text-[#f5a437]' />
  </motion.div>
)

const UpcomingEventsSection = () => {
  const { t } = useTranslation()
  const { events } = useEventsContentQuery()
  const featuredEvents = events.slice(0, 3)

  const formatDescription = (text) => {
    if (!text) return null
    const parts = text.split(/([⌚◇🔸\u{1F538}])/gu)
    return parts.map((part, index) => {
      if (part === '⌚') return <Clock3 key={index} className='inline h-3.5 w-3.5 mx-1 text-[#f5a437] animate-pulse' />
      if (part === '◇' || part === '🔸' || part === '\u{1F538}') return <Sparkles key={index} className='inline h-3.5 w-3.5 mx-1 text-[#f5a437]' />
      return part
    })
  }

  return (
    <section className='relative bg-[#f2f2f2] px-4 py-20 md:px-6 md:py-28 overflow-hidden'>
      {/* Structural Hairline Grid */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-0 left-1/4 h-full w-[1px] bg-black/[0.03]' />
        <div className='absolute top-0 left-2/4 h-full w-[1px] bg-black/[0.03]' />
        <div className='absolute top-0 left-3/4 h-full w-[1px] bg-black/[0.03]' />
        <div className='absolute top-1/4 left-0 w-full h-[1px] bg-black/[0.03]' />
        <div className='absolute top-3/4 left-0 w-full h-[1px] bg-black/[0.03]' />
      </div>

      <div className='mx-auto w-full max-w-[1280px] relative z-10'>
        
        {/* Editorial Premium Header */}
        <div className='mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end'>
          <div className='lg:col-span-9'>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='flex items-center gap-3 mb-6'
            >
              <div className='h-2 w-2 rounded-full bg-[#f5a437] animate-ping' />
              <span className='text-[11px] font-black uppercase tracking-[0.5em] text-[#111318]/50'>Spiritual Engagements</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='text-[36px] font-black tracking-tight text-[#111318] md:text-[44px] lg:text-[52px] leading-[1] uppercase'
            >
              {t('home.events.title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className='mt-5 text-[16px] leading-relaxed text-[#5b687a] max-w-lg font-medium border-l-2 border-[#f5a437] pl-5'
            >
              {t('home.events.subtitle')}
            </motion.p>
          </div>

          <div className='lg:col-span-3 flex lg:justify-end'>
            <Link
              to='/events/programs#all'
              className='group relative flex h-12 items-center gap-3 rounded-full bg-[#111318] pl-6 pr-1.5 py-1.5 text-[12px] font-bold text-white transition-all duration-700 hover:pr-4'
            >
              EXPLORE ALL
              <div className='flex h-9 w-9 items-center justify-center rounded-full bg-[#f5a437] transition-transform group-hover:rotate-45'>
                <ArrowRight className='h-4 w-4 text-[#111318]' />
              </div>
            </Link>
          </div>
        </div>

        {/* Staggered Premium Grid */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {featuredEvents.length > 0 ? (
            featuredEvents.map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className='group relative flex flex-col transition-all duration-500'
              >
                {/* Visual Anchor: Precision Image Layer */}
                <div className='relative aspect-[16/11] w-full overflow-hidden rounded-[2.5rem] bg-[#9ca7ba] ring-1 ring-black/[0.08]'>
                  {event.image ? (
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1] }}
                      src={event.image}
                      alt={event.title}
                      className='h-full w-full object-cover'
                      loading='lazy'
                    />
                  ) : null}
                  <div className='absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-700' />
                  
                  {/* Floating Date Badge - Premium Precision */}
                  <div className='absolute top-5 left-5'>
                    <div className='bg-white/95 px-4 py-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 flex flex-col items-center min-w-[50px]'>
                      <span className='text-[10px] font-black text-[#f5a437] uppercase tracking-tighter'>SSG</span>
                      <span className='text-[14px] font-black text-[#111318] leading-none mt-0.5'>{event.date.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Content Layer: Floating Island Architecture */}
                <div className='relative -mt-16 mx-4 p-8 bg-white rounded-[2rem] border border-black/[0.15] shadow-[0_24px_56px_rgba(0,0,0,0.08)] transition-all duration-700 group-hover:-translate-y-2 group-hover:border-[#f5a437]/40'>
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='h-[1px] w-4 bg-[#f5a437]' />
                    <span className='text-[10px] font-black uppercase tracking-widest text-[#f5a437]'>{event.date}</span>
                  </div>

                  <h3 className='text-[22px] font-black text-[#111318] leading-tight mb-6 transition-colors group-hover:text-[#f5a437]'>
                    {event.title}
                  </h3>

                  <div className='flex flex-col gap-3 mb-8'>
                    <div className='flex items-center gap-3 text-[12px] font-bold text-[#5a677a]'>
                      <MagneticIcon icon={Clock3} />
                      <span>{event.time}</span>
                    </div>
                    <div className='flex items-center gap-3 text-[12px] font-bold text-[#5a677a]'>
                      <MagneticIcon icon={MapPin} />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className='text-[14px] leading-relaxed text-[#5a677a] font-medium'>
                    {formatDescription(event.description)}
                  </p>

                  <div className='mt-10 pt-6 border-t border-black/[0.03] flex items-center justify-between'>
                    <Link 
                      to='/events/programs'
                      className='group/btn relative flex items-center gap-2 rounded-full bg-[#111318] pl-4 pr-1 py-1 text-[10px] font-black tracking-[0.05em] text-white transition-all duration-500 hover:bg-[#222] active:scale-[0.95]'
                    >
                      Discovery
                      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-[#f5a437] text-[#111318] transition-transform group-hover/btn:rotate-45'>
                        <ArrowRight className='h-3 w-3' />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className='lg:col-span-3 rounded-[3rem] border-2 border-dashed border-black/5 bg-white/50 px-6 py-20 text-center'>
              <Sparkles className='h-12 w-12 text-[#f5a437]/20 mx-auto mb-6' />
              <p className='text-[16px] font-black text-[#111318]/40 uppercase tracking-widest'>No Upcoming Sessions</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default UpcomingEventsSection
