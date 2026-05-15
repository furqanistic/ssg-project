import { motion } from 'framer-motion'
import { ArrowUpRight, Compass } from 'lucide-react'
import React from 'react'
import AboutPageHero from '@/components/about/AboutPageHero'
import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'



const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

const MissionPage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const mission = aboutUs?.mission ?? {}
  const missionCards = Array.isArray(mission.cards) ? mission.cards : []
  const coreValues = Array.isArray(mission.coreValues) ? mission.coreValues : []

  return (
    <div className='min-h-screen bg-[#f8f7f5] font-["Outfit",sans-serif] selection:bg-[#f6ab3c]/30'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero title={mission.heroTitle} subtitle={mission.heroDescription} image={mission.heroImage} />
      </div>

      {/* ─── OVERLAPPING WHITE CONTAINER ─── */}
      <section className='relative z-20 -mt-6 overflow-hidden px-4 pb-12 sm:px-5 md:-mt-8 md:px-6 md:pb-20'>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(246,171,60,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(7,21,68,0.045)_1px,transparent_1px)] bg-[size:44px_44px] opacity-50" />
        <div className='mx-auto max-w-[1280px]'>
          <div className='rounded-[2.5rem] border border-[#071544]/[0.08] bg-white p-4 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.03)] sm:p-6 md:p-10'>
            <div className='mx-auto max-w-[1040px]'>

              {/* Mission Intro */}
              <div className="mb-10 border-b border-[#071544]/[0.04] pb-10 md:mb-14 md:pb-14">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2d4f9f]/12 bg-[#2d4f9f]/5 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#2d4f9f]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f6ab3c]" />
                    Our Mission
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[30px] font-medium leading-[1.06] tracking-tighter text-[#071544] sm:text-[40px] md:text-[52px]"
                  >
                    {mission.title}
                  </motion.h2>
                  {mission.description && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-5 max-w-[640px] text-[15px] font-light leading-relaxed text-[#5a677a] md:text-[17px]"
                    >
                      {mission.description}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Mission Cards — Bento Grid */}
              <motion.div
                variants={stagger}
                initial='visible'
                animate='visible'
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6"
              >
                {missionCards.map(({ title, description: cardDescription, accent: cardAccent }, index) => {
                  const isWide = index === 0
                  const accentColor = cardAccent || '#2d4f9f'

                  return (
                    <motion.article
                      key={`${title ?? 'card'}-${index}`}
                      variants={fadeUp}
                      className={`group ${isWide ? 'sm:col-span-2' : ''}`}
                    >
                      <div
                        className='h-full rounded-[2rem] border bg-white p-6 transition-all duration-500 hover:shadow-[0_16px_48px_-12px_rgba(7,21,68,0.1)] sm:p-8'
                        style={{ borderColor: accentColor }}
                      >
                        <div className='mb-4 flex items-center gap-2'>
                          <span className='h-1.5 w-1.5 rounded-full' style={{ backgroundColor: accentColor }} />
                          <span className='text-[11px] font-bold uppercase tracking-[0.2em]' style={{ color: `${accentColor}80` }}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <h3 className='text-[20px] font-bold tracking-tight text-[#071544] sm:text-[22px]'>
                          {title}
                        </h3>

                        <div className='mt-3 h-[1px] w-8' style={{ backgroundColor: `${accentColor}30` }} />

                        <p className='mt-4 flex-1 text-[14px] font-light leading-relaxed text-[#5a677a] sm:text-[15px]'>
                          {cardDescription}
                        </p>
                      </div>
                    </motion.article>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMPACT DIVIDER ─── */}
      <section className="relative overflow-hidden bg-[#071544]">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="relative mx-auto max-w-[1000px] px-6 py-14 text-center lg:px-10 lg:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-[1px] w-10 bg-[#f6ab3c]/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#f6ab3c]/60">Our Compass</span>
              <div className="h-[1px] w-10 bg-[#f6ab3c]/40" />
            </div>
            <p className="max-w-[560px] mx-auto text-lg font-light leading-relaxed text-white/60 italic md:text-xl">
              &ldquo;Every initiative is rooted in community, powered by tradition, and driven toward a better tomorrow.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CORE VALUES — LUXURY BENTO ─── */}
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2d4f9f]/25 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-60 top-1/3 h-[500px] w-[500px] rounded-full bg-[#2d4f9f]/[0.03] blur-[150px]" />

        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-[#2d4f9f]/12 bg-[#2d4f9f]/5 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#2d4f9f] mb-5"
            >
              <Compass className="h-3 w-3" />
              Principles & Ethics
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[28px] font-medium tracking-tighter text-[#071544] sm:text-[38px] md:text-[48px] lg:text-[56px] max-w-[700px]"
            >
              {mission.coreValuesTitle}
            </motion.h2>
          </div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          >
            {coreValues.map((value, index) => {
              const accentColor = index % 2 === 0 ? 'border-[#f6ab3c]/50 hover:border-[#f6ab3c]/70' : 'border-[#2d4f9f]/50 hover:border-[#2d4f9f]/70'
              const dotColor = index % 2 === 0 ? 'bg-[#f6ab3c]' : 'bg-[#2d4f9f]'

              return (
                <motion.article
                  key={`${value?.title ?? 'value'}-${index}`}
                  variants={fadeUp}
                  className="group"
                >
                  <div className={`h-full rounded-[2rem] border ${accentColor} p-[1px] transition-all duration-700 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.06)]`}>
                    <div className="relative flex h-full flex-col rounded-[calc(2rem-1px)] bg-white p-5 sm:p-7 md:p-8">
                      <div className="absolute top-0 right-0 h-14 w-14 opacity-[0.02] pointer-events-none">
                        <svg viewBox="0 0 100 100" className="h-full w-full rotate-90">
                          <path d="M100 0 L100 100 L0 100" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <span className={`h-2 w-2 rounded-full ${dotColor} transition-transform duration-500 group-hover:scale-125`} />
                        <span className="text-[10px] font-black text-[#111318]/20 select-none tracking-wider">0{index + 1}</span>
                      </div>

                      <h3 className="text-[17px] sm:text-[19px] font-bold tracking-tight text-[#071544] leading-tight transition-colors duration-500 group-hover:text-[#2d4f9f]">
                        {value.title}
                      </h3>

                      <div className="mt-3 h-[1px] w-6 bg-[#2d4f9f]/25 transition-all duration-500 group-hover:w-10" />

                      <p className="mt-3 flex-1 text-pretty text-[14px] leading-[1.7] text-[#516075] sm:text-[15px] md:mt-4 md:text-[16px]">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="relative overflow-hidden bg-[#f8f7f5] px-4 pb-12 sm:px-5 md:px-6 md:pb-16">
        <div className="relative mx-auto max-w-[1280px]">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#071544] px-6 py-20 text-center lg:px-10 lg:py-28">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse at 50% 40%, white 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, white 0%, transparent 70%)',
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-[#f6ab3c]/[0.04] blur-[120px]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative mx-auto max-w-[900px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-10 bg-white/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Join Us</span>
              <div className="h-[1px] w-10 bg-white/20" />
            </div>
            <h2 className="text-[30px] font-medium leading-[1.06] tracking-tighter text-white sm:text-[38px] md:text-[48px]">
              Become Part of Our Mission
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[15px] font-light leading-relaxed text-white/55 md:text-[16px]">
              Whether you want to volunteer, donate, or simply learn more — every hand makes a difference.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-full bg-[#f6ab3c] px-8 text-[13px] font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#f1a52e] active:scale-[0.97] md:h-[54px] md:px-9"
              >
                Contact Us
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
              <a
                href="/donate"
                className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-8 text-[13px] font-medium text-white/85 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#f6ab3c]/50 hover:text-white active:scale-[0.97] md:h-[54px] md:px-9"
              >
                Support Our Work
              </a>
            </div>
          </motion.div>
        </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default MissionPage
