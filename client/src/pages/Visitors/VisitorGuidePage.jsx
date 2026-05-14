import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Clock3,
  Copy,
  Mail,
  MapPin,
  Phone,
  Star,
} from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSiteContentQuery } from '@/hooks/useContent'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.3156207235006!2d13.54695737668049!3d52.50962697205845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a849415a3c34c1%3A0x38e28ffe06a0b655!2sAlt-Biesdorf%2071%2C%2012683%20Berlin%2C%20Germany!5e0!3m2!1sen!2s!4v1777803546100!5m2!1sen!2s'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
}

const SectionLabel = ({ children }) => (
  <div className='mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#071544]/40 md:mb-5'>
    <span className='h-px w-6 bg-[#f6ab3c]/30' />
    {children}
  </div>
)
const MotionDiv = motion.div
const MotionH1 = motion.h1
const MotionP = motion.p
const MotionSection = motion.section

const VisitorGuidePage = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { data: content } = useSiteContentQuery()
  const [copied, setCopied] = React.useState(false)

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.getElementById(location.hash.slice(1))
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

  const visitorContent = React.useMemo(
    () => {
      const backendRules = content?.visitors?.rulesEtiquette
      const backendFaq = content?.visitors?.faq

      return ({
      guide: {
        title: content?.visitors?.guide?.title?.trim() || t('visitors.guideTitle'),
        body: content?.visitors?.guide?.body?.trim() || t('visitors.guideBody'),
      },
      rulesEtiquette:
        Array.isArray(backendRules)
          ? backendRules
          : t('visitors.rulesDescriptions', { returnObjects: true }),
      openingTimings: {
        dailySchedule:
          content?.visitors?.openingTimings?.dailySchedule?.length > 0
            ? content.visitors.openingTimings.dailySchedule
            : [],
        langarSchedule:
          content?.visitors?.openingTimings?.langarSchedule?.length > 0
            ? content.visitors.openingTimings.langarSchedule
            : [],
        sundaySpecial: content?.visitors?.openingTimings?.sundaySpecial ?? '',
      },
      location: {
        addressLines:
          content?.visitors?.location?.addressLines?.length > 0
            ? content.visitors.location.addressLines
            : content?.contact?.addressLines ?? [],
        howToReach: content?.visitors?.location?.howToReach ?? [],
      },
      contact: {
        phone: content?.contact?.phone ?? '',
        email: content?.contact?.email ?? '',
      },
      faq:
        Array.isArray(backendFaq)
          ? backendFaq
          : t('visitors.faq', { returnObjects: true }),
    })},
    [content, t],
  )

  const additionalGuidelines = React.useMemo(
    () => t('visitors.additionalGuidelines', { returnObjects: true }),
    [t],
  )
  const contactPhoneDigits = String(visitorContent.contact.phone || '').replace(/[^\d+]/g, '')

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(visitorContent.contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy visitor contact email:', error)
    }
  }

  return (
    <div className='min-h-screen bg-[#fafafa] font-["Outfit",sans-serif] text-[#071544] selection:bg-[#f6ab3c]/30'>
      <div className='relative'>
        <NavbarSection />

        {/* Hero Section - Exact Match with ProgramsPage */}
        <section className='relative isolate overflow-hidden bg-[#071544] pt-[136px] pb-10 md:pt-[140px] md:pb-20'>
          {/* Subtle Geometric Grid */}
          <div className='absolute inset-0 z-0 opacity-[0.05]' 
               style={{ backgroundImage: 'linear-gradient(#fff 0.5px, transparent 0.5px), linear-gradient(90deg, #fff 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />
          
          <div className='container relative z-10 mx-auto px-5'>
            <div className='mx-auto max-w-4xl text-center'>
              <MotionDiv
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#f6ab3c]/80'
              >
                <span className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c]/60' />
                Visitor Community Engagement
              </MotionDiv>

              <MotionH1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'
              >
                {t('visitors.heading')}
              </MotionH1>

              <MotionP
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='mx-auto mt-4 max-w-2xl text-balance text-[15px] font-light leading-relaxed text-white/70 md:mt-6 md:text-lg'
              >
                {t('visitors.subtitle')}
              </MotionP>
            </div>
          </div>
        </section>

        {/* Overlapping Content Section - Exact Structural Match */}
        <section id='visitor-tabs' className='relative z-20 -mt-6 px-4 pb-16 md:-mt-8 md:px-6 md:pb-20'>
          <div className='container mx-auto max-w-[1200px]'>
            <div className='rounded-2xl border border-[#071544]/[0.08] bg-white p-5 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.02)] sm:p-6 md:rounded-3xl md:p-10'>
              <div className='border-b border-[#071544]/[0.03] pb-10 md:pb-12'>
                <div className='max-w-2xl'>
                  <SectionLabel>Visitor Guide</SectionLabel>
                  <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-4xl lg:text-5xl'>
                    Your <span className='text-[#f6ab3c]'>Visit</span>
                  </h2>
                  <p className='mt-5 text-[15px] font-light leading-relaxed text-[#5a677a] md:text-lg'>
                    Everything you need to know for a meaningful and respectful experience at our Gurdawara.
                  </p>
                </div>
              </div>

              {/* Content Sections - Cleanly Nested */}
              <div className='space-y-4 md:space-y-6'>
                {/* Guide Journey Section */}
                <MotionSection
                  id='visitor-guide'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  variants={sectionVariants}
                  className='py-12 md:py-16'
                >
                  <div className='max-w-3xl'>
                    <SectionLabel>The Journey</SectionLabel>
                    <h3 className='text-2xl font-semibold tracking-tight text-[#071544] md:text-3xl'>
                      {visitorContent.guide.title}
                    </h3>
                    <div className='mt-6 text-[15px] font-light leading-relaxed text-[#5a677a] md:mt-8 md:text-lg'>
                      {visitorContent.guide.body.split('\n').map((line, index) => (
                        <p key={index} className='mb-4 last:mb-0'>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </MotionSection>

                {/* Rules & Etiquette Section */}
                <MotionSection
                  id='rules-etiquette'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  variants={sectionVariants}
                  className='rounded-2xl bg-[#f8f9fa] p-6 md:rounded-3xl md:p-10'
                >
                  <div className='mb-8 md:mb-12'>
                    <SectionLabel>Etiquette</SectionLabel>
                    <h2 className='text-2xl font-semibold tracking-tight text-[#071544] md:text-4xl'>
                      {t('visitors.rulesTitle')}
                    </h2>
                  </div>

                  <div className='rounded-2xl border border-[#071544]/[0.08] bg-white shadow-[0_20px_40px_-28px_rgba(7,21,68,0.2)] md:rounded-3xl'>
                    <div className='divide-y divide-[#071544]/[0.08]'>
                      {visitorContent.rulesEtiquette.map((rule, index) => (
                        <MotionDiv
                          key={`${rule}-${index}`}
                          custom={index}
                          initial='hidden'
                          whileInView='visible'
                          viewport={{ once: true, margin: '-40px' }}
                          variants={cardVariants}
                          className='group flex items-start gap-4 px-5 py-4 transition-colors duration-300 hover:bg-[#f8f9fb] md:px-8 md:py-5'
                        >
                          <span className='mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-[#071544]/15 bg-[#f6f8fc] px-2 text-[10px] font-bold tracking-wider text-[#071544]/55'>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <p className='text-[14px] font-normal leading-relaxed text-[#3f4b60] md:text-[15px]'>{rule}</p>
                        </MotionDiv>
                      ))}
                    </div>
                  </div>

                  <div className='mt-10 rounded-2xl border border-[#f6ab3c]/20 bg-gradient-to-br from-white to-[#fefaf3] p-6 md:mt-12 md:rounded-3xl md:p-8'>
                    <div className='flex flex-col gap-6 md:flex-row md:items-start md:gap-8'>
                      <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f6ab3c]/10 md:h-14 md:w-14 md:rounded-2xl'>
                        <BookOpen className='h-6 w-6 text-[#f6ab3c]' />
                      </div>
                      <div>
                        <h3 className='text-xl font-semibold tracking-tight text-[#071544] md:text-2xl'>
                          {t('visitors.additionalGuidelinesTitle')}
                        </h3>
                        <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-8 md:gap-x-8'>
                          {additionalGuidelines.map((guideline) => (
                            <div key={guideline} className='flex items-start gap-3'>
                              <span className='mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#f6ab3c]' />
                              <span className='text-[14px] font-light leading-relaxed text-[#5a677a] md:text-[15px]'>{guideline}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionSection>

                {/* Schedule Section */}
                <MotionSection
                  id='opening-timings'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  variants={sectionVariants}
                  className='py-12 md:py-16'
                >
                  <div className='mb-8 md:mb-12'>
                    <SectionLabel>Schedule</SectionLabel>
                    <h2 className='text-2xl font-semibold tracking-tight text-[#071544] md:text-4xl'>
                      {t('visitors.openingTitle')}
                    </h2>
                  </div>

                  <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12'>
                    <div className='space-y-10'>
                      <div>
                        <h3 className='mb-6 flex items-center gap-3 text-lg font-semibold tracking-tight text-[#071544]'>
                          <span className='h-6 w-1 rounded-full bg-[#f6ab3c]' />
                          {t('visitors.dailyScheduleTitle')}
                        </h3>
                        <div className='space-y-1'>
                          {visitorContent.openingTimings.dailySchedule.map((item) => (
                            <div
                              key={item.label}
                              className='group flex items-center justify-between rounded-xl border border-transparent p-3 transition-all duration-300 hover:border-[#071544]/05 hover:bg-[#f8f9fa]'
                            >
                              <span className='text-[14px] font-light text-[#5a677a] md:text-[15px]'>
                                {item.label}
                              </span>
                              <span className='rounded-full border border-[#071544]/10 bg-white px-3 py-0.5 text-[11px] font-semibold tracking-wide text-[#071544]'>
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className='mb-6 flex items-center gap-3 text-lg font-semibold tracking-tight text-[#071544]'>
                          <span className='h-6 w-1 rounded-full bg-[#f6ab3c]' />
                          {t('visitors.langarTitle')}
                        </h3>
                        <div className='space-y-1'>
                          {visitorContent.openingTimings.langarSchedule.map((item) => (
                            <div
                              key={item.label}
                              className='group flex items-center justify-between rounded-xl border border-transparent p-3 transition-all duration-300 hover:border-[#071544]/05 hover:bg-[#f8f9fa]'
                            >
                              <span className='text-[14px] font-light text-[#5a677a] md:text-[15px]'>
                                {item.label}
                              </span>
                              <span className='rounded-full border border-[#071544]/10 bg-white px-3 py-0.5 text-[11px] font-semibold tracking-wide text-[#071544]'>
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className='rounded-2xl border border-[#071544]/[0.08] bg-[#f8f9fa] p-6 md:rounded-3xl md:p-8'>
                      <h3 className='flex items-center gap-3 text-xl font-semibold tracking-tight text-[#071544]'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#f6ab3c]/10'>
                          <Star className='h-5 w-5 text-[#f6ab3c]' />
                        </div>
                        {t('visitors.sundaySpecialTitle')}
                      </h3>
                      <p className='mt-6 text-[15px] font-light leading-relaxed text-[#5a677a] md:text-lg'>
                        {visitorContent.openingTimings.sundaySpecial}
                      </p>
                    </div>
                  </div>
                </MotionSection>

                {/* Location Section */}
                <MotionSection
                  id='location-map'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  variants={sectionVariants}
                  className='rounded-2xl bg-[#f8f9fa] p-6 md:rounded-3xl md:p-10'
                >
                  <div className='flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16'>
                    <div className='lg:w-1/3'>
                      <SectionLabel>Location</SectionLabel>
                      <h2 className='text-2xl font-semibold tracking-tight text-[#071544] md:text-4xl'>
                        {t('visitors.locationTitle')}
                      </h2>
                      
                      <div className='mt-8 space-y-8'>
                        <div>
                          <h3 className='text-[10px] font-bold uppercase tracking-widest text-[#071544]/40'>
                            {t('visitors.addressTitle')}
                          </h3>
                          <p className='mt-3 text-[15px] font-light leading-relaxed text-[#5a677a]'>
                            {visitorContent.location.addressLines.map((line, i, arr) => (
                              <React.Fragment key={line}>
                                {line}{i < arr.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </p>
                        </div>

                        <div className='space-y-5'>
                          <div>
                            <h4 className='text-[9px] font-bold uppercase tracking-widest text-[#f6ab3c]'>
                              {t('visitors.publicTransport')}
                            </h4>
                            <p className='mt-1 text-[14px] text-[#5a677a]'>{visitorContent.location.howToReach[0]}</p>
                          </div>
                          <div>
                            <h4 className='text-[9px] font-bold uppercase tracking-widest text-[#f6ab3c]'>
                              {t('visitors.byCar')}
                            </h4>
                            <p className='mt-1 text-[14px] text-[#5a677a]'>{t('visitors.carText')}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='lg:w-2/3'>
                      <div className='relative overflow-hidden rounded-2xl border border-[#071544]/[0.08] bg-white p-3 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.03)]'>
                        <div className='aspect-video w-full overflow-hidden rounded-xl'>
                          <iframe
                            title='Visitor location map'
                            src={mapEmbedUrl}
                            width='100%'
                            height='100%'
                            style={{ border: 0 }}
                            allowFullScreen
                            loading='lazy'
                            className='grayscale-[0.2] transition-all hover:grayscale-0'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionSection>

                {/* Contact Section */}
                <MotionSection
                  id='contact-information'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  variants={sectionVariants}
                  className='py-12 md:py-16'
                >
                  <div className='mb-8 md:mb-12'>
                    <SectionLabel>Connect</SectionLabel>
                    <h2 className='text-2xl font-semibold tracking-tight text-[#071544] md:text-4xl'>
                      {t('visitors.contactTitle')}
                    </h2>
                  </div>

                  <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                    <article className='group relative flex flex-col overflow-hidden rounded-2xl border border-[#071544]/[0.08] bg-[#f8f9fa] p-6 transition-all duration-500 hover:border-[#f6ab3c]/40 hover:bg-white hover:shadow-[0_40px_80px_-16px_rgba(246,171,60,0.12)] md:p-8'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#f6ab3c]/10 text-[#f6ab3c] shadow-sm transition-all duration-500 group-hover:bg-[#f6ab3c] group-hover:text-white md:h-14 md:w-14 md:rounded-2xl'>
                        <Phone className='h-6 w-6' />
                      </div>
                      <div className='mt-6 md:mt-8'>
                        <h3 className='text-lg font-semibold tracking-tight text-[#071544] md:text-xl'>
                          {t('visitors.phone')}
                        </h3>
                        <p className='mt-2 text-[15px] font-light text-[#5a677a]'>
                          {visitorContent.contact.phone}
                        </p>
                      </div>
                      <div className='mt-8 flex flex-wrap gap-3'>
                        <a
                          href={contactPhoneDigits ? `tel:${contactPhoneDigits}` : '#'}
                          className='inline-flex h-9 items-center justify-center rounded-full border border-[#071544]/10 bg-white px-5 text-[10px] font-bold uppercase tracking-widest text-[#071544] transition-all hover:border-[#f6ab3c]/30 hover:bg-[#f6ab3c]/05'
                        >
                          Call Now
                        </a>
                        <a
                          href={contactPhoneDigits ? `https://wa.me/${contactPhoneDigits.replace(/^\+/, '')}` : '#'}
                          target='_blank'
                          rel='noreferrer'
                          className='inline-flex h-9 items-center justify-center rounded-full bg-[#f6ab3c] px-5 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-[#f6ab3c]/90'
                        >
                          WhatsApp
                        </a>
                      </div>
                    </article>

                    <article className='group relative flex flex-col overflow-hidden rounded-2xl border border-[#071544]/[0.08] bg-[#f8f9fa] p-6 transition-all duration-500 hover:border-[#f6ab3c]/40 hover:bg-white hover:shadow-[0_40px_80px_-16px_rgba(246,171,60,0.12)] md:p-8'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#f6ab3c]/10 text-[#f6ab3c] shadow-sm transition-all duration-500 group-hover:bg-[#f6ab3c] group-hover:text-white md:h-14 md:w-14 md:rounded-2xl'>
                        <Mail className='h-6 w-6' />
                      </div>
                      <div className='mt-6 md:mt-8'>
                        <h3 className='text-lg font-semibold tracking-tight text-[#071544] md:text-xl'>
                          {t('visitors.email')}
                        </h3>
                        <p className='mt-2 text-[15px] font-light text-[#5a677a]'>
                          {visitorContent.contact.email}
                        </p>
                      </div>
                      <div className='mt-8 flex flex-wrap gap-3'>
                        <button
                          onClick={handleCopyEmail}
                          className='inline-flex h-9 items-center justify-center rounded-full border border-[#071544]/10 bg-white px-5 text-[10px] font-bold uppercase tracking-widest text-[#071544] transition-all hover:border-[#f6ab3c]/30 hover:bg-[#f6ab3c]/05'
                        >
                          <Copy className='mr-2 h-3 w-3' />
                          {copied ? 'Copied' : 'Copy Email'}
                        </button>
                        <a
                          href={`mailto:${visitorContent.contact.email}`}
                          className='inline-flex h-9 items-center justify-center rounded-full bg-[#071544] px-5 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-[#071544]/90'
                        >
                          Send Message
                        </a>
                      </div>
                    </article>
                  </div>
                </MotionSection>

                {/* FAQ Section */}
                <MotionSection
                  id='faq'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  variants={sectionVariants}
                  className='rounded-2xl bg-[#f8f9fa] p-6 md:rounded-3xl md:p-10'
                >
                  <div className='max-w-3xl'>
                    <SectionLabel>FAQ</SectionLabel>
                    <h2 className='text-2xl font-semibold tracking-tight text-[#071544] md:text-4xl'>
                      {t('visitors.faqTitle')}
                    </h2>
                    <div className='mt-8 space-y-4 md:mt-12 md:space-y-6'>
                      {visitorContent.faq.map((item) => (
                        <article
                          key={item.question}
                          className='group rounded-2xl border border-[#071544]/[0.08] bg-white p-5 transition-all duration-300 hover:border-[#f6ab3c]/40 hover:shadow-[0_24px_48px_-12px_rgba(7,21,68,0.03)] md:rounded-3xl md:p-8'
                        >
                          <h3 className='text-[15px] font-semibold tracking-tight text-[#071544] md:text-lg'>
                            {item.question}
                          </h3>
                          <p className='mt-3 text-[14px] font-light leading-relaxed text-[#5a677a] md:text-[15px]'>
                            {item.answer}
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>
                </MotionSection>
              </div>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}

export default VisitorGuidePage

