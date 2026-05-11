import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const HukamnamaSection = () => {
  const { t } = useTranslation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
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
    <section className='relative bg-[#f2f2f2] px-4 py-12 md:px-6 md:py-16 lg:py-20 overflow-hidden'>
      {/* Structural Hairline Grid Background */}
      <div className='absolute inset-0 pointer-events-none opacity-[0.04]'
           style={{ backgroundImage: 'radial-gradient(#111318 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <motion.div
        className='mx-auto w-full max-w-[1100px] relative z-10'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >

        {/* Header Layer */}
        <div className='flex flex-col items-center mb-6 md:mb-10'>
          <motion.div variants={itemVariants} className='inline-flex items-center gap-2 rounded-full px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase text-[#1e3a8a] ring-1 ring-[#1e3a8a]/20 bg-[#1e3a8a]/5'>
            <span className='relative flex h-1.5 w-1.5'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1e3a8a] opacity-75' />
              <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1e3a8a]' />
            </span>
            {t('home.hukamnama.title')}
          </motion.div>
        </div>

        {/* Structural Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-5 items-start'>

          {/* Primary Sacred Block */}
          <motion.div
            variants={itemVariants}
            className='lg:col-span-12 relative group'
          >
            <div className='rounded-2xl md:rounded-[2rem] bg-white p-6 md:p-10 lg:p-14 ring-1 ring-black/[0.05] transition-all duration-700 ease-[0.32,0.72,0,1] hover:ring-[#1e3a8a]/20 relative overflow-hidden'>
              {/* Geometric Detail - hidden on mobile */}
              <div className='hidden md:block absolute top-0 right-0 p-6 opacity-[0.04]'>
                <svg width='80' height='80' viewBox='0 0 100 100' fill='none' stroke='#1e3a8a'>
                  <circle cx='50' cy='50' r='48' strokeWidth='0.4' />
                  <circle cx='50' cy='50' r='36' strokeWidth='0.4' />
                  <circle cx='50' cy='50' r='24' strokeWidth='0.4' />
                  <line x1='50' y1='2' x2='50' y2='98' strokeWidth='0.3' />
                  <line x1='2' y1='50' x2='98' y2='50' strokeWidth='0.3' />
                </svg>
              </div>

              <div className='relative flex flex-col md:flex-row items-center gap-5 md:gap-10 lg:gap-14'>
                {/* Vertical accent - hidden on mobile */}
                <div className='hidden md:block w-[4px] h-16 lg:h-20 bg-[#1e3a8a] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700' />

                <div className='flex-1 text-center md:text-left'>
                  <p className='text-xl font-black leading-tight text-[#111318] md:text-3xl lg:text-5xl tracking-tight uppercase'>
                    ਸਲੋਕ ਮਹਲਾ ੩ ॥
                  </p>
                  <div className='my-4 md:my-6 h-[1px] w-10 md:w-12 bg-[#1e3a8a]/20 md:mx-0 mx-auto' />
                  <p className='text-base font-medium leading-relaxed text-[#111318]/70 md:text-xl lg:text-3xl'>
                    ਸਭਨਾ ਕਾ ਦਾਤਾ ਏਕੁ hai ਦੂਜਾ ਨਾਹੀ ਕੋਇ ॥
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Blocks Grid */}
          <div className='lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mt-0'>
            <motion.div
              variants={itemVariants}
              className='rounded-xl md:rounded-[2rem] bg-[#eceff4] p-5 md:p-8 ring-1 ring-black/[0.05] hover:bg-white transition-all duration-500 cursor-default'
            >
              <div className='flex flex-col gap-2 md:gap-3'>
                <span className='text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]/40'>{t('home.hukamnama.transliteration')}</span>
                <p className='text-xs md:text-sm italic leading-relaxed text-[#48566d]'>
                  Salok Mehalā 3 ||
                  <br />
                  <span className='text-[#16191f]/70'>Sabhnā kā dātā ek hai, dūjā nāhī ko-i ||</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className='rounded-xl md:rounded-[2rem] bg-[#1e3a8a] p-5 md:p-8 ring-1 ring-white/10 group overflow-hidden relative'
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className='absolute -right-12 -bottom-12 w-40 h-40 border border-white/5 rounded-full pointer-events-none'
              />

              <div className='flex flex-col gap-2 md:gap-3 relative z-10'>
                <span className='text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/40'>{t('home.hukamnama.translation')}</span>
                <p className='text-xs md:text-sm font-medium leading-relaxed text-white'>
                  {t('home.hukamnama.translatedLine')}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className='lg:col-span-12 flex justify-center mt-6 md:mt-10'
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className='group relative flex items-center gap-3 md:gap-4 rounded-full bg-[#f6ab3c] pl-5 md:pl-8 pr-1.5 md:pr-2 py-1.5 md:py-2 text-xs md:text-sm font-black tracking-[0.02em] text-white transition-all duration-700 hover:bg-[#ef9f24]'
            >
              <span className='relative z-10 uppercase'>{t('common.actions.viewFullHukamnama')}</span>
              <div className='relative z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/20 transition-all duration-700 ease-[0.32,0.72,0,1] group-hover:rotate-45 group-hover:bg-white/30'>
                <ArrowRight className='h-4 w-4 md:h-5 md:w-5 text-white' />
              </div>
            </motion.button>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}

export default HukamnamaSection
