import React from 'react'
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'About Us', to: '/about-us/history' },
  { label: 'Visitor Guide', to: '/visitors/guide#visitor-guide' },
  { label: 'Events & Programs', to: '/events/programs#all' },
  { label: 'Youth & Education', to: '/youth-education#gurmukhi-class' },
  { label: 'Media Gallery', to: '/media#photo-gallery' },
  { label: 'Contact Us', to: '/contact#contact-form' },
]

const socialLinks = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'Youtube' },
]

const SiteFooter = () => {
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
                  Singh Sabha Gurudwara
                </h3>
                <p className='mt-1 text-[16px] text-white/90'>Berlin (e.V.)</p>
              </div>
            </div>
            <p className='mt-7 max-w-[28ch] text-[15px] leading-[1.6] text-white/88 md:text-[16px]'>
              A spiritual and community center serving the Sikh community in
              Berlin since establishment. All are welcome.
            </p>
          </div>

          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-[18px] font-bold'>Quick Links</h3>
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
            <h3 className='text-[18px] font-bold'>Contact Information</h3>
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
            <h3 className='text-[18px] font-bold'>Connect With Us</h3>
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
              Support Our Mission
            </Link>
          </div>
        </div>

        <div className='mt-12 border-t border-white/10 pt-7'>
          <div className='flex flex-col items-center gap-4 text-center text-[14px] text-white/88 md:flex-row md:items-center md:justify-between md:text-[15px] md:text-left'>
            <p>© 2026 Singh Sabha Gurudwara Berlin e.V. All rights reserved.</p>
            <div className='flex flex-wrap justify-center gap-6 md:justify-start md:gap-8'>
              <a href='#' className='transition hover:text-white'>
                Impressum
              </a>
              <a href='#' className='transition hover:text-white'>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
