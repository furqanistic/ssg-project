import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import SiteFooter from '@/components/layout/SiteFooter'
import { useSiteContentQuery } from '@/hooks/useContent'

const readLocalizedValue = (value, language = 'en') => {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] || value.en || ''
  }
  return ''
}

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

const CremationFundPage = () => {
  const { data: content } = useSiteContentQuery()
  const { i18n } = useTranslation()
  const language = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]
  const serviceContent = useMemo(
    () => content?.services?.cremationFund ?? {},
    [content?.services?.cremationFund],
  )

  return (
    <div className='min-h-screen bg-[#fafafa] font-["Outfit",sans-serif] text-[#071544] selection:bg-[#f6ab3c]/30'>
      <div className='relative'>
        <NavbarSection />

        {/* Hero Section - Synchronized Architectural Style */}
        <section className='relative isolate overflow-hidden bg-[#071544] pt-[136px] pb-10 md:pt-[140px] md:pb-20'>
          {serviceContent.heroImage ? (
            <div className='absolute inset-0 z-0'>
              <img
                src={serviceContent.heroImage}
                alt='Cremation fund hero'
                className='h-full w-full object-cover'
              />
              <div className='absolute inset-0 bg-[#071544]/75' />
            </div>
          ) : null}

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
                Community Support Services
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'
              >
                {readLocalizedValue(serviceContent.heroTitle, language)}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='mx-auto mt-4 max-w-2xl text-balance text-[15px] font-light leading-relaxed text-white/70 md:mt-6 md:text-lg'
              >
                {readLocalizedValue(serviceContent.heroSubtitle, language)}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Overlapping Content Container */}
        <section id='fund-details' className='relative z-20 -mt-6 px-4 pb-16 md:-mt-8 md:px-6 md:pb-20'>
          <div className='container mx-auto max-w-[1000px]'>
            <motion.div 
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={sectionVariants}
              className='rounded-2xl border border-[#071544]/[0.08] bg-white p-6 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.02)] sm:p-10 md:rounded-3xl md:p-16'
            >
              <div className='max-w-3xl'>
                <SectionLabel>About This Fund</SectionLabel>
                <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-5xl'>
                  {readLocalizedValue(serviceContent.aboutTitle, language)}
                </h2>
                
                <div className='mt-8 space-y-6 text-[15px] font-light leading-relaxed text-[#5a677a] md:mt-12 md:text-lg'>
                  <p>
                    {readLocalizedValue(serviceContent.aboutText, language)}
                  </p>
                  <p>
                    {readLocalizedValue(serviceContent.supportText, language)}
                  </p>
                </div>

                {serviceContent.supportImage && (
                  <div className='mt-10 overflow-hidden rounded-2xl border border-[#071544]/05 md:mt-12 md:rounded-3xl'>
                    <img
                      src={serviceContent.supportImage}
                      alt='Cremation fund support'
                      className='h-auto w-full object-cover transition-transform duration-700 hover:scale-105'
                    />
                  </div>
                )}

                <div className='mt-10 flex flex-col gap-4 sm:flex-row md:mt-14'>
                  {readLocalizedValue(serviceContent.contactButtonLabel, language) && (
                    <Link
                      to='/contact#contact-form'
                      className='group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#071544] px-8 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-500 hover:bg-[#071544]/90 active:scale-[0.98]'
                    >
                      {readLocalizedValue(serviceContent.contactButtonLabel, language)}
                      <ArrowRight className='h-4 w-4 transition-transform duration-500 group-hover:translate-x-1' />
                    </Link>
                  )}
                  {readLocalizedValue(serviceContent.donateButtonLabel, language) && (
                    <Link
                      to='/donate'
                      className='inline-flex h-12 items-center justify-center rounded-full border border-[#071544]/10 bg-white px-8 text-[11px] font-bold uppercase tracking-widest text-[#071544] transition-all duration-500 hover:border-[#f6ab3c]/30 hover:bg-[#f6ab3c]/05 active:scale-[0.98]'
                    >
                      {readLocalizedValue(serviceContent.donateButtonLabel, language)}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}

export default CremationFundPage

