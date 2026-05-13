import React, { useMemo, useState } from 'react'
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Copy,
  HandHeart,
  Heart,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SiteFooter from '@/components/layout/SiteFooter'
import { useSiteContentQuery } from '@/hooks/useContent'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const DonatePage = () => {
  const { t } = useTranslation()
  const { data: content } = useSiteContentQuery()
  const [copiedField, setCopiedField] = useState('')

  const impactItems = t('donate.impactItems', { returnObjects: true }).map(
    (item, index) => ({
      ...item,
      icon: [Users, Building2, Heart, HandHeart][index],
      iconBg: index % 2 === 0 ? '#f6ab3c' : '#2d4f9f',
    }),
  )

  const donateDetails = useMemo(() => {
    const donate = content?.donate ?? {}
    return {
      bankName: donate.bankName || '',
      accountHolder: donate.accountHolder || '',
      iban: donate.iban || '',
      bic: donate.bic || '',
      officeHours: donate.officeHours || '',
      inPersonDescription: donate.inPersonDescription || '',
    }
  }, [content?.donate])
  const donationsOpen = useMemo(() => {
    const donate = content?.donate ?? {}

    if (typeof donate.isOpen === 'boolean') {
      return donate.isOpen
    }

    return Boolean(
      donate.bankName?.trim() &&
      donate.accountHolder?.trim() &&
      donate.iban?.trim() &&
      donate.bic?.trim(),
    )
  }, [content?.donate])

  const handleCopy = async (value, key) => {
    if (!value) return

    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(key)
      window.setTimeout(() => setCopiedField(''), 1600)
    } catch {
      // No-op if clipboard access is blocked by the browser.
    }
  }

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='relative isolate overflow-hidden bg-[#071544] pb-10 pt-[136px] md:pb-20 md:pt-[140px]'>
          <div
            className='absolute inset-0 z-0 opacity-[0.05]'
            style={{
              backgroundImage:
                'linear-gradient(#fff 0.5px, transparent 0.5px), linear-gradient(90deg, #fff 0.5px, transparent 0.5px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className='container relative z-10 mx-auto px-5'>
            <div className='mx-auto max-w-4xl text-center text-white'>
              <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#f6ab3c]/80'>
                <span className='h-1.5 w-1.5 rounded-full bg-[#f6ab3c]/60' />
                Community Donation Support
              </div>
              <h1 className='text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'>
                {t('donate.heading')}
              </h1>
              <p className='mx-auto mt-4 max-w-2xl text-balance text-[15px] font-light leading-relaxed text-white/70 md:mt-6 md:text-lg'>
                {t('donate.subtitle')}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='relative z-20 -mt-6 bg-[#f7f8fb] px-4 pb-16 pt-0 md:-mt-8 md:px-6 md:pb-20'>
        <div className='mx-auto max-w-[1200px]'>
          <div className='rounded-2xl border border-[#071544]/[0.08] bg-white p-5 shadow-[0_24px_48px_-12px_rgba(7,21,68,0.02)] sm:p-6 md:rounded-3xl md:p-10'>
            <div className='text-center'>
              <span className='inline-flex items-center rounded-full border border-[#2d4f9f]/15 bg-[#2d4f9f]/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2d4f9f]'>
                Donation Methods
              </span>
              <h2 className='mt-4 text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[40px]'>
                {t('donate.makeDonation')}
              </h2>
              <p className='mx-auto mt-3 max-w-[760px] text-[16px] text-[#5a6880] md:text-[17px]'>
                {donationsOpen
                  ? 'Use the details below for direct transfer or in-person contribution.'
                  : 'Donations are currently closed. Details will be available soon.'}
              </p>
            </div>

          {!donationsOpen ? (
            <article className='mx-auto mt-10 max-w-[900px] rounded-[20px] border border-[#f3c77c] bg-[#fff8ec] p-6 md:p-8'>
              <div className='flex items-start gap-3'>
                <AlertCircle className='mt-0.5 h-6 w-6 shrink-0 text-[#b97100]' />
                <div>
                  <h3 className='text-[22px] font-bold text-[#7a4c00]'>Donations Temporarily Closed</h3>
                  <p className='mt-2 text-[16px] leading-[1.6] text-[#8a5a0a]'>
                    We are updating our donation process. Bank transfer and in-person donation details will be available soon.
                  </p>
                </div>
              </div>
            </article>
          ) : null}

          {donationsOpen ? (
            <div className='mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <article className='rounded-[20px] border border-[#dbe1ea] bg-gradient-to-br from-white to-[#f9fbff] p-6 shadow-[0_24px_50px_-18px_rgba(13,23,45,0.12)] md:p-7'>
                <h3 className='text-[22px] font-bold text-[#111318]'>{t('donate.bankTransfer')}</h3>
                <p className='mt-2 text-[14px] text-[#65748b]'>Fastest way to support the Gurudwara directly.</p>

                <div className='mt-6 space-y-3'>
                  {[
                    { label: t('donate.bank'), value: donateDetails.bankName, key: 'bank' },
                    { label: t('donate.accountHolder'), value: donateDetails.accountHolder, key: 'holder' },
                    { label: t('donate.iban'), value: donateDetails.iban, key: 'iban' },
                    { label: t('donate.bic'), value: donateDetails.bic, key: 'bic' },
                  ].map((row) => (
                    <div
                      key={row.key}
                      className='flex items-center justify-between gap-3 rounded-[12px] border border-[#dbe4f1] bg-white px-4 py-3'
                    >
                      <div className='min-w-0'>
                        <p className='text-[11px] font-bold uppercase tracking-wide text-[#64748b]'>{row.label}</p>
                        <p className='truncate text-[14px] font-semibold text-[#1f2937]'>{row.value}</p>
                      </div>
                      <button
                        type='button'
                        onClick={() => handleCopy(row.value, row.key)}
                        className='inline-flex h-8 items-center gap-1.5 rounded-[9px] border border-[#cfd8e6] bg-[#f7f9ff] px-3 text-[12px] font-semibold text-[#2a4f9f] transition hover:bg-[#eef3ff]'
                      >
                        <Copy className='h-3.5 w-3.5' />
                        {copiedField === row.key ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type='button'
                  onClick={() =>
                    handleCopy(
                      `Bank: ${donateDetails.bankName}\nAccount Holder: ${donateDetails.accountHolder}\nIBAN: ${donateDetails.iban}\nBIC: ${donateDetails.bic}`,
                      'all-bank',
                    )
                  }
                  className='mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-[10px] bg-[#2d4f9f] px-5 text-[13px] font-semibold text-white transition hover:bg-[#24438d]'
                >
                  <Copy className='h-4 w-4' />
                  {copiedField === 'all-bank' ? 'All Details Copied' : 'Copy All Bank Details'}
                </button>
              </article>

              <article className='rounded-[20px] border border-[#dbe1ea] bg-gradient-to-br from-white to-[#f9fbff] p-6 shadow-[0_24px_50px_-18px_rgba(13,23,45,0.12)] md:p-7'>
                <h3 className='text-[22px] font-bold text-[#111318]'>{t('donate.inPerson')}</h3>
                <p className='mt-2 text-[14px] text-[#65748b]'>
                  {donateDetails.inPersonDescription}
                </p>
                <div className='mt-6 rounded-[14px] border border-[#d9e3f3] bg-[#eff5ff] p-4'>
                  <p className='text-[11px] font-bold uppercase tracking-wide text-[#476197]'>Office Hours</p>
                  <p className='mt-1 text-[15px] font-semibold text-[#183464]'>{donateDetails.officeHours}</p>
                </div>
                <button
                  type='button'
                  onClick={() =>
                    handleCopy(
                      `${donateDetails.inPersonDescription}\nOffice Hours: ${donateDetails.officeHours}`,
                      'in-person',
                    )
                  }
                  className='mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-[10px] border border-[#cfd8e6] bg-white px-5 text-[13px] font-semibold text-[#2a4f9f] transition hover:bg-[#f2f6ff]'
                >
                  <Copy className='h-4 w-4' />
                  {copiedField === 'in-person' ? 'Copied' : 'Copy In-Person Details'}
                </button>
              </article>
            </div>
          ) : null}
          </div>
        </div>
      </section>

      <section className='bg-white px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[860px] rounded-[20px] border border-[#bfd6fb] bg-gradient-to-br from-[#eef6ff] to-[#f7fbff] px-6 py-8 shadow-[0_20px_50px_-24px_rgba(45,87,168,0.45)] md:px-8'>
            <div className='flex items-start gap-4'>
              <CheckCircle2 className='mt-0.5 h-8 w-8 shrink-0 text-[#2d57a8]' />
              <div>
                <h2 className='text-[18px] font-extrabold text-[#111318] md:text-[19px]'>
                  {t('donate.taxTitle')}
                </h2>
                <p className='mt-4 text-[16px] leading-[1.6] text-[#516075]'>
                  {t('donate.taxParagraph1')}
                </p>
                <p className='mt-4 text-[16px] leading-[1.6] text-[#516075]'>
                  {t('donate.taxParagraph2')}
                </p>
              </div>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <span className='inline-flex items-center rounded-full border border-[#f6ab3c]/30 bg-[#fff7ea] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d18b26]'>
              Flexible Options
            </span>
            <h2 className='text-[36px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[40px]'>
              {t('donate.otherWays')}
            </h2>
          </div>

          {donationsOpen ? (
            <div className='mx-auto mt-10 grid max-w-[1120px] grid-cols-1 gap-6 lg:grid-cols-3'>
            <article className='rounded-[20px] border border-[#dbe1ea] bg-gradient-to-br from-white to-[#f9fbff] px-6 py-7 shadow-[0_24px_50px_-22px_rgba(13,23,45,0.16)]'>
              <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                {t('donate.bankTransfer')}
              </h3>
              <div className='mt-5 space-y-3 text-[16px] leading-[1.55] text-[#516075]'>
                <p>
                  <span className='font-semibold text-[#425168]'>{t('donate.bank')}:</span>{' '}
                  {donateDetails.bankName}
                </p>
                <p>
                  <span className='font-semibold text-[#425168]'>
                    {t('donate.accountHolder')}:
                  </span>{' '}
                  {donateDetails.accountHolder}
                </p>
                <p>
                  <span className='font-semibold text-[#425168]'>{t('donate.iban')}:</span>{' '}
                  {donateDetails.iban}
                </p>
                <p>
                  <span className='font-semibold text-[#425168]'>{t('donate.bic')}:</span>{' '}
                  {donateDetails.bic}
                </p>
              </div>
            </article>

            <article className='rounded-[20px] border border-[#dbe1ea] bg-gradient-to-br from-white to-[#f9fbff] px-6 py-7 shadow-[0_24px_50px_-22px_rgba(13,23,45,0.16)]'>
              <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                {t('donate.inPerson')}
              </h3>
              <p className='mt-5 text-[16px] leading-[1.6] text-[#516075]'>
                {donateDetails.inPersonDescription}
              </p>
              <p className='mt-5 text-[16px] text-[#516075]'>
                {donateDetails.officeHours}
              </p>
            </article>

            <article className='rounded-[20px] border border-[#dbe1ea] bg-gradient-to-br from-white to-[#f9fbff] px-6 py-7 shadow-[0_24px_50px_-22px_rgba(13,23,45,0.16)]'>
              <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                {t('donate.monthlyDonor')}
              </h3>
              <p className='mt-5 text-[16px] leading-[1.6] text-[#516075]'>
                {t('donate.monthlyDonorDesc')}
              </p>
              <button
                type='button'
                className='mt-6 inline-flex h-10 w-full items-center justify-center rounded-[12px] border border-[#f6ab3c] bg-white px-6 text-[15px] font-semibold text-[#f39d2f] transition hover:bg-[#fff7eb]'
              >
                {t('common.actions.learnMoreButton')}
              </button>
            </article>
            </div>
          ) : (
            <div className='mx-auto mt-10 max-w-[900px] rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-8 text-center shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
              <p className='text-[17px] font-semibold text-[#2f3b4e]'>
                Donation options are temporarily unavailable.
              </p>
              <p className='mt-2 text-[15px] text-[#66758a]'>
                Please check back soon for updated donation details.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className='bg-white px-4 pb-16 md:px-6 md:pb-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='text-center'>
            <span className='inline-flex items-center rounded-full border border-[#2d4f9f]/15 bg-[#2d4f9f]/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2d4f9f]'>
              Community Impact
            </span>
            <h2 className='text-[36px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[40px]'>
              {t('donate.impactTitle')}
            </h2>
          </div>

          <div className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
            {impactItems.map((item) => {
              const ImpactIcon = item.icon

              return (
                <article
                  key={item.title}
                  className='rounded-[20px] border border-[#dbe1ea] bg-gradient-to-br from-white to-[#f9fbff] px-6 py-8 text-center shadow-[0_24px_50px_-22px_rgba(13,23,45,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_55px_-20px_rgba(13,23,45,0.2)]'
                >
                  <div
                    className='mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white'
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <ImpactIcon className='h-7 w-7 stroke-[2]' />
                  </div>
                  <h3 className='mt-6 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                    {item.title}
                  </h3>
                  <p className='mt-4 text-[16px] leading-[1.45] text-[#516075]'>
                    {item.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className='relative overflow-hidden bg-[#fafafa] px-4 pb-12 text-white sm:px-5 md:px-6 md:pb-16'>
        <div className='relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] bg-[#071544] px-6 py-20 text-center lg:px-10 lg:py-28'>
          <div className='absolute inset-0 bg-[linear-gradient(135deg,#071544_0%,#071544_48%,#071936_100%)]' />
          <div
            className='absolute inset-0 opacity-[0.08]'
            style={{
              backgroundImage: 'radial-gradient(#f6ab3c 0.5px, transparent 0.5px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className='relative z-10 mx-auto max-w-[860px] text-center'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5'>
              <Heart className='h-8 w-8 stroke-[2] text-[#f6ab3c]' />
            </div>
            <span className='mt-6 inline-block text-[11px] font-bold uppercase tracking-[0.4em] text-[#f6ab3c]'>
              Donation Support
            </span>
            <h2 className='mt-4 text-balance text-[28px] font-extrabold tracking-normal md:mt-6 md:text-[46px]'>
              {t('donate.thankYouTitle')}
            </h2>
            <div className='mx-auto mt-6 h-[1px] w-16 bg-[#f6ab3c]/30' />
            <p className='mx-auto mt-5 text-pretty text-[15px] leading-[1.7] text-white/75 sm:text-[17px] md:mt-8 md:text-[20px]'>
              {t('donate.thankYouDesc')}
            </p>
            <Link
              to='/contact#contact-form'
              className='group mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-[#f6ab3c] bg-[#f6ab3c] px-7 py-3 text-[14px] font-bold text-[#071544] transition-all hover:bg-transparent hover:text-[#f6ab3c] sm:px-10 sm:text-[16px] md:mt-12'
            >
              {t('common.actions.learnMoreButton')}
              <div className='h-[1px] w-5 bg-[#071544] transition-all duration-500 group-hover:w-8 group-hover:bg-[#f6ab3c] sm:w-6 sm:group-hover:w-10' />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default DonatePage
