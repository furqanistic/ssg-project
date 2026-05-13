import { motion } from 'framer-motion'
import { Download, FileText, ShieldCheck } from 'lucide-react'
import React from 'react'
import AboutPageHero from '@/components/about/AboutPageHero'
import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const DownloadCard = ({ title, size, fileUrl, ctaLabel }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='group relative overflow-hidden rounded-lg border border-[#C5A059]/18 bg-white/94 p-5 shadow-[0_14px_45px_rgba(22,32,51,0.055)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C5A059]/50 hover:bg-white hover:shadow-[0_24px_60px_rgba(22,32,51,0.09)] sm:p-6'
    >
      <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#C5A059] via-[#d8bd7d] to-transparent opacity-75" />
      <div className='flex items-start gap-4 sm:gap-5'>
        <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#102a62] text-[#C5A059] shadow-[0_10px_25px_rgba(16,42,98,0.18)] transition-transform duration-500 group-hover:scale-105 sm:h-12 sm:w-12'>
          <FileText className='h-5 w-5 stroke-[1.5]' />
        </div>
        <div className='min-w-0'>
          <h3 className='text-pretty text-[16px] font-bold tracking-normal text-[#102a62] md:text-[18px]'>
            {title}
          </h3>
          <p className='mt-1 text-[13px] font-medium tracking-wide text-[#7a879b]'>{size}</p>
          {fileUrl ? (
            <a
              href={fileUrl}
              target='_blank'
              rel='noreferrer'
              download
              className='mt-4 inline-flex items-center gap-2.5 text-[14px] font-bold text-[#C5A059] transition-all hover:text-[#1e3a8a]'
            >
              <Download className='h-4 w-4' />
              <span className="border-b border-[#C5A059]/30 group-hover:border-[#1e3a8a]">{ctaLabel}</span>
            </a>
          ) : (
            <span className='mt-4 inline-flex items-center gap-2.5 text-[14px] font-bold text-[#C5A059]/40'>
              <Download className='h-4 w-4' />
              {ctaLabel} (Coming Soon)
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

const GovernancePage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const governance = aboutUs.governance
  const downloadLabel = governance.downloadCtaLabel || 'Download'

  // Animation variants
  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className='min-h-screen bg-[#f7f2eb] font-["Outfit",sans-serif] text-[#172033] selection:bg-[#C5A059]/30'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero title={governance.heroTitle} subtitle={governance.heroSubtitle} />
      </div>

      <section className='relative z-20 -mt-6 overflow-hidden px-4 pb-12 sm:px-5 md:-mt-8 md:px-6 md:pb-20'>
        <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(197,160,89,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(30,58,138,0.045)_1px,transparent_1px)] bg-[size:44px_44px] opacity-50' />
        <div className='mx-auto max-w-[1280px]'>
          <div className='rounded-2xl border border-[#071544]/[0.08] bg-white p-4 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.03)] sm:p-6 md:rounded-3xl md:p-10'>
            <div className='relative mx-auto max-w-[1000px]'>
            {governance.heroImage && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative mb-10 overflow-hidden rounded-lg border border-[#C5A059]/25 bg-white p-1.5 shadow-[0_24px_80px_rgba(22,32,51,0.11)] md:mb-16"
              >
                <img
                  src={governance.heroImage}
                  alt={governance.heroTitle}
                  className='h-[220px] w-full rounded-[5px] object-cover grayscale transition-all duration-1000 hover:scale-[1.02] hover:grayscale-0 sm:h-[300px] md:h-[440px]'
                  loading='lazy'
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
              </motion.div>
            )}

              <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 h-[1px] w-16 bg-[#C5A059]/40" />
              <h2 className='text-balance text-[28px] font-extrabold tracking-normal text-[#102a62] md:text-[42px]'>
                {governance.structureTitle}
              </h2>
              <div className='mt-7 space-y-7 md:mt-10 md:space-y-10'>
                <p className="text-pretty text-[16px] font-medium leading-[1.7] text-[#102a62]/82 sm:text-[18px] md:text-[20px]">
                  {governance.structureIntro}
                </p>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                  {governance.structureBlocks.map((block, index) => (
                    <motion.div 
                      key={`${block?.title ?? 'block'}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative rounded-lg border border-[#C5A059]/14 bg-white/72 p-5 shadow-[0_12px_35px_rgba(22,32,51,0.04)] transition-all hover:border-[#C5A059]/45 hover:bg-white sm:p-6 md:border-l-[3px] md:pl-8"
                    >
                      <h3 className='text-pretty text-[18px] font-bold text-[#102a62] md:text-[20px]'>
                        {block?.title ?? ''}
                      </h3>
                      <p className="mt-3 text-pretty text-[14px] leading-[1.7] text-[#516075] sm:text-[15px] md:mt-4 md:text-[16px]">
                        {block?.body ?? ''}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents & Reports Section */}
      <section className='relative overflow-hidden border-t border-[#C5A059]/15 bg-white px-4 py-12 sm:px-5 sm:py-16 md:px-6 md:py-24'>
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#C5A059 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} 
        />
        
        <div className='relative z-10 mx-auto max-w-[1280px]'>
          <div className="space-y-14 md:space-y-24">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="mb-7 flex items-center gap-3 sm:gap-5 md:mb-10 md:gap-6">
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#C5A059]/10 text-[#C5A059] sm:h-12 sm:w-12'>
                  <ShieldCheck className='h-6 w-6' />
                </div>
                <h2 className='text-balance text-[22px] font-extrabold tracking-normal text-[#102a62] md:text-[34px]'>
                  {governance.documentsTitle}
                </h2>
                <div className="h-[1px] flex-1 bg-[#C5A059]/20" />
              </div>
              <div className='grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {governance.documents.map((document, index) => (
                  <DownloadCard
                    key={`${document?.title ?? 'document'}-${index}`}
                    title={document.title}
                    size={document.size}
                    fileUrl={document.fileUrl}
                    ctaLabel={downloadLabel}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="mb-7 flex items-center gap-3 sm:gap-5 md:mb-10 md:gap-6">
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#C5A059]/10 text-[#C5A059] sm:h-12 sm:w-12'>
                  <FileText className='h-6 w-6' />
                </div>
                <h2 className='text-balance text-[22px] font-extrabold tracking-normal text-[#102a62] md:text-[34px]'>
                  {governance.reportsTitle}
                </h2>
                <div className="h-[1px] flex-1 bg-[#C5A059]/20" />
              </div>
              <div className='grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {governance.reports.map((report, index) => (
                  <DownloadCard
                    key={`${report?.title ?? 'report'}-${index}`}
                    title={report.title}
                    size={report.size}
                    fileUrl={report.fileUrl}
                    ctaLabel={downloadLabel}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Financial Section */}
      <section className='relative px-4 py-12 sm:px-5 sm:py-16 md:px-6 md:py-24'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1000px]'>
            <div className="mb-6 h-[1px] w-16 bg-[#C5A059]/40" />
            <h2 className='text-balance text-[28px] font-extrabold tracking-normal text-[#102a62] md:text-[42px]'>
              {governance.financialTitle}
            </h2>
            <p className='mt-5 text-pretty text-[15px] leading-[1.75] text-[#516075] sm:text-[17px] md:mt-8 md:text-[19px]'>
              {governance.financialDescription}
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='group relative mt-9 overflow-hidden rounded-lg border border-[#C5A059]/25 bg-white p-5 shadow-[0_24px_70px_rgba(22,32,51,0.08)] sm:p-8 md:mt-16 md:p-14'
            >
              <div className="absolute left-0 top-0 h-[4px] w-full bg-[#C5A059]/10" />
              <div className="absolute left-0 top-0 h-[4px] w-0 bg-[#C5A059] transition-all duration-1000 ease-out group-hover:w-full" />
              
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C5A059]">Tax Information</span>
              <h3 className='mt-4 text-pretty text-[22px] font-bold tracking-normal text-[#102a62] md:text-[28px]'>
                {governance.taxTitle}
              </h3>
              <div className="mt-6 h-[1px] w-12 bg-[#C5A059]/30 transition-all duration-500 group-hover:w-24" />
              <p className='mt-5 text-pretty text-[15px] leading-[1.75] text-[#516075] md:mt-8 md:text-[17px]'>
                {governance.taxDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default GovernancePage
