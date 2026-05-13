import React, { useEffect, useState } from 'react'
import { Clock3, Mail, MapPin, Phone, Users, ArrowRight, ExternalLink } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteContentQuery } from '@/hooks/useContent'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const scrollTargets = ['volunteer']
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

const SectionLabel = ({ children, light = false }) => (
  <div className={`mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] ${light ? 'text-white/40' : 'text-[#071544]/40'} md:mb-5`}>
    <span className={`h-px w-6 ${light ? 'bg-white/20' : 'bg-[#f6ab3c]/30'}`} />
    {children}
  </div>
)

const ContactPage = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { data: content } = useSiteContentQuery()
  const [showInterestOptions, setShowInterestOptions] = useState(false)
  const contact = content?.contact ?? {}
  const contactPhone = typeof contact.phone === 'string' ? contact.phone.trim() : ''
  const contactPhoneDigits = contactPhone.replace(/[^\d+]/g, '')
  const contactEmail = typeof contact.email === 'string' ? contact.email.trim() : ''
  const contactAddressLines = Array.isArray(contact.addressLines) ? contact.addressLines : []

  const opportunities = t('contact.opportunities', { returnObjects: true })

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

  return (
    <div className='min-h-screen bg-[#fafafa] font-["Outfit",sans-serif] text-[#071544] selection:bg-[#f6ab3c]/30'>
      <div className='relative'>
        <NavbarSection />

        {/* Hero Section - Synchronized Architectural Style */}
        <section className='relative isolate overflow-hidden bg-[#071544] pt-[100px] pb-10 md:pt-[140px] md:pb-20'>
          {/* Subtle Geometric Grid */}
          <div className='absolute inset-0 z-0 opacity-[0.05]' 
               style={{ backgroundImage: 'linear-gradient(#fff 0.5px, transparent 0.5px), linear-gradient(90deg, #fff 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />
          
          <div className='container relative z-10 mx-auto px-5'>
            <div className='mx-auto max-w-4xl text-center'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#f6ab3c]/80'
              >
                <span className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c]/60' />
                Get in Touch
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'
              >
                {t('contact.heading')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='mx-auto mt-4 max-w-2xl text-balance text-[15px] font-light leading-relaxed text-white/70 md:mt-6 md:text-lg'
              >
                {t('contact.subtitle')}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Overlapping Info Cards */}
        <section className='relative z-20 -mt-6 px-4 md:-mt-8 md:px-6'>
          <div className='container mx-auto max-w-[1200px]'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {[
                { 
                  icon: Phone, 
                  label: t('contact.phone'), 
                  value: contactPhone,
                  actions: [
                    { label: 'Call', href: contactPhoneDigits ? `tel:${contactPhoneDigits}` : '#' },
                    { label: 'WhatsApp', href: contactPhoneDigits ? `https://wa.me/${contactPhoneDigits.replace(/^\+/, '')}` : '#', external: true }
                  ]
                },
                { 
                  icon: Mail, 
                  label: t('contact.email'), 
                  value: contactEmail,
                  actions: [{ label: 'Email Us', href: contactEmail ? `mailto:${contactEmail}` : '#' }]
                },
                { 
                  icon: MapPin, 
                  label: t('contact.address'), 
                  value: contactAddressLines.join(', '),
                  actions: [{ label: 'Get Directions', href: 'https://maps.google.com/?q=Alt-Biesdorf+71+12683+Berlin', external: true }]
                }
              ].map((item, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className='group rounded-2xl border border-[#071544]/05 bg-white p-8 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.02)] transition-all duration-500 hover:border-[#f6ab3c]/30 md:p-10'
                >
                  <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#f6ab3c]/10 text-[#f6ab3c] transition-all duration-500 group-hover:bg-[#f6ab3c] group-hover:text-white'>
                    <item.icon className='h-6 w-6' />
                  </div>
                  <h2 className='mt-6 text-[11px] font-bold uppercase tracking-widest text-[#071544]/40'>
                    {item.label}
                  </h2>
                  <p className='mt-2 text-lg font-semibold tracking-tight text-[#071544] md:text-xl'>
                    {item.value}
                  </p>
                  <div className='mt-8 flex flex-wrap gap-3'>
                    {item.actions.map((action, i) => (
                      <a
                        key={i}
                        href={action.href}
                        target={action.external ? '_blank' : undefined}
                        rel={action.external ? 'noreferrer' : undefined}
                        className='inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#071544] px-6 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-500 hover:bg-[#f6ab3c] hover:scale-[1.02] active:scale-[0.98] shadow-sm'
                      >
                        {action.label}
                        {action.external && <ExternalLink className='h-3.5 w-3.5 opacity-70' />}
                      </a>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Visit Us & Map Section */}
        <section className='py-16 md:py-24'>
          <div className='container mx-auto max-w-[1200px] px-4 md:px-6'>
            <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20'>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={sectionVariants}
              >
                <SectionLabel>Location</SectionLabel>
                <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-5xl'>
                  {t('contact.visitUs')}
                </h2>
                
                <div className='mt-12 space-y-12'>
                  <div className='flex items-start gap-6'>
                    <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#071544] text-[#f6ab3c]'>
                      <Clock3 className='h-6 w-6' />
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold text-[#071544]'>{t('contact.openingHours')}</h3>
                      <div className='mt-4 space-y-3 text-[15px] font-light text-[#5a677a] md:text-lg'>
                        <p className='flex justify-between gap-10 border-b border-[#071544]/05 pb-2'>
                          <span className='font-bold uppercase tracking-widest text-[11px] text-[#071544]/40'>{t('contact.daily')}</span>
                          <span>6:00 AM - 9:00 PM</span>
                        </p>
                        <p className='flex justify-between gap-10 border-b border-[#071544]/05 pb-2'>
                          <span className='font-bold uppercase tracking-widest text-[11px] text-[#071544]/40'>{t('contact.sundayKirtan')}</span>
                          <span>11:00 AM - 1:00 PM</span>
                        </p>
                        <p className='flex justify-between gap-10 pb-2'>
                          <span className='font-bold uppercase tracking-widest text-[11px] text-[#071544]/40'>{t('contact.office')}</span>
                          <span>Mon-Fri, 10:00 AM - 5:00 PM</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-start gap-6'>
                    <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#071544] text-[#f6ab3c]'>
                      <MapPin className='h-6 w-6' />
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold text-[#071544]'>{t('contact.howToReach')}</h3>
                      <div className='mt-4 space-y-3 text-[15px] font-light text-[#5a677a] md:text-lg'>
                        <p className='flex items-center gap-3'>
                          <span className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c]' />
                          <span className='font-bold uppercase tracking-widest text-[11px] text-[#071544]/40 mr-2'>{t('contact.ubahn')}:</span> 
                          U8 to Pankstraße
                        </p>
                        <p className='flex items-center gap-3'>
                          <span className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c]' />
                          <span className='font-bold uppercase tracking-widest text-[11px] text-[#071544]/40 mr-2'>{t('contact.tram')}:</span> 
                          Alt Biesdorf 71 (S5/S75 Biesdorf)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className='relative overflow-hidden rounded-[2.5rem] border border-[#071544]/05 bg-white p-3 shadow-[0_40px_80px_-16px_rgba(7,21,68,0.08)]'
              >
                <div className='h-[400px] w-full overflow-hidden rounded-[2rem] md:h-[500px]'>
                  <iframe
                    title='Gurudwara location map'
                    src={mapEmbedUrl}
                    width='100%'
                    height='100%'
                    style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    className='h-full w-full'
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Volunteer Section */}
        <section id='volunteer' className='relative bg-white py-20 md:py-32 overflow-hidden border-t border-[#071544]/05'>
          {/* Internal Grid Motif - Subtle on white */}
          <div className='absolute inset-0 z-0 opacity-[0.03]' 
               style={{ backgroundImage: 'linear-gradient(#071544 0.5px, transparent 0.5px), linear-gradient(90deg, #071544 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />
          
          <div className='container relative z-10 mx-auto px-4 md:px-6'>
            <div className='mx-auto max-w-4xl text-center'>
              <SectionLabel>Seva Opportunities</SectionLabel>
              <h2 className='text-3xl font-semibold tracking-tight text-[#071544] md:text-6xl'>
                {t('contact.volunteerTitle')}
              </h2>
              <p className='mx-auto mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[#5a677a] md:text-xl'>
                {t('contact.volunteerSubtitle')}
              </p>
            </div>

            <div className='mt-16 grid grid-cols-1 gap-6 md:grid-cols-2'>
              {opportunities.map((opportunity, index) => (
                <motion.article
                  key={opportunity.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className='group relative rounded-[2rem] border border-[#071544]/05 bg-[#fafafa] p-8 transition-all duration-500 hover:border-[#f6ab3c]/30 hover:bg-white hover:shadow-[0_40px_80px_-16px_rgba(246,171,60,0.1)]'
                >
                  <h3 className='text-xl font-semibold text-[#071544]'>{opportunity.title}</h3>
                  <p className='mt-4 text-[15px] font-light leading-relaxed text-[#5a677a]'>
                    {opportunity.description}
                  </p>
                  <div className='mt-8 flex items-center gap-3'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-[#f6ab3c]/10 text-[#f6ab3c]'>
                      <Clock3 className='h-3 w-3' />
                    </div>
                    <span className='text-[11px] font-bold uppercase tracking-[0.2em] text-[#f6ab3c]'>
                      {opportunity.timing}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='mx-auto mt-12 max-w-[800px] rounded-[2.5rem] bg-[#071544] p-8 text-center shadow-[0_40px_80px_-16px_rgba(7,21,68,0.2)] md:p-16 relative overflow-hidden'
            >
              {/* Internal Grid for the Dark Card */}
              <div className='absolute inset-0 z-0 opacity-[0.05]' 
                   style={{ backgroundImage: 'linear-gradient(#fff 0.5px, transparent 0.5px), linear-gradient(90deg, #fff 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />
              
              <div className='relative z-10'>
                <h3 className='text-3xl font-semibold tracking-tight text-white md:text-4xl'>{t('contact.readyTitle')}</h3>
                <p className='mt-6 text-[15px] font-light leading-relaxed text-white/60 md:text-lg'>{t('contact.readyDesc')}</p>
                <button
                  type='button'
                  onClick={() => setShowInterestOptions(true)}
                  className='mt-10 group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#f6ab3c] px-10 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-500 hover:bg-[#f6ab3c]/90 active:scale-[0.98]'
                >
                  {t('common.actions.expressInterest')}
                  <ArrowRight className='h-4 w-4 transition-transform duration-500 group-hover:translate-x-1' />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Modern High-End Modal */}
      <AnimatePresence>
        {showInterestOptions && (
          <div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInterestOptions(false)}
              className='absolute inset-0 bg-[#071544]/80 backdrop-blur-sm'
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className='relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-[0_40px_80px_-16px_rgba(0,0,0,0.3)] md:p-12'
            >
              <div className='mb-8 text-center'>
                <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#071544]/05 text-[#071544]'>
                  <Users className='h-8 w-8' />
                </div>
                <h3 className='text-2xl font-semibold tracking-tight text-[#071544] md:text-3xl'>
                  {t('common.actions.expressInterest')}
                </h3>
                <p className='mt-3 text-[15px] font-light text-[#5a677a]'>
                  Choose your preferred method to connect with us.
                </p>
              </div>

              <div className='grid grid-cols-1 gap-4'>
                <a
                  href={contactPhoneDigits ? `tel:${contactPhoneDigits}` : '#'}
                  className='flex h-14 items-center justify-between rounded-2xl border border-[#071544]/05 bg-[#071544]/02 px-6 transition-all duration-500 hover:border-[#f6ab3c]/30 hover:bg-[#f6ab3c]/05'
                >
                  <div className='flex items-center gap-4'>
                    <Phone className='h-5 w-5 text-[#f6ab3c]' />
                    <span className='text-[13px] font-bold uppercase tracking-widest text-[#071544]'>Call Us</span>
                  </div>
                  <ArrowRight className='h-4 w-4 text-[#071544]/20' />
                </a>
                <a
                  href={contactEmail ? `mailto:${contactEmail}` : '#'}
                  className='flex h-14 items-center justify-between rounded-2xl border border-[#071544]/05 bg-[#071544]/02 px-6 transition-all duration-500 hover:border-[#f6ab3c]/30 hover:bg-[#f6ab3c]/05'
                >
                  <div className='flex items-center gap-4'>
                    <Mail className='h-5 w-5 text-[#f6ab3c]' />
                    <span className='text-[13px] font-bold uppercase tracking-widest text-[#071544]'>Send Email</span>
                  </div>
                  <ArrowRight className='h-4 w-4 text-[#071544]/20' />
                </a>
                <button
                  type='button'
                  onClick={() => setShowInterestOptions(false)}
                  className='mt-4 h-14 w-full rounded-2xl bg-[#071544] text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-500 hover:bg-[#071544]/90'
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  )
}

export default ContactPage
