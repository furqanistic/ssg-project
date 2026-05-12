import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const HukamnamaSection = () => {
  const { t } = useTranslation()

  return (
    <section className="relative isolate overflow-hidden bg-[#faf8f5] px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      {/* Grain noise overlay — high-end-visual-design §4C, design-taste-frontend §5 */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Ambient glow orbs — high-end-visual-design §4A */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-[#1e3a8a]/[0.03] blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-[#f6ab3c]/[0.04] blur-[100px]" />

      {/* Hairline grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#111318 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        {/* Eyebrow badge — high-end-visual-design §4C */}
        <div className="mb-8 flex flex-col items-center md:mb-12">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-[#1e3a8a]/15 bg-[#1e3a8a]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e3a8a] shadow-[inset_0_1px_0_rgba(30,58,138,0.06)]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1e3a8a] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1e3a8a]" />
            </span>
            {t('home.hukamnama.title')}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 md:gap-6 lg:grid-cols-12">
          {/* Primary card — Double-Bezel (high-end-visual-design §4A) */}
          <motion.div variants={itemVariants} className="lg:col-span-12">
            <div className="rounded-[2.25rem] bg-black/[0.04] p-[3px] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.06)]">
              <div className="relative overflow-hidden rounded-[calc(2.25rem-3px)] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                <div className="p-8 md:p-12 lg:p-16">
                  {/* Geometric detail — only on md+ */}
                  <div className="pointer-events-none absolute right-0 top-0 hidden p-6 opacity-[0.04] md:block">
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#1e3a8a">
                      <circle cx="50" cy="50" r="48" strokeWidth="0.4" />
                      <circle cx="50" cy="50" r="36" strokeWidth="0.4" />
                      <circle cx="50" cy="50" r="24" strokeWidth="0.4" />
                      <line x1="50" y1="2" x2="50" y2="98" strokeWidth="0.3" />
                      <line x1="2" y1="50" x2="98" y2="50" strokeWidth="0.3" />
                    </svg>
                  </div>

                  {/* Pulse micro-interaction — design-taste-frontend §4, fixing-motion-performance §1 (small surface, compositor only) */}
                  <motion.div
                    animate={{ opacity: [0.12, 0.28, 0.12], scale: [1, 1.06, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rounded-full border border-[#1e3a8a]/[0.06] md:h-40 md:w-40"
                  />

                  <div className="relative flex flex-col items-center gap-6 md:flex-row md:gap-12 lg:gap-16">
                    {/* Vertical accent */}
                    <div className="hidden h-16 w-[3px] shrink-0 rounded-full bg-[#1e3a8a]/15 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:block lg:h-20" />

                    <div className="flex-1 text-center md:text-left">
                      <p className="text-2xl font-black leading-tight tracking-tight text-[#111318] md:text-4xl lg:text-5xl">
                        ਸਲੋਕ ਮਹਲਾ ੩ ॥
                      </p>
                      <div className="mx-auto my-5 h-px w-12 bg-[#1e3a8a]/15 md:mx-0 md:my-6 md:w-14" />
                      <p className="text-lg font-medium leading-relaxed text-[#111318]/65 md:text-2xl lg:text-3xl">
                        ਸਭਨਾ ਕਾ ਦਾਤਾ ਏਕੁ hai ਦੂਜਾ ਨਾਹੀ ਕੋਇ ॥
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary cards — both use Double-Bezel (high-end-visual-design §4A) */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:col-span-12">
            {/* Transliteration card */}
            <motion.div variants={itemVariants} className="group">
              <div className="rounded-[1.75rem] bg-black/[0.04] p-[2px] shadow-[0_4px_20px_-12px_rgba(0,0,0,0.04)] transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[0_8px_32px_-16px_rgba(0,0,0,0.1)]">
                <div className="rounded-[calc(1.75rem-2px)] bg-[#f4f2ee] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 md:p-8">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]/40">
                    {t('home.hukamnama.transliteration')}
                  </span>
                  <p className="mt-3 text-sm italic leading-relaxed text-[#48566d] md:text-base">
                    Salok Mehalā 3 ||
                    <br />
                    <span className="text-[#16191f]/70">Sabhnā kā dātā ek hai, dūjā nāhī ko-i ||</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Translation card */}
            <motion.div variants={itemVariants} className="group">
              <div className="rounded-[1.75rem] bg-[#1e3a8a]/20 p-[2px] shadow-[0_4px_20px_-12px_rgba(0,0,0,0.06)] transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[0_8px_32px_-16px_rgba(30,58,138,0.2)]">
                <div className="relative overflow-hidden rounded-[calc(1.75rem-2px)] bg-[#1e3a8a] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <div className="p-6 md:p-8">
                    {/* Pulse ring — replacing continuous rotate (fixing-motion-performance §1.1) */}
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full border border-white/8 md:h-36 md:w-36"
                    />

                    <div className="relative z-10">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
                        {t('home.hukamnama.translation')}
                      </span>
                      <p className="mt-3 text-sm font-medium leading-relaxed text-white md:text-base">
                        {t('home.hukamnama.translatedLine')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA — Button-in-Button (high-end-visual-design §4B, design-taste-frontend §4 Magnetic Micro-physics) */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:col-span-12 lg:mt-2"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex items-center gap-3 rounded-full bg-[#f6ab3c] pl-6 pr-1.5 py-1.5 text-sm font-black uppercase tracking-[0.02em] text-white shadow-[0_12px_32px_-16px_rgba(240,152,22,0.5)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#ef9f24] hover:shadow-[0_16px_40px_-16px_rgba(240,152,22,0.7)] md:pl-8 md:pr-2 md:py-2 md:text-base"
            >
              <span className="relative z-10">{t('common.actions.viewFullHukamnama')}</span>
              <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:scale-110 md:h-10 md:w-10">
                <ArrowRight className="h-4 w-4 text-white md:h-5 md:w-5" strokeWidth={2.5} />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default HukamnamaSection
