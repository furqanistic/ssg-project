import React, { useMemo } from 'react'
import { CalendarDays, Heart, Users, ImageIcon, Sparkle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SiteFooter from '@/components/layout/SiteFooter'
import { motion } from 'framer-motion'

const imageSources = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
]

const MediaFooterSection = () => {
  const { t } = useTranslation()

  const mediaImages = useMemo(() => {
    const alts = t('home.mediaFooter.imagesAlt', { returnObjects: true })
    return imageSources.map((src, index) => ({ src, alt: alts[index] }))
  }, [t])

  const highlights = useMemo(() => {
    const cards = t('home.mediaFooter.highlights', { returnObjects: true })
    const icons = [CalendarDays, Users, Heart]
    return cards.map((card, index) => ({ ...card, icon: icons[index] }))
  }, [t])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="relative overflow-hidden bg-[#fafafa]">
      {/* Structural Noise & Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(#111318 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Khanda Background Symbol */}
      <div className="absolute top-10 right-[-5%] w-[400px] h-[400px] opacity-[0.03] pointer-events-none lg:w-[600px] lg:h-[600px]">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#111318]">
          <path d="M50 0C48.5 0 47.3 1.2 47.3 2.7V15.5C36.4 17.1 27.5 25.5 25.1 36.3C22.6 35.1 19.8 34.5 16.8 34.5C7.5 34.5 0 42 0 51.3C0 60.6 7.5 68.1 16.8 68.1C19.8 68.1 22.6 67.5 25.1 66.3C27.5 77.1 36.4 85.5 47.3 87.1V97.3C47.3 98.8 48.5 100 50 100C51.5 100 52.7 98.8 52.7 97.3V87.1C63.6 85.5 72.5 77.1 74.9 66.3C77.4 67.5 80.2 68.1 83.2 68.1C92.5 68.1 100 60.6 100 51.3C100 42 92.5 34.5 83.2 34.5C80.2 34.5 77.4 35.1 74.9 36.3C72.5 25.5 63.6 17.1 52.7 15.5V2.7C52.7 1.2 51.5 0 50 0ZM50 20.8C62.7 20.8 73.1 31.2 73.1 43.9C73.1 56.6 62.7 67 50 67C37.3 67 26.9 56.6 26.9 43.9C26.9 31.2 37.3 20.8 50 20.8Z" />
        </svg>
      </div>

      <div className="relative z-10 px-4 py-16 md:px-6 md:py-28">
        <motion.div
          className="mx-auto max-w-[1280px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Header */}
          <div className="mb-14 text-center md:text-left">
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#f6ab3c]" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#f6ab3c]">
                Moments of Community
              </span>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-[38px] font-black tracking-tight text-[#111318] md:text-[52px] lg:text-[64px] leading-[0.95] uppercase"
            >
              {t('home.mediaFooter.title')}
            </motion.h2>
            
            {/* Styled Header Line */}
            <motion.div variants={itemVariants} className="mt-6 mb-4 flex items-center gap-1.5 justify-center md:justify-start">
              <div className="h-1.5 w-1.5 rounded-full bg-[#f6ab3c]" />
              <div className="h-[2px] w-20 bg-gradient-to-r from-[#f6ab3c] to-[#f6ab3c]/20 rounded-full" />
              <div className="h-1.5 w-1.5 rounded-full border-2 border-[#f6ab3c]" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-[16px] font-medium leading-relaxed text-[#5a677a]"
            >
              {t('home.mediaFooter.subtitle')}
            </motion.p>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 mb-20">
            {mediaImages.map((image, index) => (
              <motion.div
                key={image.alt}
                variants={itemVariants}
                className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white ring-1 ring-black/[0.05] shadow-[0_15px_35px_-10px_rgba(0,0,0,0.05)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_25px_55px_-15px_rgba(0,0,0,0.1)]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Image Overlay Floating Icon */}
                <div className="absolute bottom-6 right-6 h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ImageIcon className="h-4 w-4 text-[#111318]/40" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Highlights Section - Re-designed as Horizontal Cards */}
          <div className="relative">
             {/* Bottom Curved Lines Decoration */}
            <div className="absolute -bottom-10 left-0 w-full h-32 opacity-[0.05] pointer-events-none overflow-hidden">
               <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z" fill="none" stroke="currentColor" className="text-[#111318]" strokeWidth="0.5" />
                  <path d="M0,70 C200,120 400,20 600,70 C800,120 1000,20 1000,70" fill="none" stroke="currentColor" className="text-[#111318]" strokeWidth="0.5" />
               </svg>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
              {highlights.map(({ icon: Icon, title, text }, index) => (
                <React.Fragment key={title}>
                  <motion.div
                    variants={itemVariants}
                    className="flex-1 w-full flex items-center gap-6 p-8 rounded-[2.5rem] bg-gradient-to-br from-white to-[#fafafa] border border-[#f6ab3c]/25 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 group"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-[#f6ab3c] shadow-[0_8px_20px_-5px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.02] transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-7 w-7 stroke-[2]" />
                    </div>

                    <div className="flex flex-col text-left">
                      <h3 className="text-[18px] font-black uppercase tracking-tight text-[#111318]">
                        {title}
                      </h3>
                      <p className="mt-1 text-[14px] leading-snug text-[#5a677a] font-medium">
                        {text}
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Diamond Separator (except after last item) */}
                  {index < highlights.length - 1 && (
                    <motion.div variants={itemVariants} className="hidden lg:block">
                      <Sparkle className="h-5 w-5 text-[#f6ab3c] fill-[#f6ab3c]" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <SiteFooter />
    </section>
  )
}

export default MediaFooterSection
