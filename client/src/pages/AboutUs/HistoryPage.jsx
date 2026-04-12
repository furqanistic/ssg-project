import React from 'react'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import SiteFooter from '@/components/layout/SiteFooter'
import { useSiteContentQuery } from '@/hooks/useContent'

const historySections = [
  {
    title: 'Foundation and Early Years',
    body: 'Singh Sabha Gurudwara Berlin was established to serve the growing Sikh community in Berlin and surrounding areas. Our Gurudwara has been a beacon of spiritual guidance, cultural preservation, and community service.',
  },
  {
    title: 'Growth and Development',
    body: 'Over the years, we have expanded our services to meet the needs of our diverse community. From humble beginnings, we have grown into a vibrant center that welcomes thousands of visitors annually.',
  },
  {
    title: 'Community Service',
    body: 'Throughout our history, we have remained committed to the Sikh principles of seva (selfless service), equality, and compassion. Our langar (community kitchen) has served countless meals, and our doors remain open to all, regardless of background or belief.',
  },
  {
    title: 'Looking Forward',
    body: 'As we continue our journey, we remain dedicated to preserving our rich heritage while adapting to serve future generations. We are committed to being a place of spiritual growth, cultural celebration, and community unity.',
  },
]

const HistoryPage = () => {
  const { data: content } = useSiteContentQuery()
  const history = content?.aboutUs?.history ?? {}
  const heading = history.heroTitle ?? 'Our History'
  const subtitle = history.heroSubtitle ?? 'The journey of Singh Sabha Gurudwara Berlin'
  const sections =
    Array.isArray(history.sections) && history.sections.length > 0
      ? history.sections
      : historySections

  return (
    <div className='min-h-screen bg-white font-["Manrope","Segoe_UI",sans-serif]'>
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
