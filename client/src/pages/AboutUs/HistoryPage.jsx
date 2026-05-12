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
        />
      </div>

      {/* Main Content Section */}
      <section className={`relative px-4 pb-12 md:px-6 md:pb-16 ${history.heroImage ? '-mt-10 md:-mt-16' : 'pt-20 md:pt-16'}`}>
        <div className='mx-auto max-w-[1100px]'>
          {/* Featured Image with Premium Border */}
          {history.heroImage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className='relative mb-8 overflow-hidden rounded-[2px] border-[0.5px] border-[#C5A059]/30 bg-white p-1 md:mb-12 md:p-1.5 shadow-xl shadow-black/5'
            >
              <img
                src={history.heroImage}
                alt={history.heroTitle}
                className='h-[240px] w-full object-cover transition-transform duration-700 hover:scale-[1.01] md:h-[420px]'
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
            className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'
          >
            {featuredSections.map((section, index) => {
              const Icon = historyIcons[index % historyIcons.length]

              return (
                <motion.article
                  key={`${section?.title ?? 'history-featured'}-${index}`}
                  variants={fadeIn}
                  className='group relative flex flex-col items-center border-[0.5px] border-[#C5A059]/15 bg-white p-6 text-center transition-all hover:border-[#C5A059]/40 hover:shadow-[0_15px_35px_rgb(0,0,0,0.05)] md:items-start md:p-8 md:text-left'
                >
                  {/* Premium Top Accent */}
                  <div className='absolute left-0 top-0 h-[1.5px] w-0 bg-[#C5A059] transition-all duration-500 group-hover:w-full' />
                  
                  <div className='mb-5 flex h-9 w-9 items-center justify-center bg-[#1e3a8a] text-[#C5A059]'>
                    <Icon className='h-4.5 w-4.5 stroke-[1.5]' />
                  </div>
                  <h2 className='text-[18px] font-bold tracking-tight text-[#1e3a8a] md:text-[22px]'>
                    {section?.title ?? ''}
                  </h2>
                  <div className='mx-auto mt-2 h-[1px] w-8 bg-[#C5A059]/30 transition-all duration-500 group-hover:w-16 md:mx-0' />
                  <p className='mt-4 text-[14px] leading-relaxed text-[#4b5563] md:text-[15px]'>
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
        <section className='border-t border-[#C5A059]/10 bg-white px-4 py-12 md:px-6 md:py-20'>
          {/* Subtle Grid Pattern for Timeline Section */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(#C5A059 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} 
          />

          <div className='relative z-10 mx-auto max-w-[1100px]'>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='mb-10 text-center md:mb-16'
            >
              <span className='text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059]'>
                Our Legacy
              </span>
              <h2 className='mt-1 text-[26px] font-bold tracking-tight text-[#1e3a8a] md:text-[34px]'>
                Historical Journey
              </h2>
              <div className='mx-auto mt-4 h-[1px] w-12 bg-[#C5A059]/30' />
            </motion.div>

            <div className='relative mx-auto max-w-[900px]'>
              {/* Premium Architectural Timeline Line */}
              <div className='absolute left-4 top-0 h-full w-[1px] md:left-1/2 md:-translate-x-1/2'>
                <div className='h-full w-full bg-gradient-to-b from-transparent via-[#C5A059]/20 to-transparent' />
                <div className='absolute inset-0 mx-auto w-[0.5px] bg-[#C5A059]/5' />
              </div>

              <div className='space-y-12 md:space-y-24'>
                {timelineSections.map((section, index) => {
                  const isEven = index % 2 === 0
                  const Icon = historyIcons[(index + featuredSections.length) % historyIcons.length]

                  return (
                    <motion.article
                      key={`${section?.title ?? 'history-timeline'}-${index}`}
                      initial={{ opacity: 0, x: isEven ? -10 : 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative flex flex-col md:flex-row ${
                        isEven ? 'md:flex-row-reverse' : ''
                      } items-start md:items-center`}
                    >
                      {/* Lens-Style Timeline Node */}
                      <div className='absolute left-4 z-10 flex items-center justify-center md:left-1/2 md:-translate-x-1/2'>
                        <div className='relative flex h-3 w-3 items-center justify-center'>
                          <div className='absolute h-full w-full animate-pulse rounded-full bg-[#C5A059]/10' />
                          <div className='h-1.5 w-1.5 rounded-full bg-[#C5A059] shadow-[0_0_6px_rgba(197,160,89,0.3)]' />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className={`w-full px-4 text-center md:w-[42%] md:px-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        <div className={`flex flex-col items-center ${isEven ? 'md:items-end' : 'md:items-start'} group`}>
                          {/* Elegant Icon Badge */}
                          <div className='mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#C5A059]/5 text-[#C5A059] transition-colors group-hover:bg-[#C5A059]/10'>
                            <Icon className='h-4.5 w-4.5 stroke-[1.2]' />
                          </div>
                          
                          <div className={`relative ${isEven ? 'md:pr-2' : 'md:pl-2'}`}>
                            <h3 className='text-[17px] font-bold tracking-tight text-[#1e3a8a] md:text-[20px]'>
                              {section?.title ?? ''}
                            </h3>
                            <div className={`mt-1.5 h-[1px] w-6 bg-[#C5A059]/20 transition-all duration-500 group-hover:w-12 ${isEven ? 'md:ml-auto' : ''}`} />
                            <p className='mt-4 text-[14px] leading-relaxed text-[#516075] md:text-[15px]'>
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
