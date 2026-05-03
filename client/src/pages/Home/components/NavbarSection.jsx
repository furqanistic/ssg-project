import React, { useEffect, useMemo, useState } from 'react'
import { ChevronDown, MapPin, Menu, PhoneCall, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/authStore'
import { useSiteContentQuery } from '@/hooks/useContent'

const getDefaultAboutSections = (t) => [
  {
    heading: t('navbar.items.about.s1h'),
    links: [
      { label: t('navbar.items.about.history'), to: '/about-us/history' },
      { label: t('navbar.items.about.mission'), to: '/about-us/mission' },
    ],
  },
  {
    heading: t('navbar.items.about.s2h'),
    links: [
      { label: t('navbar.items.about.committee'), to: '/about-us/committee' },
      { label: t('navbar.items.about.governance'), to: '/about-us/governance' },
    ],
  },
]

const readLocalizedDisplayValue = (value, language = 'en', fallback = '') => {
  if (typeof value === 'string') {
    return value.trim() || fallback
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] || value.en || fallback
  }

  return fallback
}

const getConfiguredServiceLinks = (t, youthServices = {}, language = 'en') => {
  const configuredLinks = Array.isArray(youthServices.navbar?.additionalLinks)
    ? youthServices.navbar.additionalLinks
    : []

  const links = configuredLinks
    .map((link) => ({
      label: readLocalizedDisplayValue(link?.label, language),
      to: typeof link?.to === 'string' ? link.to.trim() : '',
    }))
    .filter((link) => link.label && link.to)

  if (links.length > 0) {
    return links
  }

  return [{ label: t('navbar.items.media.library'), to: '/resources/library' }]
}

const getNavItems = (t, youthServices = {}, language = 'en') => {
  const serviceLinks = [
    {
      label: readLocalizedDisplayValue(
        youthServices.navbar?.cremationFund,
        language,
        t('navbar.items.youth.cremationFund'),
      ),
      to: '/services/antim-sanskar-fund',
    },
    ...getConfiguredServiceLinks(t, youthServices, language),
  ]

  return [
    {
      label: t('navbar.items.about.label'),
      sections: getDefaultAboutSections(t),
      panelClassName: 'w-[560px] grid-cols-2',
    },
    {
      label: t('navbar.items.visitors.label'),
      sections: [
        {
          links: [
            { label: t('navbar.items.visitors.guide'), to: '/visitors/guide#visitor-guide' },
            { label: t('navbar.items.visitors.rules'), to: '/visitors/guide#rules-etiquette' },
            {
              label: t('navbar.items.visitors.timings'),
              to: '/visitors/guide#opening-timings',
            },
            {
              label: t('navbar.items.visitors.location'),
              to: '/visitors/guide#location-map',
            },
            { label: t('navbar.items.visitors.faq'), to: '/visitors/guide#faq' },
          ],
        },
      ],
      panelClassName: 'w-[280px] grid-cols-1',
    },
    {
      label: t('navbar.items.events.label'),
      sections: [
        {
          heading: t('navbar.items.events.s1h'),
          links: [
            { label: t('navbar.items.events.daily'), to: '/events/programs#daily' },
            { label: t('navbar.items.events.weekly'), to: '/events/programs#weekly' },
            { label: t('navbar.items.events.monthly'), to: '/events/programs#monthly' },
            { label: t('navbar.items.events.yearly'), to: '/events/programs#yearly' },
          ],
        },
        {
          heading: t('navbar.items.events.s2h'),
          links: [
            { label: t('navbar.items.events.upcoming'), to: '/events/programs#all' },
            { label: t('navbar.items.events.calendar'), to: '/events/programs#yearly' },
            { label: t('navbar.items.events.past'), to: '/events/programs#all' },
          ],
        },
      ],
      panelClassName: 'w-[560px] grid-cols-2',
    },
    {
      label: readLocalizedDisplayValue(youthServices.navbar?.label, language, t('navbar.items.youth.label')),
      sections: [
        {
          heading: readLocalizedDisplayValue(youthServices.navbar?.s1h, language, t('navbar.items.youth.s1h')),
          links: [
            {
              label: readLocalizedDisplayValue(
                youthServices.navbar?.gurmukhi,
                language,
                t('navbar.items.youth.gurmukhi'),
              ),
              to: '/youth-education#gurmukhi-class',
            },
            {
              label: readLocalizedDisplayValue(
                youthServices.navbar?.german,
                language,
                t('navbar.items.youth.german'),
              ),
              to: '/youth-education#german-class',
            },
          ],
        },
        {
          heading: readLocalizedDisplayValue(youthServices.navbar?.s2h, language, t('navbar.items.youth.s2h')),
          links: [
            {
              label: readLocalizedDisplayValue(
                youthServices.navbar?.camps,
                language,
                t('navbar.items.youth.camps'),
              ),
              to: '/youth-education#camps-workshops',
            },
            {
              label: readLocalizedDisplayValue(
                youthServices.navbar?.registration,
                language,
                t('navbar.items.youth.registration'),
              ),
              to: '/youth-education#registration',
            },
          ],
        },
        {
          heading: t('navbar.items.youth.label'),
          links: serviceLinks,
        },
      ],
      panelClassName: 'w-[720px] grid-cols-3',
    },
    {
      label: t('navbar.items.media.label'),
      sections: [
        {
          links: [
            { label: t('navbar.items.media.gallery'), to: '/media#photo-gallery' },
            { label: t('navbar.items.media.videos'), to: '/media#videos' },
            { label: t('navbar.items.media.live'), to: '/media#live-kirtan' },
            { label: t('navbar.items.media.library'), to: '/resources/library' },
          ],
        },
      ],
      panelClassName: 'w-[280px] grid-cols-1',
    },
    {
      label: t('navbar.items.contact.label'),
      sections: [
        {
          links: [
            { label: t('navbar.items.contact.volunteer'), to: '/contact#volunteer' },
            { label: t('navbar.items.contact.form'), to: '/contact#contact-form' },
          ],
        },
      ],
      panelClassName: 'w-[280px] grid-cols-1',
    },
  ]
}

const NavbarDropdown = ({ item, isOpen }) => {
  return (
    <div
      className={`absolute left-1/2 top-[calc(100%+8px)] z-30 -translate-x-1/2 transition-all duration-200 ease-out origin-top ${
        isOpen ? 'scale-100 opacity-100 visible translate-y-0' : 'scale-95 opacity-0 invisible -translate-y-2'
      }`}
    >
      <div
        className={`grid gap-x-8 gap-y-6 rounded-[14px] bg-white px-6 py-6 text-left shadow-[0_18px_40px_rgba(7,18,48,0.15)] ring-1 ring-black/5 ${item.panelClassName}`}
      >
        {item.sections.map((section, index) => (
          <div key={`${item.label}-${index}`} className='min-w-0'>
            {section.heading ? (
              <p className='mb-3 text-[13px] font-extrabold uppercase tracking-[0.05em] text-[#6b7485]'>
                {section.heading}
              </p>
            ) : null}
            <div className='flex flex-col gap-2.5'>
              {section.links.filter((link) => link.label).map((link) => {
                const Component = link.to ? Link : 'a'
                return (
                  <Component
                    key={`${link.label}-${link.to || link.href || ''}`}
                    to={link.to}
                    href={link.href}
                    className='group flex items-center text-[15px] font-medium text-[#1d2738] transition-colors hover:text-[#264fb2]'
                  >
                    {link.label}
                  </Component>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const WhatsAppIcon = ({ className = '' }) => (
  <svg viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden='true'>
    <path d='M12.04 2C6.62 2 2.2 6.34 2.2 11.68c0 1.88.55 3.7 1.58 5.27L2 22l5.25-1.72a9.97 9.97 0 0 0 4.79 1.22h.01c5.42 0 9.84-4.34 9.84-9.68C21.89 6.34 17.47 2 12.04 2Zm0 17.73h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.11 1.02 1.01-3.02-.2-.31a8 8 0 0 1-1.26-4.28c0-4.35 3.6-7.9 8.03-7.9 4.43 0 8.03 3.55 8.03 7.9 0 4.36-3.6 7.91-8.02 7.91Zm4.4-5.9c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.23-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.95-1.17-.72-.62-1.21-1.38-1.35-1.61-.14-.24-.01-.36.1-.47.1-.1.24-.27.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.27-.74-1.74-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.57 4.11 3.61.57.24 1.02.39 1.37.5.58.18 1.11.15 1.53.09.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z' />
  </svg>
)

const NavbarSection = () => {
  const [openItem, setOpenItem] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileOpenItem, setMobileOpenItem] = useState(null)
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const { i18n, t } = useTranslation()
  const isLoggedIn = useAuthStore((state) => Boolean(state.session?.accessToken))
  const { data: content } = useSiteContentQuery()
  const language = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]

  const navItems = useMemo(
    () => getNavItems(t, content?.services?.youthEducation ?? {}, language),
    [content?.services?.youthEducation, language, t],
  )
  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
        setMobileOpenItem(null)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header
      className='fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#1e3a8a] backdrop-blur-md'
      onMouseLeave={() => {
        setOpenItem(null)
        setIsContactPopupOpen(false)
      }}
    >
      <div className='bg-[#1e3a8a]'>
        <div className='mx-auto flex h-10 w-full items-center justify-start gap-3 overflow-x-auto px-3 text-[11px] font-medium tracking-wide text-white/90 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-end md:gap-4 md:px-4 md:text-[12px] lg:px-8'>
          <div className='relative'>
            <button
              type='button'
              onClick={() => setIsContactPopupOpen((prev) => !prev)}
              className='inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 font-semibold text-white transition hover:bg-white/15'
            >
              <PhoneCall className='h-3.5 w-3.5' />
              <span>+49 15567 277478</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isContactPopupOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`absolute left-1/2 top-[calc(100%+6px)] z-40 w-[170px] -translate-x-1/2 rounded-[12px] border border-white/20 bg-[#1e3a8a] p-2 shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-all md:left-0 md:translate-x-0 ${
                isContactPopupOpen ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
              }`}
            >
              <a
                href='tel:+4915567277478'
                className='flex items-center gap-2 rounded-[8px] px-2.5 py-2 text-left text-[12px] font-semibold text-white transition hover:bg-white/10'
              >
                <PhoneCall className='h-3.5 w-3.5 text-white/90' />
                Call
              </a>
              <a
                href='https://wa.me/4915567277478'
                target='_blank'
                rel='noreferrer'
                className='mt-1 flex items-center gap-2 rounded-[8px] px-2.5 py-2 text-left text-[12px] font-semibold text-white transition hover:bg-white/10'
              >
                <WhatsAppIcon className='h-3.5 w-3.5 text-white/90' />
                WhatsApp
              </a>
            </div>
          </div>
          <a
            href='https://maps.google.com/?q=Alt+Biesdorf+71,+12683+Berlin'
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-1.5 text-white/95 transition hover:text-white'
          >
            <MapPin className='h-3.5 w-3.5 text-white/90' />
            <span>Alt Biesdorf 71, 12683, Berlin</span>
          </a>
        </div>
      </div>
      <div className='mx-auto flex h-[72px] w-full items-center justify-between px-4 md:h-16 md:px-6 lg:px-8'>
        <Link to='/' className='flex items-center gap-3 md:gap-4'>
          <img
            src='/logo.png'
            alt={t('navbar.brand.name')}
            className='h-10 w-10 object-contain md:h-14 md:w-14'
          />
          <div className='flex max-w-[210px] flex-col justify-center md:max-w-none'>
            <span className='text-[13px] font-bold leading-tight tracking-tight text-white sm:text-[14px] md:text-[18px]'>
              {t('navbar.brand.name')}
            </span>
            <span className='text-[11px] font-medium text-white/60 sm:text-[12px] md:text-[13px]'>
              {t('navbar.brand.location')}
            </span>
          </div>
        </Link>

        <button
          type='button'
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden'
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
        </button>

        <nav className='hidden items-center gap-1 md:flex'>
          {navItems.map((item) => {
            const isOpen = openItem === item.label

            return (
              <div
                key={item.label}
                className='relative'
                onMouseEnter={() => setOpenItem(item.label)}
              >
                <button
                  className='flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium text-white transition-colors duration-200'
                  type='button'
                  onClick={() => setOpenItem(isOpen ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : 'text-white'
                    }`}
                  />
                </button>
                <NavbarDropdown item={item} isOpen={isOpen} />
              </div>
            )
          })}
        </nav>

        <div className='hidden items-center gap-4 lg:flex'>
          <div className='flex items-center rounded-full border border-white/50 bg-white/15 p-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.2)]'>
            {['en', 'de'].map((lang) => (
              <button
                key={lang}
                type='button'
                onClick={() => i18n.changeLanguage(lang)}
                className={`flex h-8 items-center justify-center rounded-full px-4 text-[12px] font-extrabold uppercase tracking-wider transition-all duration-200 ${
                  i18n.language === lang
                    ? 'bg-white text-[#1e3a8a] shadow-sm'
                    : 'text-white/90 hover:bg-white/20'
                }`}
                aria-label={t(`common.language.${lang === 'en' ? 'english' : 'german'}`)}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className='h-4 w-[1px] bg-white/10' />

          <Link
            to={isLoggedIn ? '/dashboard' : '/auth'}
            className='text-[13px] font-semibold text-white/70 transition-colors hover:text-white'
          >
            {isLoggedIn ? t('common.actions.dashboard') : t('common.actions.login')}
          </Link>
          <Link
            to='/donate'
            className='relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full bg-white px-5 text-[13px] font-semibold text-black transition-all hover:scale-105 active:scale-95'
          >
            {t('common.actions.donate')}
          </Link>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 top-full border-t border-white/10 bg-[#1e3a8a] px-4 pb-4 pt-3 shadow-[0_18px_35px_rgba(8,19,51,0.35)] backdrop-blur-xl md:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <nav className='flex max-h-[calc(100dvh-132px)] flex-col overflow-y-auto pb-2'>
          {navItems.map((item) => {
            const isItemOpen = mobileOpenItem === item.label

            return (
              <div key={`mobile-${item.label}`} className='border-b border-white/10 py-1.5'>
                <button
                  type='button'
                  onClick={() => setMobileOpenItem(isItemOpen ? null : item.label)}
                  className='flex w-full items-center justify-between py-2 text-left text-[15px] font-semibold text-white'
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-white/70 transition-transform duration-200 ${
                      isItemOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isItemOpen ? (
                  <div className='mt-1 flex flex-col gap-4 rounded-[10px] bg-white/5 px-2 pb-3 pt-2'>
                    {item.sections.map((section, sectionIndex) => (
                      <div key={`mobile-section-${item.label}-${sectionIndex}`}>
                        {section.heading ? (
                          <p className='mb-2 text-[11px] font-bold uppercase tracking-[0.06em] text-white/50'>
                            {section.heading}
                          </p>
                        ) : null}
                        <div className='flex flex-col gap-2'>
                          {section.links.filter((link) => link.label).map((link) => {
                            const Component = link.to ? Link : 'a'
                            return (
                              <Component
                                key={`mobile-link-${item.label}-${link.label}`}
                                to={link.to}
                                href={link.href}
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  setMobileOpenItem(null)
                                }}
                                className='rounded-md px-1 py-1 text-[14px] font-medium text-white/95 transition-colors hover:bg-white/10'
                              >
                                {link.label}
                              </Component>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </nav>

        <div className='mt-4 flex items-center justify-between gap-2.5 rounded-[14px] border border-white/15 bg-white/10 p-2.5'>
          <div className='flex items-center rounded-full border border-white/50 bg-white/15 p-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.2)]'>
            {['en', 'de'].map((lang) => (
              <button
                key={`mobile-lang-${lang}`}
                type='button'
                onClick={() => i18n.changeLanguage(lang)}
                className={`flex h-8 items-center justify-center rounded-full px-4 text-[12px] font-extrabold uppercase tracking-wider transition-all duration-200 ${
                  i18n.language === lang
                    ? 'bg-white text-[#1e3a8a] shadow-sm'
                    : 'text-white/90 hover:bg-white/20'
                }`}
                aria-label={t(`common.language.${lang === 'en' ? 'english' : 'german'}`)}
              >
                {lang}
              </button>
            ))}
          </div>

          <Link
            to={isLoggedIn ? '/dashboard' : '/auth'}
            onClick={() => setIsMobileMenuOpen(false)}
            className='text-[13px] font-semibold text-white/80 transition-colors hover:text-white'
          >
            {isLoggedIn ? t('common.actions.dashboard') : t('common.actions.login')}
          </Link>

          <Link
            to='/donate'
            onClick={() => setIsMobileMenuOpen(false)}
            className='inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-[13px] font-semibold text-black'
          >
            {t('common.actions.donate')}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default NavbarSection
