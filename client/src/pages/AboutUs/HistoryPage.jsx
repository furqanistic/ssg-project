import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import { motion as Motion, useInView } from 'framer-motion'
import {
  Clock3, Compass, Globe, Heart, Landmark, MapPin, ScrollText, Sparkles,
} from 'lucide-react'
import React, { useRef } from 'react'

const historyIcons = [Landmark, ScrollText, Clock3, MapPin, Sparkles, Compass, Globe, Heart]

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

const fadeRight = {
  hidden: { opacity: 0, x: -24 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

// ─── Eyebrow Label ────────────────────────────────────────────────────────────
const Eyebrow = ({ children, light = false }) => (
  <div
    className={`mb-5 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${
      light
        ? 'border-white/10 bg-white/5 text-[#f6ab3c]/80'
        : 'border-[#071544]/10 bg-[#071544]/[0.03] text-[#071544]/50'
    }`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-[#f6ab3c]/60' : 'bg-[#f6ab3c]'}`} />
    {children}
  </div>
)

// ─── Featured Card (Double-Bezel) ─────────────────────────────────────────────
const FeaturedCard = ({ section, index }) => {
  const Icon = historyIcons[index % historyIcons.length]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Motion.article
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      // Outer shell (Double-Bezel)
      className='group relative rounded-[2rem] border border-[#071544]/[0.07] bg-[#071544]/[0.02] p-2'
    >
      {/* Inner core */}
      <div className='flex h-full flex-col rounded-[calc(2rem-0.5rem)] bg-white p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-500 group-hover:shadow-[0_20px_48px_-12px_rgba(7,21,68,0.06)] md:p-10'>
        {/* Icon */}
        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#f6ab3c]/10 text-[#f6ab3c] transition-all duration-500 group-hover:bg-[#f6ab3c] group-hover:text-white'>
          <Icon className='h-5 w-5' strokeWidth={1.5} />
        </div>

        {/* Gold rule */}
        <div className='mt-6 h-px w-8 bg-[#f6ab3c]/30 transition-all duration-500 group-hover:w-16 group-hover:bg-[#f6ab3c]/60' />

        <h2 className='mt-5 text-xl font-semibold leading-snug tracking-tight text-[#071544] md:text-2xl'>
          {section?.title}
        </h2>
        <p className='mt-4 flex-1 text-[14px] font-light leading-relaxed text-[#5a677a] md:text-[15px]'>
          {section?.body}
        </p>
      </div>
    </Motion.article>
  )
}

// ─── Timeline Card ────────────────────────────────────────────────────────────
const TimelineCard = ({ section, index, totalCount }) => {
  const Icon = historyIcons[(index + 2) % historyIcons.length]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLast = index === totalCount - 1

  return (
    <Motion.div
      ref={ref}
      custom={index}
      variants={fadeRight}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      className='relative flex gap-6'
    >
      {/* Timeline spine */}
      <div className='relative flex flex-col items-center'>
        {/* Node */}
        <div className='relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#f6ab3c]/30 bg-white shadow-[0_0_0_4px_#fafafa]'>
          <Icon className='h-4 w-4 text-[#f6ab3c]' strokeWidth={1.5} />
        </div>
        {/* Line connecting to next */}
        {!isLast && (
          <div className='mt-1 w-px flex-1 bg-gradient-to-b from-[#f6ab3c]/25 to-transparent' />
        )}
      </div>

      {/* Content */}
      <div className='group mb-10 flex-1 rounded-2xl border border-[#071544]/[0.06] bg-white p-6 transition-all duration-500 hover:border-[#f6ab3c]/20 hover:shadow-[0_12px_32px_-8px_rgba(7,21,68,0.05)] md:p-8'>
        <h3 className='text-lg font-semibold tracking-tight text-[#071544] md:text-xl'>
          {section?.title}
        </h3>
        <div className='mt-3 h-px w-6 bg-[#f6ab3c]/40 transition-all duration-500 group-hover:w-12 group-hover:bg-[#f6ab3c]/70' />
        <p className='mt-4 text-[14px] font-light leading-relaxed text-[#5a677a] md:text-[15px]'>
          {section?.body}
        </p>
      </div>
    </Motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const HistoryPage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const history = aboutUs.history
  const sections = Array.isArray(history.sections) ? history.sections : []
  const featuredSections = sections.slice(0, 2)
  const timelineSections = sections.slice(2)

  return (
    <div className='min-h-screen bg-[#fafafa] font-["Outfit",sans-serif] text-[#071544] selection:bg-[#f6ab3c]/30'>
      <div className='relative'>
        <NavbarSection />

        {/* ── Hero ── */}
        <section className='relative isolate overflow-hidden bg-[#071544] pt-[136px] pb-14 md:pt-[152px] md:pb-24'>
          {history.heroImage && (
            <div className='absolute inset-0 z-0'>
              <img
                src={history.heroImage}
                alt={history.heroTitle}
                className='h-full w-full object-cover'
                loading='lazy'
              />
              <div className='absolute inset-0 bg-[#071544]/80' />
            </div>
          )}

          {/* Geometric grid texture */}
          <div
            className='absolute inset-0 z-0 opacity-[0.04]'
            style={{
              backgroundImage:
                'linear-gradient(#fff 0.5px, transparent 0.5px), linear-gradient(90deg, #fff 0.5px, transparent 0.5px)',
              backgroundSize: '44px 44px',
            }}
          />

          {/* Left-aligned split hero layout */}
          <div className='container relative z-10 mx-auto px-5 md:px-10'>
            <div className='grid grid-cols-1 items-end gap-10 md:grid-cols-2 md:gap-16'>
              {/* Left block */}
              <div>
                <Motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Eyebrow light>Institutional Legacy</Eyebrow>
                </Motion.div>

                <Motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className='mt-1 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl'
                >
                  {history.heroTitle}
                </Motion.h1>
              </div>

              {/* Right block — subtitle */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className='md:pb-2'
              >
                {/* Gold hairline accent */}
                <div className='mb-4 h-px w-10 bg-[#f6ab3c]/50' />
                <p className='text-[15px] font-light leading-relaxed text-white/65 md:text-base'>
                  {history.heroSubtitle}
                </p>
              </Motion.div>
            </div>
          </div>
        </section>

        {/* ── Featured Cards (overlapping pull-up) ── */}
        <section className='relative z-20 -mt-8 px-4 pb-4 md:-mt-10 md:px-6 md:pb-6'>
          <div className='container mx-auto max-w-[1200px]'>
            {featuredSections.length > 0 && (
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6'>
                {featuredSections.map((section, i) => (
                  <FeaturedCard key={i} section={section} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Timeline Section ── */}
        {timelineSections.length > 0 && (
          <section className='relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16'>
            {/* Subtle grid bg */}
            <div
              className='absolute inset-0 z-0 opacity-[0.025]'
              style={{
                backgroundImage:
                  'linear-gradient(#071544 0.5px, transparent 0.5px), linear-gradient(90deg, #071544 0.5px, transparent 0.5px)',
                backgroundSize: '56px 56px',
              }}
            />

            <div className='container relative z-10 mx-auto px-4 md:px-6'>
              <div className='mx-auto max-w-[1200px]'>
                {/* Section header */}
                <Motion.div
                  variants={fadeUp}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  className='mb-12 md:mb-16'
                >
                  <Eyebrow>Our Journey</Eyebrow>
                  <h2 className='mt-3 text-2xl font-semibold tracking-tight text-[#071544] md:text-3xl'>
                    Milestones & Community
                  </h2>
                </Motion.div>

                {/* Two-column timeline layout */}
                <div className='grid grid-cols-1 gap-x-16 md:grid-cols-2'>
                  {/* Left column */}
                  <div>
                    {timelineSections
                      .filter((_, i) => i % 2 === 0)
                      .map((section, i) => (
                        <TimelineCard
                          key={i}
                          section={section}
                          index={i * 2}
                          totalCount={timelineSections.length}
                        />
                      ))}
                  </div>
                  {/* Right column — staggered down slightly on desktop */}
                  <div className='md:mt-12'>
                    {timelineSections
                      .filter((_, i) => i % 2 !== 0)
                      .map((section, i) => (
                        <TimelineCard
                          key={i}
                          section={section}
                          index={i * 2 + 1}
                          totalCount={timelineSections.length}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <SiteFooter />
    </div>
  )
}

export default HistoryPage
