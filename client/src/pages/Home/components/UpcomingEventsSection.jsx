import React from 'react'
import { ArrowRight, CalendarDays, Clock3, MapPin, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useEventsContentQuery } from '@/hooks/useEventsContent'
import { motion, useScroll, useTransform } from 'framer-motion'

const AnimatedIcon = ({ icon: Icon, color = '#f5a437' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 10 }}
      className='flex items-center justify-center'
    >
      <Icon className='h-3.5 w-3.5' style={{ color }} />
    </motion.div>
  )
}

const InfoBadge = ({ icon: Icon, text }) => (
  <div className='flex items-center gap-2 rounded-lg bg-white/80 px-2.5 py-1.5 text-[11px] font-black uppercase tracking-tight text-[#111318] ring-1 ring-black/5 shadow-sm'>
    <Icon className='h-3 w-3 text-[#f5a437]' />
    <span>{text}</span>
  </div>
)

const UpcomingEventsSection = () => {
  const { t } = useTranslation()
  const { events } = useEventsContentQuery()
  const featuredEvents = events.slice(0, 3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
    }
  }

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
    <section className='relative bg-[#f2f2f2] px-4 py-16 md:px-6 md:py-20 lg:py-24 overflow-hidden'>
      {/* Structural Grid Background */}
      <div className='absolute inset-0 pointer-events-none opacity-[0.03]' 
           style={{ backgroundImage: 'radial-gradient(#111318 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      <motion.div 
        className='mx-auto w-full max-w-[1280px] relative z-10'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        {/* Editorial Header Section */}
        <div className='mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8'>
          <div className='max-w-2xl'>
            <motion.div variants={cardVariants} className='flex items-center gap-3 mb-6'>
              <div className='h-2 w-2 rounded-full bg-[#f5a437]' />
              <span className='text-[11px] font-black uppercase tracking-[0.4em] text-[#111318]/40'>Upcoming Engagement</span>
            </motion.div>
            <motion.h2 variants={cardVariants} className='text-[44px] font-black tracking-tighter text-[#111318] md:text-[56px] lg:text-[64px] leading-[0.95]'>
              {t('home.events.title')}
            </motion.h2>
            <motion.p variants={cardVariants} className='mt-6 text-[17px] leading-relaxed text-[#5b687a] max-w-lg'>
              {t('home.events.subtitle')}
            </motion.p>
          </div>

          <motion.div variants={cardVariants}>
            <Link
              to='/events/programs#all'
              className='group relative flex items-center gap-6 rounded-full bg-[#111318] pl-8 pr-3 py-3 text-[14px] font-bold text-white transition-all duration-700 hover:bg-[#222] hover:pr-5'
            >
              {t('common.actions.viewAllEvents')}
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#f5a437] transition-transform group-hover:rotate-45'>
                <ArrowRight className='h-5 w-5 text-[#111318]' />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Premium Grid Layout */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {featuredEvents.length > 0 ? (
            featuredEvents.map((event, index) => (
              <motion.article
                key={event.id}
                variants={cardVariants}
                className='group relative flex flex-col rounded-[2.5rem] bg-white p-2.5 ring-1 ring-black/5 transition-all duration-700 ease-[0.32,0.72,0,1] hover:scale-[1.01] hover:ring-[#f5a437]/20 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]'
              >
                {/* Visual Anchor: The Image Container */}
                <div className='relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-[#f4f5f7]'>
                  {event.image ? (
                    <motion.img
                      src={event.image}
                      alt={event.title}
                      className='h-full w-full object-cover transition-transform duration-1000 ease-[0.32,0.72,0,1] group-hover:scale-110'
                      loading='lazy'
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center'>
                      <Sparkles className='h-12 w-12 text-[#f5a437]/10' />
                    </div>
                  )}
                  
                  {/* Subtle Overlays */}
                  <div className='absolute inset-0 bg-black/10 mix-blend-multiply opacity-0 transition-opacity duration-700 group-hover:opacity-100' />
                  <div className='absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none' />
                  
                  {/* Floating Contextual Meta */}
                  <div className='absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 translate-y-2 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100'>
                    <InfoBadge icon={Clock3} text={event.time} />
                    <InfoBadge icon={MapPin} text={event.location} />
                  </div>
                </div>

                {/* Content Layer */}
                <div className='flex flex-col flex-1 p-6 pb-4'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='bg-[#f5a437]/10 px-3 py-1 rounded-full text-[10px] font-black text-[#f5a437] uppercase tracking-widest'>
                      {event.date.split(' ')[0]}
                    </div>
                    <div className='h-[1px] flex-1 bg-black/5' />
                  </div>

                  <h3 className='text-[22px] font-black text-[#111318] leading-[1.1] md:text-[24px] tracking-tight group-hover:text-[#f5a437] transition-colors duration-500'>
                    {event.title}
                  </h3>

                  <div className='mt-6 flex-1'>
                    <p className='text-[15px] leading-relaxed text-[#5b687a] font-medium line-clamp-3'>
                      {formatDescription(event.description)}
                    </p>
                  </div>

                  {/* High-End Footer CTA */}
                  <div className='mt-8 pt-5 border-t border-black/[0.03] flex items-center justify-between group/link'>
                    <span className='text-[12px] font-black tracking-[0.2em] text-[#111318] uppercase'>Explore Event</span>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className='flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f5f7] transition-colors group-hover/link:bg-[#f5a437] group-hover/link:text-white'
                    >
                      <ArrowRight className='h-4 w-4' />
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div 
              variants={cardVariants}
              className='rounded-[2.5rem] border border-dashed border-black/10 bg-white/50 px-6 py-24 text-center lg:col-span-3'
            >
              <div className='max-w-xs mx-auto'>
                <div className='h-16 w-16 rounded-3xl bg-white flex items-center justify-center mx-auto mb-6 ring-1 ring-black/5 shadow-sm'>
                  <CalendarDays className='h-8 w-8 text-[#f5a437]/20' />
                </div>
                <p className='text-[16px] font-bold text-[#111318]/60'>No upcoming spiritual programs are scheduled at this moment.</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default UpcomingEventsSection
