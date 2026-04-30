import AboutPageHero from '@/components/about/AboutPageHero'
import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import { Clock3, Landmark, MapPin, ScrollText, Sparkles, Star } from 'lucide-react'
import React from 'react'

const historyIcons = [Landmark, ScrollText, Clock3, MapPin, Star, Sparkles]

const HistoryPage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const history = aboutUs.history
  const sections = Array.isArray(history.sections) ? history.sections : []
  const featuredSections = sections.slice(0, 2)
  const timelineSections = sections.slice(2)

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero title={history.heroTitle} subtitle={history.heroSubtitle} className='pb-18 md:pb-20' />
      </div>

      <section className='px-4 py-10 md:px-6 md:py-12'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto mt-4 grid max-w-[870px] grid-cols-1 gap-6 md:grid-cols-2'>
            {history.heroImage ? (
              <div className='md:col-span-2'>
                <img
                  src={history.heroImage}
                  alt={history.heroTitle}
                  className='h-[260px] w-full rounded-[16px] object-cover md:h-[360px]'
                  loading='lazy'
                />
              </div>
            ) : null}

            {featuredSections.map((section, index) => {
              const Icon = historyIcons[index % historyIcons.length]

              return (
                <article
                  key={`${section?.title ?? 'history-featured'}-${index}`}
                  className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
                >
                  <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#2d4f9f] text-white'>
                    <Icon className='h-5 w-5 stroke-[2]' />
                  </div>
                  <h2 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318]'>
                    {section?.title ?? ''}
                  </h2>
                  <p className='mt-3 text-[15px] leading-[1.55] text-[#5a677a] md:text-[16px]'>
                    {section?.body ?? ''}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {timelineSections.length > 0 ? (
        <section className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[870px]'>
              <h2 className='text-center text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
                Historical Journey
              </h2>

            

              <div className='mt-10 space-y-6'>
                {timelineSections.map((section, index) => {
                  const Icon = historyIcons[(index + featuredSections.length) % historyIcons.length]

                  return (
                    <article
                      key={`${section?.title ?? 'history-timeline'}-${index}`}
                      className='rounded-[14px] border border-[#e2e6ed] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
                    >
                      <div className='flex items-start gap-4'>
                        <div className='mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#f39d2f] text-white'>
                          <Icon className='h-5 w-5 stroke-[2]' />
                        </div>
                        <div>
                          <h3 className='text-[18px] font-extrabold text-[#f39d2f] md:text-[19px]'>
                            {section?.title ?? ''}
                          </h3>
                          <p className='mt-3 text-[15px] leading-[1.55] text-[#516075] md:text-[16px]'>
                            {section?.body ?? ''}
                          </p>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </div>
  )
}

export default HistoryPage
