import { motion } from 'framer-motion'
import React from 'react'

const AboutPageHero = ({
  title,
  subtitle,
  image = null,
  className = '',
  eyebrowText = 'Institutional Legacy',
  compact = false,
}) => {
  return (
    <section
      className={`relative isolate overflow-hidden bg-[#071544] px-5 text-white sm:px-6 md:px-10 ${
        compact ? 'pb-8 pt-[124px] md:pb-10 md:pt-[134px]' : 'pb-10 pt-[136px] md:pb-16 md:pt-[152px]'
      } ${className}`}
    >
      {/* Background image (when provided) */}
      {image && (
        <div className='absolute inset-0 z-0'>
          <img src={image} alt='' className='h-full w-full object-cover' aria-hidden='true' />
          <div className='absolute inset-0 bg-[#071544]/78' />
        </div>
      )}

      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 0.5px, transparent 0.5px), linear-gradient(90deg, #fff 0.5px, transparent 0.5px)',
          backgroundSize: '40px 40px',
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
        <div className={`mx-auto text-center ${compact ? 'max-w-[700px]' : 'max-w-[800px]'}`}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#f6ab3c]/80 ${
              compact ? 'mb-2 md:mb-3' : 'mb-3 md:mb-4'
            }`}
          >
            <span className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c]/70' />
            {eyebrowText}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`text-balance font-semibold leading-[1.06] tracking-tight ${
              compact ? 'text-[52px] sm:text-[58px] md:text-[64px]' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
            }`}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`mx-auto flex flex-col items-center ${compact ? 'mt-3 md:mt-4' : 'mt-4 md:mt-6'}`}
            >
              <p
                className={`text-pretty font-normal leading-relaxed text-white/70 ${
                  compact ? 'max-w-[560px] text-[14px] sm:text-[15px] md:text-[17px]' : 'max-w-[680px] text-[15px] sm:text-[16px] md:text-lg'
                }`}
              >
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
