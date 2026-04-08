import React from 'react'
import { Mail, Phone } from 'lucide-react'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const committeeMembers = [
  {
    initials: 'SGS',
    name: 'Sardar Gurmeet Singh',
    role: 'President',
    email: 'president@ssgberlin.de',
    phone: '+49 30 1234567',
  },
  {
    initials: 'BJK',
    name: 'Bibi Jaspreet Kaur',
    role: 'Vice President',
    email: 'vicepresident@ssgberlin.de',
  },
  {
    initials: 'SHS',
    name: 'Sardar Harjit Singh',
    role: 'Secretary',
    email: 'secretary@ssgberlin.de',
    phone: '+49 30 2345678',
  },
  {
    initials: 'BSK',
    name: 'Bibi Simran Kaur',
    role: 'Treasurer',
    email: 'treasurer@ssgberlin.de',
  },
  {
    initials: 'SMS',
    name: 'Sardar Manpreet Singh',
    role: 'Events Coordinator',
    email: 'events@ssgberlin.de',
  },
  {
    initials: 'BNK',
    name: 'Bibi Navdeep Kaur',
    role: 'Education Director',
    email: 'education@ssgberlin.de',
  },
]

const CommitteePage = () => {
  return (
    <div className='min-h-screen bg-white font-["Manrope","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='bg-[#3567c4] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[1040px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                Management Committee
              </h1>
              <p className='mt-3 text-[17px] text-white/90 md:text-[18px]'>
                Meet the dedicated team serving our community
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[880px] text-center'>
            <p className='text-[17px] leading-[1.6] text-[#5a677a] md:text-[18px]'>
              Our Management Committee consists of elected volunteers who
              dedicate their time and effort to ensure the smooth operation of
              the Gurudwara and service to the community.
            </p>
          </div>

          <div className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {committeeMembers.map((member) => (
              <article
                key={member.email}
                className='overflow-hidden rounded-[18px] border border-[#dbe1ea] bg-white shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
              >
                <div className='flex h-[190px] items-center justify-center bg-[linear-gradient(135deg,#e6eefb_0%,#f7ead7_100%)]'>
                  <div className='flex h-[128px] w-[128px] items-center justify-center rounded-full bg-white text-[34px] font-extrabold tracking-[-0.03em] text-[#2d4f9f]'>
                    {member.initials}
                  </div>
                </div>

                <div className='px-5 py-5'>
                  <h2 className='text-[18px] font-bold tracking-[-0.02em] text-[#111318] md:text-[19px]'>
                    {member.name}
                  </h2>
                  <p className='mt-1.5 text-[15px] font-semibold text-[#f39d2f] md:text-[16px]'>
                    {member.role}
                  </p>

                  <div className='mt-5 space-y-3 text-[14px] text-[#5a677a] md:text-[15px]'>
                    <div className='flex items-center gap-2.5'>
                      <Mail className='h-4 w-4 shrink-0 text-[#98a3b6]' />
                      <span>{member.email}</span>
                    </div>
                    {member.phone ? (
                      <div className='flex items-center gap-2.5'>
                        <Phone className='h-4 w-4 shrink-0 text-[#98a3b6]' />
                        <span>{member.phone}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[920px] text-center'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Interested in Serving?
            </h2>
            <p className='mx-auto mt-5 max-w-[900px] text-[17px] leading-[1.6] text-[#5a677a] md:text-[18px]'>
              Committee positions are elected positions. Elections are held
              annually according to our constitution. If you're interested in
              serving on the committee, please reach out to us.
            </p>
            <button
              type='button'
              className='mt-9 inline-flex h-12 items-center justify-center rounded-[12px] bg-[#f6ab3c] px-8 text-[15px] font-semibold text-white transition hover:bg-[#f0a12c] md:text-[16px]'
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default CommitteePage
