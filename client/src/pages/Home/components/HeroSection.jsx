import React from 'react'

const HeroSection = () => {
  return (
    <section className='relative min-h-[700px] overflow-hidden bg-[#1e3a8a] font-["Manrope","Segoe_UI",sans-serif] text-white md:min-h-[790px]'>
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-center bg-no-repeat opacity-35'
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 100%, rgba(162,188,239,0.32), rgba(70,108,185,0.08) 45%, rgba(30,58,138,0) 70%)',
          backgroundSize: '100% 100%',
        }}
      />
      <div
        aria-hidden='true'
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(180deg, rgba(30,58,138,0.84) 0%, rgba(30,58,138,0.9) 48%, rgba(30,58,138,0.96) 100%)',
        }}
      />
      <div
        aria-hidden='true'
        className='absolute inset-0 opacity-55'
        style={{
          background:
            'radial-gradient(circle at 34% 16%, rgba(255,255,255,0.16), transparent 13%), radial-gradient(circle at 56% 28%, rgba(255,255,255,0.1), transparent 14%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.22), transparent 34%)',
        }}
      />
      <div className='relative z-10 mx-auto flex min-h-[700px] max-w-[1280px] flex-col items-center justify-center px-6 pb-16 pt-24 text-center md:min-h-[790px] md:pb-22 md:pt-30'>
        <h1 className='max-w-[900px] text-[38px] font-extrabold leading-[1.12] tracking-[-0.03em] md:text-[58px]'>
          Welcome to Singh Sabha
          <br />
          Gurudwara Berlin
        </h1>
        <p className='mt-6 max-w-[860px] text-[20px] font-medium leading-[1.35] text-white/80 md:text-[28px]'>
          A spiritual home for all. Experience peace, community, and devotion.
        </p>

        <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
          <button
            className='h-[50px] min-w-[186px] rounded-[10px] bg-[#f6ab3c] px-7 text-[16px] font-bold text-white transition hover:bg-[#f1a52e] md:h-[56px] md:min-w-[202px] md:text-[17px]'
            type='button'
          >
            View Programs
          </button>
          <button
            className='h-[50px] min-w-[142px] rounded-[10px] border border-white/75 bg-white/8 px-7 text-[16px] font-bold text-white backdrop-blur-[1px] transition hover:bg-white/20 md:h-[56px] md:min-w-[154px] md:text-[17px]'
            type='button'
          >
            Donate
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
