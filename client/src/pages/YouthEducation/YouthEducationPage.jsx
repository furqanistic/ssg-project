import React, { useEffect, useMemo } from 'react'
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Heart,
  Users,
} from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import { useSiteContentQuery } from '@/hooks/useContent'

const scrollTargets = [
  'gurmukhi-class',
  'german-class',
  'camps-workshops',
  'registration',
]

const readLocalizedValue = (value, language = 'en') => {
  if (typeof value === 'string') {
    return value
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] || value.en || ''
  }

  return ''
}

const YouthEducationPage = () => {
  const location = useLocation()
  const { data: content } = useSiteContentQuery()
  const { i18n } = useTranslation()
  const language = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]

  useEffect(() => {
    const hash = location.hash.slice(1)
    if (!hash || !scrollTargets.includes(hash)) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.getElementById(hash)
    if (!target) {
      return
    }

    requestAnimationFrame(() => {
      const navbarOffset = 88
      const top =
        target.getBoundingClientRect().top + window.scrollY - navbarOffset

      window.scrollTo({ top, behavior: 'smooth' })
    })
  }, [location.hash])

  const youth = useMemo(() => {
    const source = content?.services?.youthEducation ?? {}
    const reasons = Array.from({ length: 4 }).map((_, index) => ({
      title: readLocalizedValue(source.reasons?.[index]?.title, language),
      text: readLocalizedValue(source.reasons?.[index]?.text, language),
    }))
    const gurmukhiLevels = Array.from({ length: 3 }).map((_, index) => ({
      title: readLocalizedValue(source.gurmukhi?.levels?.[index]?.title, language),
      description: readLocalizedValue(source.gurmukhi?.levels?.[index]?.description, language),
    }))
    const germanTracks = Array.from({ length: 3 }).map((_, index) => ({
      title: readLocalizedValue(source.german?.tracks?.[index]?.title, language),
      description: readLocalizedValue(source.german?.tracks?.[index]?.description, language),
    }))
    const campsCards = Array.from({ length: 3 }).map((_, index) => ({
      title: readLocalizedValue(source.camps?.cards?.[index]?.title, language),
      description: readLocalizedValue(source.camps?.cards?.[index]?.description, language),
      time: readLocalizedValue(source.camps?.cards?.[index]?.time, language),
    }))

    return {
      heading: readLocalizedValue(source.heading, language),
      subtitle: readLocalizedValue(source.subtitle, language),
      intro: readLocalizedValue(source.intro, language),
      gurmukhi: {
        title: readLocalizedValue(source.gurmukhi?.title, language),
        description: readLocalizedValue(source.gurmukhi?.description, language),
        image: source.gurmukhi?.image ?? '',
        scheduleTitle: readLocalizedValue(source.gurmukhi?.scheduleTitle, language),
        scheduleDay: readLocalizedValue(source.gurmukhi?.scheduleDay, language),
        scheduleTime: readLocalizedValue(source.gurmukhi?.scheduleTime, language),
        scheduleLocation: readLocalizedValue(source.gurmukhi?.scheduleLocation, language),
        levels: gurmukhiLevels,
      },
      german: {
        title: readLocalizedValue(source.german?.title, language),
        description: readLocalizedValue(source.german?.description, language),
        image: source.german?.image ?? '',
        scheduleTitle: readLocalizedValue(source.german?.scheduleTitle, language),
        scheduleDay: readLocalizedValue(source.german?.scheduleDay, language),
        scheduleTime: readLocalizedValue(source.german?.scheduleTime, language),
        scheduleLocation: readLocalizedValue(source.german?.scheduleLocation, language),
        tracks: germanTracks,
      },
      camps: {
        title: readLocalizedValue(source.camps?.title, language),
        subtitle: readLocalizedValue(source.camps?.subtitle, language),
        cards: campsCards,
      },
      registration: {
        title: readLocalizedValue(source.registration?.title, language),
        description: readLocalizedValue(source.registration?.description, language),
        contactButtonLabel: readLocalizedValue(source.registration?.contactButtonLabel, language),
        scheduleButtonLabel: readLocalizedValue(source.registration?.scheduleButtonLabel, language),
      },
      whyEnrollTitle: readLocalizedValue(source.whyEnrollTitle, language),
      reasons,
    }
  }, [content?.services?.youthEducation, language])

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='bg-[#3567c4] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[1040px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                {youth.heading}
              </h1>
              <p className='mt-3 max-w-[880px] text-[17px] text-white/90 md:text-[18px]'>
                {youth.subtitle}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[900px] text-center'>
            <p className='text-[17px] leading-[1.65] text-[#516075] md:text-[18px]'>
              {youth.intro}
            </p>
          </div>
        </div>
      </section>

      <section id='gurmukhi-class' className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 xl:grid-cols-[1.05fr_0.95fr]'>
          <div>
            <div className='mb-7 flex h-16 w-16 items-center justify-center rounded-[16px] bg-[#f6ab3c] text-white'>
              <BookOpen className='h-7 w-7 stroke-[2]' />
            </div>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              {youth.gurmukhi.title}
            </h2>
            <p className='mt-6 max-w-[34ch] text-[16px] leading-[1.7] text-[#516075] md:text-[17px]'>
              {youth.gurmukhi.description}
            </p>

            <div className='mt-7 space-y-5 text-[16px] leading-[1.55] text-[#516075] md:text-[17px]'>
              {youth.gurmukhi.levels.map((level, index) => (
                <div key={`${level.title}-${index}`} className='flex items-start gap-3'>
                  <span className='mt-2 h-2.5 w-2.5 rounded-full bg-[#f39d2f]' />
                  <div>
                    <h3 className='font-bold text-[#111318]'>{level.title}</h3>
                    <p className='mt-1'>{level.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-8 max-w-[600px] rounded-[16px] border border-[#cfe0ff] bg-[#ebf3ff] px-6 py-6'>
              <div className='flex items-start gap-3'>
                <CalendarDays className='mt-1 h-5 w-5 text-[#f39d2f]' />
                <div>
                  <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                    {youth.gurmukhi.scheduleTitle}
                  </h3>
                  <p className='mt-4 text-[15px] font-bold leading-[1.6] text-[#4f5f77] md:text-[16px]'>
                    {youth.gurmukhi.scheduleDay}
                    <br />
                    <span className='font-normal'>{youth.gurmukhi.scheduleTime}</span>
                    <br />
                    <span className='font-normal'>{youth.gurmukhi.scheduleLocation}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='overflow-hidden rounded-[22px] shadow-[0_18px_40px_rgba(13,23,45,0.08)]'>
            <img
              src={youth.gurmukhi.image}
              alt='Children in class'
              className='h-full w-full object-cover'
              loading='lazy'
            />
          </div>
        </div>
      </section>

      <section id='german-class' className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 xl:grid-cols-[0.95fr_1.05fr]'>
          <div className='overflow-hidden rounded-[22px] shadow-[0_18px_40px_rgba(13,23,45,0.08)]'>
            <img
              src={youth.german.image}
              alt='German language class'
              className='h-full w-full object-cover'
              loading='lazy'
            />
          </div>
          <div>
            <div className='mb-7 flex h-16 w-16 items-center justify-center rounded-[16px] bg-[#2d4f9f] text-white'>
              <GraduationCap className='h-7 w-7 stroke-[2]' />
            </div>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              {youth.german.title}
            </h2>
            <p className='mt-6 max-w-[36ch] text-[16px] leading-[1.7] text-[#516075] md:text-[17px]'>
              {youth.german.description}
            </p>

            <div className='mt-7 space-y-5 text-[16px] leading-[1.55] text-[#516075] md:text-[17px]'>
              {youth.german.tracks.map((track, index) => (
                <div key={`${track.title}-${index}`} className='flex items-start gap-3'>
                  <span className='mt-2 h-2.5 w-2.5 rounded-full bg-[#2d4f9f]' />
                  <div>
                    <h3 className='font-bold text-[#111318]'>{track.title}</h3>
                    <p className='mt-1'>{track.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-8 max-w-[600px] rounded-[16px] border border-[#f4c58c] bg-[#fff6ea] px-6 py-6'>
              <div className='flex items-start gap-3'>
                <CalendarDays className='mt-1 h-5 w-5 text-[#2d4f9f]' />
                <div>
                  <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                    {youth.german.scheduleTitle}
                  </h3>
                  <p className='mt-4 text-[15px] font-bold leading-[1.6] text-[#4f5f77] md:text-[16px]'>
                    {youth.german.scheduleDay}
                    <br />
                    <span className='font-normal'>{youth.german.scheduleTime}</span>
                    <br />
                    <span className='font-normal'>{youth.german.scheduleLocation}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='camps-workshops' className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='text-center'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-[16px] bg-[#f6ab3c] text-white'>
              <Users className='h-7 w-7 stroke-[2]' />
            </div>
            <h2 className='mt-7 text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              {youth.camps.title}
            </h2>
            <p className='mx-auto mt-4 max-w-[760px] text-[16px] leading-[1.65] text-[#516075] md:text-[17px]'>
              {youth.camps.subtitle}
            </p>
          </div>

          <div className='mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3'>
            {youth.camps.cards.map((card, index) => (
              <article
                key={`${card.title}-${index}`}
                className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
              >
                <h3 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318]'>
                  {card.title}
                </h3>
                <p className='mt-5 text-[15px] leading-[1.65] text-[#516075] md:text-[16px]'>
                  {card.description}
                </p>
                <p className='mt-6 text-[15px] font-semibold text-[#f39d2f] md:text-[16px]'>
                  {card.time}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id='registration' className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px] text-center'>
          <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
            {youth.registration.title}
          </h2>
          <p className='mx-auto mt-5 max-w-[820px] text-[16px] leading-[1.65] text-[#516075] md:text-[17px]'>
            {youth.registration.description}
          </p>

          <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <button
              type='button'
              className='inline-flex h-12 items-center justify-center rounded-[12px] bg-[#f6ab3c] px-8 text-[15px] font-semibold text-white transition hover:bg-[#f0a12c] md:text-[16px]'
            >
              {youth.registration.contactButtonLabel}
            </button>
            <button
              type='button'
              className='inline-flex h-12 items-center justify-center rounded-[12px] border border-[#2d4f9f] px-8 text-[15px] font-semibold text-[#2d4f9f] transition hover:bg-[#eef3ff] md:text-[16px]'
            >
              {youth.registration.scheduleButtonLabel}
            </button>
          </div>
        </div>
      </section>

      <section className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <h2 className='text-center text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
            {youth.whyEnrollTitle}
          </h2>

          <div className='mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4'>
            {[BookOpen, Users, GraduationCap, Heart].map((Icon, index) => (
              <div key={youth.reasons[index].title} className='text-center'>
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white ${
                    index % 2 === 0 ? 'bg-[#f6ab3c]' : 'bg-[#2d4f9f]'
                  }`}
                >
                  <Icon className='h-7 w-7 stroke-[2]' />
                </div>
                <h3 className='mt-6 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                  {youth.reasons[index].title}
                </h3>
                <p className='mx-auto mt-3 max-w-[240px] text-[15px] leading-[1.6] text-[#516075] md:text-[16px]'>
                  {youth.reasons[index].text}
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

export default YouthEducationPage
