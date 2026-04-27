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
const CONTACT_ADDRESS = 'Alt Biesdorf 71, 12683, Berlin'

const SiteFooter = () => {
  const { t } = useTranslation()

  const quickLinks = useMemo(() => {
    const labels = t('footer.quickLinksItems', { returnObjects: true })
    return labels.map((label, index) => ({ label, to: quickLinkPaths[index] }))
  }, [t])

  return (
    <footer className='bg-[#101828] px-4 pb-6 pt-10 text-white md:px-6 md:pt-12'>
      <div className='mx-auto max-w-[1280px]'>
        <div className='grid grid-cols-1 gap-7 text-center md:grid-cols-2 md:text-left xl:grid-cols-4 xl:gap-8'>
          <div className='flex flex-col items-center md:items-start'>
            <div className='flex items-start gap-3'>
              <img
                src='/logo.png'
                alt={t('navbar.brand.name')}
                className='h-12 w-12 object-contain'
              />
              <div>
                <h3 className='text-[16px] font-bold leading-tight'>
                  {t('navbar.brand.name')}
                </h3>
                <p className='mt-0.5 text-[13px] text-white/85'>{t('navbar.brand.location')}</p>
              </div>
            </div>
            <p className='mt-5 max-w-[30ch] text-[14px] leading-[1.55] text-white/88'>
              {t('footer.description')}
            </p>
          </div>

          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-[16px] font-bold'>{t('footer.quickLinks')}</h3>
            <div className='mt-5 space-y-2'>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className='block text-[14px] text-white/88 transition hover:text-white'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-[16px] font-bold'>{t('footer.contactInfo')}</h3>
            <div className='mt-5 space-y-3.5 text-[14px] text-white/88'>
              <div className='flex items-start justify-center gap-3 text-center md:justify-start md:text-left'>
                <MapPin className='mt-0.5 h-4.5 w-4.5 shrink-0 text-[#f6ab3c]' />
                <p className='leading-[1.5]'>
                  {CONTACT_ADDRESS}
                </p>
              </div>
              <div className='flex items-center justify-center gap-3 md:justify-start'>
                <Phone className='h-4.5 w-4.5 shrink-0 text-[#f6ab3c]' />
                <span>{CONTACT_PHONE_DISPLAY}</span>
              </div>
              <div className='flex items-center justify-center gap-2 md:justify-start'>
                <a
                  href={`tel:${CONTACT_PHONE_E164}`}
                  className='inline-flex h-7.5 items-center justify-center rounded-[9px] border border-white/20 px-2.5 text-[11px] font-semibold text-white transition hover:bg-white/10'
                >
                  Call
                </a>
                <a
                  href={CONTACT_WHATSAPP_URL}
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex h-7.5 items-center justify-center rounded-[9px] border border-white/20 px-2.5 text-[11px] font-semibold text-white transition hover:bg-white/10'
                >
                  WhatsApp
                </a>
              </div>
              <div className='flex items-center justify-center gap-3 md:justify-start'>
                <Mail className='h-4.5 w-4.5 shrink-0 text-[#f6ab3c]' />
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
            <h3 className='text-[16px] font-bold'>{t('footer.connect')}</h3>
            <div className='mt-5 flex justify-center gap-3 md:justify-start'>
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={label}
                  className='flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 text-white/90 transition hover:bg-white/16 hover:text-white'
                >
                  <Icon className='h-4.5 w-4.5' />
                </a>
              ))}
            </div>

            <Link
              to='/donate'
              className='mt-6 inline-flex h-10 items-center justify-center rounded-[10px] bg-[#f6ab3c] px-6 text-[14px] font-semibold text-white transition hover:bg-[#f0a12c]'
            >
              {t('footer.supportMission')}
            </Link>
          </div>
        </div>

        <div className='mt-8 border-t border-white/10 pt-5'>
          <div className='flex flex-col items-center gap-3 text-center text-[13px] text-white/88 md:flex-row md:items-center md:justify-between md:text-[14px] md:text-left'>
            <p>{t('footer.copyright')}</p>
            <div className='flex flex-wrap justify-center gap-5 md:justify-start md:gap-6'>
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
