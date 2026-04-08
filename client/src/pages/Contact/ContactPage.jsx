import React, { useEffect } from 'react'
import { Clock3, Mail, MapPin, Phone, Users } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useSiteContentQuery } from '@/hooks/useContent'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const scrollTargets = ['volunteer', 'contact-form']

const ContactPage = () => {
  const location = useLocation()
  const { data: content } = useSiteContentQuery()
  const contact = {
    ...{
      phone: '+49 30 47375651',
      email: 'info@ssgberlin.de',
      addressLines: ['Wollankstraße 8', '13187 Berlin'],
    },
    ...(content?.contact ?? {}),
  }

  useEffect(() => {
    const hash = location.hash.slice(1)
    if (!hash || !scrollTargets.includes(hash)) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.getElementById(hash)
    if (!target) {
      return
    }

    requestAnimationFrame(() => {
      const navbarOffset = 88
      const top =
        target.getBoundingClientRect().top + window.scrollY - navbarOffset

      window.scrollTo({ top, behavior: 'smooth' })
    })
  }, [location.hash])

  return (
    <div className='min-h-screen bg-white font-["Manrope","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='bg-[#3567c4] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[1040px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                Contact Us
              </h1>
              <p className='mt-3 max-w-[860px] text-[17px] text-white/90 md:text-[18px]'>
                Get in touch with us for any questions, volunteer
                opportunities, or support
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
            <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-7 text-center shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
              <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f6ab3c] text-white'>
                <Phone className='h-6 w-6 stroke-[2]' />
              </div>
              <h2 className='mt-6 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                Phone
              </h2>
              <p className='mt-3 text-[16px] text-[#516075]'>{contact.phone}</p>
            </article>

            <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-7 text-center shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
              <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2d4f9f] text-white'>
                <Mail className='h-6 w-6 stroke-[2]' />
              </div>
              <h2 className='mt-6 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                Email
              </h2>
              <p className='mt-3 text-[16px] text-[#516075]'>{contact.email}</p>
            </article>

            <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-7 text-center shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
              <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f6ab3c] text-white'>
                <MapPin className='h-6 w-6 stroke-[2]' />
              </div>
              <h2 className='mt-6 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                Address
              </h2>
              <p className='mt-3 text-[16px] leading-[1.55] text-[#516075]'>
                {(contact.addressLines ?? []).map((line) => (
                  <React.Fragment key={line}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto grid max-w-[1280px] grid-cols-1 gap-10 xl:grid-cols-[1fr_0.98fr]'>
          <div id='contact-form'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Send Us a Message
            </h2>

            <form className='mt-8 space-y-6'>
              <div>
                <label className='mb-2 block text-[15px] font-semibold text-[#111318]'>
                  Name *
                </label>
                <input
                  type='text'
                  placeholder='Your full name'
                  className='h-12 w-full rounded-[10px] border border-[#e6e9ef] bg-[#f7f8fb] px-4 text-[15px] text-[#111318] outline-none transition focus:border-[#c9d2e4]'
                />
              </div>

              <div>
                <label className='mb-2 block text-[15px] font-semibold text-[#111318]'>
                  Email *
                </label>
                <input
                  type='email'
                  placeholder='your.email@example.com'
                  className='h-12 w-full rounded-[10px] border border-[#e6e9ef] bg-[#f7f8fb] px-4 text-[15px] text-[#111318] outline-none transition focus:border-[#c9d2e4]'
                />
              </div>

              <div>
                <label className='mb-2 block text-[15px] font-semibold text-[#111318]'>
                  Phone
                </label>
                <input
                  type='text'
                  placeholder='+49 123 456789'
                  className='h-12 w-full rounded-[10px] border border-[#e6e9ef] bg-[#f7f8fb] px-4 text-[15px] text-[#111318] outline-none transition focus:border-[#c9d2e4]'
                />
              </div>

              <div>
                <label className='mb-2 block text-[15px] font-semibold text-[#111318]'>
                  Subject *
                </label>
                <input
                  type='text'
                  placeholder='How can we help you?'
                  className='h-12 w-full rounded-[10px] border border-[#e6e9ef] bg-[#f7f8fb] px-4 text-[15px] text-[#111318] outline-none transition focus:border-[#c9d2e4]'
                />
              </div>

              <div>
                <label className='mb-2 block text-[15px] font-semibold text-[#111318]'>
                  Message *
                </label>
                <textarea
                  placeholder='Tell us more about your inquiry...'
                  className='min-h-[140px] w-full rounded-[10px] border border-[#e6e9ef] bg-[#f7f8fb] px-4 py-4 text-[15px] text-[#111318] outline-none transition focus:border-[#c9d2e4]'
                />
              </div>

              <button
                type='button'
                className='inline-flex h-12 w-full items-center justify-center rounded-[12px] bg-[#f6ab3c] px-8 text-[15px] font-semibold text-white transition hover:bg-[#f0a12c] md:text-[16px]'
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Visit Us
            </h2>

            <div className='mt-8 rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
              <div className='space-y-8'>
                <div className='flex items-start gap-4'>
                  <Clock3 className='mt-1 h-5 w-5 text-[#f39d2f]' />
                  <div>
                    <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                      Opening Hours
                    </h3>
                    <div className='mt-4 space-y-2 text-[15px] text-[#516075] md:text-[16px]'>
                      <p>
                        <span className='font-semibold'>Daily:</span> 6:00 AM -
                        9:00 PM
                      </p>
                      <p>
                        <span className='font-semibold'>Sunday Kirtan:</span>{' '}
                        11:00 AM - 1:00 PM
                      </p>
                      <p>
                        <span className='font-semibold'>Office Hours:</span>{' '}
                        Mon-Fri, 10:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <MapPin className='mt-1 h-5 w-5 text-[#f39d2f]' />
                  <div>
                    <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                      How to Reach
                    </h3>
                    <div className='mt-4 space-y-2 text-[15px] text-[#516075] md:text-[16px]'>
                      <p>
                        <span className='font-semibold'>U-Bahn:</span> U8 to
                        Pankstraße
                      </p>
                      <p>
                        <span className='font-semibold'>Tram:</span> M1, 50 to
                        Wollankstraße
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 flex h-[360px] items-center justify-center rounded-[18px] bg-[#edf1f7] text-[16px] text-[#7a879b]'>
              Map integration would be here
            </div>
          </div>
        </div>
      </section>

      <section
        id='volunteer'
        className='bg-white px-4 py-16 md:px-6 md:py-18'
      >
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[860px] text-center'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f6ab3c] text-white shadow-[0_10px_24px_rgba(246,171,60,0.18)]'>
              <Users className='h-7 w-7 stroke-[2]' />
            </div>
            <h2 className='mt-6 text-[36px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[40px]'>
              Volunteer With Us
            </h2>
            <p className='mx-auto mt-4 max-w-[820px] text-[17px] leading-[1.55] text-[#516075] md:text-[18px]'>
              Join our community of dedicated volunteers who serve selflessly
              to support the Gurudwara and community
            </p>
          </div>

          <div className='mx-auto mt-10 grid max-w-[860px] grid-cols-1 gap-6 md:grid-cols-2'>
            {[
              {
                title: 'Langar Seva',
                description:
                  'Help prepare, serve, and clean up in our community kitchen. Cooking experience not required!',
                timing: 'Flexible shifts available',
              },
              {
                title: 'Event Support',
                description:
                  'Assist with organizing and running special events, festivals, and community programs.',
                timing: 'During events',
              },
              {
                title: 'Education & Youth',
                description:
                  'Support our educational programs by teaching classes or assisting with youth activities.',
                timing: 'Weekly commitments',
              },
              {
                title: 'Facility Maintenance',
                description:
                  'Help maintain our beautiful Gurudwara through cleaning, repairs, and general upkeep.',
                timing: 'Flexible hours',
              },
            ].map((opportunity) => (
              <article
                key={opportunity.title}
                className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
              >
                <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                  {opportunity.title}
                </h3>
                <p className='mt-4 max-w-[420px] text-[16px] leading-[1.6] text-[#516075]'>
                  {opportunity.description}
                </p>
                <p className='mt-5 text-[15px] font-semibold text-[#f39d2f]'>
                  Time: {opportunity.timing}
                </p>
              </article>
            ))}
          </div>

          <div className='mx-auto mt-8 max-w-[860px] rounded-[20px] border border-[#d7e3f2] bg-[#f7fbff] px-6 py-10 text-center shadow-[0_1px_2px_rgba(13,23,45,0.02)] md:px-10'>
            <h3 className='text-[32px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[36px]'>
              Ready to Volunteer?
            </h3>
            <p className='mx-auto mt-4 max-w-[740px] text-[17px] leading-[1.55] text-[#516075] md:text-[18px]'>
              Contact us to learn more about volunteer opportunities and how
              you can get involved in serving the community.
            </p>
            <a
              href='#contact-form'
              className='mt-8 inline-flex h-12 items-center justify-center rounded-[12px] bg-[#f6ab3c] px-8 text-[15px] font-semibold text-white transition hover:bg-[#f0a12c] md:text-[16px]'
            >
              Express Interest
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default ContactPage
