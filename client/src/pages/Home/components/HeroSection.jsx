import React from 'react'
import { MapPin, MessageCircle, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <section className='relative min-h-[680px] overflow-hidden bg-[#1e3a8a] font-["Poppins","Segoe_UI",sans-serif] text-white md:min-h-[760px]'>
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-center bg-no-repeat opacity-40'
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
        className='absolute inset-0 opacity-45'
        style={{
          background:
            'radial-gradient(circle at 20% 18%, rgba(255,255,255,0.14), transparent 16%), radial-gradient(circle at 78% 24%, rgba(255,255,255,0.1), transparent 14%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.2), transparent 34%)',
        }}
      />
      <div className='relative z-10 mx-auto flex min-h-[680px] max-w-[1280px] flex-col items-center justify-center px-6 pb-12 pt-28 text-center md:min-h-[760px] md:pb-18 md:pt-34'>
        <div className='inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/95 md:text-[12px]'>
          <span className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c]' />
          Singh Sabha Gurudwara Berlin
        </div>

        <h1 className='mt-6 max-w-[920px] text-[35px] font-extrabold leading-[1.08] tracking-[-0.03em] md:text-[58px]'>
          <span className='block'>{t('home.hero.titleLine1')}</span>
          <span className='block mt-1'>{t('home.hero.titleLine2')}</span>
        </h1>
        <p className='mt-5 max-w-[860px] text-[18px] font-medium leading-[1.45] text-white/85 md:text-[26px] md:leading-[1.35]'>
          {t('home.hero.subtitle')}
        </p>

        <div className='mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4'>
          <Link
            to='/events/programs#all'
            className='inline-flex h-[50px] min-w-[186px] items-center justify-center rounded-[10px] bg-[#f6ab3c] px-7 text-[16px] font-bold text-white transition hover:bg-[#f1a52e] md:h-[56px] md:min-w-[202px] md:text-[17px]'
          >
            {t('common.actions.viewPrograms')}
          </Link>
          <Link
            to='/donate'
            className='inline-flex h-[50px] min-w-[142px] items-center justify-center rounded-[10px] border border-white/70 bg-white/10 px-7 text-[16px] font-bold text-white backdrop-blur-[1px] transition hover:bg-white/20 md:h-[56px] md:min-w-[154px] md:text-[17px]'
          >
            {t('common.actions.donate')}
          </Link>
        </div>

        <div className='mt-10 grid w-full max-w-[980px] grid-cols-1 gap-3 sm:grid-cols-3'>
          <a
            href='tel:+4915567277478'
            className='inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/25 bg-white/10 px-4 py-3 text-[13px] font-semibold text-white/95 backdrop-blur-[1px] transition hover:bg-white/16 md:text-[14px]'
          >
            <PhoneCall className='h-4 w-4' />
            +49 15567 277478
          </a>
          <a
            href='https://wa.me/4915567277478'
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/25 bg-white/10 px-4 py-3 text-[13px] font-semibold text-white/95 backdrop-blur-[1px] transition hover:bg-white/16 md:text-[14px]'
          >
            <MessageCircle className='h-4 w-4' />
            WhatsApp
          </a>
          <a
            href='https://www.google.com/maps/dir//Gurudwara+Sri+Guru+Singh+Sabha,+Bahnstra%C3%9Fe+2,+14513+Teltow,+Germany/@33.5506831,73.1467615,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x47a853e960dbf5bb:0x33da324c8881f212!2m2!1d13.2986853!2d52.3875629?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D'
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/25 bg-white/10 px-4 py-3 text-[13px] font-semibold text-white/95 backdrop-blur-[1px] transition hover:bg-white/16 md:text-[14px]'
          >
            <MapPin className='h-4 w-4' />
            Alt Biesdorf 71, Berlin
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
