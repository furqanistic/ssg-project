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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  return (
    <div className='min-h-screen bg-[#faf8f6] font-["Outfit",sans-serif] text-[#1a1a1a]'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero
          title={history.heroTitle}
          subtitle={history.heroSubtitle}
          className='bg-[#1e3a8a] pb-20 pt-40 md:pb-20 md:pt-36'
        />
      </div>

      {/* Main Content Section */}
      <section className={`relative px-4 pb-12 md:px-6 md:pb-20 ${history.heroImage ? '-mt-12 md:-mt-20' : 'pt-28 md:pt-20'}`}>
        <div className='mx-auto max-w-[1100px]'>
          {/* Featured Image with Premium Border */}
          {history.heroImage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className='relative mb-10 overflow-hidden rounded-[2px] border-[0.5px] border-[#C5A059]/40 bg-white p-1 md:mb-16 md:p-1.5 shadow-xl shadow-black/5'
            >
              <img
                src={history.heroImage}
                alt={history.heroTitle}
                className='h-[280px] w-full object-cover transition-transform duration-700 hover:scale-[1.01] md:h-[480px]'
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
            className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'
          >
            {featuredSections.map((section, index) => {
              const Icon = historyIcons[index % historyIcons.length]

              return (
                <motion.article
                  key={`${section?.title ?? 'history-featured'}-${index}`}
                  variants={fadeIn}
                  className='group relative flex flex-col items-center border-[0.5px] border-[#C5A059]/20 bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:border-[#C5A059]/50 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] md:items-start md:p-10 md:text-left'
                >
                  {/* Premium Top Accent */}
                  <div className='absolute left-0 top-0 h-[2px] w-0 bg-[#C5A059] transition-all duration-500 group-hover:w-full' />
                  
                  <div className='mb-6 flex h-10 w-10 items-center justify-center bg-[#1e3a8a] text-[#C5A059]'>
                    <Icon className='h-5 w-5 stroke-[1.5]' />
                  </div>
                  <h2 className='text-[20px] font-bold tracking-tight text-[#1e3a8a] md:text-[24px]'>
                    {section?.title ?? ''}
                  </h2>
                  <div className='mx-auto mt-2 h-[1px] w-10 bg-[#C5A059]/30 transition-all duration-500 group-hover:w-20 md:mx-0' />
                  <p className='mt-6 text-[15px] leading-relaxed text-[#4b5563] md:text-[16px]'>
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
        <section className='border-t border-[#C5A059]/10 bg-white px-4 py-16 md:px-6 md:py-28'>
          <div className='mx-auto max-w-[1100px]'>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='mb-12 text-center md:mb-20'
            >
              <span className='text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A059]'>
                Our Legacy
              </span>
              <h2 className='mt-2 text-[28px] font-bold tracking-tight text-[#1e3a8a] md:text-[38px]'>
                Historical Journey
              </h2>
              <div className='mx-auto mt-5 h-[1px] w-16 bg-[#C5A059]/30' />
            </motion.div>

            <div className='relative mx-auto max-w-[900px]'>
              {/* Premium Architectural Timeline Line */}
              <div className='absolute left-4 top-0 h-full w-[1px] md:left-1/2 md:-translate-x-1/2'>
                <div className='h-full w-full bg-gradient-to-b from-transparent via-[#C5A059]/30 to-transparent' />
                <div className='absolute inset-0 mx-auto w-[0.5px] bg-[#C5A059]/10' />
              </div>

              <div className='space-y-16 md:space-y-32'>
                {timelineSections.map((section, index) => {
                  const isEven = index % 2 === 0
                  const Icon = historyIcons[(index + featuredSections.length) % historyIcons.length]

                  return (
                    <motion.article
                      key={`${section?.title ?? 'history-timeline'}-${index}`}
                      initial={{ opacity: 0, x: isEven ? -15 : 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative flex flex-col md:flex-row ${
                        isEven ? 'md:flex-row-reverse' : ''
                      } items-start md:items-center`}
                    >
                      {/* Lens-Style Timeline Node */}
                      <div className='absolute left-4 z-10 flex items-center justify-center md:left-1/2 md:-translate-x-1/2'>
                        <div className='relative flex h-4 w-4 items-center justify-center'>
                          <div className='absolute h-full w-full animate-pulse rounded-full bg-[#C5A059]/10' />
                          <div className='h-2 w-2 rounded-full bg-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.4)]' />
                          <div className='absolute h-4 w-4 rounded-full border border-[#C5A059]/20' />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className={`w-full px-4 text-center md:w-[42%] md:px-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        <div className={`flex flex-col items-center ${isEven ? 'md:items-end' : 'md:items-start'} group`}>
                          {/* Elegant Icon Badge */}
                          <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#C5A059]/5 text-[#C5A059] transition-colors group-hover:bg-[#C5A059]/10'>
                            <Icon className='h-5 w-5 stroke-[1.2]' />
                          </div>
                          
                          <div className={`relative ${isEven ? 'md:pr-2' : 'md:pl-2'}`}>
                            <h3 className='text-[19px] font-bold tracking-tight text-[#1e3a8a] md:text-[22px]'>
                              {section?.title ?? ''}
                            </h3>
                            <div className={`mt-2 h-[1px] w-8 bg-[#C5A059]/20 transition-all duration-500 group-hover:w-16 ${isEven ? 'md:ml-auto' : ''}`} />
                            <p className='mt-5 text-[15px] leading-relaxed text-[#516075] md:text-[16px]'>
                              {section?.body ?? ''}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Central Gap Spacer */}
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
