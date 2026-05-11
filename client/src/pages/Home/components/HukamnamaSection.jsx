import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

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
    <section className='relative bg-[#f2f2f2] px-4 py-12 md:px-6 md:py-16 overflow-hidden'>
      {/* Structural Hairline Grid Background */}
      <div className='absolute inset-0 pointer-events-none opacity-[0.03]' 
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
        <div className='flex flex-col items-center mb-8'>
          <motion.div variants={itemVariants} className='inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase text-[#1e3a8a] ring-1 ring-[#1e3a8a]/20 bg-[#1e3a8a]/5'>
            <span className='h-1 w-1 rounded-full bg-[#1e3a8a] animate-pulse' />
            {t('home.hukamnama.title')}
          </motion.div>
        </div>

        {/* Structural Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 items-start'>
          
          {/* Primary Sacred Block - Floating Island */}
          <motion.div 
            variants={itemVariants}
            className='lg:col-span-12 relative group'
          >
            <div className='rounded-[2.5rem] bg-white p-10 md:p-14 ring-1 ring-black/[0.05] transition-all duration-700 ease-[0.32,0.72,0,1] hover:ring-[#1e3a8a]/20 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)]'>
              {/* Geometric Detail */}
              <div className='absolute top-0 right-0 p-6 opacity-5'>
                <svg width='60' height='60' viewBox='0 0 100 100' fill='none'>
                  <circle cx='50' cy='50' r='48' stroke='currentColor' strokeWidth='0.5' />
                  <circle cx='50' cy='50' r='38' stroke='currentColor' strokeWidth='0.5' />
                </svg>
              </div>

              <div className='relative flex flex-col md:flex-row items-center gap-10 lg:gap-14'>
                {/* Agency-tier Structural Accent */}
                <div className='hidden md:block w-[4px] h-20 bg-[#1e3a8a] rounded-full opacity-20' />
                
                <div className='flex-1 text-center md:text-left'>
                  <p className='text-[28px] font-black leading-[1.1] text-[#111318] md:text-[40px] lg:text-[48px] tracking-tight uppercase'>
                    ਸਲੋਕ ਮਹਲਾ ੩ ॥
                  </p>
                  <div className='my-6 h-[1px] w-12 bg-[#1e3a8a]/20 md:mx-0 mx-auto' />
                  <p className='text-[18px] font-medium leading-[1.6] text-[#111318]/70 md:text-[24px] lg:text-[32px]'>
                    ਸਭਨਾ ਕਾ ਦਾਤਾ ਏਕੁ hai ਦੂਜਾ ਨਾਹੀ ਕੋਇ ॥
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Blocks Grid - Integrated Bento */}
          <div className='lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
            
            <motion.div 
              variants={itemVariants}
              className='rounded-[2rem] bg-[#eceff4] p-8 ring-1 ring-black/[0.05] hover:bg-white transition-all duration-500 shadow-sm'
            >
              <div className='flex flex-col gap-3'>
                <span className='text-[9px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]/40'>{t('home.hukamnama.transliteration')}</span>
                <p className='text-[15px] italic leading-relaxed text-[#48566d]'>
                  Salok Mehalā 3 ||
                  <br />
                  <span className='text-[#16191f]/70'>Sabhnā kā dātā ek hai, dūjā nāhī ko-i ||</span>
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className='rounded-[2rem] bg-[#1e3a8a] p-8 ring-1 ring-white/10 group overflow-hidden relative shadow-sm'
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className='absolute -right-12 -bottom-12 w-40 h-40 border border-white/5 rounded-full pointer-events-none'
              />
              
              <div className='flex flex-col gap-3 relative z-10'>
                <span className='text-[9px] font-black uppercase tracking-[0.2em] text-white/40'>{t('home.hukamnama.translation')}</span>
                <p className='text-[15px] font-medium leading-relaxed text-white'>
                  {t('home.hukamnama.translatedLine')}
                </p>
              </div>
            </motion.div>

          </div>

          <motion.div 
            variants={itemVariants}
            className='lg:col-span-12 flex justify-center mt-8'
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className='group relative flex items-center gap-4 rounded-full bg-[#f6ab3c] pl-8 pr-2 py-2 text-[14px] font-black tracking-[0.02em] text-white transition-all duration-700 hover:bg-[#ef9f24]'
            >
              <span className='relative z-10 uppercase'>{t('common.actions.viewFullHukamnama')}</span>
              <div className='relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-700 ease-[0.32,0.72,0,1] group-hover:rotate-45'>
                <ArrowRight className='h-5 w-5 text-white' />
              </div>
            </motion.button>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}

export default HukamnamaSection
