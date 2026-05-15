import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { BookOpen, Bookmark } from 'lucide-react'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import SiteFooter from '@/components/layout/SiteFooter'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const SectionLabel = ({ children }) => (
  <div className='mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#071544]/40 md:mb-5'>
    <span className='h-px w-6 bg-[#f6ab3c]/30' />
    {children}
  </div>
)

const LibraryPage = () => {
  const { t } = useTranslation()

  const collections = t('resourcesPage.library.collections', { returnObjects: true })

  return (
    <div className='min-h-screen bg-[#fafafa] font-["Outfit",sans-serif] text-[#071544] selection:bg-[#f6ab3c]/30'>
      <div className='relative'>
        <NavbarSection />

        {/* Hero Section - Synchronized Architectural Style */}
        <section className='relative isolate overflow-hidden bg-[#071544] pt-[136px] pb-10 md:pt-[140px] md:pb-20'>
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
                Knowledge & Resources
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'
              >
                {t('resourcesPage.library.heading')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='mx-auto mt-4 max-w-2xl text-balance text-[15px] font-normal leading-relaxed text-white/70 md:mt-6 md:text-lg'
              >
                {t('resourcesPage.library.subtitle')}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Overlapping Content Container */}
        <section id='library-content' className='relative z-20 -mt-6 px-4 pb-16 md:-mt-8 md:px-6 md:pb-20'>
          <div className='container mx-auto max-w-[1200px]'>
            <div className='rounded-2xl border border-[#071544]/[0.15] bg-white p-5 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.02)] sm:p-6 md:rounded-3xl md:p-10'>
              
              <div className='border-b border-[#071544]/[0.03] pb-10 md:pb-12'>
                <SectionLabel>Our Collections</SectionLabel>
                <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-4xl lg:text-5xl'>
                  Explore <span className='text-[#f6ab3c]'>Knowledge</span>
                </h2>
              </div>

              <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-14'>
                {collections.map((collection, index) => (
                  <motion.article
                    key={collection.title}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, margin: '-40px' }}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        transition: { delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                    className='group relative flex flex-col overflow-hidden rounded-[2rem] border border-[#071544]/[0.15] bg-white p-8 transition-all duration-500 hover:border-[#f6ab3c]/40 hover:shadow-[0_40px_80px_-16px_rgba(246,171,60,0.12)]'
                  >
                    <div className='flex items-start justify-between'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#f6ab3c]/10 text-[#f6ab3c] shadow-sm transition-all duration-500 group-hover:bg-[#f6ab3c] group-hover:text-white md:h-14 md:w-14 md:rounded-2xl'>
                        <BookOpen className='h-6 w-6' />
                      </div>
                      <span className='text-[10px] font-bold tracking-[0.2em] text-[#071544]/20'>
                        0{index + 1}
                      </span>
                    </div>

                    <div className='mt-10'>
                      <h3 className='text-lg font-semibold tracking-tight text-[#071544] transition-colors duration-300 group-hover:text-[#f6ab3c] md:text-xl'>
                        {collection.title}
                      </h3>
                      <p className='mt-4 text-[14px] font-normal leading-relaxed text-[#5a677a] md:mt-5 md:text-[15px]'>
                        {collection.description}
                      </p>
                    </div>

                    <div className='mt-10 pt-6 border-t border-[#071544]/[0.15]'>
                      <div className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#f6ab3c]'>
                        <Bookmark className='h-3 w-3' />
                        Archived
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}

export default LibraryPage

