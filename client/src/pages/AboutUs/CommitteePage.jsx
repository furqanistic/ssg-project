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

const roleBadgeStyle = 'border-[#2d4f9f]/35 bg-[#dfe9ff] text-[#1b3577]'

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
        <AboutPageHero
          title={committee.heroTitle}
          subtitle={committee.heroSubtitle}
          image={committee.heroImage}
        />
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
                className='group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-[#071544]/[0.07] bg-white shadow-[0_8px_32px_-8px_rgba(7,21,68,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_-12px_rgba(7,21,68,0.13)]'
              >
                {/* Colored top accent bar */}
                <div className={`h-[3px] w-full ${index % 2 === 0 ? 'bg-[#f6ab3c]' : 'bg-[#2d4f9f]'}`} />

                {/* Avatar + identity */}
                <div className='flex flex-col items-center px-6 pb-5 pt-8 text-center sm:px-8'>
                  {/* Avatar ring */}
                  <div className='relative mb-5'>
                    <div className={`absolute -inset-[5px] rounded-full ${index % 2 === 0 ? 'border-2 border-[#f6ab3c]/40' : 'border-2 border-[#2d4f9f]/30'} transition-all duration-500 group-hover:scale-105`} />
                    <div className='relative h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-[0_8px_24px_rgba(7,21,68,0.15)] sm:h-[100px] sm:w-[100px]'>
                      <img
                        src={member.image || getAvatarUrl(member.name || member.initials)}
                        alt={member.name}
                        className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
                        loading='lazy'
                      />
                    </div>
                  </div>

                  <h2 className='text-[18px] font-bold leading-tight tracking-tight text-[#071544] sm:text-[20px]'>
                    {member.name}
                  </h2>

                  {member.role && (
                    <span className={`mt-2.5 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${roleBadgeStyle}`}>
                      {member.role}
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className='mx-6 h-px bg-[#071544]/[0.05] sm:mx-8' />

                {/* Contact info */}
                <div className='flex flex-1 flex-col gap-2.5 px-6 py-5 sm:px-8'>
                  <div className='flex items-center gap-3 text-[13px] text-[#516075]'>
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${index % 2 === 0 ? 'bg-[#f6ab3c]/10 text-[#f6ab3c]' : 'bg-[#2d4f9f]/10 text-[#2d4f9f]'}`}>
                      <Mail className='h-3 w-3' />
                    </div>
                    {member.email ? (
                      <a href={`mailto:${member.email}`} className='min-w-0 truncate font-medium transition-colors hover:text-[#071544]'>
                        {member.email}
                      </a>
                    ) : (
                      <span className='text-[#9aa5b4]'>Email available on request</span>
                    )}
                  </div>

                  {member.phone && (
                    <div className='flex items-center gap-3 text-[13px] text-[#516075]'>
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${index % 2 === 0 ? 'bg-[#f6ab3c]/10 text-[#f6ab3c]' : 'bg-[#2d4f9f]/10 text-[#2d4f9f]'}`}>
                        <Phone className='h-3 w-3' />
                      </div>
                      <a href={`tel:${member.phone}`} className='font-medium transition-colors hover:text-[#071544]'>
                        {member.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className='flex gap-2.5 border-t border-[#071544]/[0.05] px-6 py-4 sm:px-8'>
                  <a
                    href={member.email ? `mailto:${member.email}` : '/contact#contact-form'}
                    className={`inline-flex flex-1 items-center justify-center rounded-full py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                      index % 2 === 0
                        ? 'bg-[#f6ab3c] text-[#071544] hover:bg-[#ef9f22]'
                        : 'bg-[#2d4f9f] text-white hover:bg-[#253f87]'
                    }`}
                  >
                    {member.email ? 'Send Email' : 'Contact'}
                  </a>
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className='inline-flex flex-1 items-center justify-center rounded-full border border-[#071544]/15 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#071544] transition-all duration-300 hover:bg-[#071544] hover:text-white'
                    >
                      Call
                    </a>
                  )}
                </div>
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
