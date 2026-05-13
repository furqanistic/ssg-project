import { motion } from 'framer-motion'
import React from 'react'

const AboutPageHero = ({ title, subtitle, className = '' }) => {
  return (
    <section
      className={`relative isolate overflow-hidden bg-[#071544] px-6 pb-8 pt-[118px] text-white md:px-10 md:pb-10 md:pt-32 ${className}`}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Amber glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-[#f6ab3c]/[0.04] blur-[120px]"
      />

      {/* Top border */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
      />

      <div className='relative z-10 mx-auto max-w-[1400px]'>
        <div className='mx-auto max-w-[800px] text-center'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-white/70'
          >
            <span className='h-1 w-1 rounded-full bg-[#f6ab3c]' />
            Institutional Legacy
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className='text-balance text-4xl font-medium leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl'
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='mx-auto mt-5 flex flex-col items-center'
            >
              <div className='mb-4 h-5 w-px bg-gradient-to-b from-[#f6ab3c]/50 to-transparent' />
              <p className='max-w-[600px] text-pretty text-[15px] font-light leading-[1.65] text-white/60 sm:text-[16px] md:text-[17px]'>
                {subtitle}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AboutPageHero
