import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import SiteFooter from '@/components/layout/SiteFooter'

const CremationFundPage = () => {
  const { t } = useTranslation()

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='bg-[#3567c4] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[980px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                {t('servicesPage.cremationFund.heading')}
              </h1>
              <p className='mt-3 max-w-[880px] text-[17px] text-white/90 md:text-[18px]'>
                {t('servicesPage.cremationFund.subtitle')}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[980px] rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(13,23,45,0.02)] md:px-8 md:py-8'>
          <h2 className='text-[28px] font-extrabold tracking-[-0.02em] text-[#111318] md:text-[32px]'>
            {t('servicesPage.cremationFund.aboutTitle')}
          </h2>
          <p className='mt-4 text-[16px] leading-[1.65] text-[#516075] md:text-[17px]'>
            {t('servicesPage.cremationFund.aboutText')}
          </p>
          <p className='mt-4 text-[16px] leading-[1.65] text-[#516075] md:text-[17px]'>
            {t('servicesPage.cremationFund.supportText')}
          </p>

          <div className='mt-7 flex flex-col gap-3 sm:flex-row'>
            <Link
              to='/contact#contact-form'
              className='inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2d4f9f] px-6 text-[15px] font-semibold text-white transition hover:bg-[#26458f]'
            >
              {t('servicesPage.cremationFund.contactButton')}
            </Link>
            <Link
              to='/donate'
              className='inline-flex h-11 items-center justify-center rounded-[10px] border border-[#2d4f9f] px-6 text-[15px] font-semibold text-[#2d4f9f] transition hover:bg-[#eef3ff]'
            >
              {t('servicesPage.cremationFund.donateButton')}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default CremationFundPage
