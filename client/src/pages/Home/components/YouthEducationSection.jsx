import React, { useMemo } from 'react'
import { ArrowRight, GraduationCap, Heart, Users, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const educationIcons = [GraduationCap, GraduationCap, Users]
const ctaIcons = [Users, Heart]

const EducationCard = ({ title, description, icon: Icon, accent, ctaLabel, to, index }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className='group relative flex flex-col rounded-[2.5rem] bg-white p-7 ring-1 ring-black/[0.04] transition-all duration-700 hover:ring-[#f6ab3c]/40 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]'
    >
      {/* Precision Structural Corner */}
      <div className='absolute top-0 right-0 h-16 w-16 opacity-[0.03] pointer-events-none'>
        <svg viewBox='0 0 100 100' className='h-full w-full rotate-90'>
          <path d='M100 0 L100 100 L0 100' fill='none' stroke='currentColor' strokeWidth='2' />
        </svg>
      </div>

      <div className='flex items-start justify-between mb-8'>
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${accent} shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className='h-7 w-7 stroke-[2]' />
        </div>
        <span className='text-[10px] font-black text-[#111318]/10 select-none'>0{index + 1}</span>
      </div>
      
      <h3 className='text-[22px] font-black tracking-tight text-[#111318] leading-tight group-hover:text-[#f6ab3c] transition-colors duration-500'>
        {title}
      </h3>
      
      <p className='mt-5 flex-1 text-[15px] leading-relaxed text-[#5a677a] font-medium'>
        {description}
      </p>

      <div className='mt-10 pt-6 border-t border-black/[0.03]'>
        <Link
          to={to}
          className='group/btn relative inline-flex items-center gap-3 rounded-full bg-[#111318] pl-6 pr-1.5 py-1.5 text-[11px] font-black tracking-[0.1em] text-white transition-all duration-500 hover:bg-[#222] hover:-translate-y-1 active:scale-[0.95]'
        >
          {ctaLabel}
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#f6ab3c] text-[#111318] transition-transform duration-700 group-hover/btn:rotate-45'>
            <ArrowRight className='h-4 w-4' />
          </div>
        </Link>
      </div>
    </motion.article>
  )
}

const CtaCard = ({ title, description, icon: Icon, buttonLabel, buttonClass, to, index }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className='relative overflow-hidden rounded-[3rem] bg-white/[0.08] p-10 ring-1 ring-white/10 transition-all duration-700 hover:bg-white/[0.12] group'
    >
      <div className='absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-white/[0.03] blur-[100px] group-hover:bg-white/[0.06] transition-colors duration-1000' />
      <div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent' />

      <div className='flex flex-col xl:flex-row gap-10 items-start relative z-10'>
        <div className='relative shrink-0'>
          <div className='flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[#f6ab3c] text-[#111318] shadow-[0_20px_40px_-10px_rgba(246,171,60,0.3)] transition-transform duration-1000 group-hover:rotate-[360deg]'>
            <Icon className='h-9 w-9 stroke-[2.2]' />
          </div>
          <div className='absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20' />
        </div>
        
        <div className='flex-1'>
          <div className='flex items-center gap-4 mb-5 opacity-40'>
            <div className='h-[1px] w-8 bg-white' />
            <span className='text-[10px] font-black uppercase tracking-[0.4em] text-white'>Engagement</span>
          </div>
          
          <h3 className='text-[28px] font-black tracking-tight text-white md:text-[34px] leading-[0.95] uppercase'>
            {title}
          </h3>
          <p className='mt-6 text-[16px] leading-relaxed text-white/70 font-medium max-w-lg'>
            {description}
          </p>
          
          <div className='mt-10'>
            <Link
              to={to}
              className={`inline-flex h-14 items-center justify-center rounded-full px-12 text-[13px] font-black tracking-[0.2em] uppercase transition-all duration-500 hover:-translate-y-1 shadow-2xl ${buttonClass}`}
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

const YouthEducationSection = () => {
  const { t } = useTranslation()

  const educationCards = useMemo(() => {
    const cards = t('home.youthSection.cards', { returnObjects: true })
    const cardLinks = [
      '/youth-education#gurmukhi-class',
      '/youth-education#german-class',
      '/youth-education#camps-workshops',
    ]

    return cards.map((card, index) => ({
      ...card,
      icon: educationIcons[index],
      accent: index % 2 === 1 ? 'bg-[#2d4f9f] text-white' : 'bg-[#f6ab3c] text-white',
      to: cardLinks[index] || '/youth-education',
    }))
  }, [t])

  const ctaCards = useMemo(() => {
    const cards = t('home.youthSection.cta', { returnObjects: true })
    return cards.map((card, index) => ({
      ...card,
      icon: ctaIcons[index],
      to: index === 0 ? '/contact' : '/donate',
      buttonClass:
        index === 0
          ? 'bg-white text-[#2d4f9f] hover:bg-white hover:scale-105'
          : 'bg-[#f6ab3c] text-white hover:bg-[#f6ab3c] hover:scale-105',
    }))
  }, [t])

  return (
    <section className='relative bg-[#f2f2f2] overflow-hidden'>
      {/* Structural Noise & Grid Foundation */}
      <div className='absolute inset-0 pointer-events-none opacity-[0.04]' 
           style={{ backgroundImage: 'radial-gradient(#111318 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      <div className='absolute inset-0 pointer-events-none opacity-[0.015] bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' />

      <div className='px-4 py-24 md:px-6 md:py-32 relative z-10'>
        <div className='mx-auto max-w-[1340px]'>
          <div className='flex flex-col items-center text-center mb-24'>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className='inline-flex items-center gap-3 rounded-full px-5 py-2 text-[10px] font-black tracking-[0.4em] uppercase text-[#2d4f9f] ring-1 ring-[#2d4f9f]/20 bg-[#2d4f9f]/5 mb-8'
            >
              <Sparkles className='h-3.5 w-3.5' />
              <span>Nurturing Potential</span>
            </motion.div>
            <h2 className='text-[44px] font-black tracking-tight text-[#111318] md:text-[64px] lg:text-[76px] leading-[0.85] uppercase'>
              {t('home.youthSection.title')}
            </h2>
            <div className='mt-8 h-[1px] w-24 bg-[#f6ab3c]' />
            <p className='mt-10 text-[18px] leading-relaxed text-[#5a677a] font-medium max-w-2xl'>
              {t('home.youthSection.subtitle')}
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {educationCards.map((card, index) => (
              <EducationCard
                key={card.title}
                {...card}
                index={index}
                ctaLabel={t('common.actions.learnMore')}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='relative bg-[#3567c4] px-4 py-24 md:px-6 md:py-32 overflow-hidden'>
        <div className='absolute inset-0 opacity-[0.08] pointer-events-none' style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        
        <div className='mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-2 relative z-10'>
          {ctaCards.map((card, index) => (
            <CtaCard key={card.title} {...card} index={index} buttonLabel={card.button} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default YouthEducationSection
