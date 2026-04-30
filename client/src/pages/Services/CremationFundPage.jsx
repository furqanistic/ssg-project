import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import SiteFooter from '@/components/layout/SiteFooter'
import { useSiteContentQuery } from '@/hooks/useContent'

const readLocalizedValue = (value, language = 'en') => {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] || value.en || ''
  }
  return ''
}

const CremationFundPage = () => {
  const { data: content } = useSiteContentQuery()
  const { i18n } = useTranslation()
  const language = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]
  const serviceContent = useMemo(
    () => content?.services?.cremationFund ?? {},
    [content?.services?.cremationFund],
  )

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section
          className='relative bg-[#3567c4] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'
          style={
            serviceContent.heroImage
              ? {
                  backgroundImage: `linear-gradient(rgba(25, 55, 125, 0.74), rgba(25, 55, 125, 0.74)), url(${serviceContent.heroImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined
          }
        >
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[980px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                {readLocalizedValue(serviceContent.heroTitle, language)}
              </h1>
              <p className='mt-3 max-w-[880px] text-[17px] text-white/90 md:text-[18px]'>
                {readLocalizedValue(serviceContent.heroSubtitle, language)}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[980px] rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(13,23,45,0.02)] md:px-8 md:py-8'>
          <h2 className='text-[28px] font-extrabold tracking-[-0.02em] text-[#111318] md:text-[32px]'>
            {readLocalizedValue(serviceContent.aboutTitle, language)}
          </h2>
          <p className='mt-4 text-[16px] leading-[1.65] text-[#516075] md:text-[17px]'>
            {readLocalizedValue(serviceContent.aboutText, language)}
          </p>
          <p className='mt-4 text-[16px] leading-[1.65] text-[#516075] md:text-[17px]'>
            {readLocalizedValue(serviceContent.supportText, language)}
          </p>
          {serviceContent.supportImage ? (
            <img
              src={serviceContent.supportImage}
              alt='Cremation fund support'
              className='mt-6 h-[260px] w-full rounded-[14px] border border-[#e6ebf3] object-cover md:h-[320px]'
            />
          ) : null}

          <div className='mt-7 flex flex-col gap-3 sm:flex-row'>
            {readLocalizedValue(serviceContent.contactButtonLabel, language) ? (
              <Link
                to='/contact#contact-form'
                className='inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2d4f9f] px-6 text-[15px] font-semibold text-white transition hover:bg-[#26458f]'
              >
                {readLocalizedValue(serviceContent.contactButtonLabel, language)}
              </Link>
            ) : null}
            {readLocalizedValue(serviceContent.donateButtonLabel, language) ? (
              <Link
                to='/donate'
                className='inline-flex h-11 items-center justify-center rounded-[10px] border border-[#2d4f9f] px-6 text-[15px] font-semibold text-[#2d4f9f] transition hover:bg-[#eef3ff]'
              >
                {readLocalizedValue(serviceContent.donateButtonLabel, language)}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default CremationFundPage
