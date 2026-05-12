import { motion } from 'framer-motion'
import React from 'react'

const AboutPageHero = ({ title, subtitle, className = '' }) => {
  return (
    <section 
      className={`relative isolate overflow-hidden bg-[#102a62] px-4 pb-10 pt-[150px] text-white sm:px-5 sm:pt-[154px] md:px-6 md:pb-16 md:pt-32 ${className}`}
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className='absolute inset-0 z-0 bg-[linear-gradient(135deg,#102a62_0%,#1e3a8a_44%,#071936_100%)]' />
      <div className='absolute inset-0 z-0 opacity-[0.14]'>
        <div
          className='absolute inset-0 h-full w-full'
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(197,160,89,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(197,160,89,0.45) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_42%)]' />
      </div>

      <div className='absolute left-3 top-5 hidden h-[calc(100%-2.5rem)] w-[1px] bg-gradient-to-b from-transparent via-[#C5A059]/35 to-transparent sm:block' />
      <div className='absolute right-3 top-5 hidden h-[calc(100%-2.5rem)] w-[1px] bg-gradient-to-b from-transparent via-[#C5A059]/35 to-transparent sm:block' />

      <div className='relative z-10 mx-auto max-w-[1280px]'>
        <div className='mx-auto max-w-[940px] text-center'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-3 flex items-center justify-center gap-2.5 sm:gap-3'
          >
            <div className='h-[1px] w-4 bg-[#C5A059]/60 sm:w-7' />
            <span className='text-[9px] font-bold uppercase tracking-[0.24em] text-[#C5A059] sm:text-[10px] sm:tracking-[0.34em]'>
              Institutional Legacy
            </span>
            <div className='h-[1px] w-4 bg-[#C5A059]/60 sm:w-7' />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className='text-balance text-[clamp(2rem,10vw,3rem)] font-extrabold leading-[1.05] tracking-normal sm:text-[clamp(2.75rem,7vw,4.25rem)] md:leading-[1.02]'
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='mx-auto mt-4 flex flex-col items-center sm:mt-6'
            >
              <div className='mb-4 h-6 w-[1px] bg-gradient-to-b from-[#C5A059] to-transparent sm:mb-5 sm:h-8' />
              <p className='max-w-[640px] text-pretty text-[13.5px] font-light leading-[1.65] text-blue-50/82 sm:text-[15px] md:text-[17px]'>
                {subtitle}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <div className='absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent' />
    </section>
  )
}

export default AboutPageHero
