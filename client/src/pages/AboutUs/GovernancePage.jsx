import React from 'react'
import { Download, FileText } from 'lucide-react'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const governanceDocuments = [
  {
    title: 'Constitution & Bylaws',
    size: '1.2 MB',
    accent: 'bg-[#f6ab3c]',
  },
  {
    title: 'Financial Transparency Guidelines',
    size: '850 KB',
    accent: 'bg-[#f6ab3c]',
  },
  {
    title: 'Code of Conduct',
    size: '650 KB',
    accent: 'bg-[#f6ab3c]',
  },
]

const annualReports = [
  {
    title: 'Annual Report 2025',
    size: '2.4 MB',
  },
  {
    title: 'Annual Report 2024',
    size: '2.1 MB',
  },
  {
    title: 'Annual Report 2023',
    size: '1.8 MB',
  },
]

const DownloadCard = ({ title, size, accent }) => {
  return (
    <article className='rounded-[16px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
      <div className='flex items-start gap-4'>
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] text-white ${accent}`}
        >
          <FileText className='h-5 w-5 stroke-[2]' />
        </div>
        <div className='min-w-0'>
          <h3 className='text-[18px] font-bold tracking-[-0.02em] text-[#111318]'>
            {title}
          </h3>
          <p className='mt-1 text-[15px] text-[#7a879b]'>{size}</p>
          <button
            type='button'
            className='mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-[#f39d2f] transition hover:text-[#ea951e]'
          >
            <Download className='h-4 w-4' />
            Download
          </button>
        </div>
      </div>
    </article>
  )
}

const GovernancePage = () => {
  return (
    <div className='min-h-screen bg-white font-["Manrope","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='bg-[#3567c4] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[1040px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                Governance & Reports
              </h1>
              <p className='mt-3 text-[17px] text-white/90 md:text-[18px]'>
                Transparency and accountability in our operations
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1040px]'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Governance Structure
            </h2>
            <div className='mt-6 space-y-3 text-[16px] leading-[1.55] text-[#1d2431] md:text-[17px]'>
              <p>
                Singh Sabha Gurudwara Berlin (e.V.) operates as a registered
                non-profit association (eingetragener Verein) under German law.
                Our governance structure ensures democratic decision-making and
                accountability to our community members.
              </p>
              <div>
                <h3 className='font-bold text-[#111318]'>General Assembly</h3>
                <p>
                  The highest decision-making body, consisting of all registered
                  members. The General Assembly elects the Management Committee
                  and makes decisions on major organizational matters.
                </p>
              </div>
              <div>
                <h3 className='font-bold text-[#111318]'>Management Committee</h3>
                <p>
                  Elected by the General Assembly, the Management Committee
                  oversees day-to-day operations, implements decisions, and
                  ensures compliance with our constitution and German law.
                </p>
              </div>
              <div>
                <h3 className='font-bold text-[#111318]'>Advisory Board</h3>
                <p>
                  Provides guidance on religious and cultural matters, ensuring
                  that our activities align with Sikh principles and traditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Governance Documents
            </h2>
            <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
              {governanceDocuments.map((document) => (
                <DownloadCard
                  key={document.title}
                  title={document.title}
                  size={document.size}
                  accent={document.accent}
                />
              ))}
            </div>
          </div>

          <div className='mt-14'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Annual Reports
            </h2>
            <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
              {annualReports.map((report) => (
                <DownloadCard
                  key={report.title}
                  title={report.title}
                  size={report.size}
                  accent='bg-[#2d4f9f]'
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
              Financial Transparency
            </h2>
            <p className='mt-6 text-[16px] leading-[1.6] text-[#516075] md:text-[17px]'>
              We are committed to complete transparency in our financial
              operations. All donations and expenses are recorded and audited
              annually. Our financial reports are available to all members and
              published in our annual reports.
            </p>

            <div className='mt-8 rounded-[14px] border border-[#cfe0ff] bg-[#ebf3ff] px-6 py-6'>
              <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                Tax Deductibility
              </h3>
              <p className='mt-4 text-[16px] leading-[1.6] text-[#516075] md:text-[17px]'>
                Singh Sabha Gurudwara Berlin (e.V.) is a registered charitable
                organization in Germany. Donations are tax-deductible. We
                provide donation receipts for tax purposes.
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
