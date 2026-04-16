import React from 'react'
import { Download, FileText } from 'lucide-react'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import AboutPageHero from '@/components/about/AboutPageHero'
import { useAboutUsContentQuery } from '@/hooks/useAboutUsContent'

const normalizeColor = (value, fallback = '#f6ab3c') => {
  if (typeof value !== 'string' || !value.trim()) return fallback
  const color = value.trim()
  if (color.startsWith('#')) return color
  const match = color.match(/#(?:[0-9a-fA-F]{3,8})/)
  return match ? match[0] : fallback
}

const DownloadCard = ({ title, size, accent, fileUrl, ctaLabel }) => {
  return (
    <article className='rounded-[16px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
      <div className='flex items-start gap-4'>
        <div
          className='flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] text-white'
          style={{ backgroundColor: normalizeColor(accent) }}
        >
          <FileText className='h-5 w-5 stroke-[2]' />
        </div>
        <div className='min-w-0'>
          <h3 className='text-[18px] font-bold tracking-[-0.02em] text-[#111318]'>
            {title}
          </h3>
          <p className='mt-1 text-[15px] text-[#7a879b]'>{size}</p>
          {fileUrl ? (
            <a
              href={fileUrl}
              target='_blank'
              rel='noreferrer'
              download
              className='mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-[#f39d2f] transition hover:text-[#ea951e]'
            >
              <Download className='h-4 w-4' />
              {ctaLabel}
            </a>
          ) : (
            <span className='mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-[#d0a96c]'>
              <Download className='h-4 w-4' />
              {ctaLabel}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

const GovernancePage = () => {
  const { aboutUs } = useAboutUsContentQuery()
  const governance = aboutUs.governance
  const downloadLabel = governance.downloadCtaLabel || 'Download'

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <AboutPageHero title={governance.heroTitle} subtitle={governance.heroSubtitle} />
      </div>

      <section className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1040px]'>
            {governance.heroImage ? (
              <img
                src={governance.heroImage}
                alt={governance.heroTitle}
                className='mb-6 h-[260px] w-full rounded-[16px] object-cover md:h-[360px]'
                loading='lazy'
              />
            ) : null}
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              {governance.structureTitle}
            </h2>
            <div className='mt-6 space-y-3 text-[16px] leading-[1.55] text-[#1d2431] md:text-[17px]'>
              <p>{governance.structureIntro}</p>
              {governance.structureBlocks.map((block, index) => (
                <div key={`${block?.title ?? 'block'}-${index}`}>
                  <h3 className='font-bold text-[#111318]'>{block?.title ?? ''}</h3>
                  <p>{block?.body ?? ''}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              {governance.documentsTitle}
            </h2>
            <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
              {governance.documents.map((document, index) => (
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

          <div className='mt-14'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              {governance.reportsTitle}
            </h2>
            <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
              {governance.reports.map((report, index) => (
                <DownloadCard
                  key={`${report?.title ?? 'report'}-${index}`}
                  title={report.title}
                  size={report.size}
                  accent='#2d4f9f'
                  fileUrl={report.fileUrl}
                  ctaLabel={downloadLabel}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1040px]'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              {governance.financialTitle}
            </h2>
            <p className='mt-6 text-[16px] leading-[1.6] text-[#516075] md:text-[17px]'>
              {governance.financialDescription}
            </p>

            <div className='mt-8 rounded-[14px] border border-[#cfe0ff] bg-[#ebf3ff] px-6 py-6'>
              <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                {governance.taxTitle}
              </h3>
              <p className='mt-4 text-[16px] leading-[1.6] text-[#516075] md:text-[17px]'>
                {governance.taxDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default GovernancePage
