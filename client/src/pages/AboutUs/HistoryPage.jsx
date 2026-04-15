import React from 'react'
import { useTranslation } from 'react-i18next'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import SiteFooter from '@/components/layout/SiteFooter'
import { useSiteContentQuery } from '@/hooks/useContent'

const HistoryPage = () => {
  const { t } = useTranslation()
  const { data: content } = useSiteContentQuery()
  const history = content?.aboutUs?.history ?? {}
  const heading = history.heroTitle ?? t('about.history.heading')
  const subtitle = history.heroSubtitle ?? t('about.history.subtitle')
  const heroImage = history.heroImage ?? ''
  const sections =
    Array.isArray(history.sections) && history.sections.length > 0
      ? history.sections
      : t('about.history.sections', { returnObjects: true })

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='bg-[#3567c4] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[1040px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                {heading}
              </h1>
              <p className='mt-3 text-[17px] text-white/90 md:text-[18px]'>
                {subtitle}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='px-4 py-18 md:px-6 md:py-20'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1040px] space-y-3'>
            {heroImage ? (
              <img
                src={heroImage}
                alt={heading}
                className='mb-6 h-[260px] w-full rounded-[16px] object-cover md:h-[360px]'
                loading='lazy'
              />
            ) : null}
            {sections.map((section, index) => (
              <div key={`${section?.title ?? 'history'}-${index}`}>
                <h2 className='text-[22px] font-bold tracking-[-0.02em] text-[#111318]'>
                  {section?.title ?? ''}
                </h2>
                <p className='mt-1 text-[16px] leading-[1.55] text-[#1d2431] md:text-[17px]'>
                  {section?.body ?? ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default HistoryPage
