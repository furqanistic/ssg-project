import React from 'react'
import { BookOpen, Globe, Heart, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import { useSiteContentQuery } from '@/hooks/useContent'

const missionCards = [
  {
    title: 'Spiritual Growth',
    description:
      'Foster spiritual development through daily prayers, kirtan, and the teachings of Sri Guru Granth Sahib Ji.',
    icon: Heart,
    accent: 'bg-[#f6ab3c]',
  },
  {
    title: 'Community Service',
    description:
      'Embody the principle of seva through langar, volunteer programs, and support for those in need.',
    icon: Users,
    accent: 'bg-[#2d4f9f]',
  },
  {
    title: 'Education',
    description:
      'Provide educational programs for all ages to preserve Sikh heritage, language, and values.',
    icon: BookOpen,
    accent: 'bg-[#f6ab3c]',
  },
  {
    title: 'Inclusivity',
    description:
      'Welcome people of all backgrounds and create a space of equality, respect, and unity.',
    icon: Globe,
    accent: 'bg-[#2d4f9f]',
  },
]

const MissionPage = () => {
  const { t } = useTranslation()
  const { data: content } = useSiteContentQuery()
  const mission = content?.aboutUs?.mission ?? {}
  const heading = mission.heroTitle ?? t('about.mission.heading')
  const description =
    mission.heroDescription ??
    t('about.mission.description')
  const heroImage = mission.heroImage ?? ''
  const cards =
    Array.isArray(mission.cards) && mission.cards.length > 0
      ? mission.cards
      : missionCards.map((card, index) => ({
          ...card,
          ...t(`about.mission.cards.${index}`, { returnObjects: true }),
        }))
  const values =
    Array.isArray(mission.coreValues) && mission.coreValues.length > 0
      ? mission.coreValues
      : t('about.mission.coreValues', { returnObjects: true })

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='px-4 pb-18 pt-28 md:px-6 md:pb-20 md:pt-26'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[900px] text-center'>
              <h1 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
                {heading}
              </h1>
              <p className='mx-auto mt-6 max-w-[900px] text-[17px] leading-[1.6] text-[#516075] md:text-[18px]'>
                {description}
              </p>
            </div>

            <div className='mx-auto mt-12 grid max-w-[870px] grid-cols-1 gap-6 md:grid-cols-2'>
              {heroImage ? (
                <div className='md:col-span-2'>
                  <img
                    src={heroImage}
                    alt={heading}
                    className='h-[260px] w-full rounded-[16px] object-cover md:h-[360px]'
                    loading='lazy'
                  />
                </div>
              ) : null}
              {cards.map(({ title, description: cardDescription, accent }, index) => {
                const icons = [Heart, Users, BookOpen, Globe]
                const Icon = icons[index % icons.length]
                return (
                <article
                  key={`${title ?? 'mission-card'}-${index}`}
                  className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-[12px] text-white ${accent ?? 'bg-[#2d4f9f]'}`}
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
      </div>

      <section className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[870px]'>
            <h2 className='text-center text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              {t('about.mission.coreValuesTitle')}
            </h2>

            <div className='mt-10 space-y-6'>
              {values.map((value, index) => (
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
