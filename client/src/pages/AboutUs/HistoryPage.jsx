import AboutPageHero from '@/components/about/AboutPageHero'
import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import { motion } from 'framer-motion'
import {
  Clock3, Compass, Globe, Heart, Landmark, MapPin, ScrollText, Sparkles, Star,
} from 'lucide-react'
import React from 'react'

const historyIcons = [Landmark, ScrollText, Clock3, MapPin, Star, Compass, Globe, Heart]

const floatAnim = {
  y: [0, -6, 0],
  transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
}

const DecoSvg = () => (
  <svg className='absolute inset-0 h-full w-full pointer-events-none' preserveAspectRatio='none'>
    <defs>
      <pattern id='hist-dots' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'>
        <circle cx='20' cy='20' r='0.5' fill='rgba(246,171,60,0.08)' />
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#hist-dots)' />
  </svg>
)

const HistoryPage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const history = aboutUs.history
  const sections = Array.isArray(history.sections) ? history.sections : []
  const featuredSections = sections.slice(0, 2)
  const timelineSections = sections.slice(2)

  const fadeIn = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }

  const staggerContainer = {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  }

  return (
    <div className='min-h-screen bg-[#faf8f5] font-["Outfit",sans-serif] text-[#111318]'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero title={history.heroTitle} subtitle={history.heroSubtitle} />
      </div>

      {/* Featured Content */}
      <section className='relative overflow-hidden bg-white'>
        {/* Animated ambient gradient mesh */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden='true'
          className='pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#f6ab3c]/[0.03] blur-[150px]'
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          aria-hidden='true'
          className='pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#f6ab3c]/[0.02] blur-[150px]'
        />

        <DecoSvg />

        {/* Floating decorative circles */}
        <motion.div
          animate={floatAnim}
          aria-hidden='true'
          className='pointer-events-none absolute -right-20 top-20 h-[300px] w-[300px] rounded-full border border-[#f6ab3c]/8'
        />
        <motion.div
          animate={{ ...floatAnim, transition: { ...floatAnim.transition, delay: 1.5 } }}
          aria-hidden='true'
          className='pointer-events-none absolute -left-16 bottom-40 h-[200px] w-[200px] rounded-full border border-[#f6ab3c]/6'
        />
        <motion.div
          animate={{ ...floatAnim, transition: { ...floatAnim.transition, delay: 3 } }}
          aria-hidden='true'
          className='pointer-events-none absolute right-[30%] top-1/3 h-16 w-16 rounded-full bg-[#f6ab3c]/[0.03]'
        />

        {/* Abstract intersecting rings */}
        <svg className='pointer-events-none absolute right-10 top-10 h-32 w-32 opacity-[0.04] md:right-20 md:top-20 md:h-48 md:w-48' viewBox='0 0 200 200' fill='none'>
          <circle cx='100' cy='100' r='80' stroke='#111318' strokeWidth='0.5' />
          <circle cx='100' cy='100' r='60' stroke='#111318' strokeWidth='0.5' />
          <circle cx='100' cy='100' r='40' stroke='#111318' strokeWidth='0.5' />
          <line x1='20' y1='100' x2='180' y2='100' stroke='#111318' strokeWidth='0.3' />
          <line x1='100' y1='20' x2='100' y2='180' stroke='#111318' strokeWidth='0.3' />
        </svg>

        <div className='relative mx-auto max-w-[1200px] px-6 pb-14 md:px-10 md:pb-20'>
          {/* Featured Image with decorative frame */}
          {history.heroImage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className='relative'
            >
              {/* Corner accents */}
              <div className='pointer-events-none absolute -left-2 -top-2 z-10 h-6 w-6 border-l-2 border-t-2 border-[#f6ab3c]/30 md:-left-3 md:-top-3 md:h-8 md:w-8' />
              <div className='pointer-events-none absolute -right-2 -top-2 z-10 h-6 w-6 border-r-2 border-t-2 border-[#f6ab3c]/30 md:-right-3 md:-top-3 md:h-8 md:w-8' />
              <div className='pointer-events-none absolute -bottom-2 -left-2 z-10 h-6 w-6 border-b-2 border-l-2 border-[#f6ab3c]/30 md:-bottom-3 md:-left-3 md:h-8 md:w-8' />
              <div className='pointer-events-none absolute -bottom-2 -right-2 z-10 h-6 w-6 border-b-2 border-r-2 border-[#f6ab3c]/30 md:-bottom-3 md:-right-3 md:h-8 md:w-8' />

              <div className='overflow-hidden rounded-2xl border border-[#111318]/8 bg-white shadow-[0_4px_20px_-12px_rgba(0,0,0,0.08)]'>
                <img
                  src={history.heroImage}
                  alt={history.heroTitle}
                  className='h-[220px] w-full object-cover transition-all duration-700 hover:scale-[1.02] sm:h-[300px] md:h-[480px]'
                  loading='lazy'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none' />
              </div>
            </motion.div>
          )}

          {/* Featured Sections with large icons */}
          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            className='mt-6 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 md:gap-6'
          >
            {featuredSections.map((section, index) => {
              const Icon = historyIcons[index % historyIcons.length]

              return (
                <motion.article
                  key={`${section?.title ?? 'history-featured'}-${index}`}
                  variants={fadeIn}
                  className='group relative overflow-hidden rounded-2xl border border-[#111318]/8 bg-white p-6 transition-all duration-500 hover:shadow-[0_8px_30px_-12px_rgba(246,171,60,0.15)] md:p-8'
                >
                  {/* Decorative top bar */}
                  <div className='absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#f6ab3c] to-transparent transition-all duration-700 group-hover:w-full' />

                  <div className='relative flex flex-col items-center text-center md:flex-row md:items-start md:gap-6 md:text-left'>
                    {/* Large icon container */}
                    <div className='mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#f6ab3c]/15 bg-gradient-to-br from-[#f6ab3c]/[0.04] to-transparent text-[#f6ab3c]/70 transition-all duration-500 group-hover:border-[#f6ab3c]/30 group-hover:from-[#f6ab3c]/[0.08] group-hover:text-[#f6ab3c] md:mb-0 md:h-20 md:w-20'>
                      <Icon className='h-7 w-7 stroke-[1.3] md:h-8 md:w-8' />
                    </div>

                    <div className='flex-1'>
                      <h2 className='text-pretty text-[19px] font-medium tracking-tight text-[#111318] md:text-[24px]'>
                        {section?.title ?? ''}
                      </h2>
                      <div className='mx-auto mt-2 h-px w-8 bg-[#f6ab3c]/30 transition-all duration-500 group-hover:w-14 md:mx-0' />
                      <p className='mt-4 text-pretty text-[14px] font-light leading-[1.7] text-[#5a677a] md:text-[15px]'>
                        {section?.body ?? ''}
                      </p>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      {timelineSections.length > 0 ? (
        <section className='relative overflow-hidden bg-[#faf8f5] px-6 py-14 md:px-10 md:py-24'>
          <DecoSvg />

          {/* Large decorative rings */}
          <motion.div
            animate={{ ...floatAnim, transition: { ...floatAnim.transition, delay: 0.5 } }}
            aria-hidden='true'
            className='pointer-events-none absolute -left-20 top-1/4 h-[400px] w-[400px] rounded-full border border-[#f6ab3c]/6'
          />
          <motion.div
            animate={{ ...floatAnim, transition: { ...floatAnim.transition, delay: 2 } }}
            aria-hidden='true'
            className='pointer-events-none absolute -right-16 bottom-1/4 h-[250px] w-[250px] rounded-full border border-[#f6ab3c]/5'
          />

          {/* Decorative grid lines */}
          <svg className='pointer-events-none absolute left-1/2 top-0 h-full w-px opacity-[0.04]' preserveAspectRatio='none'>
            <line x1='0' y1='0' x2='0' y2='100%' stroke='#111318' strokeWidth='1' strokeDasharray='4 8' />
          </svg>

          <div className='relative z-10 mx-auto max-w-[1200px]'>
            {/* Section header with decorative line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='mb-12 text-center md:mb-20'
            >
              <div className='inline-flex items-center gap-2 rounded-full border border-[#111318]/8 bg-white px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-[#111318]/50'>
                <Sparkles className='h-3 w-3 text-[#f6ab3c]' strokeWidth={1.5} />
                Our Legacy
              </div>
              <h2 className='mt-4 text-balance text-[28px] font-medium tracking-tighter text-[#111318] md:text-[40px]'>
                Historical Journey
              </h2>
              <div className='mx-auto mt-4 flex items-center justify-center gap-2'>
                <div className='h-px w-12 bg-[#f6ab3c]/20' />
                <div className='h-2 w-2 rounded-full bg-[#f6ab3c]/40' />
                <div className='h-px w-12 bg-[#f6ab3c]/20' />
              </div>
            </motion.div>

            {/* Timeline */}
            <div className='relative mx-auto max-w-[950px]'>
              {/* Timeline line */}
              <div className='absolute left-[17px] top-0 h-full w-px md:left-1/2 md:-translate-x-1/2'>
                <div className='h-full w-full bg-gradient-to-b from-transparent via-[#f6ab3c]/20 to-transparent' />
              </div>

              <div className='relative space-y-14 md:space-y-28'>
                {timelineSections.map((section, index) => {
                  const isEven = index % 2 === 0
                  const Icon = historyIcons[(index + featuredSections.length) % historyIcons.length]

                  return (
                    <motion.article
                      key={`${section?.title ?? 'history-timeline'}-${index}`}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative flex flex-col md:flex-row ${
                        isEven ? 'md:flex-row-reverse' : ''
                      } items-start`}
                    >
                      {/* Timeline node - large decorative */}
                      <div className='absolute left-[7px] z-10 md:left-1/2 md:-translate-x-1/2'>
                        <div className='relative flex h-5 w-5 items-center justify-center md:h-6 md:w-6'>
                          <div className='absolute inset-0 rounded-full border-2 border-[#f6ab3c]/20' />
                          <div className='absolute inset-1 rounded-full bg-[#f6ab3c]/40' />
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
                            className='absolute inset-0 rounded-full border border-[#f6ab3c]/10'
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`w-full pl-10 pr-0 text-left md:w-[42%] md:px-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        <div className={`group relative rounded-2xl border border-[#111318]/8 bg-white p-6 transition-all duration-500 hover:shadow-[0_8px_30px_-12px_rgba(246,171,60,0.1)] md:p-8 ${
                          isEven ? 'md:items-end' : 'md:items-start'
                        }`}>
                          {/* Decorative corner accent */}
                          <div className={`pointer-events-none absolute top-0 ${isEven ? 'right-0' : 'left-0'} h-8 w-8 opacity-[0.06]`}>
                            <svg viewBox='0 0 32 32' fill='none'>
                              <circle cx='16' cy='16' r='14' stroke='#f6ab3c' strokeWidth='0.5' />
                              <circle cx='16' cy='16' r='8' stroke='#f6ab3c' strokeWidth='0.5' />
                            </svg>
                          </div>

                          {/* Era badge */}
                          <div className={`mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#f6ab3c]/10 bg-[#f6ab3c]/[0.03] px-2.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.15em] text-[#f6ab3c]/60 ${isEven ? 'md:ml-auto' : ''}`}>
                            <Clock3 className='h-2.5 w-2.5' strokeWidth={1.5} />
                            Era {index + 1}
                          </div>

                          {/* Icon */}
                          <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#f6ab3c]/12 bg-gradient-to-br from-[#f6ab3c]/[0.03] to-transparent text-[#f6ab3c]/60 transition-all duration-500 group-hover:border-[#f6ab3c]/25 group-hover:text-[#f6ab3c] md:h-12 md:w-12 ${isEven ? 'md:ml-auto' : ''}`}>
                            <Icon className='h-5 w-5 stroke-[1.3] md:h-5.5 md:w-5.5' />
                          </div>

                          <h3 className='text-pretty text-[18px] font-medium tracking-tight text-[#111318] md:text-[22px]'>
                            {section?.title ?? ''}
                          </h3>
                          <div className={`mt-1.5 h-px w-8 bg-[#f6ab3c]/25 transition-all duration-500 group-hover:w-14 ${isEven ? 'md:ml-auto' : ''}`} />
                          <p className='mt-3 text-pretty text-[14px] font-light leading-[1.7] text-[#5a677a] md:text-[15px]'>
                            {section?.body ?? ''}
                          </p>

                          {/* Index number */}
                          <div className={`pointer-events-none absolute bottom-3 text-[40px] font-medium leading-none text-[#f6ab3c]/[0.04] md:text-[60px] ${isEven ? 'left-3' : 'right-3'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </div>
                        </div>
                      </div>

                      <div className='hidden md:block md:w-[16%]' />
                      <div className='hidden md:block md:w-[42%]' />
                    </motion.article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </div>
  )
}

export default HistoryPage
