import React from 'react'
import { useTranslation } from 'react-i18next'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import SiteFooter from '@/components/layout/SiteFooter'

const LibraryPage = () => {
  const { t } = useTranslation()

  const collections = t('resourcesPage.library.collections', { returnObjects: true })

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='bg-[#3567c4] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[980px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                {t('resourcesPage.library.heading')}
              </h1>
              <p className='mt-3 max-w-[880px] text-[17px] text-white/90 md:text-[18px]'>
                {t('resourcesPage.library.subtitle')}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {collections.map((collection) => (
              <article
                key={collection.title}
                className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
              >
                <h2 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318] md:text-[21px]'>
                  {collection.title}
                </h2>
                <p className='mt-4 text-[15px] leading-[1.65] text-[#516075] md:text-[16px]'>
                  {collection.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default LibraryPage
