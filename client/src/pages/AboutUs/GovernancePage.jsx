import { motion } from 'framer-motion'
import { Download, FileText, ShieldCheck } from 'lucide-react'
import React from 'react'
import AboutPageHero from '@/components/about/AboutPageHero'
import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const DownloadCard = ({ title, size, fileUrl, ctaLabel, accent = '#f6ab3c' }) => {
  const displaySize = typeof size === 'string' && size.trim() ? size.trim() : '-'
  const accentColor = typeof accent === 'string' && accent.trim() ? accent.trim() : '#f6ab3c'

  return (
    <motion.article 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='group relative flex h-full flex-col overflow-hidden rounded-[1.2rem] border border-[#f6ab3c]/18 bg-white/96 p-5 shadow-[0_14px_45px_rgba(22,32,51,0.055)] transition-all duration-500 hover:-translate-y-1 hover:border-[#f6ab3c]/50 hover:bg-white hover:shadow-[0_24px_60px_rgba(22,32,51,0.09)] sm:p-6'
    >
      <div className='flex h-full flex-col'>
      <div className='flex items-start gap-4 sm:gap-5'>
        <div
          className='flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-[#071544] shadow-[0_10px_25px_rgba(16,42,98,0.18)] transition-transform duration-500 group-hover:scale-105 sm:h-12 sm:w-12'
          style={{ backgroundColor: accentColor }}
        >
          <FileText className='h-5 w-5 stroke-[1.5]' />
        </div>
        <div className='min-w-0 flex-1'>
          <h3 className='text-[16px] font-bold tracking-normal text-[#071544] md:text-[18px]'>
            {title}
          </h3>
          <div className='mt-2 inline-flex items-center rounded-full border border-[#071544]/10 bg-[#f8f9fb] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#607089]'>
            {displaySize}
          </div>
        </div>
      </div>

      <div className='mt-4 pt-1'>
          {fileUrl ? (
            <a
              href={fileUrl}
              target='_blank'
              rel='noreferrer'
              download
              className='inline-flex min-h-10 w-full items-center justify-center gap-2.5 rounded-full border border-[#f6ab3c] bg-[#f6ab3c] px-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#071544] transition-all hover:border-[#ef9f22] hover:bg-[#ef9f22]'
            >
              <Download className='h-4 w-4' />
              <span>{ctaLabel}</span>
            </a>
          ) : (
            <span className='inline-flex min-h-10 w-full items-center justify-center gap-2.5 rounded-full border border-[#071544]/12 bg-[#f8f9fb] px-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#7a879b]'>
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
  const governance = aboutUs?.governance ?? {}
  const downloadLabel = governance.downloadCtaLabel || 'Download'
  const structureBlocks = Array.isArray(governance.structureBlocks) ? governance.structureBlocks : []
  const documents = Array.isArray(governance.documents) ? governance.documents : []
  const reports = Array.isArray(governance.reports) ? governance.reports : []
  const docsCount = documents.length
  const reportsCount = reports.length

  // Animation variants
  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className='min-h-screen bg-[#fafafa] font-["Outfit",sans-serif] text-[#071544] selection:bg-[#f6ab3c]/30'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero title={governance.heroTitle} subtitle={governance.heroSubtitle} image={governance.heroImage} />
      </div>

      <section className='relative z-20 -mt-6 overflow-hidden px-4 pb-12 sm:px-5 md:-mt-8 md:px-6 md:pb-20'>
        <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(246,171,60,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(7,21,68,0.045)_1px,transparent_1px)] bg-[size:44px_44px] opacity-50' />
        <div className='mx-auto max-w-[1280px]'>
          <div className='rounded-2xl border border-[#071544]/[0.08] bg-white p-4 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.03)] sm:p-6 md:rounded-3xl md:p-10'>
            <div className='relative mx-auto max-w-[1000px]'>

              <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2d4f9f]/12 bg-[#2d4f9f]/5 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#2d4f9f]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f6ab3c]" />
                Governance Structure
              </div>
              <h2 className='text-balance text-[28px] font-extrabold tracking-normal text-[#071544] md:text-[42px]'>
                {governance.structureTitle}
              </h2>
              <div className='mt-7 space-y-7 md:mt-10 md:space-y-10'>
                <p className="text-pretty text-[16px] font-medium leading-[1.7] text-[#071544]/82 sm:text-[18px] md:text-[20px]">
                  {governance.structureIntro}
                </p>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                  {structureBlocks.map((block, index) => (
                    <motion.div
                      key={`${block?.title ?? 'block'}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative rounded-[1.2rem] border border-[#f6ab3c]/14 bg-white p-5 shadow-[0_12px_35px_rgba(22,32,51,0.04)] transition-all hover:-translate-y-1 hover:border-[#f6ab3c]/45 hover:shadow-[0_20px_45px_rgba(22,32,51,0.08)] sm:p-6"
                    >
                      <div className="mb-3 inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#071544] px-2 text-[11px] font-bold text-[#f6ab3c]">
                        {index + 1}
                      </div>
                      <h3 className='text-pretty text-[18px] font-bold text-[#071544] md:text-[20px]'>
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
      <section className='relative overflow-hidden border-t border-[#f6ab3c]/15 bg-white px-4 py-12 sm:px-5 sm:py-16 md:px-6 md:py-24'>
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#f6ab3c 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} 
        />
        
        <div className='relative z-10 mx-auto max-w-[1280px]'>
          <div className="space-y-14 md:space-y-24">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className='mx-auto max-w-[1000px]'>
              <div className="mb-7 flex items-center gap-3 sm:gap-5 md:mb-10 md:gap-6">
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#f6ab3c]/10 text-[#f6ab3c] sm:h-12 sm:w-12'>
                  <ShieldCheck className='h-5 w-5' />
                </div>
                <h2 className='text-balance text-[22px] font-extrabold tracking-normal text-[#071544] md:text-[34px]'>
                  {governance.documentsTitle}
                </h2>
                <div className="h-[1px] flex-1 bg-[#f6ab3c]/20" />
              </div>
              <div className='mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6f7f95]'>
                <span className='inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#071544] px-2 text-white'>{docsCount}</span>
                Available Documents
              </div>
              </div>
              <div className='rounded-[1.8rem] border border-[#f6ab3c]/14 bg-[#fffdf9] p-4 sm:p-6 md:p-8'>
                <div className='grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {documents.map((document, index) => (
                  <DownloadCard
                    key={`${document?.title ?? 'document'}-${index}`}
                    title={document.title}
                    size={document.size}
                    accent={document.accent}
                    fileUrl={document.fileUrl}
                    ctaLabel={downloadLabel}
                  />
                ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className='mx-auto max-w-[1000px]'>
              <div className="mb-7 flex items-center gap-3 sm:gap-5 md:mb-10 md:gap-6">
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#f6ab3c]/10 text-[#f6ab3c] sm:h-12 sm:w-12'>
                  <FileText className='h-5 w-5' />
                </div>
                <h2 className='text-balance text-[22px] font-extrabold tracking-normal text-[#071544] md:text-[34px]'>
                  {governance.reportsTitle}
                </h2>
                <div className="h-[1px] flex-1 bg-[#f6ab3c]/20" />
              </div>
              <div className='mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6f7f95]'>
                <span className='inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#2d4f9f] px-2 text-white'>{reportsCount}</span>
                Published Reports
              </div>
              </div>
              <div className='rounded-[1.8rem] border border-[#2d4f9f]/12 bg-[#f8faff] p-4 sm:p-6 md:p-8'>
                <div className='grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {reports.map((report, index) => (
                  <DownloadCard
                    key={`${report?.title ?? 'report'}-${index}`}
                    title={report.title}
                    size={report.size}
                    accent={report.accent}
                    fileUrl={report.fileUrl}
                    ctaLabel={downloadLabel}
                  />
                ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Financial Section */}
      <section className='relative overflow-hidden bg-[#fafafa] px-4 pb-12 sm:px-5 md:px-6 md:pb-16'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1000px] rounded-[2rem] border border-[#071544]/10 bg-white p-6 shadow-[0_24px_70px_rgba(22,32,51,0.06)] sm:p-8 md:p-12'>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2d4f9f]/12 bg-[#2d4f9f]/5 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#2d4f9f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f6ab3c]" />
              Financial Transparency
            </div>
            <h2 className='text-balance text-[28px] font-extrabold tracking-normal text-[#071544] md:text-[42px]'>
              {governance.financialTitle}
            </h2>
            <p className='mt-5 text-pretty text-[15px] leading-[1.75] text-[#516075] sm:text-[17px] md:mt-8 md:text-[19px]'>
              {governance.financialDescription}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='group relative mt-9 overflow-hidden rounded-[1.4rem] border border-[#f6ab3c]/25 bg-[#fffdf9] p-5 shadow-[0_24px_70px_rgba(22,32,51,0.08)] sm:p-8 md:mt-14 md:p-12'
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#f6ab3c]">Tax Information</span>
              <h3 className='mt-4 text-pretty text-[22px] font-bold tracking-normal text-[#071544] md:text-[28px]'>
                {governance.taxTitle}
              </h3>
              <div className="mt-6 h-[1px] w-12 bg-[#f6ab3c]/30 transition-all duration-500 group-hover:w-24" />
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
