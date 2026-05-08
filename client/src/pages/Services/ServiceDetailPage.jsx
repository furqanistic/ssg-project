import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import SiteFooter from '@/components/layout/SiteFooter'
import { useSiteContentQuery } from '@/hooks/useContent'

const readLocalizedValue = (value, language = 'en', fallback = '') => {
  if (typeof value === 'string') return value.trim() || fallback
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] || value.en || fallback
  }
  return fallback
}

const normalizeServiceImages = (value) => {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean)
    .slice(0, 8)
}

const ServiceDetailPage = () => {
  const location = useLocation()
  const { data: content } = useSiteContentQuery()
  const { i18n } = useTranslation()
  const language = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]
  const servicePath = location.pathname.replace(/\/+$/, '')

  const service = useMemo(() => {
    const links = content?.services?.youthEducation?.navbar?.additionalLinks
    if (!Array.isArray(links)) return null
    return links.find((link) => {
      const linkPath = readLocalizedValue(link?.to, language)
      return linkPath.replace(/\/+$/, '') === servicePath
    }) ?? null
  }, [content?.services?.youthEducation?.navbar?.additionalLinks, servicePath])

  const title = readLocalizedValue(service?.pageTitle, language, readLocalizedValue(service?.label, language))
  const subtitle = readLocalizedValue(service?.pageSubtitle, language)
  const body = readLocalizedValue(service?.pageContent, language)
  const serviceImages = normalizeServiceImages(service?.pageImages)
  const imageGridClass =
    serviceImages.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='bg-[#3567c4] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[980px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                {title || 'Service'}
              </h1>
              {subtitle ? (
                <p className='mt-3 max-w-[880px] text-[17px] text-white/90 md:text-[18px]'>
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      <section className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[980px] rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(13,23,45,0.02)] md:px-8 md:py-8'>
          {service ? (
            <>
              <h2 className='text-[28px] font-extrabold tracking-[-0.02em] text-[#111318] md:text-[32px]'>
                {title}
              </h2>
              {body ? (
                <div className='mt-4 space-y-4 text-[16px] leading-[1.65] text-[#516075] md:text-[17px]'>
                  {body.split('\n').filter(Boolean).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className='mt-4 text-[16px] leading-[1.65] text-[#516075] md:text-[17px]'>
                  Content for this service has not been added yet.
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className='text-[28px] font-extrabold tracking-[-0.02em] text-[#111318] md:text-[32px]'>
                Service Not Found
              </h2>
              <p className='mt-4 text-[16px] leading-[1.65] text-[#516075] md:text-[17px]'>
                This service link is not configured in the dashboard yet.
              </p>
              <Link
                to='/'
                className='mt-6 inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2d4f9f] px-6 text-[15px] font-semibold text-white transition hover:bg-[#26458f]'
              >
                Back to Home
              </Link>
            </>
          )}
        </div>

        {service && serviceImages.length > 0 ? (
          <div className='mx-auto mt-12 w-full max-w-[96rem] md:mt-14'>
            <div className={`grid gap-5 md:gap-6 ${imageGridClass}`}>
              {serviceImages.map((imageUrl, index) => (
                <div
                  key={`${imageUrl}-${index}`}
                  className='group relative aspect-video w-full overflow-hidden rounded-[16px] border border-[#dbe1ea] bg-[#f7f9fc] shadow-[0_10px_28px_rgba(13,23,45,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_36px_rgba(13,23,45,0.14)]'
                >
                  <img
                    src={imageUrl}
                    alt={`${title || 'Service'} image ${index + 1}`}
                    loading='lazy'
                    className='absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]'
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <SiteFooter />
    </div>
  )
}

export default ServiceDetailPage
