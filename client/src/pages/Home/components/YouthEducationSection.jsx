import React, { useMemo } from 'react'
import { ArrowRight, GraduationCap, Heart, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const educationIcons = [GraduationCap, GraduationCap, Users]
const ctaIcons = [Users, Heart]

const EducationCard = ({ title, description, icon: Icon, accent, ctaLabel }) => {
  return (
    <article className='rounded-[16px] border border-[#d8dce4] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-[14px] ${accent}`}
      >
        <Icon className='h-6 w-6 stroke-[2]' />
      </div>
      <h3 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318]'>
        {title}
      </h3>
      <p className='mt-3 max-w-[32ch] text-[15px] leading-[1.5] text-[#5a677a] md:text-[16px]'>
        {description}
      </p>
      <button
        type='button'
        className='mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#f6ab3c] transition hover:text-[#eb9e2a]'
      >
        {ctaLabel}
        <ArrowRight className='h-4 w-4' />
      </button>
    </article>
  )
}

const CtaCard = ({ title, description, icon: Icon, buttonLabel, buttonClass }) => {
  return (
    <article className='rounded-[20px] bg-[rgba(255,255,255,0.12)] px-7 py-7 text-white backdrop-blur-[2px]'>
      <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#f6ab3c] text-white'>
        <Icon className='h-6 w-6 stroke-[2]' />
      </div>
      <h3 className='text-[22px] font-bold tracking-[-0.02em] text-white md:text-[23px]'>
        {title}
      </h3>
      <p className='mt-4 max-w-[48ch] text-[15px] leading-[1.55] text-white/92 md:text-[16px]'>
        {description}
      </p>
      <button
        type='button'
        className={`mt-6 inline-flex h-11 items-center justify-center rounded-[11px] px-7 text-[15px] font-semibold transition ${buttonClass}`}
      >
        {buttonLabel}
      </button>
    </article>
  )
}

const YouthEducationSection = () => {
  const { t } = useTranslation()

  const educationCards = useMemo(() => {
    const cards = t('home.youthSection.cards', { returnObjects: true })
    return cards.map((card, index) => ({
      ...card,
      icon: educationIcons[index],
      accent: index % 2 === 1 ? 'bg-[#2d4f9f] text-white' : 'bg-[#f6ab3c] text-white',
    }))
  }, [t])

  const ctaCards = useMemo(() => {
    const cards = t('home.youthSection.cta', { returnObjects: true })
    return cards.map((card, index) => ({
      ...card,
      icon: ctaIcons[index],
      buttonClass:
        index === 0
          ? 'bg-white text-[#264f9e] hover:bg-white/90'
          : 'bg-[#f6ab3c] text-white hover:bg-[#f0a12c]',
    }))
  }, [t])

  return (
    <section className='bg-[#f2f2f2]'>
      <div className='px-4 py-10 md:px-6 md:py-12'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='text-center'>
            <h2 className='text-[26px] font-extrabold tracking-[-0.02em] text-[#111318] md:text-[32px]'>
              {t('home.youthSection.title')}
            </h2>
            <p className='mt-2.5 text-[15px] text-[#5a677a] md:text-[16px]'>
              {t('home.youthSection.subtitle')}
            </p>
          </div>

          <div className='mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3'>
            {educationCards.map((card) => (
              <EducationCard
                key={card.title}
                {...card}
                ctaLabel={t('common.actions.learnMore')}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='bg-[#3567c4] px-4 py-10 md:px-6 md:py-11'>
        <div className='mx-auto grid max-w-[1280px] grid-cols-1 gap-5 lg:grid-cols-2'>
          {ctaCards.map((card) => (
            <CtaCard key={card.title} {...card} buttonLabel={card.button} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default YouthEducationSection
