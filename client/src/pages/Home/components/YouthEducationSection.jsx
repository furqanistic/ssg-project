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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className='group relative flex flex-col rounded-[2rem] bg-white p-6 ring-1 ring-black/[0.05] transition-all duration-700 hover:ring-[#f6ab3c]/30 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]'
    >
      {/* Precision Icon Block */}
      <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${accent} shadow-sm transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6`}>
        <Icon className='h-6 w-6 stroke-[2]' />
      </div>
      
      <h3 className='text-[20px] font-black tracking-tight text-[#111318] group-hover:text-[#f6ab3c] transition-colors'>
        {title}
      </h3>
      
      <p className='mt-4 flex-1 text-[15px] leading-relaxed text-[#5a677a] font-medium line-clamp-3'>
        {description}
      </p>

      {/* Refined Premium Button */}
      <div className='mt-8 pt-5 border-t border-black/[0.03]'>
        <Link
          to={to}
          className='group/btn relative inline-flex items-center gap-3 rounded-full bg-[#111318] pl-5 pr-1.5 py-1.5 text-[10px] font-black tracking-[0.05em] text-white transition-all duration-500 hover:bg-[#222] active:scale-[0.95]'
        >
          {ctaLabel}
          <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#f6ab3c] text-[#111318] transition-transform group-hover/btn:rotate-45'>
            <ArrowRight className='h-3.5 w-3.5' />
          </div>
        </Link>
      </div>
    </motion.article>
  )
}

const CtaCard = ({ title, description, icon: Icon, buttonLabel, buttonClass, to, index }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      className='relative overflow-hidden rounded-[2.5rem] bg-white/[0.08] p-8 md:p-10 ring-1 ring-white/10 transition-all duration-700 hover:bg-white/[0.12]'
    >
      {/* Structural Hairline Detail */}
      <div className='absolute top-0 left-0 w-full h-[1px] bg-white/5' />
      <div className='absolute top-0 left-0 w-[1px] h-full bg-white/5' />
      <div className='absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/[0.02] blur-3xl' />
      
      <div className='flex flex-col md:flex-row gap-8 items-start relative z-10'>
        {/* Premium Icon Housing */}
        <div className='relative group/icon'>
          <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f6ab3c] text-[#111318] shadow-2xl transition-transform duration-700 group-hover/icon:scale-110 group-hover/icon:rotate-6'>
            <Icon className='h-7 w-7 stroke-[2.5]' />
          </div>
          <div className='absolute -inset-1 rounded-[1.2rem] ring-1 ring-[#f6ab3c]/30 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-700' />
        </div>
        
        <div className='flex-1'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='h-[1px] w-6 bg-white/20' />
            <span className='text-[10px] font-black uppercase tracking-[0.3em] text-white/40'>Engagement Opportunity</span>
          </div>
          
          <h3 className='text-[24px] font-black tracking-tight text-white md:text-[28px] uppercase leading-none'>
            {title}
          </h3>
          <p className='mt-5 text-[15px] leading-relaxed text-white/70 font-medium max-w-xl'>
            {description}
          </p>
          
          <Link
            to={to}
            className={`mt-10 inline-flex h-12 items-center justify-center rounded-full px-10 text-[13px] font-black tracking-[0.15em] uppercase transition-all duration-500 hover:-translate-y-1 active:scale-[0.95] ${buttonClass}`}
          >
            {buttonLabel}
          </Link>
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
      accent: index % 2 === 1 ? 'bg-[#1e3a8a] text-white' : 'bg-[#f6ab3c] text-white',
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
          ? 'bg-white text-[#1e3a8a] hover:bg-gray-100 shadow-xl'
          : 'bg-[#f6ab3c] text-white hover:bg-[#ef9f24] shadow-xl',
    }))
  }, [t])

  return (
    <section className='relative bg-[#f2f2f2] overflow-hidden'>
      {/* Structural Hairline Grid Background */}
      <div className='absolute inset-0 pointer-events-none opacity-[0.03]' 
           style={{ backgroundImage: 'radial-gradient(#111318 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      <div className='px-4 py-16 md:px-6 md:py-20 lg:py-24 relative z-10'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='flex flex-col items-center text-center mb-16'>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className='inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-black tracking-[0.25em] uppercase text-[#1e3a8a] ring-1 ring-[#1e3a8a]/20 bg-[#1e3a8a]/5 mb-6'
            >
              <Sparkles className='h-3 w-3' />
              <span>{t('home.youthSection.title')}</span>
            </motion.div>
            <h2 className='text-[36px] font-black tracking-tight text-[#111318] md:text-[44px] lg:text-[52px] leading-none uppercase'>
              {t('home.youthSection.title')}
            </h2>
            <p className='mt-6 text-[16px] leading-relaxed text-[#5a677a] font-medium max-w-xl'>
              {t('home.youthSection.subtitle')}
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
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

      <div className='relative bg-[#1e3a8a] px-4 py-16 md:px-6 md:py-20 lg:py-24 overflow-hidden'>
        {/* Animated Structural Background for Blue Section */}
        <div className='absolute inset-0 opacity-[0.05] pointer-events-none'>
          <div className='absolute inset-0' style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        
        <div className='mx-auto grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-2 relative z-10'>
          {ctaCards.map((card, index) => (
            <CtaCard key={card.title} {...card} index={index} buttonLabel={card.button} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default YouthEducationSection
