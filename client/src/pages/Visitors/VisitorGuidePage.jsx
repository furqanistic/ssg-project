import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Clock3,
  Copy,
  Info,
  Mail,
  MapPin,
  Phone,
  Shirt,
  UtensilsCrossed,
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
  <div className='mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#111318]/35 md:mb-5'>
    <span className='h-px w-5 bg-[#111318]/15 md:w-6' />
    {children}
  </div>
)

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
    () => ({
      rulesEtiquette:
        content?.visitors?.rulesEtiquette?.length > 0
          ? content.visitors.rulesEtiquette
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
    }),
    [content, t],
  )

  const etiquetteCards = React.useMemo(
    () => [
      { title: t('visitors.rulesHeadings.0'), icon: Shirt },
      { title: t('visitors.rulesHeadings.1'), icon: Info },
      { title: t('visitors.rulesHeadings.2'), icon: UtensilsCrossed },
      { title: t('visitors.rulesHeadings.3'), icon: Info },
    ],
    [t],
  )

  const additionalGuidelines = React.useMemo(
    () => t('visitors.additionalGuidelines', { returnObjects: true }),
    [t],
  )
  const faqItems = React.useMemo(() => t('visitors.faq', { returnObjects: true }), [t])
  const contactPhoneDigits = String(visitorContent.contact.phone || '').replace(/[^\d+]/g, '')

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(visitorContent.contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const guideBody = t('visitors.guideBody')

  return (
    <div className='min-h-screen bg-[#f3f3f3] font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />

        <section className='relative isolate overflow-hidden bg-[#071544] text-white'>
          <div
            aria-hidden='true'
            className='absolute inset-0'
            style={{
              background: `
                radial-gradient(ellipse at 85% 20%, rgba(246,171,60,0.08), transparent 55%),
                radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03), transparent 40%),
                linear-gradient(180deg, #0c1f5e 0%, #0a1a52 40%, #071544 100%)
              `,
            }}
          />
          <div
            aria-hidden='true'
            className='absolute inset-0 opacity-[0.12]'
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '32px 32px',
              maskImage:
                'radial-gradient(ellipse at 50% 30%, white 0%, transparent 70%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at 50% 30%, white 0%, transparent 70%)',
            }}
          />
          <div
            aria-hidden='true'
            className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent'
          />

          <div className='relative z-10 mx-auto max-w-[1400px] px-5 pb-14 pt-[118px] md:px-10 md:pb-16 md:pt-32'>
            <div className='mx-auto max-w-[800px] text-center'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-white/70 md:mb-6'
              >
                <span className='h-1 w-1 rounded-full bg-[#f6ab3c]' />
                VISITOR INFORMATION
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className='text-balance text-4xl font-medium leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl'
              >
                {t('visitors.heading')}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className='mx-auto mt-5 flex flex-col items-center'
              >
                <div className='mb-4 h-5 w-px bg-gradient-to-b from-[#f6ab3c]/50 to-transparent' />
                <p className='max-w-[600px] text-pretty text-[15px] font-light leading-[1.65] text-white/60 sm:text-[16px] md:text-[17px]'>
                  {t('visitors.subtitle')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <motion.section
        id='visitor-guide'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionVariants}
        className='bg-white px-5 py-14 md:px-10 md:py-28'
      >
        <div className='mx-auto max-w-[1400px]'>
          <div className='mx-auto max-w-[900px]'>
            <SectionLabel>ABOUT THE GUIDE</SectionLabel>
            <h2 className='text-3xl font-medium tracking-tighter text-[#111318] md:text-5xl lg:text-6xl'>
              {t('visitors.guideTitle')}
            </h2>
            <div className='mt-5 text-[15px] font-light leading-[1.75] text-[#5a677a] md:mt-8 md:text-lg'>
              <span className='float-left mr-2 mt-0.5 text-[2.5rem] font-medium leading-[0.8] tracking-tighter text-[#111318] md:mr-3 md:text-[4.5rem]'>
                {guideBody.charAt(0)}
              </span>
              {guideBody
                .slice(1)
                .split('\\n')
                .map((line, index, arr) => (
                  <React.Fragment key={`${line}-${index}`}>
                    {line}
                    {index < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id='rules-etiquette'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionVariants}
        className='bg-[#f4f6f9] px-5 py-14 md:px-10 md:py-28'
      >
        <div className='mx-auto max-w-[1400px]'>
          <div className='mx-auto max-w-[900px]'>
            <SectionLabel>RULES &amp; ETIQUETTE</SectionLabel>
            <h2 className='text-3xl font-medium tracking-tighter text-[#111318] md:text-5xl lg:text-6xl'>
              {t('visitors.rulesTitle')}
            </h2>
          </div>

          <div className='mx-auto mt-10 grid max-w-[900px] grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-5'>
            {visitorContent.rulesEtiquette.map((rule, index) => {
              const card = etiquetteCards[index % etiquetteCards.length]
              const Icon = card.icon
              return (
                <motion.article
                  key={`${rule}-${index}`}
                  custom={index}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-40px' }}
                  variants={cardVariants}
                  className='group relative overflow-hidden rounded-2xl border border-[#dbe1ea] bg-white p-5 transition-all duration-500 hover:border-[#f6ab3c]/20 hover:shadow-[0_0_0_1px_rgba(246,171,60,0.08),0_24px_48px_-16px_rgba(17,19,24,0.06)] md:rounded-3xl md:p-8'
                >
                  <div className='absolute top-0 left-5 right-5 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#f6ab3c]/50 to-transparent opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100 md:left-6 md:right-6' />
                  <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6ab3c]/10 transition-all duration-500 group-hover:bg-[#f6ab3c]/15 md:mb-6 md:h-12 md:w-12 md:rounded-2xl'>
                    <Icon className='h-4 w-4 text-[#f6ab3c] transition-all duration-500 group-hover:scale-110 md:h-5 md:w-5' />
                  </div>
                  <h3 className='text-lg font-medium tracking-tight text-[#111318] md:text-xl'>
                    {card.title}
                  </h3>
                  <p className='mt-3 text-[14px] font-light leading-[1.65] text-[#5a677a] md:mt-4 md:text-[15px] md:leading-[1.7]'>
                    {rule}
                  </p>
                </motion.article>
              )
            })}
          </div>

          <div className='relative mx-auto mt-10 max-w-[900px] overflow-hidden rounded-2xl border border-[#f6ab3c]/15 bg-gradient-to-br from-[#fefaf3] via-[#fef7ed] to-[#fdf3e6] p-5 md:mt-12 md:rounded-3xl md:p-10'>
            <div
              className='pointer-events-none absolute inset-0 opacity-[0.06]'
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(246,171,60,0.5) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className='relative flex items-start gap-4 md:gap-5'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f6ab3c]/10 md:h-12 md:w-12 md:rounded-2xl'>
                <BookOpen className='h-4 w-4 text-[#f6ab3c] md:h-5 md:w-5' />
              </div>
              <div className='min-w-0 flex-1'>
                <h3 className='text-lg font-medium tracking-tight text-[#111318] md:text-xl'>
                  {t('visitors.additionalGuidelinesTitle')}
                </h3>
                <ul className='mt-4 space-y-2 text-[14px] font-light leading-[1.65] text-[#5a677a] md:mt-5 md:space-y-3 md:text-[15px] md:leading-[1.7]'>
                  {additionalGuidelines.map((guideline) => (
                    <li key={guideline} className='flex items-start gap-2 md:gap-3'>
                      <span className='mt-[6px] h-[3px] w-[3px] shrink-0 rounded-full bg-[#f6ab3c]/50 md:mt-[7px]' />
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id='opening-timings'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionVariants}
        className='bg-white px-5 py-14 md:px-10 md:py-28'
      >
        <div className='mx-auto max-w-[1400px]'>
          <div className='mx-auto max-w-[900px]'>
            <SectionLabel>OPENING HOURS</SectionLabel>
            <h2 className='text-3xl font-medium tracking-tighter text-[#111318] md:text-5xl lg:text-6xl'>
              {t('visitors.openingTitle')}
            </h2>
          </div>

          <div className='mx-auto mt-10 max-w-[900px] rounded-2xl border border-[#dbe1ea] bg-white p-5 md:mt-14 md:rounded-3xl md:p-10'>
            <div className='space-y-8 md:space-y-10'>
              <div>
                <div className='flex items-center gap-3 md:gap-4'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-[#f6ab3c]/10 md:h-10 md:w-10 md:rounded-2xl'>
                    <Clock3 className='h-4 w-4 text-[#f6ab3c] md:h-5 md:w-5' />
                  </div>
                  <h3 className='text-base font-medium tracking-tight text-[#111318] md:text-xl'>
                    {t('visitors.dailyScheduleTitle')}
                  </h3>
                </div>
                <div className='mt-4 space-y-0.5 md:mt-6 md:space-y-1'>
                  {visitorContent.openingTimings.dailySchedule.map((item) => (
                    <div
                      key={item.label}
                      className='group flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors duration-300 hover:bg-[#f4f6f9] md:rounded-xl md:px-4 md:py-3'
                    >
                      <span className='text-[14px] font-light leading-relaxed text-[#5a677a] md:text-[15px]'>
                        {item.label}
                      </span>
                      <span className='rounded-md border border-[#dbe1ea] bg-white px-2.5 py-0.5 text-[12px] font-medium tracking-tight text-[#111318] transition-all duration-300 group-hover:border-[#f6ab3c]/30 md:rounded-lg md:px-3 md:py-1 md:text-[13px]'>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='border-t border-[#dbe1ea] pt-8 md:pt-10'>
                <div className='flex items-center gap-3 md:gap-4'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-[#f6ab3c]/10 md:h-10 md:w-10 md:rounded-2xl'>
                    <Clock3 className='h-4 w-4 text-[#f6ab3c] md:h-5 md:w-5' />
                  </div>
                  <h3 className='text-base font-medium tracking-tight text-[#111318] md:text-xl'>
                    {t('visitors.langarTitle')}
                  </h3>
                </div>
                <div className='mt-4 space-y-0.5 md:mt-6 md:space-y-1'>
                  {visitorContent.openingTimings.langarSchedule.map((item) => (
                    <div
                      key={item.label}
                      className='group flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors duration-300 hover:bg-[#f4f6f9] md:rounded-xl md:px-4 md:py-3'
                    >
                      <span className='text-[14px] font-light leading-relaxed text-[#5a677a] md:text-[15px]'>
                        {item.label}
                      </span>
                      <span className='rounded-md border border-[#dbe1ea] bg-white px-2.5 py-0.5 text-[12px] font-medium tracking-tight text-[#111318] transition-all duration-300 group-hover:border-[#f6ab3c]/30 md:rounded-lg md:px-3 md:py-1 md:text-[13px]'>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='border-t border-[#dbe1ea] pt-8 md:pt-10'>
                <div className='flex items-center gap-3 md:gap-4'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-[#f6ab3c]/10 md:h-10 md:w-10 md:rounded-2xl'>
                    <Clock3 className='h-4 w-4 text-[#f6ab3c] md:h-5 md:w-5' />
                  </div>
                  <h3 className='text-base font-medium tracking-tight text-[#111318] md:text-xl'>
                    {t('visitors.sundaySpecialTitle')}
                  </h3>
                </div>
                <p className='mt-4 text-[14px] font-light leading-[1.65] text-[#5a677a] md:mt-6 md:text-[15px] md:leading-[1.7]'>
                  {visitorContent.openingTimings.sundaySpecial}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id='location-map'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionVariants}
        className='bg-[#f4f6f9] px-5 py-14 md:px-10 md:py-28'
      >
        <div className='mx-auto max-w-[1400px]'>
          <div className='mx-auto max-w-[900px]'>
            <SectionLabel>LOCATION</SectionLabel>
            <h2 className='text-3xl font-medium tracking-tighter text-[#111318] md:text-5xl lg:text-6xl'>
              {t('visitors.locationTitle')}
            </h2>
          </div>

          <div className='mx-auto mt-10 max-w-[900px] md:mt-14'>
            <div className='rounded-2xl border border-[#dbe1ea] bg-white p-5 md:rounded-3xl md:p-10'>
              <div className='flex items-start gap-4 md:gap-5'>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f6ab3c]/10 md:h-12 md:w-12 md:rounded-2xl'>
                  <MapPin className='h-4 w-4 text-[#f6ab3c] md:h-5 md:w-5' />
                </div>
                <div className='min-w-0 flex-1'>
                  <h3 className='text-base font-medium tracking-tight text-[#111318] md:text-xl'>
                    {t('visitors.addressTitle')}
                  </h3>
                  <p className='mt-2 text-[14px] font-light leading-[1.65] text-[#5a677a] md:mt-3 md:text-[15px] md:leading-[1.7]'>
                    {visitorContent.location.addressLines.map((line, i, arr) => (
                      <React.Fragment key={line}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>

              <div className='relative mt-6 overflow-hidden rounded-xl border border-[#dbe1ea] bg-[#edf1f7] md:mt-8 md:rounded-2xl'>
                <div className='h-[240px] w-full md:h-[430px]'>
                  <iframe
                    title='Visitor location map'
                    src={mapEmbedUrl}
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    className='h-full w-full'
                  />
                </div>
                <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/[0.03] md:rounded-2xl' />
              </div>

              <div className='mt-6 grid gap-5 text-[14px] font-light leading-[1.65] text-[#5a677a] md:mt-8 md:gap-8 md:text-[15px] md:leading-[1.7] sm:grid-cols-2'>
                <div>
                  <h3 className='mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#111318]/40 md:mb-3 md:text-[11px]'>
                    {t('visitors.publicTransport')}
                  </h3>
                  <p>{visitorContent.location.howToReach[0] ?? ''}</p>
                  <p className='mt-0.5 md:mt-1'>{visitorContent.location.howToReach[1] ?? ''}</p>
                </div>
                <div>
                  <h3 className='mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#111318]/40 md:mb-3 md:text-[11px]'>
                    {t('visitors.byCar')}
                  </h3>
                  <p>{t('visitors.carText')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id='contact-information'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionVariants}
        className='bg-white px-5 py-14 md:px-10 md:py-28'
      >
        <div className='mx-auto max-w-[1400px]'>
          <div className='mx-auto max-w-[900px]'>
            <SectionLabel>CONTACT</SectionLabel>
            <h2 className='text-3xl font-medium tracking-tighter text-[#111318] md:text-5xl lg:text-6xl'>
              {t('visitors.contactTitle')}
            </h2>
          </div>

          <div className='mx-auto mt-10 grid max-w-[900px] grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-5'>
            <article className='group relative overflow-hidden rounded-2xl border border-[#dbe1ea] bg-white p-5 transition-all duration-500 hover:border-[#f6ab3c]/20 hover:shadow-[0_0_0_1px_rgba(246,171,60,0.08),0_24px_48px_-16px_rgba(17,19,24,0.06)] md:rounded-3xl md:p-8'>
              <div className='absolute top-0 left-5 right-5 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#f6ab3c]/50 to-transparent opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100 md:left-6 md:right-6' />
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6ab3c]/10 transition-all duration-500 group-hover:bg-[#f6ab3c]/15 md:h-12 md:w-12 md:rounded-2xl'>
                <Phone className='h-4 w-4 text-[#f6ab3c] transition-all duration-500 group-hover:scale-110 md:h-5 md:w-5' />
              </div>
              <div>
                <h3 className='mt-4 text-base font-medium tracking-tight text-[#111318] md:mt-6 md:text-xl'>
                  {t('visitors.phone')}
                </h3>
                <p className='mt-1.5 text-[14px] font-light text-[#5a677a] md:mt-2 md:text-[15px]'>
                  {visitorContent.contact.phone}
                </p>
              </div>
              <div className='mt-4 flex items-center gap-2.5 md:mt-6 md:gap-3'>
                <a
                  href={contactPhoneDigits ? `tel:${contactPhoneDigits}` : '#'}
                  className='inline-flex h-8 items-center justify-center rounded-full border border-[#dbe1ea] px-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#111318] transition-all duration-300 hover:border-[#f6ab3c]/30 hover:bg-[#f6ab3c]/5 md:h-9 md:px-5'
                >
                  Call
                </a>
                <a
                  href={
                    contactPhoneDigits
                      ? `https://wa.me/${contactPhoneDigits.replace(/^\+/, '')}`
                      : '#'
                  }
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex h-8 items-center justify-center rounded-full bg-[#f6ab3c] px-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#f6ab3c]/85 md:h-9 md:px-5'
                >
                  WhatsApp
                </a>
              </div>
            </article>

            <article className='group relative overflow-hidden rounded-2xl border border-[#dbe1ea] bg-white p-5 transition-all duration-500 hover:border-[#f6ab3c]/20 hover:shadow-[0_0_0_1px_rgba(246,171,60,0.08),0_24px_48px_-16px_rgba(17,19,24,0.06)] md:rounded-3xl md:p-8'>
              <div className='absolute top-0 left-5 right-5 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#f6ab3c]/50 to-transparent opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100 md:left-6 md:right-6' />
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6ab3c]/10 transition-all duration-500 group-hover:bg-[#f6ab3c]/15 md:h-12 md:w-12 md:rounded-2xl'>
                <Mail className='h-4 w-4 text-[#f6ab3c] transition-all duration-500 group-hover:scale-110 md:h-5 md:w-5' />
              </div>
              <div>
                <h3 className='mt-4 text-base font-medium tracking-tight text-[#111318] md:mt-6 md:text-xl'>
                  {t('visitors.email')}
                </h3>
                <p className='mt-1.5 text-[14px] font-light text-[#5a677a] md:mt-2 md:text-[15px]'>
                  {visitorContent.contact.email}
                </p>
              </div>
              <div className='mt-4 flex items-center gap-2.5 md:mt-6 md:gap-3'>
                <button
                  type='button'
                  onClick={handleCopyEmail}
                  className='inline-flex h-8 items-center justify-center rounded-full border border-[#dbe1ea] px-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#111318] transition-all duration-300 hover:border-[#f6ab3c]/30 hover:bg-[#f6ab3c]/5 md:h-9 md:px-5'
                >
                  <Copy className='mr-1 h-3 w-3 md:mr-1.5' />
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <a
                  href={`mailto:${visitorContent.contact.email}`}
                  className='inline-flex h-8 items-center justify-center rounded-full bg-[#f6ab3c] px-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#f6ab3c]/85 md:h-9 md:px-5'
                >
                  <Mail className='mr-1 h-3 w-3 md:mr-1.5' />
                  Send
                </a>
              </div>
            </article>
          </div>
        </div>
      </motion.section>

      <motion.section
        id='faq'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionVariants}
        className='bg-[#f4f6f9] px-5 py-14 md:px-10 md:py-28'
      >
        <div className='mx-auto max-w-[1400px]'>
          <div className='mx-auto max-w-[900px]'>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className='text-3xl font-medium tracking-tighter text-[#111318] md:text-5xl lg:text-6xl'>
              {t('visitors.faqTitle')}
            </h2>
          </div>

          <div className='mx-auto mt-10 max-w-[900px] space-y-3 md:mt-14 md:space-y-4'>
            {faqItems.map((item, i) => (
              <motion.article
                key={item.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className='group relative overflow-hidden rounded-2xl border border-[#dbe1ea] bg-white p-5 transition-all duration-500 hover:border-[#f6ab3c]/20 hover:shadow-[0_0_0_1px_rgba(246,171,60,0.08),0_24px_48px_-16px_rgba(17,19,24,0.06)] md:rounded-3xl md:p-8'
              >
                <div className='absolute left-0 top-0 h-full w-0.5 rounded-r bg-[#f6ab3c]/30 opacity-0 transition-all duration-500 group-hover:opacity-100' />
                <h3 className='text-[15px] font-medium tracking-tight text-[#111318] md:text-lg'>
                  {item.question}
                </h3>
                <p className='mt-2 text-[14px] font-light leading-[1.65] text-[#5a677a] md:mt-3 md:text-[15px] md:leading-[1.7]'>
                  {item.answer}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <SiteFooter />
    </div>
  )
}

export default VisitorGuidePage
