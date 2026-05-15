import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Heart } from 'lucide-react'
import LocationIcon from '../../../components/svg/LocationIcon'
import PhoneIcon from '../../../components/svg/PhoneIcon'
import WhatsAppIcon from '../../../components/svg/WhatsAppIcon'

const contactLinks = [
  {
    href: 'tel:+4915567277478',
    label: '+49 15567 277478',
    Icon: PhoneIcon,
  },
  {
    href: 'https://wa.me/4915567277478',
    label: 'WhatsApp',
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    href: 'https://www.google.com/maps/dir//Gurudwara+Sri+Guru+Singh+Sabha,+Bahnstra%C3%9Fe+2,+14513+Teltow,+Germany/@33.5506831,73.1467615,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x47a853e960dbf5bb:0x33da324c8881f212!2m2!1d13.2986853!2d52.3875629?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D',
    label: 'Alt Biesdorf 71, Berlin',
    Icon: LocationIcon,
    external: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.4,
    },
  },
}

const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-[#071544] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 85% 20%, rgba(246,171,60,0.08), transparent 55%),
            radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03), transparent 40%),
            linear-gradient(180deg, #0c1f5e 0%, #0a1a52 40%, #071544 100%)
          `,
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, white 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, white 0%, transparent 70%)',
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
        className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-8 px-6 pb-10 pt-[112px] sm:px-8 md:pb-14 md:pt-32 lg:grid-cols-[7fr_5fr] lg:gap-14 lg:px-10"
      >
        <div className="max-w-[680px] lg:pb-16">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f6ab3c]" />
              Singh Sabha Gurudwara Berlin
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-8 text-5xl font-medium leading-[1.04] tracking-tighter sm:text-6xl lg:text-7xl"
          >
            <span className="block text-white">{t('home.hero.titleLine1')}</span>
            <span className="mt-2 block text-white/85">{t('home.hero.titleLine2')}</span>
            <span className="mt-2 block text-white/65">{t('home.hero.titleLine3')}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-[520px] text-lg font-normal leading-[1.6] text-white/55"
          >
            {t('home.hero.subtitle')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              to="/events/programs#all"
              className="group inline-flex h-[52px] items-center justify-center gap-3 rounded-full bg-[#f09816] px-8 text-[15px] font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#f1a52e] active:scale-[0.97] md:h-[56px] md:px-9 md:text-[16px]"
            >
              <span>{t('common.actions.viewPrograms')}</span>
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </Link>

            <Link
              to="/donate"
              className="group inline-flex h-[52px] items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-8 text-[15px] font-medium text-white/85 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#f09816]/50 hover:text-white active:scale-[0.97] md:h-[56px] md:px-9 md:text-[16px]"
            >
              <span>{t('common.actions.donate')}</span>
              <Heart className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        <motion.div variants={scaleIn} className="w-full max-w-[520px] lg:max-w-none lg:pl-4">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
            <div className="relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#0a1a52]/70"
              />
              <img
                src="/hero-img.avif"
                alt="Gurudwara Sri Guru Singh Sabha Berlin"
                className="block h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                loading="eager"
                style={{ aspectRatio: '4/3' }}
              />
            </div>

            <div className="grid grid-cols-3 divide-x divide-white/8 border-t border-white/8 px-5 py-5 md:px-6 md:py-6">
              {[
                { value: 'Nitnem', label: 'DAILY PRAYERS' },
                { value: 'Langar', label: 'FREE COMMUNITY KITCHEN' },
                { value: 'Sangat', label: 'ALL ARE WELCOME' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <span className="text-[15px] font-medium tracking-tight text-white/90 md:text-[17px]">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-white/40 md:text-[10px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2 lg:-mt-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {contactLinks.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[13px] font-medium text-white/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/20 hover:bg-white/[0.06] hover:text-white/90 active:scale-[0.98] md:text-[14px]"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-500 group-hover:border-[#f6ab3c]/30 group-hover:bg-[#f6ab3c]/8">
                  {React.createElement(Icon, { className: 'h-4 w-4', strokeWidth: 1.5 })}
                </span>
                <span className="min-w-0 break-words">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
