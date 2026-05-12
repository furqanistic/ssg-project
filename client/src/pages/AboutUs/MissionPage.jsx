import { motion } from 'framer-motion'
import { BookOpen, Globe, Heart, Users, Target, Compass } from 'lucide-react'
import React from 'react'
import AboutPageHero from '@/components/about/AboutPageHero'
import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const missionIcons = [Target, Heart, Users, BookOpen, Globe, Compass]

const MissionPage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const mission = aboutUs.mission

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
    <div className='min-h-screen bg-[#f7f2eb] font-["Outfit",sans-serif] text-[#172033] selection:bg-[#C5A059]/30'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero title={mission.heroTitle} subtitle={mission.heroDescription} />
      </div>

      <section className='relative overflow-hidden px-4 py-10 sm:px-5 sm:py-14 md:px-6 md:py-20'>
        <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(197,160,89,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(30,58,138,0.045)_1px,transparent_1px)] bg-[size:44px_44px] opacity-50' />
        <div className='mx-auto max-w-[1280px]'>
          <div className='relative mx-auto grid max-w-[1040px] grid-cols-1 gap-5 sm:gap-7 md:grid-cols-2'>
            {mission.heroImage && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className='md:col-span-2'
              >
                <div className="relative overflow-hidden rounded-lg border border-[#C5A059]/25 bg-white p-1.5 shadow-[0_24px_80px_rgba(22,32,51,0.11)]">
                  <img
                    src={mission.heroImage}
                    alt={mission.heroTitle}
                    className='h-[220px] w-full rounded-[5px] object-cover grayscale transition-all duration-1000 hover:scale-[1.02] hover:grayscale-0 sm:h-[300px] md:h-[460px]'
                    loading='lazy'
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
                </div>
              </motion.div>
            )}

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="mt-3 grid grid-cols-1 gap-4 sm:gap-5 md:col-span-2 md:mt-8 md:grid-cols-2 md:gap-6"
            >
              {mission.cards.map(({ title, description: cardDescription }, index) => {
                const Icon = missionIcons[index % missionIcons.length]
                return (
                  <motion.article
                    key={`${title ?? 'mission-card'}-${index}`}
                    variants={fadeIn}
                    className='group relative overflow-hidden rounded-lg border border-[#C5A059]/18 bg-white/92 p-5 shadow-[0_14px_45px_rgba(22,32,51,0.055)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C5A059]/50 hover:bg-white hover:shadow-[0_24px_60px_rgba(22,32,51,0.09)] sm:p-7 md:p-8'
                  >
                    <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#C5A059] via-[#d8bd7d] to-transparent opacity-75" />
                    
                    <div className='mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-[#102a62] text-[#C5A059] shadow-[0_10px_25px_rgba(16,42,98,0.18)] transition-transform duration-500 group-hover:scale-105 sm:mb-6'>
                      <Icon className='h-5 w-5 stroke-[1.5]' />
                    </div>
                    <h2 className='text-pretty text-[19px] font-bold tracking-normal text-[#102a62] md:text-[24px]'>
                      {title}
                    </h2>
                    <div className="mt-3 h-[1px] w-10 bg-[#C5A059]/40 transition-all duration-500 group-hover:w-20" />
                    <p className='mt-4 text-pretty text-[14px] leading-[1.7] text-[#516075] sm:text-[15px] md:mt-6 md:text-[16px]'>
                      {cardDescription}
                    </p>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className='relative overflow-hidden border-t border-[#C5A059]/15 bg-white px-4 py-12 sm:px-5 sm:py-16 md:px-6 md:py-24'>
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#C5A059 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} 
        />
        <div className='relative z-10 mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[900px]'>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            className="mb-10 text-center md:mb-16"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C5A059]">
                Principles & Ethics
              </span>
              <h2 className='mt-3 text-balance text-[28px] font-extrabold tracking-normal text-[#102a62] md:text-[46px]'>
                {mission.coreValuesTitle}
              </h2>
              <div className="mx-auto mt-6 h-[1px] w-16 bg-[#C5A059]/40" />
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className='space-y-4 md:space-y-6'
            >
              {mission.coreValues.map((value, index) => (
                <motion.article
                  key={`${value?.title ?? 'core-value'}-${index}`}
                  variants={fadeIn}
                  className='group relative flex flex-col gap-4 rounded-lg border border-[#C5A059]/15 bg-[#f7f2eb] p-5 shadow-[0_12px_35px_rgba(22,32,51,0.04)] transition-all duration-500 hover:border-[#C5A059]/40 hover:bg-white hover:shadow-[0_18px_45px_rgba(22,32,51,0.07)] sm:p-7 md:flex-row md:items-start md:gap-6 md:p-8'
                >
                  <div className="flex shrink-0 items-center gap-4 md:w-56 md:flex-col md:items-start md:gap-3">
                    <span className="text-[12px] font-bold text-[#C5A059]/50 tracking-widest italic">0{index + 1}</span>
                    <h3 className='text-pretty text-[18px] font-bold tracking-normal text-[#102a62] md:text-[22px]'>
                      {value.title}
                    </h3>
                  </div>
                  <div className="hidden h-14 w-[1px] bg-[#C5A059]/20 md:block" />
                  <p className='text-pretty text-[14px] leading-[1.7] text-[#516075] sm:text-[15px] md:text-[17px]'>
                    {value.description}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default MissionPage
