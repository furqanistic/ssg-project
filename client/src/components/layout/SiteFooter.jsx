import React, { useMemo } from 'react'
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const quickLinkPaths = [
  '/about-us/history',
  '/visitors/guide#visitor-guide',
  '/events/programs#all',
  '/youth-education#gurmukhi-class',
  '/media#photo-gallery',
  '/contact#contact-form',
]

const socialLinks = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'Youtube' },
]

const SiteFooter = () => {
  const { t } = useTranslation()

  const quickLinks = useMemo(() => {
    const labels = t('footer.quickLinksItems', { returnObjects: true })
    return labels.map((label, index) => ({ label, to: quickLinkPaths[index] }))
  }, [t])

  return (
    <footer className='bg-[#17243b] px-4 pb-8 pt-14 text-white md:px-6 md:pt-16'>
      <div className='mx-auto max-w-[1280px]'>
        <div className='grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:text-left xl:grid-cols-4 xl:gap-12'>
          <div className='flex flex-col items-center md:items-start'>
            <div className='flex items-start gap-3'>
              <div className='flex h-14 w-14 items-center justify-center rounded-[12px] bg-[#f6ab3c] text-[16px] font-extrabold text-white'>
                SSG
              </div>
              <div>
                <h3 className='text-[18px] font-bold leading-tight'>
                  {t('navbar.brand.name')}
                </h3>
                <p className='mt-1 text-[16px] text-white/90'>{t('navbar.brand.location')}</p>
              </div>
            </div>
            <p className='mt-7 max-w-[28ch] text-[15px] leading-[1.6] text-white/88 md:text-[16px]'>
              {t('footer.description')}
            </p>
          </div>

          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-[18px] font-bold'>{t('footer.quickLinks')}</h3>
            <div className='mt-7 space-y-3'>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className='block text-[15px] text-white/88 transition hover:text-white md:text-[16px]'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-[18px] font-bold'>{t('footer.contactInfo')}</h3>
            <div className='mt-7 space-y-5 text-[15px] text-white/88 md:text-[16px]'>
              <div className='flex items-start justify-center gap-3 text-center md:justify-start md:text-left'>
                <MapPin className='mt-0.5 h-5 w-5 shrink-0 text-[#f6ab3c]' />
                <p className='leading-[1.5]'>
                  Sikh Tempel Berlin
                  <br />
                  WollankstraBe 8
                  <br />
                  13187 Berlin
                </p>
              </div>
              <div className='flex items-center justify-center gap-3 md:justify-start'>
                <Phone className='h-5 w-5 shrink-0 text-[#f6ab3c]' />
                <a
                  href='tel:+493047375651'
                  className='transition hover:text-white'
                >
                  +49 30 47375651
                </a>
              </div>
              <div className='flex items-center justify-center gap-3 md:justify-start'>
                <Mail className='h-5 w-5 shrink-0 text-[#f6ab3c]' />
                <a
                  href='mailto:info@ssgberlin.de'
                  className='transition hover:text-white'
                >
                  info@ssgberlin.de
                </a>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-[18px] font-bold'>{t('footer.connect')}</h3>
            <div className='mt-7 flex justify-center gap-4 md:justify-start'>
              {socialLinks.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href='#'
                  aria-label={label}
                  className='flex h-12 w-12 items-center justify-center rounded-[12px] bg-white/10 text-white/90 transition hover:bg-white/16 hover:text-white'
                >
                  <Icon className='h-5 w-5' />
                </a>
              ))}
            </div>

            <Link
              to='/donate'
              className='mt-8 inline-flex h-12 items-center justify-center rounded-[12px] bg-[#f6ab3c] px-8 text-[15px] font-semibold text-white transition hover:bg-[#f0a12c] md:text-[16px]'
            >
              {t('footer.supportMission')}
            </Link>
          </div>
        </div>

        <div className='mt-12 border-t border-white/10 pt-7'>
          <div className='flex flex-col items-center gap-4 text-center text-[14px] text-white/88 md:flex-row md:items-center md:justify-between md:text-[15px] md:text-left'>
            <p>{t('footer.copyright')}</p>
            <div className='flex flex-wrap justify-center gap-6 md:justify-start md:gap-8'>
              <a href='#' className='transition hover:text-white'>
                {t('footer.impressum')}
              </a>
              <a href='#' className='transition hover:text-white'>
                {t('footer.privacy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
