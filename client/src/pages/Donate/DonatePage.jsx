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
        <section className='bg-[#3567c4] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[1040px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                {t('donate.heading')}
              </h1>
              <p className='mt-3 max-w-[860px] text-[17px] text-white/90 md:text-[18px]'>
                {t('donate.subtitle')}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='bg-[#f7f8fb] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1100px]'>
          <div className='text-center'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[40px]'>
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
              <article className='rounded-[20px] border border-[#dbe1ea] bg-white p-6 shadow-[0_2px_8px_rgba(13,23,45,0.04)] md:p-7'>
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
                    className='flex items-center justify-between gap-3 rounded-[12px] border border-[#e4e9f1] bg-[#f9fbff] px-4 py-3'
                  >
                    <div className='min-w-0'>
                      <p className='text-[11px] font-bold uppercase tracking-wide text-[#64748b]'>{row.label}</p>
                      <p className='truncate text-[14px] font-semibold text-[#1f2937]'>{row.value}</p>
                    </div>
                    <button
                      type='button'
                      onClick={() => handleCopy(row.value, row.key)}
                      className='inline-flex h-8 items-center gap-1.5 rounded-[9px] border border-[#cfd8e6] bg-white px-3 text-[12px] font-semibold text-[#2a4f9f] transition hover:bg-[#f2f6ff]'
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

              <article className='rounded-[20px] border border-[#dbe1ea] bg-white p-6 shadow-[0_2px_8px_rgba(13,23,45,0.04)] md:p-7'>
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
      </section>

      <section className='bg-white px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[860px] rounded-[18px] border border-[#bfd6fb] bg-[#eef6ff] px-6 py-8 md:px-8'>
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
            <h2 className='text-[36px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[40px]'>
              {t('donate.otherWays')}
            </h2>
          </div>

          {donationsOpen ? (
            <div className='mx-auto mt-10 grid max-w-[1120px] grid-cols-1 gap-6 lg:grid-cols-3'>
            <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
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

            <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
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

            <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
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
            <h2 className='text-[36px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[40px]'>
              {t('donate.impactTitle')}
            </h2>
          </div>

          <div className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
            {impactItems.map(({ title, description, icon: Icon, iconBg }) => (
              <article
                key={title}
                className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-8 text-center shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
              >
                <div
                  className='mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white'
                  style={{ backgroundColor: iconBg }}
                >
                  <Icon className='h-7 w-7 stroke-[2]' />
                </div>
                <h3 className='mt-6 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                  {title}
                </h3>
                <p className='mt-4 text-[16px] leading-[1.45] text-[#516075]'>
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-[#3567c4] px-4 py-18 text-white md:px-6 md:py-20'>
        <div className='mx-auto max-w-[1280px] text-center'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/8'>
            <Heart className='h-8 w-8 stroke-[2]' />
          </div>
          <h2 className='mt-6 text-[36px] font-extrabold tracking-[-0.03em] md:text-[40px]'>
            {t('donate.thankYouTitle')}
          </h2>
          <p className='mx-auto mt-5 max-w-[860px] text-[17px] leading-[1.6] text-white/92 md:text-[18px]'>
            {t('donate.thankYouDesc')}
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default DonatePage
