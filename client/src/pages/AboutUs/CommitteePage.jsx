import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import AboutPageHero from '@/components/about/AboutPageHero'
import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const getAvatarUrl = (name = 'Member') =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=071544&color=f6ab3c&size=220&bold=true&format=png`

const roleBadgeStyles = [
  'border-[#f6ab3c]/35 bg-[#fff6e9] text-[#b96d00]',
  'border-[#2d4f9f]/30 bg-[#eef3ff] text-[#2d4f9f]',
  'border-[#14b8a6]/30 bg-[#eafcf8] text-[#0f766e]',
  'border-[#a855f7]/25 bg-[#f6efff] text-[#7e22ce]',
]

const CommitteePage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const committee = aboutUs?.committee ?? {}
  const committeeMembers = Array.isArray(committee.members) ? committee.members : []
  const cleanedCtaDescription = (committee.ctaDescription || '')
    .replace(/[🤝◆♦◊❖✦✨]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Animation variants
  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }

  return (
    <div className='min-h-screen bg-[#fafafa] font-["Outfit",sans-serif] text-[#071544] selection:bg-[#f6ab3c]/30'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero title={committee.heroTitle} subtitle={committee.heroSubtitle} />
      </div>

      <section className='relative z-20 -mt-6 overflow-hidden px-4 pb-12 sm:px-5 md:-mt-8 md:px-6 md:pb-20'>
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#f6ab3c 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} 
        />

        <div className='relative z-10 mx-auto max-w-[1280px]'>
          <div className='rounded-2xl border border-[#071544]/[0.08] bg-white p-4 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.03)] sm:p-6 md:rounded-3xl md:p-10'>
            <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='mx-auto max-w-[800px] text-center'
            >
            <div className="mx-auto mb-6 h-[1px] w-16 bg-[#f6ab3c]/40" />
            <p className='text-pretty text-[15px] font-medium leading-[1.75] text-[#516075] sm:text-[17px] md:text-[20px]'>
              {committee.intro}
            </p>
            </motion.div>

            {committeeMembers.length > 0 ? (
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className='mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:mt-16 md:grid-cols-2 md:gap-7 lg:grid-cols-3'
              >
              {committeeMembers.map((member, index) => (
              <motion.article
                key={`${member?.email ?? member?.name ?? 'member'}-${index}`}
                variants={fadeIn}
                className='group relative overflow-hidden rounded-[1.4rem] border border-[#f6ab3c]/20 bg-white/98 p-5 shadow-[0_14px_45px_rgba(22,32,51,0.055)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#f6ab3c]/45 hover:shadow-[0_28px_70px_rgba(22,32,51,0.10)] sm:p-7 md:p-8'
              >
                {(() => {
                  const roleBadgeClass = roleBadgeStyles[index % roleBadgeStyles.length]
                  const hasEmail = Boolean(member?.email)
                  const hasPhone = Boolean(member?.phone)
                  return (
                    <>
                <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#f6ab3c] via-[#d8bd7d] to-transparent opacity-80" />
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f6ab3c]/[0.06] blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                
                <div className='mb-6 flex flex-col items-center text-center md:mb-8'>
                  <div className='relative mb-5 md:mb-6'>
                    <div className='absolute -inset-3 rounded-full border border-[#f6ab3c]/12 transition-transform duration-700 group-hover:scale-110' />
                    <div className="relative h-[94px] w-[94px] overflow-hidden rounded-full border-2 border-white shadow-[0_14px_34px_rgba(22,32,51,0.18)] sm:h-[110px] sm:w-[110px]">
                      <img
                        src={member.image || getAvatarUrl(member.name || member.initials)}
                        alt={member.name}
                        className='h-full w-full object-cover transition-all duration-700 group-hover:scale-110'
                        loading='lazy'
                      />
                    </div>
                  </div>

                  <h2 className='text-pretty text-[19px] font-bold tracking-normal text-[#071544] md:text-[22px]'>
                    {member.name}
                  </h2>
                  <p className={`mt-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] sm:text-[11px] sm:tracking-[0.18em] ${roleBadgeClass}`}>
                    {member.role}
                  </p>
                </div>

                <div className='space-y-3 border-t border-[#f6ab3c]/18 pt-5 md:space-y-4 md:pt-6'>
                  <div className='flex items-center gap-4 text-[14px] text-[#516075] group/item'>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fafafa] text-[#f6ab3c] transition-colors group-hover/item:bg-[#071544] group-hover/item:text-white">
                      <Mail className='h-3.5 w-3.5' />
                    </div>
                    {hasEmail ? (
                      <a href={`mailto:${member.email}`} className="min-w-0 break-all font-medium leading-snug transition-colors hover:text-[#071544]">
                        {member.email}
                      </a>
                    ) : (
                      <span className="min-w-0 break-all font-medium leading-snug text-[#7b8698]">Email available on request</span>
                    )}
                  </div>
                  {hasPhone ? (
                    <div className='flex items-center gap-4 text-[14px] text-[#516075] group/item'>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fafafa] text-[#f6ab3c] transition-colors group-hover/item:bg-[#071544] group-hover/item:text-white">
                        <Phone className='h-3.5 w-3.5' />
                      </div>
                      <a href={`tel:${member.phone}`} className="font-medium transition-colors hover:text-[#071544]">{member.phone}</a>
                    </div>
                  ) : null}
                </div>

                <div className='mt-5 flex gap-2 border-t border-[#f6ab3c]/12 pt-4'>
                  <a
                    href={hasEmail ? `mailto:${member.email}` : '/contact#contact-form'}
                    className='inline-flex flex-1 items-center justify-center rounded-full border border-[#f6ab3c] bg-[#f6ab3c] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#071544] transition-all hover:bg-[#ef9f22] hover:border-[#ef9f22]'
                  >
                    {hasEmail ? 'Send Email' : 'Contact'}
                  </a>
                  {hasPhone ? (
                    <a
                      href={`tel:${member.phone}`}
                      className='inline-flex flex-1 items-center justify-center rounded-full border border-[#071544]/18 bg-[#071544] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#0b2367]'
                    >
                      Call
                    </a>
                  ) : null}
                </div>
                    </>
                  )
                })()}
              </motion.article>
              ))}
              </motion.div>
            ) : (
              <div className='mx-auto mt-10 max-w-[720px] rounded-2xl border border-[#f6ab3c]/25 bg-[#fafafa] px-6 py-8 text-center md:mt-14 md:px-8'>
                <p className='text-[15px] leading-relaxed text-[#516075] md:text-[16px]'>
                  Committee members will be published here shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative overflow-hidden bg-[#fafafa] px-4 pb-12 text-white sm:px-5 md:px-6 md:pb-16'>
        <div className='relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] bg-[#071544] px-6 py-20 text-center lg:px-10 lg:py-28'>
          <div className='absolute inset-0 bg-[linear-gradient(135deg,#071544_0%,#071544_48%,#071936_100%)]' />
          <div className="absolute inset-0 opacity-[0.08]" 
               style={{ backgroundImage: 'radial-gradient(#f6ab3c 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} 
          />
          <div className='relative z-10 mx-auto max-w-[800px] text-center'>
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#f6ab3c]">
              Get In Touch
            </span>
            <h2 className='mt-4 text-balance text-[28px] font-extrabold tracking-normal md:mt-6 md:text-[46px]'>
              {committee.ctaTitle}
            </h2>
            <div className="mx-auto mt-6 h-[1px] w-16 bg-[#f6ab3c]/30" />
            <p className='mx-auto mt-5 text-pretty text-[15px] leading-[1.7] text-white/75 sm:text-[17px] md:mt-8 md:text-[20px]'>
              {cleanedCtaDescription}
            </p>
            <Link
              to='/contact#contact-form'
              className='group mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-[#f6ab3c] bg-[#f6ab3c] px-7 py-3 text-[14px] font-bold text-[#071544] transition-all hover:bg-transparent hover:text-[#f6ab3c] sm:px-10 sm:text-[16px] md:mt-12'
            >
              {committee.ctaButtonLabel}
              <div className="h-[1px] w-5 bg-[#071544] transition-all duration-500 group-hover:w-8 group-hover:bg-[#f6ab3c] sm:w-6 sm:group-hover:w-10" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default CommitteePage
