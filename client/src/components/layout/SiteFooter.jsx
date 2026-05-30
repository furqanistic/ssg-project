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
import { SITE_LOCATION } from '@/config/siteLocation'

const quickLinkPaths = [
  '/about-us/history',
  '/visitors/guide#visitor-guide',
  '/events/programs#all',
  '/youth-education#gurmukhi-class',
  '/media#photo-gallery',
  '/contact#contact-form',
]

const socialLinks = [
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/singhsabhagurudwaraberlin/',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/ssgberlin_org/',
  },
  {
    icon: Youtube,
    label: 'Youtube',
    href: 'https://www.youtube.com/channel/UCs953CyNH7x8SfZ-a2jAv6A',
  },
]
const CONTACT_PHONE_DISPLAY = '+49 15567 277478'
const CONTACT_PHONE_E164 = '+4915567277478'
const CONTACT_WHATSAPP_URL = 'https://wa.me/4915567277478'
const CONTACT_ADDRESS = SITE_LOCATION.displayAddress

const SiteFooter = () => {
  const { t } = useTranslation()

  const quickLinks = useMemo(() => {
    const labels = t('footer.quickLinksItems', { returnObjects: true })
    return labels.map((label, index) => ({ label, to: quickLinkPaths[index] }))
  }, [t])

  return (
    <footer className='bg-[#071544] px-6 pb-6 pt-12 md:px-10 md:pt-16'>
      <div className='mx-auto max-w-[1400px]'>
        <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-2 md:text-left xl:grid-cols-4 xl:gap-10'>
          {/* Brand */}
          <div className='flex flex-col items-center md:items-start'>
            <div className='flex items-start gap-3'>
              <img
                src='/logo.png'
                alt={t('navbar.brand.name')}
                className='h-11 w-11 object-contain md:h-12 md:w-12'
              />
              <div>
                <h3 className='text-[15px] font-medium leading-tight text-white md:text-[16px]'>
                  {t('navbar.brand.name')}
                </h3>
                <p className='mt-0.5 text-[12px] font-medium text-white/50 md:text-[13px]'>
                  {t('navbar.brand.location')}
                </p>
              </div>
            </div>
            <p className='mt-4 max-w-[30ch] text-[14px] font-normal leading-[1.6] text-white/55'>
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-[10px] font-medium uppercase tracking-[0.22em] text-white/40'>
              {t('footer.quickLinks')}
            </h3>
            <div className='mt-5 space-y-2.5'>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className='block text-[14px] font-normal text-white/65 transition-colors duration-500 hover:text-white/90'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-[10px] font-medium uppercase tracking-[0.22em] text-white/40'>
              {t('footer.contactInfo')}
            </h3>
            <div className='mt-5 space-y-3.5 text-[14px] font-normal text-white/65'>
              <div className='flex items-start justify-center gap-3 text-center md:justify-start md:text-left'>
                <MapPin className='mt-0.5 h-4 w-4 shrink-0 text-[#f6ab3c]/60' />
                <p className='leading-[1.5]'>
                  {CONTACT_ADDRESS}
                </p>
              </div>
              <div className='flex items-center justify-center gap-3 md:justify-start'>
                <Phone className='h-4 w-4 shrink-0 text-[#f6ab3c]/60' />
                <span className='text-white/70'>{CONTACT_PHONE_DISPLAY}</span>
              </div>
              <div className='flex items-center justify-center gap-2.5 md:justify-start'>
                <a
                  href={`tel:${CONTACT_PHONE_E164}`}
                  className='inline-flex h-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-3.5 text-[11px] font-medium text-white/70 transition-all duration-500 hover:border-white/20 hover:text-white'
                >
                  Call
                </a>
                <a
                  href={CONTACT_WHATSAPP_URL}
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex h-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-3.5 text-[11px] font-medium text-white/70 transition-all duration-500 hover:border-white/20 hover:text-white'
                >
                  WhatsApp
                </a>
              </div>
              <div className='flex items-center justify-center gap-3 md:justify-start'>
                <Mail className='h-4 w-4 shrink-0 text-[#f6ab3c]/60' />
                <a
                  href='mailto:info@ssgberlin.de'
                  className='text-white/65 transition-colors duration-500 hover:text-white/90'
                >
                  info@ssgberlin.de
                </a>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-[10px] font-medium uppercase tracking-[0.22em] text-white/40'>
              {t('footer.connect')}
            </h3>
            <div className='mt-5 flex justify-center gap-3 md:justify-start'>
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={label}
                  className='flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-500 hover:border-[#f6ab3c]/30 hover:bg-[#f6ab3c]/8 hover:text-[#f6ab3c]'
                >
                  <Icon className='h-4 w-4' />
                </a>
              ))}
            </div>

            <Link
              to='/donate'
              className='mt-6 inline-flex h-[42px] items-center justify-center rounded-full bg-[#f09816] px-6 text-[13px] font-medium text-white transition-all duration-500 hover:bg-[#f1a52e]'
            >
              {t('footer.supportMission')}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='mt-10 border-t border-white/8 pt-6 md:pt-7'>
          <div className='flex flex-col items-center gap-3 text-center md:flex-row md:items-center md:justify-between'>
            <p className='text-[13px] font-normal text-white/45 md:text-[14px]'>
              {t('footer.copyright')}
            </p>
            <div className='flex flex-wrap justify-center gap-5 md:justify-start md:gap-6'>
              <a href='#' className='text-[13px] font-normal text-white/45 transition-colors duration-500 hover:text-white/80 md:text-[14px]'>
                {t('footer.impressum')}
              </a>
              <a href='#' className='text-[13px] font-normal text-white/45 transition-colors duration-500 hover:text-white/80 md:text-[14px]'>
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
