import AboutPageHero from '@/components/about/AboutPageHero'
import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import { motion } from 'framer-motion'
import { Clock3, Landmark, MapPin, ScrollText, Sparkles, Star } from 'lucide-react'
import React from 'react'

const historyIcons = [Landmark, ScrollText, Clock3, MapPin, Star, Sparkles]

const HistoryPage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const history = aboutUs.history
  const sections = Array.isArray(history.sections) ? history.sections : []
  const featuredSections = sections.slice(0, 2)
  const timelineSections = sections.slice(2)

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className='min-h-screen bg-[#f7f2eb] font-["Outfit",sans-serif] text-[#172033] selection:bg-[#C5A059]/30'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero
          title={history.heroTitle}
          subtitle={history.heroSubtitle}
        />
      </div>

      {/* Main Content Section */}
      <section className={`relative overflow-hidden px-4 pb-10 sm:px-5 md:px-6 md:pb-20 ${history.heroImage ? '-mt-8 md:-mt-16' : 'pt-10 md:pt-16'}`}>
        <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(197,160,89,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(30,58,138,0.045)_1px,transparent_1px)] bg-[size:44px_44px] opacity-50' />
        <div className='mx-auto max-w-[1100px]'>
          {/* Featured Image with Premium Border */}
          {history.heroImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className='relative mb-8 overflow-hidden rounded-lg border border-[#C5A059]/25 bg-white p-1.5 shadow-[0_24px_80px_rgba(22,32,51,0.11)] md:mb-12'
            >
              <img
                src={history.heroImage}
                alt={history.heroTitle}
                className='h-[220px] w-full rounded-[5px] object-cover transition-transform duration-1000 hover:scale-[1.02] sm:h-[300px] md:h-[480px]'
                loading='lazy'
              />
              <div className='absolute inset-0 ring-1 ring-inset ring-black/5' />
            </motion.div>
          )}

          {/* Featured Sections Grid */}
          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            className='relative grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-7'
          >
            {featuredSections.map((section, index) => {
              const Icon = historyIcons[index % historyIcons.length]

              return (
                <motion.article
                  key={`${section?.title ?? 'history-featured'}-${index}`}
                  variants={fadeIn}
                  className='group relative flex flex-col items-center overflow-hidden rounded-lg border border-[#C5A059]/18 bg-white/92 p-5 text-center shadow-[0_14px_45px_rgba(22,32,51,0.055)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C5A059]/50 hover:bg-white hover:shadow-[0_24px_60px_rgba(22,32,51,0.09)] sm:p-7 md:items-start md:p-9 md:text-left'
                >
                  <div className='absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#C5A059] via-[#d8bd7d] to-transparent opacity-75' />
                  
                  <div className='mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-[#102a62] text-[#C5A059] shadow-[0_10px_25px_rgba(16,42,98,0.18)] transition-transform duration-500 group-hover:scale-105 sm:mb-6'>
                    <Icon className='h-5 w-5 stroke-[1.5]' />
                  </div>
                  <h2 className='text-pretty text-[19px] font-bold tracking-normal text-[#102a62] md:text-[24px]'>
                    {section?.title ?? ''}
                  </h2>
                  <div className='mx-auto mt-3 h-[1px] w-10 bg-[#C5A059]/40 transition-all duration-500 group-hover:w-20 md:mx-0' />
                  <p className='mt-4 text-pretty text-[14px] leading-[1.7] text-[#516075] sm:text-[15px] md:mt-5 md:text-[16px]'>
                    {section?.body ?? ''}
                  </p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Historical Journey (Timeline) */}
      {timelineSections.length > 0 ? (
        <section className='relative overflow-hidden border-t border-[#C5A059]/15 bg-white px-4 py-12 sm:px-5 sm:py-16 md:px-6 md:py-24'>
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#C5A059 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} 
          />

          <div className='relative z-10 mx-auto max-w-[1100px]'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='mb-10 text-center md:mb-20'
            >
              <span className='text-[11px] font-bold uppercase tracking-[0.3em] text-[#C5A059]'>
                Our Legacy
              </span>
              <h2 className='mt-3 text-balance text-[28px] font-bold tracking-normal text-[#102a62] md:text-[42px]'>
                Historical Journey
              </h2>
              <div className='mx-auto mt-5 h-[1px] w-16 bg-[#C5A059]/40' />
            </motion.div>

            <div className='relative mx-auto max-w-[900px]'>
              {/* Premium Timeline Line */}
              <div className='absolute left-3 top-0 h-full w-[1px] md:left-1/2 md:-translate-x-1/2'>
                <div className='h-full w-full bg-gradient-to-b from-transparent via-[#C5A059]/30 to-transparent' />
              </div>

              <div className='space-y-9 md:space-y-24'>
                {timelineSections.map((section, index) => {
                  const isEven = index % 2 === 0
                  const Icon = historyIcons[(index + featuredSections.length) % historyIcons.length]

                  return (
                    <motion.article
                      key={`${section?.title ?? 'history-timeline'}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative flex flex-col md:flex-row ${
                        isEven ? 'md:flex-row-reverse' : ''
                      } items-start md:items-center`}
                    >
                      {/* Timeline Node */}
                      <div className='absolute left-3 z-10 flex items-center justify-center md:left-1/2 md:-translate-x-1/2'>
                        <div className='relative flex h-4 w-4 items-center justify-center'>
                          <div className='absolute h-full w-full animate-ping rounded-full bg-[#C5A059]/20' />
                          <div className='h-2 w-2 rounded-full bg-[#C5A059] shadow-[0_0_10px_rgba(197,160,89,0.5)]' />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className={`w-full pl-10 pr-1 text-left md:w-[42%] md:px-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        <div className={`group flex flex-col items-start rounded-lg border border-[#C5A059]/12 bg-[#f7f2eb]/70 p-4 shadow-[0_10px_30px_rgba(22,32,51,0.04)] md:border-0 md:bg-transparent md:p-0 md:shadow-none ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                          <div className='mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#C5A059]/8 text-[#C5A059] transition-all duration-500 group-hover:bg-[#102a62] group-hover:text-white md:h-10 md:w-10'>
                            <Icon className='h-5 w-5 stroke-[1.2]' />
                          </div>
                          
                          <div className='relative'>
                            <h3 className='text-pretty text-[18px] font-bold tracking-normal text-[#102a62] md:text-[22px]'>
                              {section?.title ?? ''}
                            </h3>
                            <div className={`mt-2 h-[1px] w-8 bg-[#C5A059]/30 transition-all duration-500 group-hover:w-16 ${isEven ? 'md:ml-auto' : ''}`} />
                            <p className='mt-4 text-pretty text-[14px] leading-[1.7] text-[#516075] sm:text-[15px] md:mt-5 md:text-[16px]'>
                              {section?.body ?? ''}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Spacer for MD screens */}
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
