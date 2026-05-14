import React, { useEffect, useMemo } from 'react'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Heart,
  Sparkles,
  Users,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion as Motion } from 'framer-motion'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import { useSiteContentQuery } from '@/hooks/useContent'

const scrollTargets = [
  'gurmukhi-class',
  'german-class',
  'camps-workshops',
  'registration',
]

const readLocalizedValue = (value, language = 'en', fallback = '') => {
  if (typeof value === 'string') {
    return value || fallback
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] || value.en || fallback
  }
  return fallback
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const SectionLabel = ({ children, light = false }) => (
  <div className={`mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] ${light ? 'text-white/40' : 'text-[#071544]/40'} md:mb-5`}>
    <span className={`h-px w-6 ${light ? 'bg-white/20' : 'bg-[#f6ab3c]/30'}`} />
    {children}
  </div>
)

const ProgramCard = ({ title, description, icon: IconComponent, scheduleDay, scheduleTime, scheduleLocation, index }) => {
  return (
    <Motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className='group relative flex flex-col overflow-hidden rounded-[2rem] border border-[#071544]/[0.08] bg-white p-8 transition-all duration-500 hover:border-[#f6ab3c]/40 hover:shadow-[0_40px_80px_-16px_rgba(246,171,60,0.12)] md:p-10'
    >
      <div className='flex items-start justify-between'>
        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6ab3c]/10 text-[#f6ab3c] shadow-sm transition-all duration-500 group-hover:bg-[#f6ab3c] group-hover:text-white'>
          {React.createElement(IconComponent, { className: 'h-7 w-7' })}
        </div>
        <span className='text-[12px] font-bold tracking-[0.2em] text-[#071544]/20'>
          0{index + 1}
        </span>
      </div>
      
      <div className='mt-10'>
        <h3 className='text-xl font-semibold tracking-tight text-[#071544] transition-colors duration-300 group-hover:text-[#f6ab3c] md:text-2xl'>
          {title}
        </h3>
        <p className='mt-4 text-[15px] font-light leading-relaxed text-[#5a677a] md:mt-5 md:text-lg'>
          {description}
        </p>
      </div>

      <div className='mt-10 pt-6 border-t border-[#071544]/05'>
        <div className='flex items-start gap-4'>
          <CalendarDays className='mt-1 h-4 w-4 shrink-0 text-[#f6ab3c]' />
          <div className='space-y-1'>
            <p className='text-[13px] font-bold uppercase tracking-widest text-[#071544]'>{scheduleDay}</p>
            <p className='text-[14px] font-light text-[#5a677a]'>{scheduleTime} &middot; {scheduleLocation}</p>
          </div>
        </div>
      </div>
    </Motion.article>
  )
}

const YouthEducationPage = () => {
  const location = useLocation()
  const { data: content } = useSiteContentQuery()
  const { i18n, t } = useTranslation()
  const language = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]

  useEffect(() => {
    const hash = location.hash.slice(1)
    if (!hash || !scrollTargets.includes(hash)) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const target = document.getElementById(hash)
    if (!target) return
    requestAnimationFrame(() => {
      const navbarOffset = 88
      const top = target.getBoundingClientRect().top + window.scrollY - navbarOffset
      window.scrollTo({ top, behavior: 'smooth' })
    })
  }, [location.hash])

  const youth = useMemo(() => {
    const source = content?.services?.youthEducation ?? {}
    const fallbackReasonsRaw = t('youthEducationPage.reasons', { returnObjects: true })
    const fallbackReasons = Array.isArray(fallbackReasonsRaw) ? fallbackReasonsRaw : []
    const reasons = Array.from({ length: 4 }).map((_, index) => ({
      title: readLocalizedValue(source.reasons?.[index]?.title, language, fallbackReasons[index]?.title || ''),
      text: readLocalizedValue(source.reasons?.[index]?.text, language, fallbackReasons[index]?.text || ''),
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
      whyEnrollTitle: readLocalizedValue(
        source.whyEnrollTitle,
        language,
        t('youthEducationPage.whyEnrollTitle'),
      ),
      reasons,
    }
  }, [content?.services?.youthEducation, language, t])

  const reasonItems = useMemo(() => {
    const reasonIcons = [BookOpen, Users, GraduationCap, Heart]
    return reasonIcons
      .map((Icon, index) => ({
        Icon,
        title: youth.reasons[index]?.title || '',
        text: youth.reasons[index]?.text || '',
        accent: index % 2 === 0 ? 'bg-[#f6ab3c] text-white' : 'bg-[#2d4f9f] text-white',
      }))
      .filter((item) => item.title || item.text)
  }, [youth.reasons])

  return (
    <div className='min-h-screen bg-[#fafafa] font-["Outfit",sans-serif] text-[#071544] selection:bg-[#f6ab3c]/30'>
      <div className='relative'>
        <NavbarSection />

        {/* Hero Section - Synchronized Architectural Style */}
        <section className='relative isolate overflow-hidden bg-[#071544] pt-[136px] pb-10 md:pt-[140px] md:pb-20'>
          {/* Subtle Geometric Grid */}
          <div className='absolute inset-0 z-0 opacity-[0.05]' 
               style={{ backgroundImage: 'linear-gradient(#fff 0.5px, transparent 0.5px), linear-gradient(90deg, #fff 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />
          
          <div className='container relative z-10 mx-auto px-5'>
            <div className='mx-auto max-w-4xl text-center'>
              <Motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#f6ab3c]/80'
              >
                <span className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c]/60' />
                Youth Development & Culture
              </Motion.div>

              <Motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'
              >
                {youth.heading}
              </Motion.h1>

              <Motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='mx-auto mt-4 max-w-2xl text-balance text-[15px] font-light leading-relaxed text-white/70 md:mt-6 md:text-lg'
              >
                {youth.subtitle}
              </Motion.p>
            </div>
          </div>
        </section>

        {/* Overlapping Content Container */}
        <section id='education-content' className='relative z-20 -mt-6 px-4 pb-16 md:-mt-8 md:px-6 md:pb-20'>
          <div className='container mx-auto max-w-[1200px]'>
            <div className='rounded-2xl border border-[#071544]/[0.08] bg-white p-5 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.02)] sm:p-6 md:rounded-3xl md:p-10'>
              
              {/* Internal Intro Block */}
              <div className='border-b border-[#071544]/[0.03] pb-10 md:pb-12'>
                <div className='max-w-3xl'>
                  <SectionLabel>Overview</SectionLabel>
                  <p className='text-[15px] font-light leading-relaxed text-[#5a677a] md:text-lg'>
                    {youth.intro}
                  </p>
                </div>
              </div>

              <div className='space-y-4 md:space-y-6'>
                {/* Gurmukhi Section */}
                <Motion.section
                  id='gurmukhi-class'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  variants={sectionVariants}
                  className='py-12 md:py-16'
                >
                  <div className='mb-10 md:mb-14'>
                    <SectionLabel>Gurmukhi</SectionLabel>
                    <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-5xl'>
                      {youth.gurmukhi.title}
                    </h2>
                    <p className='mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[#5a677a] md:text-lg'>
                      {youth.gurmukhi.description}
                    </p>
                  </div>

                  {youth.gurmukhi.image ? (
                    <div className='mb-8 overflow-hidden rounded-[1.5rem] border border-[#071544]/10 bg-white md:mb-10'>
                      <img
                        src={youth.gurmukhi.image}
                        alt='Gurmukhi class'
                        className='h-[220px] w-full object-cover md:h-[300px]'
                      />
                    </div>
                  ) : null}

                  <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {youth.gurmukhi.levels.map((level, index) => (
                      <ProgramCard
                        key={`${level.title}-${index}`}
                        {...level}
                        icon={BookOpen}
                        scheduleDay={youth.gurmukhi.scheduleDay}
                        scheduleTime={youth.gurmukhi.scheduleTime}
                        scheduleLocation={youth.gurmukhi.scheduleLocation}
                        index={index}
                      />
                    ))}
                  </div>
                </Motion.section>

                {/* German Section */}
                <Motion.section
                  id='german-class'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  variants={sectionVariants}
                  className='rounded-2xl bg-[#f8f9fa] p-6 md:rounded-3xl md:p-10'
                >
                  <div className='mb-10 md:mb-14'>
                    <SectionLabel>German Support</SectionLabel>
                    <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-5xl'>
                      {youth.german.title}
                    </h2>
                    <p className='mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[#5a677a] md:text-lg'>
                      {youth.german.description}
                    </p>
                  </div>

                  {youth.german.image ? (
                    <div className='mb-8 overflow-hidden rounded-[1.5rem] border border-[#071544]/10 bg-white md:mb-10'>
                      <img
                        src={youth.german.image}
                        alt='German support class'
                        className='h-[220px] w-full object-cover md:h-[300px]'
                      />
                    </div>
                  ) : null}

                  <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {youth.german.tracks.map((track, index) => (
                      <ProgramCard
                        key={`${track.title}-${index}`}
                        {...track}
                        icon={GraduationCap}
                        scheduleDay={youth.german.scheduleDay}
                        scheduleTime={youth.german.scheduleTime}
                        scheduleLocation={youth.german.scheduleLocation}
                        index={index}
                      />
                    ))}
                  </div>
                </Motion.section>

                {/* Enrichment Section */}
                <Motion.section
                  id='camps-workshops'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  variants={sectionVariants}
                  className='py-12 md:py-16'
                >
                  <div className='mb-10 md:mb-14'>
                    <SectionLabel>Enrichment</SectionLabel>
                    <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-5xl'>
                      {youth.camps.title}
                    </h2>
                    <p className='mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[#5a677a] md:text-lg'>
                      {youth.camps.subtitle}
                    </p>
                  </div>

                  <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {youth.camps.cards.map((card, index) => (
                      <Motion.article
                        key={`${card.title}-${index}`}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className='group relative flex flex-col overflow-hidden rounded-[2rem] border border-[#071544]/[0.08] bg-white p-8 transition-all duration-500 hover:border-[#f6ab3c]/40 hover:shadow-[0_40px_80px_-16px_rgba(246,171,60,0.12)] md:p-10'
                      >
                        <div className='flex items-start justify-between'>
                          <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6ab3c]/10 text-[#f6ab3c] shadow-sm transition-all duration-500 group-hover:bg-[#f6ab3c] group-hover:text-white'>
                            <Sparkles className='h-7 w-7' />
                          </div>
                          <span className='text-[12px] font-bold tracking-[0.2em] text-[#071544]/20'>
                            0{index + 1}
                          </span>
                        </div>
                        
                        <div className='mt-10'>
                          <h3 className='text-xl font-semibold tracking-tight text-[#071544] transition-colors duration-300 group-hover:text-[#f6ab3c] md:text-2xl'>
                            {card.title}
                          </h3>
                          <p className='mt-4 text-[15px] font-light leading-relaxed text-[#5a677a] md:mt-5 md:text-lg'>
                            {card.description}
                          </p>
                        </div>

                        <div className='mt-10 pt-6 border-t border-[#071544]/05'>
                          <div className='flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#f6ab3c]'>
                            <span className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c]' />
                            {card.time}
                          </div>
                        </div>
                      </Motion.article>
                    ))}
                  </div>
                </Motion.section>

                {/* Registration Section */}
                <Motion.section
                  id='registration'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  variants={sectionVariants}
                  className='rounded-2xl bg-[#071544] p-8 md:rounded-3xl md:p-16 relative overflow-hidden'
                >
                  {/* Internal Grid Motif */}
                  <div className='absolute inset-0 z-0 opacity-[0.05]' 
                       style={{ backgroundImage: 'linear-gradient(#fff 0.5px, transparent 0.5px), linear-gradient(90deg, #fff 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />

                  <div className='relative z-10 mx-auto max-w-2xl text-center'>
                    <SectionLabel light>Registration</SectionLabel>
                    <h2 className='text-3xl font-semibold tracking-tight text-white md:text-5xl'>
                      {youth.registration.title}
                    </h2>
                    <p className='mx-auto mt-6 text-[15px] font-light leading-relaxed text-white/60 md:text-lg'>
                      {youth.registration.description}
                    </p>
                    <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                      <Link
                        to='/contact#contact-form'
                        className='group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#f6ab3c] px-8 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-500 hover:bg-[#f6ab3c]/90 active:scale-[0.98]'
                      >
                        {youth.registration.contactButtonLabel}
                        <ArrowRight className='h-4 w-4 transition-transform duration-500 group-hover:translate-x-1' />
                      </Link>
                      <Link
                        to='/events/programs#yearly'
                        className='group inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 text-[11px] font-bold uppercase tracking-widest text-white/90 transition-all duration-500 hover:border-white/40 hover:bg-white/10 active:scale-[0.98]'
                      >
                        {youth.registration.scheduleButtonLabel}
                      </Link>
                    </div>
                  </div>
                </Motion.section>

                {/* Why Choose Us Section */}
                <Motion.section
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  variants={sectionVariants}
                  className='py-12 md:py-16'
                >
                  <div className='mb-10 md:mb-14'>
                    <SectionLabel>Impact</SectionLabel>
                    <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-5xl'>
                      {youth.whyEnrollTitle}
                    </h2>
                  </div>

                  <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
                    {reasonItems.map((item, index) => (
                      <Motion.div
                        key={`${item.title}-${item.text}`}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className='group flex flex-col items-start text-left'
                      >
                        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6ab3c]/10 text-[#f6ab3c] transition-all duration-500 group-hover:bg-[#f6ab3c] group-hover:text-white'>
                          <item.Icon className='h-6 w-6' />
                        </div>
                        <h3 className='mt-6 text-xl font-semibold tracking-tight text-[#071544]'>
                          {item.title}
                        </h3>
                        <p className='mt-3 text-[15px] font-light leading-relaxed text-[#5a677a]'>
                          {item.text}
                        </p>
                      </Motion.div>
                    ))}
                  </div>
                </Motion.section>
              </div>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}

export default YouthEducationPage

