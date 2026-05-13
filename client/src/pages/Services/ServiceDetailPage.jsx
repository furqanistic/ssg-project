import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import SiteFooter from '@/components/layout/SiteFooter'
import { useSiteContentQuery } from '@/hooks/useContent'

const readLocalizedValue = (value, language = 'en', fallback = '') => {
  if (typeof value === 'string') return value.trim() || fallback
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] || value.en || fallback
  }
  return fallback
}

const normalizeServiceImages = (value) => {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean)
    .slice(0, 8)
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

const ServiceDetailPage = () => {
  const location = useLocation()
  const { data: content } = useSiteContentQuery()
  const { i18n } = useTranslation()
  const language = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]
  const servicePath = location.pathname.replace(/\/+$/, '')

  const service = useMemo(() => {
    const links = content?.services?.youthEducation?.navbar?.additionalLinks
    if (!Array.isArray(links)) return null
    return links.find((link) => {
      const linkPath = readLocalizedValue(link?.to, language)
      return linkPath.replace(/\/+$/, '') === servicePath
    }) ?? null
  }, [content?.services?.youthEducation?.navbar?.additionalLinks, servicePath])

  const title = readLocalizedValue(service?.pageTitle, language, readLocalizedValue(service?.label, language))
  const subtitle = readLocalizedValue(service?.pageSubtitle, language)
  const body = readLocalizedValue(service?.pageContent, language)
  const serviceImages = normalizeServiceImages(service?.pageImages)
  const imageGridClass =
    serviceImages.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

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
                Service Excellence
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'
              >
                {title || 'Service'}
              </motion.h1>

              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className='mx-auto mt-4 max-w-2xl text-balance text-[15px] font-light leading-relaxed text-white/70 md:mt-6 md:text-lg'
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          </div>
        </section>

        {/* Overlapping Content Container */}
        <section id='service-content' className='relative z-20 -mt-6 px-4 pb-16 md:-mt-8 md:px-6 md:pb-20'>
          <div className='container mx-auto max-w-[1000px]'>
            <motion.div 
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={sectionVariants}
              className='rounded-2xl border border-[#071544]/[0.08] bg-white p-6 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.02)] sm:p-10 md:rounded-3xl md:p-16'
            >
              {service ? (
                <div className='max-w-3xl'>
                  <SectionLabel>About Service</SectionLabel>
                  <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-5xl'>
                    {title}
                  </h2>
                  
                  {body ? (
                    <div className='mt-8 space-y-6 text-[15px] font-light leading-relaxed text-[#5a677a] md:mt-12 md:text-lg'>
                      {body.split('\n').filter(Boolean).map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <p className='mt-8 text-[15px] font-light leading-relaxed text-[#5a677a] md:mt-12 md:text-lg'>
                      Content for this service has not been added yet.
                    </p>
                  )}
                </div>
              ) : (
                <div className='text-center py-10 md:py-16'>
                  <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-5xl'>
                    Service Not Found
                  </h2>
                  <p className='mt-6 text-[15px] font-light leading-relaxed text-[#5a677a] md:text-lg'>
                    This service link is not configured in the dashboard yet.
                  </p>
                  <Link
                    to='/'
                    className='mt-10 group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#071544] px-8 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-500 hover:bg-[#071544]/90 active:scale-[0.98]'
                  >
                    <ArrowLeft className='h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1' />
                    Back to Home
                  </Link>
                </div>
              )}
            </motion.div>

            {service && serviceImages.length > 0 && (
              <motion.div 
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={sectionVariants}
                className='mt-12 md:mt-16'
              >
                <div className='mb-8 md:mb-10'>
                  <SectionLabel>Gallery</SectionLabel>
                  <h3 className='text-2xl font-semibold tracking-tight text-[#071544] md:text-3xl'>Service in Action</h3>
                </div>
                
                <div className={`grid gap-6 ${imageGridClass}`}>
                  {serviceImages.map((imageUrl, index) => (
                    <div
                      key={`${imageUrl}-${index}`}
                      className='group relative aspect-video w-full overflow-hidden rounded-[2rem] border border-[#071544]/05 bg-white shadow-[0_24px_48px_-12px_rgba(7,21,68,0.02)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-16px_rgba(246,171,60,0.1)]'
                    >
                      <img
                        src={imageUrl}
                        alt={`${title || 'Service'} image ${index + 1}`}
                        loading='lazy'
                        className='absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}

export default ServiceDetailPage

