import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import { motion } from 'framer-motion'
import {
  Clock3, Compass, Globe, Heart, Landmark, MapPin, ScrollText, Sparkles, Star, ArrowRight, Calendar, History
} from 'lucide-react'
import React from 'react'

const historyIcons = [Landmark, ScrollText, Clock3, MapPin, Star, Compass, Globe, Heart]

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

const HistoryPage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const history = aboutUs.history
  const sections = Array.isArray(history.sections) ? history.sections : []
  const featuredSections = sections.slice(0, 2)
  const timelineSections = sections.slice(2)

  return (
    <div className='min-h-screen bg-[#fafafa] font-["Outfit",sans-serif] text-[#071544] selection:bg-[#f6ab3c]/30'>
      <div className='relative'>
        <NavbarSection />

        {/* Hero Section - Synchronized Architectural Style */}
        <section className='relative isolate overflow-hidden bg-[#071544] pt-[136px] pb-10 md:pt-[152px] md:pb-20'>
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
                Institutional Legacy
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'
              >
                {history.heroTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='mx-auto mt-4 max-w-2xl text-balance text-[15px] font-light leading-relaxed text-white/70 md:mt-6 md:text-lg'
              >
                {history.heroSubtitle}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Overlapping Content Container */}
        <section id='history-content' className='relative z-20 -mt-6 px-4 pb-16 md:-mt-8 md:px-6 md:pb-24'>
          <div className='container mx-auto max-w-[1200px]'>
            <div className='rounded-2xl border border-[#071544]/[0.08] bg-white p-5 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.02)] sm:p-6 md:rounded-3xl md:p-10'>
              {/* Featured Image - Premium Frame */}
              {history.heroImage && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className='relative overflow-hidden rounded-[2rem] border border-[#071544]/05 bg-white shadow-[0_40px_80px_-16px_rgba(7,21,68,0.12)]'
                >
                  <img
                    src={history.heroImage}
                    alt={history.heroTitle}
                    className='aspect-[21/9] w-full object-cover grayscale-[0.2] transition-all duration-700 hover:grayscale-0 hover:scale-[1.02]'
                    loading='lazy'
                  />
                  <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071544]/40 via-transparent to-transparent' />
                </motion.div>
              )}

              {/* Core History Narrative */}
              <div className='mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 md:gap-10'>
                {featuredSections.map((section, index) => {
                  const Icon = historyIcons[index % historyIcons.length]
                  return (
                    <motion.article
                      key={index}
                      initial='hidden'
                      whileInView='visible'
                      viewport={{ once: true }}
                      variants={sectionVariants}
                      className='group flex flex-col rounded-[2rem] border border-[#071544]/05 bg-white p-8 transition-all duration-500 hover:border-[#f6ab3c]/30 hover:shadow-[0_24px_48px_-12px_rgba(7,21,68,0.04)] md:p-12'
                    >
                      <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6ab3c]/10 text-[#f6ab3c] transition-all duration-500 group-hover:bg-[#f6ab3c] group-hover:text-white'>
                        <Icon className='h-7 w-7' />
                      </div>
                      <h2 className='mt-8 text-2xl font-semibold tracking-tight text-[#071544] md:text-3xl'>
                        {section?.title}
                      </h2>
                      <p className='mt-6 text-[15px] font-light leading-relaxed text-[#5a677a] md:text-lg'>
                        {section?.body}
                      </p>
                    </motion.article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        {timelineSections.length > 0 && (
          <section className='relative bg-white py-20 md:py-32 overflow-hidden'>
            {/* Architectural Grid Motif */}
            <div className='absolute inset-0 z-0 opacity-[0.02]' 
                 style={{ backgroundImage: 'linear-gradient(#071544 0.5px, transparent 0.5px), linear-gradient(90deg, #071544 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />
            
            <div className='container relative z-10 mx-auto px-4 md:px-6'>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={sectionVariants}
                className='mb-16 text-center'
              >
                <SectionLabel>Historical Journey</SectionLabel>
                <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-5xl'>
                  The Evolution of Sangat
                </h2>
              </motion.div>

              <div className='relative mx-auto max-w-[1000px]'>
                {/* Timeline Center Line */}
                <div className='absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#071544]/10 to-transparent' />

                <div className='space-y-12 md:space-y-24'>
                  {timelineSections.map((section, index) => {
                    const isEven = index % 2 === 0
                    const Icon = historyIcons[(index + 2) % historyIcons.length]
                    return (
                      <motion.article
                        key={index}
                        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={`relative flex w-full justify-between items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                      >
                        <div className='hidden w-[45%] md:block' />
                        
                        {/* Central Node */}
                        <div className='absolute left-1/2 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#071544]/20 bg-white md:h-6 md:w-6'>
                          <div className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c] md:h-2 md:w-2' />
                        </div>

                        {/* Content Card */}
                        <div className={`w-full md:w-[45%] ${isEven ? 'text-right' : 'text-left'}`}>
                          <div className='rounded-[2rem] border border-[#071544]/05 bg-[#fafafa] p-8 transition-all duration-500 hover:border-[#f6ab3c]/30 hover:bg-white hover:shadow-[0_24px_48px_-12px_rgba(7,21,68,0.04)]'>
                            <div className={`flex items-center gap-4 mb-6 ${isEven ? 'justify-end' : 'justify-start'}`}>
                              <div className='h-10 w-10 flex items-center justify-center rounded-xl bg-[#071544]/05 text-[#071544]/40'>
                                <Icon className='h-5 w-5' />
                              </div>
                              <span className='text-[10px] font-bold uppercase tracking-widest text-[#f6ab3c]'>Era {index + 1}</span>
                            </div>
                            <h3 className='text-xl font-semibold tracking-tight text-[#071544] md:text-2xl'>
                              {section?.title}
                            </h3>
                            <p className='mt-4 text-[15px] font-light leading-relaxed text-[#5a677a]'>
                              {section?.body}
                            </p>
                          </div>
                        </div>
                      </motion.article>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <SiteFooter />
    </div>
  )
}

export default HistoryPage
