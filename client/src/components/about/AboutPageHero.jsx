import { motion } from 'framer-motion'
import React from 'react'

const AboutPageHero = ({ title, subtitle, className = '' }) => {
  return (
    <section 
      className={`relative overflow-hidden bg-[#1e3a8a] px-4 pb-12 pt-20 text-white md:px-6 md:pb-16 md:pt-32 ${className}`}
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Architectural Grid Motif (Subtle) */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 h-full w-full" 
             style={{ 
               backgroundImage: 'linear-gradient(to right, #C5A059 1px, transparent 1px), linear-gradient(to bottom, #C5A059 1px, transparent 1px)',
               backgroundSize: '80px 80px' 
             }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a] via-transparent to-[#1e3a8a]" />
      </div>

      {/* Decorative Gold Elements */}
      <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#C5A059]/30 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#C5A059]/30 to-transparent" />

      <div className='relative z-10 mx-auto max-w-[1280px]'>
        <div className='mx-auto max-w-[900px] text-center'>
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 flex items-center justify-center gap-3"
          >
            <div className="h-[1px] w-5 bg-[#C5A059]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059]">
              Institutional Legacy
            </span>
            <div className="h-[1px] w-5 bg-[#C5A059]/60" />
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className='text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] md:text-[46px] lg:text-[52px]'
          >
            {title}
          </motion.h1>

          {/* Subtitle with refined typography */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mx-auto mt-5 flex flex-col items-center"
            >
              <div className="mb-5 h-6 w-[1px] bg-gradient-to-b from-[#C5A059] to-transparent" />
              <p className='max-w-[580px] text-[14px] font-light leading-relaxed text-blue-50/80 md:text-[17px]'>
                {subtitle}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Architectural Edge */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent" />
    </section>
  )
}

export default AboutPageHero
