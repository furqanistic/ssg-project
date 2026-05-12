import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import React from 'react'
import AboutPageHero from '@/components/about/AboutPageHero'
import SiteFooter from '@/components/layout/SiteFooter'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const DownloadCard = ({ title, size, fileUrl, ctaLabel }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='group relative border-[0.5px] border-[#C5A059]/20 bg-white p-5 transition-all hover:border-[#C5A059]/50 hover:shadow-[0_12px_30px_rgb(0,0,0,0.04)]'
    >
      <div className="absolute left-0 top-0 h-[1.5px] w-0 bg-[#C5A059] transition-all duration-500 group-hover:w-full" />
      <div className='flex items-start gap-4'>
        <div className='flex h-10 w-10 shrink-0 items-center justify-center bg-[#1e3a8a] text-[#C5A059]'>
          <FileText className='h-4.5 w-4.5 stroke-[1.5]' />
        </div>
        <div className='min-w-0'>
          <h3 className='text-[16px] font-bold tracking-tight text-[#1e3a8a] md:text-[17px]'>
            {title}
          </h3>
          <p className='mt-1 text-[13px] font-medium text-[#7a879b]'>{size}</p>
          {fileUrl ? (
            <a
              href={fileUrl}
              target='_blank'
              rel='noreferrer'
              download
              className='mt-3 inline-flex items-center gap-2 text-[14px] font-bold text-[#C5A059] transition-colors hover:text-[#1e3a8a]'
            >
              <Download className='h-3.5 w-3.5' />
              {ctaLabel}
            </a>
          ) : (
            <span className='mt-3 inline-flex items-center gap-2 text-[14px] font-bold text-[#C5A059]/50'>
              <Download className='h-3.5 w-3.5' />
              {ctaLabel}
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
    animate: { transition: { staggerChildren: 0.05 } }
  }

  return (
    <div className='min-h-screen bg-[#faf8f6] font-["Outfit",sans-serif] text-[#1a1a1a]'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero title={governance.heroTitle} subtitle={governance.heroSubtitle} />
      </div>

      <section className='px-4 py-12 md:px-6 md:py-16'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1000px]'>
            {governance.heroImage && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative mb-10 overflow-hidden rounded-[2px] border-[0.5px] border-[#C5A059]/30 bg-white p-1 shadow-xl shadow-black/5"
              >
                <img
                  src={governance.heroImage}
                  alt={governance.heroTitle}
                  className='h-[240px] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 md:h-[380px]'
                  loading='lazy'
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 h-[1px] w-12 bg-[#C5A059]/40" />
              <h2 className='text-[28px] font-extrabold tracking-tight text-[#1e3a8a] md:text-[34px]'>
                {governance.structureTitle}
              </h2>
              <div className='mt-8 space-y-6 text-[15px] leading-relaxed text-[#516075] md:text-[16px]'>
                <p className="text-[17px] font-medium text-[#1e3a8a]/80">{governance.structureIntro}</p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {governance.structureBlocks.map((block, index) => (
                    <div key={`${block?.title ?? 'block'}-${index}`} className="border-l-[2px] border-[#C5A059]/20 pl-5">
                      <h3 className='font-bold text-[#1e3a8a]'>{block?.title ?? ''}</h3>
                      <p className="mt-2 text-[14px]">{block?.body ?? ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Documents & Reports Section */}
      <section className='relative overflow-hidden border-t border-[#C5A059]/10 bg-white px-4 py-16 md:px-6 md:py-20'>
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#C5A059 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} 
        />
        <div className='relative z-10 mx-auto max-w-[1280px]'>
          <div className="space-y-16">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="mb-6 flex items-center gap-3">
                <h2 className='text-[24px] font-extrabold tracking-tight text-[#1e3a8a] md:text-[30px]'>
                  {governance.documentsTitle}
                </h2>
                <div className="h-[1px] flex-1 bg-[#C5A059]/10" />
              </div>
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
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
              <div className="mb-6 flex items-center gap-3">
                <h2 className='text-[24px] font-extrabold tracking-tight text-[#1e3a8a] md:text-[30px]'>
                  {governance.reportsTitle}
                </h2>
                <div className="h-[1px] flex-1 bg-[#C5A059]/10" />
              </div>
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
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
      <section className='px-4 py-16 md:px-6 md:py-20'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1000px]'>
            <div className="mb-4 h-[1px] w-12 bg-[#C5A059]/40" />
            <h2 className='text-[28px] font-extrabold tracking-tight text-[#1e3a8a] md:text-[34px]'>
              {governance.financialTitle}
            </h2>
            <p className='mt-6 text-[16px] leading-relaxed text-[#516075] md:text-[17px]'>
              {governance.financialDescription}
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='mt-10 border-[0.5px] border-[#C5A059]/30 bg-white p-8 md:p-10'
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">Tax Information</span>
              <h3 className='mt-3 text-[20px] font-bold tracking-tight text-[#1e3a8a] md:text-[22px]'>
                {governance.taxTitle}
              </h3>
              <div className="mt-5 h-[1px] w-12 bg-[#C5A059]/20" />
              <p className='mt-6 text-[15px] leading-relaxed text-[#516075] md:text-[16px]'>
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
