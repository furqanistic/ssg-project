import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import AboutPageHero from '@/components/about/AboutPageHero'
import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const CommitteePage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const committee = aboutUs.committee

  // Animation variants
  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.05 } }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }

  return (
    <div className='min-h-screen bg-[#faf8f6] font-["Outfit",sans-serif] text-[#1a1a1a]'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero title={committee.heroTitle} subtitle={committee.heroSubtitle} />
      </div>

      <section className='px-4 py-12 md:px-6 md:py-16'>
        <div className='mx-auto max-w-[1280px]'>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='mx-auto max-w-[800px] text-center'
          >
            <div className="mx-auto mb-6 h-[1px] w-12 bg-[#C5A059]/40" />
            <p className='text-[16px] leading-[1.7] text-[#516075] md:text-[18px]'>
              {committee.intro}
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
          >
            {committee.members.map((member, index) => (
              <motion.article
                key={`${member?.email ?? member?.name ?? 'member'}-${index}`}
                variants={fadeIn}
                className='group relative border-[0.5px] border-[#C5A059]/20 bg-white p-6 transition-all hover:border-[#C5A059]/50 hover:shadow-[0_15px_35px_rgb(0,0,0,0.04)]'
              >
                {/* Architectural Accent */}
                <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#C5A059] transition-all duration-500 group-hover:w-full" />
                
                <div className='mb-6 flex flex-col items-center text-center'>
                  <div className='relative mb-5'>
                    <div className='absolute -inset-2 rounded-full border border-[#C5A059]/10 transition-transform duration-500 group-hover:scale-110' />
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className='h-[100px] w-[100px] rounded-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0'
                        loading='lazy'
                      />
                    ) : (
                      <div className='flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#1e3a8a] text-[28px] font-bold tracking-tight text-[#C5A059]'>
                        {member.initials}
                      </div>
                    )}
                  </div>

                  <h2 className='text-[19px] font-bold tracking-tight text-[#1e3a8a] md:text-[21px]'>
                    {member.name}
                  </h2>
                  <p className='mt-1.5 text-[14px] font-bold uppercase tracking-[0.1em] text-[#C5A059]'>
                    {member.role}
                  </p>
                </div>

                <div className='space-y-3 pt-4 border-t border-[#C5A059]/10'>
                  <div className='flex items-center gap-3 text-[14px] text-[#516075]'>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#faf8f6] text-[#C5A059]">
                      <Mail className='h-3.5 w-3.5' />
                    </div>
                    <span className="truncate">{member.email}</span>
                  </div>
                  {member.phone ? (
                    <div className='flex items-center gap-3 text-[14px] text-[#516075]'>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#faf8f6] text-[#C5A059]">
                        <Phone className='h-3.5 w-3.5' />
                      </div>
                      <span>{member.phone}</span>
                    </div>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative overflow-hidden bg-[#1e3a8a] px-4 py-16 text-white md:px-6 md:py-20'>
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(#C5A059 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} 
        />
        <div className='relative z-10 mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[800px] text-center'>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C5A059]">
              Get In Touch
            </span>
            <h2 className='mt-4 text-[30px] font-extrabold tracking-tight md:text-[38px]'>
              {committee.ctaTitle}
            </h2>
            <p className='mx-auto mt-6 text-[16px] leading-relaxed text-blue-50/80 md:text-[18px]'>
              {committee.ctaDescription}
            </p>
            <Link
              to='/contact#contact-form'
              className='group mt-10 inline-flex h-12 items-center justify-center gap-3 border border-[#C5A059] bg-[#C5A059] px-10 text-[15px] font-bold text-[#1e3a8a] transition-all hover:bg-transparent hover:text-[#C5A059]'
            >
              {committee.ctaButtonLabel}
              <div className="h-[1px] w-4 bg-[#1e3a8a] transition-all group-hover:w-8 group-hover:bg-[#C5A059]" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default CommitteePage
