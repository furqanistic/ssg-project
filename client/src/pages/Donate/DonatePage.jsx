import React from 'react'
import {
  Building2,
  CheckCircle2,
  CircleDollarSign,
  HandHeart,
  Heart,
  Users,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const DonatePage = () => {
  const { t } = useTranslation()

  const impactItems = t('donate.impactItems', { returnObjects: true }).map(
    (item, index) => ({
      ...item,
      icon: [Users, Building2, Heart, HandHeart][index],
      iconBg: index % 2 === 0 ? '#f6ab3c' : '#2d4f9f',
    }),
  )

  const donationOptions = t('donate.donationOptions', { returnObjects: true })

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

      <section className='bg-white px-4 py-16 md:px-6 md:py-18'>
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

      <section className='bg-[#f7f8fb] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[740px] rounded-[22px] border border-[#dbe1ea] bg-white px-6 py-8 shadow-[0_1px_2px_rgba(13,23,45,0.02)] md:px-8 md:py-10'>
          <h2 className='text-center text-[36px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[40px]'>
            {t('donate.makeDonation')}
          </h2>

          <div className='mt-10'>
            <h3 className='text-[18px] font-semibold text-[#111318] md:text-[19px]'>
              {t('donate.donationType')}
            </h3>
            <div className='mt-5 space-y-6'>
              {donationOptions.map(([label, description], index) => (
                <label
                  key={label}
                  className='flex cursor-pointer items-center gap-4 rounded-[14px] border border-[#dbe1ea] px-4 py-4 text-[#111318]'
                >
                  <input
                    type='radio'
                    name='donationType'
                    defaultChecked={index === 0}
                    className='h-4 w-4 accent-[#111318]'
                  />
                  <span className='text-[17px] font-semibold'>{label}</span>
                  <span className='text-[16px] text-[#647184]'>{description}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='mt-10'>
            <h3 className='text-[18px] font-semibold text-[#111318] md:text-[19px]'>
              {t('donate.donationAmount')}
            </h3>
            <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3'>
              {['€25', '€50', '€100'].map((amount) => (
                <button
                  key={amount}
                  type='button'
                  className='inline-flex h-[62px] items-center justify-center rounded-[14px] border border-[#dbe1ea] bg-white text-[18px] font-semibold text-[#111318] transition hover:border-[#c3cedd]'
                >
                  {amount}
                </button>
              ))}
            </div>

            <div className='mt-4 flex items-center rounded-[14px] bg-[#f4f6fb] px-4'>
              <span className='mr-3 text-[22px] font-semibold text-[#93a0b5]'>
                €
              </span>
              <input
                type='number'
                placeholder={t('donate.customAmountPlaceholder')}
                className='h-[56px] w-full bg-transparent text-[16px] text-[#111318] outline-none placeholder:text-[#7f8ba0]'
              />
            </div>
          </div>

          <div className='mt-10'>
            <h3 className='text-[18px] font-semibold text-[#111318] md:text-[19px]'>
              {t('donate.donationFrequency')}
            </h3>
            <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {[
                [t('donate.oneTime'), true],
                [t('donate.monthly'), false],
              ].map(([label, checked]) => (
                <label
                  key={label}
                  className='flex cursor-pointer items-center gap-4 rounded-[14px] border border-[#dbe1ea] px-4 py-4 text-[#111318]'
                >
                  <input
                    type='radio'
                    name='donationFrequency'
                    defaultChecked={checked}
                    className='h-4 w-4 accent-[#111318]'
                  />
                  <span className='text-[17px] font-semibold'>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='mt-10'>
            <h3 className='text-[18px] font-semibold text-[#111318] md:text-[19px]'>
              {t('donate.yourInformation')}
            </h3>

            <form className='mt-5 space-y-5'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-2 block text-[15px] font-semibold text-[#111318]'>
                    {t('donate.firstName')}
                  </label>
                  <input
                    type='text'
                    className='h-12 w-full rounded-[10px] border border-[#e6e9ef] bg-[#f7f8fb] px-4 text-[15px] text-[#111318] outline-none transition focus:border-[#c9d2e4]'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-[15px] font-semibold text-[#111318]'>
                    {t('donate.lastName')}
                  </label>
                  <input
                    type='text'
                    className='h-12 w-full rounded-[10px] border border-[#e6e9ef] bg-[#f7f8fb] px-4 text-[15px] text-[#111318] outline-none transition focus:border-[#c9d2e4]'
                  />
                </div>
              </div>

              <div>
                <label className='mb-2 block text-[15px] font-semibold text-[#111318]'>
                  {t('donate.email')}
                </label>
                <input
                  type='email'
                  className='h-12 w-full rounded-[10px] border border-[#e6e9ef] bg-[#f7f8fb] px-4 text-[15px] text-[#111318] outline-none transition focus:border-[#c9d2e4]'
                />
              </div>

              <div>
                <label className='mb-2 block text-[15px] font-semibold text-[#111318]'>
                  {t('donate.phone')}
                </label>
                <input
                  type='text'
                  className='h-12 w-full rounded-[10px] border border-[#e6e9ef] bg-[#f7f8fb] px-4 text-[15px] text-[#111318] outline-none transition focus:border-[#c9d2e4]'
                />
              </div>

              <button
                type='button'
                className='inline-flex h-12 w-full items-center justify-center gap-3 rounded-[12px] bg-[#f6ab3c] px-8 text-[15px] font-semibold text-white transition hover:bg-[#f0a12c] md:text-[16px]'
              >
                <CircleDollarSign className='h-5 w-5' />
                {t('common.actions.completeDonation')}
              </button>
            </form>
          </div>

          <p className='mt-9 text-center text-[15px] text-[#66758a] md:text-[16px]'>
            {t('donate.secureText')}
          </p>
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

          <div className='mx-auto mt-10 grid max-w-[1120px] grid-cols-1 gap-6 lg:grid-cols-3'>
            <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
              <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                {t('donate.bankTransfer')}
              </h3>
              <div className='mt-5 space-y-3 text-[16px] leading-[1.55] text-[#516075]'>
                <p>
                  <span className='font-semibold text-[#425168]'>{t('donate.bank')}:</span>{' '}
                  Example Bank
                </p>
                <p>
                  <span className='font-semibold text-[#425168]'>
                    {t('donate.accountHolder')}:
                  </span>{' '}
                  Singh Sabha Gurudwara Berlin e.V.
                </p>
                <p>
                  <span className='font-semibold text-[#425168]'>{t('donate.iban')}:</span>{' '}
                  DE89 3704 0044 0532 0130 00
                </p>
                <p>
                  <span className='font-semibold text-[#425168]'>{t('donate.bic')}:</span>{' '}
                  COBADEFFXXX
                </p>
              </div>
            </article>

            <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
              <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                {t('donate.inPerson')}
              </h3>
              <p className='mt-5 text-[16px] leading-[1.6] text-[#516075]'>
                {t('donate.inPersonDesc')}
              </p>
              <p className='mt-5 text-[16px] text-[#516075]'>
                {t('donate.officeHours')}
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
