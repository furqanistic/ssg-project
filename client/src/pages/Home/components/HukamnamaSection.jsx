import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const HukamnamaSection = () => {
  const { t } = useTranslation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1]
      }
    }
  }

  return (
    <section className='bg-[#f2f2f2] px-4 py-12 md:px-6 md:py-16 lg:py-20 overflow-hidden'>
      <motion.div 
        className='mx-auto w-full max-w-[1280px]'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
      >
        
        {/* Header Layer */}
        <div className='flex flex-col items-center mb-10'>
          <motion.div variants={itemVariants} className='inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase text-[#1e3a8a] ring-1 ring-[#1e3a8a]/20 bg-[#1e3a8a]/5'>
            <span className='h-1 w-1 rounded-full bg-[#1e3a8a] animate-pulse' />
            {t('home.hukamnama.title')}
          </motion.div>
        </div>

        {/* Structural Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-5 items-start relative'>
          
          {/* Vertical Label Block */}
          <motion.div 
            variants={itemVariants}
            className='hidden lg:flex lg:col-span-1 justify-center'
          >
            <div className='[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold tracking-[0.4em] text-[#1e3a8a]/20 uppercase select-none'>
              SSG BERLIN — {t('home.hukamnama.title')}
            </div>
          </motion.div>

          {/* Primary Sacred Block */}
          <motion.div 
            variants={itemVariants}
            className='lg:col-span-11 relative group'
          >
            <div className='rounded-[2.5rem] bg-white p-10 md:p-14 ring-1 ring-[#d2d6df] transition-all duration-700 ease-[0.32,0.72,0,1] group-hover:ring-[#1e3a8a]/20 relative overflow-hidden'>
              {/* Geometric Detail */}
              <div className='absolute top-0 right-0 p-6 opacity-5'>
                <svg width='80' height='80' viewBox='0 0 100 100' fill='none'>
                  <circle cx='50' cy='50' r='48' stroke='currentColor' strokeWidth='0.5' />
                  <circle cx='50' cy='50' r='38' stroke='currentColor' strokeWidth='0.5' />
                </svg>
              </div>

              <div className='relative text-center'>
                <p className='text-[28px] font-medium leading-[1.2] text-[#16191f] md:text-[42px] lg:text-[48px] tracking-tight'>
                  ਸਲੋਕ ਮਹਲਾ ੩ ॥
                </p>
                <div className='my-8 h-[1.5px] w-16 bg-[#1e3a8a]/10 mx-auto rounded-full' />
                <p className='text-[20px] font-normal leading-[1.4] text-[#16191f]/90 md:text-[28px] lg:text-[32px]'>
                  ਸਭਨਾ ਕਾ ਦਾਤਾ ਏਕੁ hai ਦੂਜਾ ਨਾਹੀ ਕੋਇ ॥
                </p>
              </div>
            </div>
          </motion.div>

          {/* Secondary Blocks Grid */}
          <div className='lg:col-span-11 lg:col-start-2 grid grid-cols-1 md:grid-cols-2 gap-5 mt-2'>
            
            <motion.div 
              variants={itemVariants}
              className='rounded-[2rem] bg-[#eceff4] p-8 ring-1 ring-[#d2d6df] hover:ring-[#d2d6df]*1.2 transition-all duration-500'
            >
              <div className='flex flex-col gap-3'>
                <span className='text-[9px] font-bold uppercase tracking-[0.15em] text-[#48566d]/40'>{t('home.hukamnama.transliteration')}</span>
                <p className='text-[16px] italic leading-relaxed text-[#48566d]'>
                  Salok Mehalā 3 ||
                  <br />
                  <span className='text-[#16191f]/70'>Sabhnā kā dātā ek hai, dūjā nāhī ko-i ||</span>
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className='rounded-[2rem] bg-[#1e3a8a] p-8 ring-1 ring-white/10 group overflow-hidden relative'
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className='absolute -right-16 -bottom-16 w-48 h-48 border border-white/5 rounded-full pointer-events-none'
              />
              
              <div className='flex flex-col gap-3 relative z-10'>
                <span className='text-[9px] font-bold uppercase tracking-[0.15em] text-white/40'>{t('home.hukamnama.translation')}</span>
                <p className='text-[16px] font-medium leading-relaxed text-white'>
                  {t('home.hukamnama.translatedLine')}
                </p>
              </div>
            </motion.div>

          </div>

          {/* Action CTA */}
          <motion.div 
            variants={itemVariants}
            className='lg:col-span-12 flex justify-center mt-8'
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='group relative flex items-center gap-5 rounded-full bg-[#f6ab3c] pl-8 pr-3 py-3 text-[13px] font-bold tracking-[0.05em] text-white transition-all duration-700 ease-[0.32,0.72,0,1] hover:bg-[#ef9f24]'
            >
              <span className='relative z-10 uppercase'>{t('common.actions.viewFullHukamnama')}</span>
              <div className='relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-700 ease-[0.32,0.72,0,1] group-hover:rotate-[360deg]'>
                <svg className='h-5 w-5 text-white' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'>
                  <line x1='5' y1='12' x2='19' y2='12' />
                  <polyline points='12 5 19 12 12 19' />
                </svg>
              </div>
            </motion.button>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}

export default HukamnamaSection
