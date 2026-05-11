import React, { useMemo } from 'react'
import { CalendarDays, Heart, Users, Sparkles } from 'lucide-react'
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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className='relative bg-[#f2f2f2] overflow-hidden'>
      {/* Structural Noise & Grid Foundation */}
      <div className='absolute inset-0 pointer-events-none opacity-[0.04]' 
           style={{ backgroundImage: 'radial-gradient(#111318 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      <div className='absolute inset-0 pointer-events-none opacity-[0.015] bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' />

      <div className='relative z-10 px-4 py-24 md:px-6 md:py-32'>
        <motion.div 
          className='mx-auto max-w-[1280px]'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Refined Luxury Header */}
          <div className='mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10 border-b border-black/[0.05] pb-12'>
            <div className='max-w-xl'>
              <motion.div variants={itemVariants} className='flex items-center gap-4 mb-6'>
                <div className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c]' />
                <span className='text-[10px] font-black uppercase tracking-[0.5em] text-[#111318]/40'>Moments of Community</span>
              </motion.div>
              <motion.h2 variants={itemVariants} className='text-[40px] font-black tracking-tight text-[#111318] md:text-[56px] lg:text-[64px] leading-[0.85] uppercase'>
                {t('home.mediaFooter.title')}
              </motion.h2>
              <motion.p variants={itemVariants} className='mt-8 text-[18px] text-[#5a677a] font-medium leading-relaxed max-w-lg'>
                {t('home.mediaFooter.subtitle')}
              </motion.p>
            </div>
            <motion.div variants={itemVariants} className='hidden lg:block pb-2'>
              <Sparkles className='h-14 w-14 text-[#f6ab3c]/20' />
            </motion.div>
          </div>

          {/* Luxury Gallery Grid */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4'>
            {mediaImages.map((image, index) => (
              <motion.div
                key={image.alt}
                variants={itemVariants}
                className='group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#d7dce5] ring-1 ring-black/[0.05] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)]'
              >
                <motion.img
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={image.src}
                  alt={image.alt}
                  className='h-full w-full object-cover transition-all duration-1000'
                  loading='lazy'
                />
                <div className='absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none' />
                <div className='absolute inset-0 bg-black/5 mix-blend-multiply opacity-0 transition-opacity duration-700 group-hover:opacity-100' />
              </motion.div>
            ))}
          </div>

          {/* Ultra-Luxury Feature Matrix */}
          <div className='mt-32 grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-0 relative'>
            <div className='hidden md:block absolute top-0 left-1/3 h-full w-[1px] bg-black/[0.06]'>
              <div className='absolute top-0 -left-0.5 h-1 w-1 rounded-full bg-[#f6ab3c]/40' />
              <div className='absolute bottom-0 -left-0.5 h-1 w-1 rounded-full bg-[#f6ab3c]/40' />
            </div>
            <div className='hidden md:block absolute top-0 left-2/3 h-full w-[1px] bg-black/[0.06]'>
              <div className='absolute top-0 -left-0.5 h-1 w-1 rounded-full bg-[#f6ab3c]/40' />
              <div className='absolute bottom-0 -left-0.5 h-1 w-1 rounded-full bg-[#f6ab3c]/40' />
            </div>

            {highlights.map(({ icon: Icon, title, text }, index) => (
              <motion.div 
                key={title} 
                variants={itemVariants}
                className='flex flex-col items-center text-center px-12 group'
              >
                <div className='mb-10 relative'>
                  <div className='absolute inset-0 rounded-2xl bg-[#f6ab3c]/10 blur-xl opacity-0 transition-opacity duration-700 group-hover:opacity-100' />
                  <div className='relative flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white ring-1 ring-black/[0.05] text-[#f6ab3c] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-1000 group-hover:scale-110 group-hover:rotate-[45deg]'>
                    <Icon className='h-10 w-10 stroke-[2]' />
                  </div>
                </div>
                
                <h3 className='text-[22px] font-black text-[#111318] uppercase tracking-tight transition-colors duration-500 group-hover:text-[#f6ab3c]'>
                  {title}
                </h3>
                <div className='my-5 h-[2px] w-10 bg-[#f6ab3c]/40 rounded-full' />
                <p className='text-[16px] leading-relaxed text-[#5a677a] font-medium'>
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <SiteFooter />
    </section>
  )
}

export default MediaFooterSection
