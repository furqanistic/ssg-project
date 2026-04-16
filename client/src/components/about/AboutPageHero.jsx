import React from 'react'

const AboutPageHero = ({ title, subtitle, className = '' }) => {
  return (
    <section className={`bg-[#1e3a8a] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34 ${className}`}>
      <div className='mx-auto max-w-[1280px]'>
        <div className='mx-auto max-w-[1040px]'>
          <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>{title}</h1>
          {subtitle ? <p className='mt-3 text-[17px] text-white/90 md:text-[18px]'>{subtitle}</p> : null}
        </div>
      </div>
    </section>
  )
}

export default AboutPageHero
