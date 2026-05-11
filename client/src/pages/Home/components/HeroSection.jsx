import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LocationIcon from '../../../components/svg/LocationIcon'
import PhoneIcon from '../../../components/svg/PhoneIcon'
import WhatsAppIcon from '../../../components/svg/WhatsAppIcon'

const contactLinks = [
  {
    href: 'tel:+4915567277478',
    label: '+49 15567 277478',
    Icon: PhoneIcon,
  },
  {
    href: 'https://wa.me/4915567277478',
    label: 'WhatsApp',
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    href: 'https://www.google.com/maps/dir//Gurudwara+Sri+Guru+Singh+Sabha,+Bahnstra%C3%9Fe+2,+14513+Teltow,+Germany/@33.5506831,73.1467615,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x47a853e960dbf5bb:0x33da324c8881f212!2m2!1d13.2986853!2d52.3875629?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D',
    label: 'Alt Biesdorf 71, Berlin',
    Icon: LocationIcon,
    external: true,
  },
]

const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <section className='relative isolate min-h-[720px] overflow-hidden bg-[#1e3a8a] font-["Poppins","Segoe_UI",sans-serif] text-white md:min-h-[780px]'>
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-center bg-no-repeat opacity-55'
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 24% 18%, rgba(255,255,255,0.16), rgba(30,58,138,0) 34%), radial-gradient(ellipse at 82% 18%, rgba(162,188,239,0.28), rgba(70,108,185,0.08) 42%, rgba(30,58,138,0) 72%), radial-gradient(ellipse at 50% 100%, rgba(162,188,239,0.32), rgba(70,108,185,0.08) 45%, rgba(30,58,138,0) 70%)',
          backgroundSize: '100% 100%',
        }}
      />
      <div
        aria-hidden='true'
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(180deg, rgba(30,58,138,0.78) 0%, rgba(30,58,138,0.88) 48%, rgba(30,58,138,0.98) 100%)',
        }}
      />
      <div
        aria-hidden='true'
        className='absolute inset-x-0 top-0 h-px bg-white/30'
      />
      <div
        aria-hidden='true'
        className='absolute inset-0 opacity-40'
        style={{
          background:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(180deg, transparent 0%, white 18%, white 72%, transparent 100%)',
        }}
      />
      <div
        aria-hidden='true'
        className='absolute -right-28 top-24 hidden h-[520px] w-[520px] rounded-full border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] lg:block'
      />
      <div
        aria-hidden='true'
        className='absolute -right-8 top-52 hidden h-[240px] w-[240px] rounded-full border border-white/10 lg:block'
      />

      <div className='relative mx-auto grid min-h-[720px] max-w-[1280px] grid-cols-1 items-center gap-10 px-5 pb-12 pt-28 sm:px-6 md:min-h-[780px] md:pb-16 md:pt-36 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:px-8'>
        <div className='max-w-[760px] text-center lg:text-left'>
          <div className='inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[2px] md:text-[12px]'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f6ab3c] opacity-45' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-[#f6ab3c]' />
            </span>
            Singh Sabha Gurudwara Berlin
          </div>

          <h1 className='mt-7 max-w-[920px] text-[40px] font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-[48px] md:text-[64px] lg:text-[68px]'>
            <span className='block'>{t('home.hero.titleLine1')}</span>
            <span className='mt-1 block text-white/92'>{t('home.hero.titleLine2')}</span>
          </h1>
          <p className='mx-auto mt-5 max-w-[790px] text-[18px] font-medium leading-[1.5] text-white/85 sm:text-[20px] md:text-[25px] md:leading-[1.38] lg:mx-0'>
            {t('home.hero.subtitle')}
          </p>

          <div className='mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start'>
            <Link
              to='/events/programs#all'
              className='group inline-flex h-[52px] min-w-[186px] items-center justify-center rounded-[12px] bg-[#f09816] px-7 text-[16px] font-bold text-white shadow-[0_18px_42px_-24px_rgba(240,152,22,0.95),inset_0_1px_0_rgba(255,255,255,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f1a52e] active:translate-y-[1px] md:h-[58px] md:min-w-[202px] md:text-[17px]'
            >
              {t('common.actions.viewPrograms')}
            </Link>
            <Link
              to='/donate'
              className='group relative inline-flex h-[52px] min-w-[142px] items-center justify-center overflow-hidden rounded-[12px] border border-white/70 bg-white/10 px-7 text-[16px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-[2px] transition duration-300 hover:-translate-y-0.5 hover:border-[#f09816] active:translate-y-[1px] md:h-[58px] md:min-w-[154px] md:text-[17px]'
            >
              <span className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-[#f09816] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-150' />
              <span className='relative'>{t('common.actions.donate')}</span>
            </Link>
          </div>
        </div>

        <div className='relative mx-auto hidden w-full max-w-[470px] lg:block'>
          <div className='absolute -left-8 top-10 h-24 w-24 rounded-full border border-white/15 bg-white/[0.04]' />
          <div className='absolute -right-3 bottom-12 h-16 w-16 rounded-full bg-[#f6ab3c]/80 shadow-[0_18px_42px_-20px_rgba(246,171,60,0.9)]' />
          <div className='relative overflow-hidden rounded-[28px] border border-white/18 bg-white/10 p-5 shadow-[0_34px_80px_-48px_rgba(30,58,138,0.75),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[3px]'>
            <div className='rounded-[22px] border border-white/16 bg-[#1e3a8a]/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'>
              <div className='grid aspect-[4/5] grid-cols-6 grid-rows-6 gap-3'>
                <div className='col-span-4 row-span-3 rounded-[20px] border border-white/15 bg-white/[0.13] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]' />
                <div className='col-span-2 row-span-2 rounded-[20px] border border-white/15 bg-[#f09816]/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]' />
                <div className='col-span-2 row-span-1 rounded-[18px] border border-white/15 bg-white/[0.09]' />
                <div className='col-span-2 row-span-3 rounded-[22px] border border-white/15 bg-white/[0.08]' />
                <div className='col-span-4 row-span-3 rounded-[24px] border border-white/15 bg-white/[0.12] p-4'>
                  <div className='h-full rounded-[18px] border border-white/14 bg-[#1e3a8a]/45' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid w-full grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-2 lg:mt-1'>
          {contactLinks.map(({ href, label, Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className='group relative inline-flex min-h-[58px] items-center justify-center gap-3 overflow-hidden rounded-[14px] border border-white/25 bg-white/10 px-4 py-3 text-[13px] font-semibold text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[2px] transition duration-300 hover:-translate-y-0.5 hover:border-[#f09816] hover:text-white active:translate-y-[1px] md:text-[14px]'
            >
              <span className='absolute inset-0 origin-left scale-x-0 bg-[#f09816] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100' />
              <span className='absolute inset-0 translate-x-[-120%] bg-white/18 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[120%]' />
              <span className='relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 transition duration-300 group-hover:scale-110 group-hover:bg-white/18'>
                {React.createElement(Icon, { className: 'h-4 w-4', strokeWidth: 2 })}
              </span>
              <span className='relative min-w-0 break-words text-left transition-transform duration-300 group-hover:translate-x-0.5 sm:text-center'>
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
