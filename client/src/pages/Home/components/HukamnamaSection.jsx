import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import fallbackHukamnama from '../../../data/hukamnama-fallback.json'

const API_URL = 'https://api.gurbaninow.com/v2/hukamnama/today'

const shuffleFallback = (arr) => {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy[0]
}

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

const HukamnamaSection = () => {
  const { t } = useTranslation()
  const [hukamnama, setHukamnama] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const fetchHukamnama = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('API unavailable')
        const data = await res.json()
        if (!cancelled) {
          setHukamnama(data)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setHukamnama(shuffleFallback(fallbackHukamnama))
          setLoading(false)
        }
      }
    }

    fetchHukamnama()
    return () => { cancelled = true }
  }, [])

  const isApiFormat = hukamnama && 'hukamnamainfo' in hukamnama

  const gurmukhiLines = useMemo(() => {
    if (!hukamnama) return []
    if (isApiFormat) {
      return hukamnama.hukamnama.slice(1).map((item) => item.line.gurmukhi.unicode)
    }
    const lines = hukamnama.gurmukhi
    return lines.slice(1)
  }, [hukamnama, isApiFormat])

  const headingLine = useMemo(() => {
    if (!hukamnama) return ''
    if (isApiFormat) {
      return hukamnama.hukamnama[0]?.line?.gurmukhi?.unicode || ''
    }
    return hukamnama.gurmukhi?.[0] || ''
  }, [hukamnama, isApiFormat])

  const transliteration = useMemo(() => {
    if (!hukamnama) return ''
    if (isApiFormat) {
      return hukamnama.hukamnama
        .map((item) => item.line.transliteration?.english?.text || '')
        .filter(Boolean)
        .join(' ')
    }
    return hukamnama.transliteration?.en || ''
  }, [hukamnama, isApiFormat])

  const translationText = useMemo(() => {
    if (!hukamnama) return ''
    if (isApiFormat) {
      return hukamnama.hukamnama
        .map((item) => item.line.translation?.english?.default || '')
        .filter(Boolean)
        .join(' ')
    }
    return hukamnama.translation?.en?.description || ''
  }, [hukamnama, isApiFormat])

  const raag = isApiFormat
    ? hukamnama?.hukamnamainfo?.raag?.english || ''
    : hukamnama?.source?.raag || ''

  const page = isApiFormat
    ? hukamnama?.hukamnamainfo?.pageno || ''
    : hukamnama?.source?.page || ''

  const writer = isApiFormat
    ? hukamnama?.hukamnamainfo?.writer?.english || ''
    : hukamnama?.source?.writer || ''

  if (loading) {
    return (
      <section className='relative bg-[#071544] px-6 py-12 md:px-10 md:py-16 overflow-hidden'>
        <div className='mx-auto w-full max-w-[1400px]'>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex-1 space-y-4'>
              <div className='h-5 w-40 rounded-full bg-white/5 animate-pulse' />
              <div className='h-14 w-full rounded-2xl bg-white/5 animate-pulse' />
              <div className='h-10 w-3/4 rounded-2xl bg-white/5 animate-pulse' />
              <div className='h-10 w-2/3 rounded-2xl bg-white/5 animate-pulse' />
            </div>
            <div className='w-full md:w-80 space-y-4'>
              <div className='h-28 rounded-2xl bg-white/5 animate-pulse' />
              <div className='h-28 rounded-2xl bg-white/5 animate-pulse' />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='relative isolate overflow-hidden bg-[#071544] px-6 py-12 md:px-10 md:py-16'>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, white 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, white 0%, transparent 75%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-[#f6ab3c]/[0.04] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
        className="relative mx-auto w-full max-w-[1400px]"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-white/70">
            <span className="h-1 w-1 rounded-full bg-[#f6ab3c]" />
            {t('home.hukamnama.title')}
          </div>

          <div className="flex items-center gap-3">
            {raag && (
              <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/35">
                {raag}
              </span>
            )}
            {writer && (
              <>
                <span className="h-2.5 w-px bg-white/8" />
                <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/35">
                  {writer}
                </span>
              </>
            )}
            {page && (
              <>
                <span className="h-2.5 w-px bg-white/8" />
                <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/35">
                  ANG {page}
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* Asymmetrical grid: Gurmukhi left, translations right */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_360px] gap-4 md:gap-6">
          {/* Left: Gurmukhi */}
          <motion.div variants={itemVariants}>
            <div className="h-full rounded-2xl border border-white/8 bg-white/[0.03] p-8 md:p-10 lg:p-12 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.5)]">
              {headingLine && (
                <p className="text-[15px] font-medium leading-relaxed text-white/55 md:text-[17px] lg:text-[19px]">
                  {headingLine}
                </p>
              )}

              <div className="mt-5 space-y-2">
                {gurmukhiLines.map((line, i) => (
                  <p
                    key={i}
                    className="text-[26px] font-medium leading-[1.35] tracking-tight text-white sm:text-[32px] md:text-[38px] lg:text-[46px]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Transliteration + Translation stacked */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div className="flex-1 rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-500 hover:bg-white/[0.05] md:p-7">
              <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-[#f6ab3c]/50">
                {t('home.hukamnama.transliteration')}
              </span>
              <p className="mt-2 text-[13px] font-light leading-relaxed text-white/55 md:text-[14px]">
                {transliteration}
              </p>
            </div>

            <div className="flex-1 rounded-2xl border border-[#f6ab3c]/12 bg-[#f6ab3c]/[0.03] p-6 transition-all duration-500 hover:bg-[#f6ab3c]/[0.05] md:p-7">
              <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-[#f6ab3c]/50">
                {t('home.hukamnama.translation')}
              </span>
              <p className="mt-2 text-[13px] font-light leading-relaxed text-white/60 md:text-[14px]">
                {translationText}
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-6 flex justify-center md:justify-start">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex h-[40px] items-center justify-center gap-2.5 rounded-full bg-[#f09816] px-6 text-[12px] font-medium text-white transition-all duration-500 hover:bg-[#f1a52e] md:h-[44px] md:px-7 md:text-[13px]"
          >
            <span>{t('common.actions.viewFullHukamnama')}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={2} />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HukamnamaSection
