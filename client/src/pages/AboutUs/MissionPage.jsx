import { motion } from 'framer-motion'
import { BookOpen, Globe, Heart, Users } from 'lucide-react'
import React from 'react'
import AboutPageHero from '@/components/about/AboutPageHero'
import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const missionIcons = [Heart, Users, BookOpen, Globe]

const MissionPage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const mission = aboutUs.mission

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
        <AboutPageHero title={mission.heroTitle} subtitle={mission.heroDescription} />
      </div>

      <section className='px-4 py-12 md:px-6 md:py-16'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto grid max-w-[1000px] grid-cols-1 gap-6 md:grid-cols-2'>
            {mission.heroImage && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='md:col-span-2'
              >
                <div className="relative overflow-hidden rounded-[2px] border-[0.5px] border-[#C5A059]/30 bg-white p-1 shadow-xl shadow-black/5">
                  <img
                    src={mission.heroImage}
                    alt={mission.heroTitle}
                    className='h-[240px] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 md:h-[400px]'
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
              className="md:col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2 mt-4"
            >
              {mission.cards.map(({ title, description: cardDescription }, index) => {
                const Icon = missionIcons[index % missionIcons.length]
                return (
                  <motion.article
                    key={`${title ?? 'mission-card'}-${index}`}
                    variants={fadeIn}
                    className='group relative border-[0.5px] border-[#C5A059]/20 bg-white p-6 transition-all hover:border-[#C5A059]/50 hover:shadow-[0_15px_35px_rgb(0,0,0,0.04)]'
                  >
                    <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#C5A059] transition-all duration-500 group-hover:w-full" />
                    
                    <div className='mb-5 flex h-10 w-10 items-center justify-center bg-[#1e3a8a] text-[#C5A059]'>
                      <Icon className='h-5 w-5 stroke-[1.5]' />
                    </div>
                    <h2 className='text-[19px] font-bold tracking-tight text-[#1e3a8a] md:text-[21px]'>
                      {title}
                    </h2>
                    <div className="mt-2 h-[1px] w-8 bg-[#C5A059]/30 transition-all duration-500 group-hover:w-16" />
                    <p className='mt-5 text-[14px] leading-relaxed text-[#516075] md:text-[15px]'>
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
      <section className='relative overflow-hidden border-t border-[#C5A059]/10 bg-white px-4 py-16 md:px-6 md:py-20'>
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#C5A059 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} 
        />
        <div className='relative z-10 mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[900px]'>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059]">
                Principles & Ethics
              </span>
              <h2 className='mt-2 text-[28px] font-extrabold tracking-tight text-[#1e3a8a] md:text-[36px]'>
                {mission.coreValuesTitle}
              </h2>
              <div className="mx-auto mt-5 h-[1px] w-12 bg-[#C5A059]/40" />
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className='space-y-4'
            >
              {mission.coreValues.map((value, index) => (
                <motion.article
                  key={`${value?.title ?? 'core-value'}-${index}`}
                  variants={fadeIn}
                  className='group relative flex flex-col gap-4 border-[0.5px] border-[#C5A059]/15 bg-[#faf8f6] p-6 transition-all hover:bg-white hover:border-[#C5A059]/40 md:flex-row md:items-start'
                >
                  <div className="flex shrink-0 items-center gap-4 md:w-48 md:flex-col md:items-start md:gap-2">
                    <span className="text-[11px] font-bold text-[#C5A059]/60">0{index + 1}</span>
                    <h3 className='text-[17px] font-bold tracking-tight text-[#1e3a8a] md:text-[19px]'>
                      {value.title}
                    </h3>
                  </div>
                  <div className="hidden h-12 w-[1px] bg-[#C5A059]/20 md:block" />
                  <p className='text-[14px] leading-relaxed text-[#516075] md:text-[15px]'>
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
