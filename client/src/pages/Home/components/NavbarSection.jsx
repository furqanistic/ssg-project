import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const navItems = [
  {
    label: 'About Us',
    sections: [
      {
        heading: 'OUR STORY',
        links: [
          { label: 'History', to: '/about-us/history' },
          { label: 'Mission & Vision', to: '/about-us/mission' },
        ],
      },
      {
        heading: 'ORGANIZATION',
        links: [
          { label: 'Management Committee', to: '/about-us/committee' },
          { label: 'Governance & Reports', to: '/about-us/governance' },
        ],
      },
    ],
    panelClassName: 'w-[670px] grid-cols-2',
  },
  {
    label: 'Visitors',
    sections: [
      {
        links: [
          { label: 'Visitor Guide', to: '/visitors/guide#visitor-guide' },
          { label: 'Rules & Etiquette', to: '/visitors/guide#rules-etiquette' },
          { label: 'Opening Timings', to: '/visitors/guide#opening-timings' },
          { label: 'Location & Map', to: '/visitors/guide#location-map' },
          { label: 'FAQ', to: '/visitors/guide#faq' },
        ],
      },
    ],
    panelClassName: 'w-[300px] grid-cols-1',
  },
  {
    label: 'Events',
    sections: [
      {
        heading: 'PROGRAMS',
        links: [
          { label: 'Daily Programs', to: '/events/programs#daily' },
          { label: 'Weekly Programs', to: '/events/programs#weekly' },
          { label: 'Monthly Programs', to: '/events/programs#monthly' },
          { label: 'Yearly Programs', to: '/events/programs#yearly' },
        ],
      },
      {
        heading: 'ENGAGEMENT',
        links: [
          { label: 'Upcoming Events', to: '/events/programs#all' },
          { label: 'Annual Calendar', to: '/events/programs#yearly' },
          { label: 'Past Events', to: '/events/programs#all' },
        ],
      },
    ],
    panelClassName: 'w-[670px] grid-cols-2',
  },
  {
    label: 'Youth & Education',
    sections: [
      {
        heading: 'CLASSES',
        links: [
          { label: 'Gurmukhi Class', to: '/youth-education#gurmukhi-class' },
          { label: 'German Class', to: '/youth-education#german-class' },
        ],
      },
      {
        heading: 'PROGRAMS',
        links: [
          {
            label: 'Camps & Workshops',
            to: '/youth-education#camps-workshops',
          },
          { label: 'Registration', to: '/youth-education#registration' },
        ],
      },
    ],
    panelClassName: 'w-[670px] grid-cols-2',
  },
  {
    label: 'Media',
    sections: [
      {
        links: [
          { label: 'Photo Gallery', to: '/media#photo-gallery' },
          { label: 'Videos', to: '/media#videos' },
          { label: 'Live Kirtan', to: '/media#live-kirtan' },
        ],
      },
    ],
    panelClassName: 'w-[530px] grid-cols-1',
  },
  {
    label: 'Contact',
    sections: [
      {
        links: [
          { label: 'Volunteer', to: '/contact#volunteer' },
          { label: 'Contact Form', to: '/contact#contact-form' },
        ],
      },
    ],
    panelClassName: 'w-[300px] grid-cols-1',
  },
]

const NavbarDropdown = ({ item, isOpen }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className='absolute left-1/2 top-[calc(100%+10px)] z-30 -translate-x-1/2'>
      <div
        className={`grid gap-x-10 rounded-[14px] bg-white px-6 py-6 text-left shadow-[0_18px_40px_rgba(7,18,48,0.22)] ${item.panelClassName}`}
      >
        {item.sections.map((section, index) => (
          <div key={`${item.label}-${index}`} className='min-w-0'>
            {section.heading ? (
              <p className='mb-4 text-[13px] font-extrabold tracking-[0.01em] text-[#6b7485]'>
                {section.heading}
              </p>
            ) : null}
            <div className='space-y-3'>
              {section.links.map((link) =>
                link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className='block text-[15px] font-medium text-[#1d2738] transition hover:text-[#264fb2]'
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className='block text-[15px] font-medium text-[#1d2738] transition hover:text-[#264fb2]'
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const NavbarSection = () => {
  const [openItem, setOpenItem] = useState(null)
  const isLoggedIn = useAuthStore((state) => Boolean(state.session?.accessToken))

  return (
    <header
      className='absolute inset-x-0 top-0 z-20 border-b border-[#3557a8] bg-[#1e3a8a] font-["Manrope","Segoe_UI",sans-serif] text-white shadow-[0_2px_8px_rgba(10,20,45,0.22)]'
      onMouseLeave={() => setOpenItem(null)}
    >
      <div className='mx-auto flex h-[66px] w-full max-w-[1280px] items-center justify-between px-4 md:px-5'>
        <div className='flex items-center gap-2'>
          <div className='grid h-[40px] w-[46px] place-items-center rounded-[10px] bg-[#f6ab3c]'>
            <span className='text-[16px] font-extrabold uppercase tracking-[-0.02em] text-white'>
              SSG
            </span>
          </div>
          <div className='leading-tight'>
            <p className='text-[18px] font-bold tracking-[-0.02em]'>
              Singh Sabha Gurudwara
            </p>
            <p className='text-[12px] font-medium text-white/90'>
              Berlin (e.V.)
            </p>
          </div>
        </div>

        <nav className='hidden items-center gap-2.5 lg:flex'>
          {navItems.map((item) => {
            const isOpen = openItem === item.label

            return (
              <div
                key={item.label}
                className='relative'
                onMouseEnter={() => setOpenItem(item.label)}
              >
                <button
                  className={`flex h-10 items-center gap-1.5 rounded-[12px] px-4 text-[13px] font-semibold transition ${
                    isOpen
                      ? 'bg-[#2951c8] text-white'
                      : 'text-white/95 hover:bg-[#2448b3] hover:text-white'
                  }`}
                  type='button'
                  onClick={() => setOpenItem(isOpen ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown className='h-3.5 w-3.5 stroke-[2.6]' />
                </button>
                <NavbarDropdown item={item} isOpen={isOpen} />
              </div>
            )
          })}
        </nav>

        <div className='hidden items-center gap-2.5 lg:flex'>
          <Link
            to={isLoggedIn ? '/dashboard' : '/auth'}
            className='inline-flex h-9 items-center justify-center rounded-[10px] border border-white/35 px-4 text-[14px] font-semibold leading-none text-white transition hover:bg-white/10'
          >
            {isLoggedIn ? 'Dashboard' : 'Login'}
          </Link>
          <Link
            to='/donate'
            className='inline-flex h-9 items-center justify-center rounded-[10px] bg-[#f6ab3c] px-5 text-[14px] font-bold leading-none text-white transition hover:bg-[#f2a12d]'
          >
            Donate
          </Link>
        </div>
      </div>
    </header>
  )
}

export default NavbarSection
