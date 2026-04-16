import React from 'react'
import { BookOpen, Globe, Heart, Users } from 'lucide-react'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import AboutPageHero from '@/components/about/AboutPageHero'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'

const missionIcons = [Heart, Users, BookOpen, Globe]
const normalizeColor = (value, fallback = '#2d4f9f') => {
  if (typeof value !== 'string' || !value.trim()) return fallback
  const color = value.trim()
  if (color.startsWith('#')) return color
  const match = color.match(/#(?:[0-9a-fA-F]{3,8})/)
  return match ? match[0] : fallback
}

const MissionPage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const mission = aboutUs.mission

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero title={mission.heroTitle} subtitle={mission.heroDescription} className='pb-18 md:pb-20' />
      </div>

      <section className='px-4 py-10 md:px-6 md:py-12'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto mt-4 grid max-w-[870px] grid-cols-1 gap-6 md:grid-cols-2'>
            {mission.heroImage ? (
              <div className='md:col-span-2'>
                <img
                  src={mission.heroImage}
                  alt={mission.heroTitle}
                  className='h-[260px] w-full rounded-[16px] object-cover md:h-[360px]'
                  loading='lazy'
                />
              </div>
            ) : null}
            {mission.cards.map(({ title, description: cardDescription, accent }, index) => {
              const Icon = missionIcons[index % missionIcons.length]
              return (
                <article
                  key={`${title ?? 'mission-card'}-${index}`}
                  className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
                >
                  <div
                    className='mb-5 flex h-12 w-12 items-center justify-center rounded-[12px] text-white'
                    style={{ backgroundColor: normalizeColor(accent) }}
                  >
                    <Icon className='h-5 w-5 stroke-[2]' />
                  </div>
                  <h2 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318]'>
                    {title}
                  </h2>
                  <p className='mt-3 text-[15px] leading-[1.55] text-[#5a677a] md:text-[16px]'>
                    {cardDescription}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[870px]'>
            <h2 className='text-center text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              {mission.coreValuesTitle}
            </h2>

            <div className='mt-10 space-y-6'>
              {mission.coreValues.map((value, index) => (
                <article
                  key={`${value?.title ?? 'core-value'}-${index}`}
                  className='rounded-[14px] border border-[#e2e6ed] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
                >
                  <h3 className='text-[18px] font-extrabold text-[#f39d2f] md:text-[19px]'>
                    {value.title}
                  </h3>
                  <p className='mt-3 text-[15px] leading-[1.55] text-[#516075] md:text-[16px]'>
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default MissionPage
