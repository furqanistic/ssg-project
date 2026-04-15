import React, { useMemo, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/authStore'

const getNavItems = (t) => [
  {
    label: t('navbar.items.about.label'),
    sections: [
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
    ],
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
    label: t('navbar.items.youth.label'),
    sections: [
      {
        heading: t('navbar.items.youth.s1h'),
        links: [
          { label: t('navbar.items.youth.gurmukhi'), to: '/youth-education#gurmukhi-class' },
          { label: t('navbar.items.youth.german'), to: '/youth-education#german-class' },
        ],
      },
      {
        heading: t('navbar.items.youth.s2h'),
        links: [
          { label: t('navbar.items.youth.camps'), to: '/youth-education#camps-workshops' },
          { label: t('navbar.items.youth.registration'), to: '/youth-education#registration' },
          {
            label: t('navbar.items.youth.cremationFund'),
            to: '/services/antim-sanskar-fund',
          },
        ],
      },
    ],
    panelClassName: 'w-[560px] grid-cols-2',
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
              {section.links.map((link) => {
                const Component = link.to ? Link : 'a'
                return (
                  <Component
                    key={link.label}
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

const NavbarSection = () => {
  const [openItem, setOpenItem] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileOpenItem, setMobileOpenItem] = useState(null)
  const { i18n, t } = useTranslation()
  const isLoggedIn = useAuthStore((state) => Boolean(state.session?.accessToken))

  const navItems = useMemo(() => getNavItems(t), [t])

  return (
    <header
      className='absolute inset-x-0 top-0 z-50 border-b border-white/5 bg-white/[0.01] backdrop-blur-md'
      onMouseLeave={() => setOpenItem(null)}
    >
      <div className='mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-6 lg:px-8'>
        <div className='flex items-center gap-3 md:gap-4'>
          <img
            src='/logo.png'
            alt={t('navbar.brand.name')}
            className='h-10 w-10 object-contain md:h-14 md:w-14'
          />
          <div className='flex flex-col justify-center'>
            <span className='text-[16px] font-bold leading-tight tracking-tight text-white md:text-[18px]'>
              {t('navbar.brand.name')}
            </span>
            <span className='text-[12px] font-medium text-white/50 md:text-[13px]'>
              {t('navbar.brand.location')}
            </span>
          </div>
        </div>

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
                  className={`flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-all duration-200 ${
                    isOpen
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                  type='button'
                  onClick={() => setOpenItem(isOpen ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : 'text-white/40'
                    }`}
                  />
                </button>
                <NavbarDropdown item={item} isOpen={isOpen} />
              </div>
            )
          })}
        </nav>

        <div className='hidden items-center gap-4 lg:flex'>
          <div className='flex items-center rounded-full border border-white/5 bg-white/[0.03] p-1'>
            {['en', 'de'].map((lang) => (
              <button
                key={lang}
                type='button'
                onClick={() => i18n.changeLanguage(lang)}
                className={`flex h-7 items-center justify-center rounded-full px-3 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  i18n.language === lang
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-white/40 hover:text-white/80'
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
        className={`border-t border-white/10 bg-[#0f1726]/95 px-6 py-4 backdrop-blur-xl md:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <nav className='flex max-h-[calc(100vh-7rem)] flex-col overflow-y-auto pb-2'>
          {navItems.map((item) => {
            const isItemOpen = mobileOpenItem === item.label

            return (
              <div key={`mobile-${item.label}`} className='border-b border-white/10 py-2'>
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
                  <div className='mt-1 flex flex-col gap-4 pb-3 pl-1'>
                    {item.sections.map((section, sectionIndex) => (
                      <div key={`mobile-section-${item.label}-${sectionIndex}`}>
                        {section.heading ? (
                          <p className='mb-2 text-[11px] font-bold uppercase tracking-[0.06em] text-white/50'>
                            {section.heading}
                          </p>
                        ) : null}
                        <div className='flex flex-col gap-2'>
                          {section.links.map((link) => {
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
                                className='text-[14px] font-medium text-white/80 transition-colors hover:text-white'
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

        <div className='mt-4 flex items-center justify-between gap-3'>
          <div className='flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1'>
            {['en', 'de'].map((lang) => (
              <button
                key={`mobile-lang-${lang}`}
                type='button'
                onClick={() => i18n.changeLanguage(lang)}
                className={`flex h-7 items-center justify-center rounded-full px-3 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  i18n.language === lang
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-white/50 hover:text-white/90'
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
