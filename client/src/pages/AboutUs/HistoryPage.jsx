import React from 'react'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import SiteFooter from '@/components/layout/SiteFooter'
import AboutPageHero from '@/components/about/AboutPageHero'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'

const HistoryPage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const history = aboutUs.history

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero title={history.heroTitle} subtitle={history.heroSubtitle} />
      </div>

      <section className='px-4 py-18 md:px-6 md:py-20'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1040px] space-y-3'>
            {history.heroImage ? (
              <img
                src={history.heroImage}
                alt={history.heroTitle}
                className='mb-6 h-[260px] w-full rounded-[16px] object-cover md:h-[360px]'
                loading='lazy'
              />
            ) : null}
            {history.sections.map((section, index) => (
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
