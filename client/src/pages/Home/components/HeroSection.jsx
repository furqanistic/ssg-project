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
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const FloatingElements = React.memo(() => (
  <>
    <motion.div
      aria-hidden="true"
      className="absolute -right-32 top-16 hidden h-[560px] w-[560px] rounded-full border border-white/8 bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:block"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div
      aria-hidden="true"
      className="absolute -right-10 top-48 hidden h-[200px] w-[200px] rounded-full border border-white/8 lg:block"
    />
    <motion.div
      aria-hidden="true"
      className="absolute right-[22%] top-[15%] hidden h-4 w-4 rounded-full bg-[#f6ab3c]/70 shadow-[0_0_24px_4px_rgba(246,171,60,0.2)] lg:block"
      animate={{ y: [0, -8, 0], opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  </>
))

FloatingElements.displayName = 'FloatingElements'

const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      <section className="relative isolate min-h-[100dvh] overflow-hidden font-['Outfit','Poppins','Segoe_UI',sans-serif] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 15%, rgba(246,171,60,0.12), transparent 50%),
              radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.08), transparent 40%),
              radial-gradient(ellipse at 50% 100%, rgba(246,171,60,0.15), rgba(246,171,60,0.02) 48%, transparent 70%),
              linear-gradient(180deg, #0c1f5e 0%, #0a1a52 50%, #071544 100%)
            `,
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            ].join(','),
            backgroundSize: '64px 64px',
            maskImage:
              'linear-gradient(180deg, transparent 0%, white 20%, white 75%, transparent 100%)',
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />

        <FloatingElements />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="relative mx-auto grid min-h-[100dvh] max-w-[1280px] grid-cols-1 items-center gap-6 px-5 pb-10 pt-20 sm:px-6 md:pb-12 md:pt-28 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:px-8"
        >
          <div className="max-w-[720px] text-center lg:text-left">
            <motion.div variants={itemVariants} className="lg:pt-0 pt-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm md:text-[12px]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f6ab3c] opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f6ab3c]" />
                </span>
                Singh Sabha Gurudwara Berlin
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-6 text-[30px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[36px] md:text-[44px] lg:text-[52px]"
            >
              <span className="block text-white">{t('home.hero.titleLine1')}</span>
              <span className="mt-1.5 block text-white/80">{t('home.hero.titleLine2')}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-[580px] text-[15px] font-normal leading-[1.55] text-white/65 sm:text-[17px] md:text-[19px] md:leading-[1.4]"
            >
              {t('home.hero.subtitle')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Link
                to="/events/programs#all"
                className="group relative inline-flex h-[50px] min-w-[170px] items-center justify-center gap-2 rounded-full bg-[#f09816] px-6 text-[15px] font-semibold text-white shadow-[0_20px_48px_-20px_rgba(240,152,22,0.7)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#f1a52e] hover:shadow-[0_24px_56px_-20px_rgba(240,152,22,0.9)] active:translate-y-0 md:h-[54px] md:min-w-[190px] md:text-[16px]"
              >
                <span className="tracking-tight">{t('common.actions.viewPrograms')}</span>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:scale-110">
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                </span>
              </Link>

              <Link
                to="/donate"
                className="group relative inline-flex h-[50px] min-w-[130px] items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/8 px-6 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#f09816]/60 active:translate-y-0 md:h-[54px] md:min-w-[150px] md:text-[16px]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#f09816]/70 to-[#f09816]/30 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[100%]" />
                <span className="relative flex items-center gap-2.5">
                  <span className="tracking-tight">{t('common.actions.donate')}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/20 bg-white/8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-white/15">
                    <Heart className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative mx-auto w-full max-w-[420px] lg:max-w-[480px]"
          >
            <div
              aria-hidden="true"
              className="absolute -left-6 top-8 h-20 w-20 rounded-full border border-white/12 bg-white/[0.03]"
            />
            <div
              aria-hidden="true"
              className="absolute -right-4 bottom-10 h-14 w-14 rounded-full bg-[#f6ab3c]/60 shadow-[0_18px_42px_-18px_rgba(246,171,60,0.5)]"
            />

            <div className="rounded-[2rem] bg-white/5 p-[2px] shadow-[0_32px_80px_-48px_rgba(0,0,0,0.5)] sm:rounded-[2.5rem]">
              <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-gradient-to-b from-white/10 to-white/[0.04] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-4 sm:rounded-[calc(2.5rem-2px)] md:p-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent"
                />

                <img
                  src="/hero-img.avif"
                  alt="Gurudwara Sri Guru Singh Sabha Berlin"
                  className="relative block h-auto w-full rounded-[1.25rem] object-cover shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:rounded-[1.5rem]"
                  loading="eager"
                  style={{ aspectRatio: '4/5' }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2 lg:mt-2">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {contactLinks.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="group relative flex min-h-[60px] items-center justify-center gap-3 overflow-hidden rounded-[1.25rem] border border-white/15 bg-white/6 px-4 py-3 text-[13px] font-medium text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#f09816]/50 hover:text-white active:translate-y-0 md:text-[14px]"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#f09816]/40 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                  <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[120%]" />
                  <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:border-[#f09816]/40 group-hover:bg-white/12">
                    {React.createElement(Icon, { className: 'h-4 w-4', strokeWidth: 1.5 })}
                  </span>
                  <span className="relative min-w-0 break-words text-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 sm:text-center">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

export default HeroSection
