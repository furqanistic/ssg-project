import React, { useEffect } from 'react'
import {
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  Heart,
  Users,
} from 'lucide-react'
import { useLocation } from 'react-router-dom'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const scrollTargets = [
  'gurmukhi-class',
  'german-class',
  'camps-workshops',
  'registration',
]

const sectionIntro =
  'Our education programs are designed to help children and adults connect with their heritage, learn important life skills, and grow as members of both the Sikh and German communities.'

const YouthEducationPage = () => {
  const location = useLocation()

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
                Youth & Education
              </h1>
              <p className='mt-3 max-w-[880px] text-[17px] text-white/90 md:text-[18px]'>
                Nurturing the next generation through spiritual learning,
                cultural education, and community engagement
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[900px] text-center'>
            <p className='text-[17px] leading-[1.65] text-[#516075] md:text-[18px]'>
              {sectionIntro}
            </p>
          </div>
        </div>
      </section>

      <section id='gurmukhi-class' className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 xl:grid-cols-[1.05fr_0.95fr]'>
          <div>
            <div className='mb-7 flex h-16 w-16 items-center justify-center rounded-[16px] bg-[#f6ab3c] text-white'>
              <BookOpen className='h-7 w-7 stroke-[2]' />
            </div>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Gurmukhi Classes
            </h2>
            <p className='mt-6 max-w-[34ch] text-[16px] leading-[1.7] text-[#516075] md:text-[17px]'>
              Learn to read and write in Gurmukhi, the script used to write
              Punjabi and the sacred texts of Sikhism. Our classes are
              structured for different age groups and skill levels.
            </p>

            <div className='mt-7 space-y-5 text-[16px] leading-[1.55] text-[#516075] md:text-[17px]'>
              <div className='flex items-start gap-3'>
                <span className='mt-2 h-2.5 w-2.5 rounded-full bg-[#f39d2f]' />
                <div>
                  <h3 className='font-bold text-[#111318]'>Beginner Level</h3>
                  <p className='mt-1'>
                    Learn the Gurmukhi alphabet and basic reading
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <span className='mt-2 h-2.5 w-2.5 rounded-full bg-[#f39d2f]' />
                <div>
                  <h3 className='font-bold text-[#111318]'>
                    Intermediate Level
                  </h3>
                  <p className='mt-1'>
                    Reading practice with children&apos;s books and simple texts
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <span className='mt-2 h-2.5 w-2.5 rounded-full bg-[#f39d2f]' />
                <div>
                  <h3 className='font-bold text-[#111318]'>Advanced Level</h3>
                  <p className='mt-1'>
                    Reading Gurbani and understanding meanings
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-8 max-w-[600px] rounded-[16px] border border-[#cfe0ff] bg-[#ebf3ff] px-6 py-6'>
              <div className='flex items-start gap-3'>
                <CalendarDays className='mt-1 h-5 w-5 text-[#f39d2f]' />
                <div>
                  <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                    Schedule
                  </h3>
                  <p className='mt-4 text-[15px] font-bold leading-[1.6] text-[#4f5f77] md:text-[16px]'>
                    Every Saturday
                    <br />
                    <span className='font-normal'>3:00 PM - 5:00 PM</span>
                    <br />
                    <span className='font-normal'>Education Room</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='overflow-hidden rounded-[22px] shadow-[0_18px_40px_rgba(13,23,45,0.08)]'>
            <img
              src='https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80'
              alt='Children in class'
              className='h-full w-full object-cover'
              loading='lazy'
            />
          </div>
        </div>
      </section>

      <section id='german-class' className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 xl:grid-cols-[0.95fr_1.05fr]'>
          <div className='overflow-hidden rounded-[22px] shadow-[0_18px_40px_rgba(13,23,45,0.08)]'>
            <img
              src='https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80'
              alt='German language class'
              className='h-full w-full object-cover'
              loading='lazy'
            />
          </div>
          <div>
            <div className='mb-7 flex h-16 w-16 items-center justify-center rounded-[16px] bg-[#2d4f9f] text-white'>
              <GraduationCap className='h-7 w-7 stroke-[2]' />
            </div>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              German Language Classes
            </h2>
            <p className='mt-6 max-w-[36ch] text-[16px] leading-[1.7] text-[#516075] md:text-[17px]'>
              Integration support through German language education. Our
              classes help community members of all ages improve their German
              language skills for daily life, work, and education.
            </p>

            <div className='mt-7 space-y-5 text-[16px] leading-[1.55] text-[#516075] md:text-[17px]'>
              <div className='flex items-start gap-3'>
                <span className='mt-2 h-2.5 w-2.5 rounded-full bg-[#2d4f9f]' />
                <div>
                  <h3 className='font-bold text-[#111318]'>A1/A2 Level</h3>
                  <p className='mt-1'>
                    Basic German for everyday situations
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <span className='mt-2 h-2.5 w-2.5 rounded-full bg-[#2d4f9f]' />
                <div>
                  <h3 className='font-bold text-[#111318]'>B1/B2 Level</h3>
                  <p className='mt-1'>
                    Intermediate German for work and study
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <span className='mt-2 h-2.5 w-2.5 rounded-full bg-[#2d4f9f]' />
                <div>
                  <h3 className='font-bold text-[#111318]'>
                    Conversation Practice
                  </h3>
                  <p className='mt-1'>
                    Practice speaking in a supportive environment
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-8 max-w-[600px] rounded-[16px] border border-[#f4c58c] bg-[#fff6ea] px-6 py-6'>
              <div className='flex items-start gap-3'>
                <CalendarDays className='mt-1 h-5 w-5 text-[#2d4f9f]' />
                <div>
                  <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                    Schedule
                  </h3>
                  <p className='mt-4 text-[15px] font-bold leading-[1.6] text-[#4f5f77] md:text-[16px]'>
                    Every Sunday
                    <br />
                    <span className='font-normal'>2:00 PM - 4:00 PM</span>
                    <br />
                    <span className='font-normal'>Community Hall</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='camps-workshops' className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='text-center'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-[16px] bg-[#f6ab3c] text-white'>
              <Users className='h-7 w-7 stroke-[2]' />
            </div>
            <h2 className='mt-7 text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Youth Camps & Workshops
            </h2>
            <p className='mx-auto mt-4 max-w-[760px] text-[16px] leading-[1.65] text-[#516075] md:text-[17px]'>
              Engaging programs that combine fun activities with spiritual and
              cultural learning
            </p>
          </div>

          <div className='mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3'>
            <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
              <h3 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318]'>
                Summer Camp
              </h3>
              <p className='mt-5 text-[15px] leading-[1.65] text-[#516075] md:text-[16px]'>
                Week-long summer program with sports, arts, kirtan, and Sikh
                history lessons for ages 8-16.
              </p>
              <p className='mt-6 text-[15px] font-semibold text-[#f39d2f] md:text-[16px]'>
                July - August
              </p>
            </article>

            <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
              <h3 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318]'>
                Music Workshops
              </h3>
              <p className='mt-5 text-[15px] leading-[1.65] text-[#516075] md:text-[16px]'>
                Learn to play tabla, harmonium, and sing kirtan. Develop
                musical skills while connecting with Gurbani.
              </p>
              <p className='mt-6 text-[15px] font-semibold text-[#f39d2f] md:text-[16px]'>
                Monthly Sessions
              </p>
            </article>

            <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
              <h3 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318]'>
                Sikh History Classes
              </h3>
              <p className='mt-5 text-[15px] leading-[1.65] text-[#516075] md:text-[16px]'>
                Interactive lessons about Sikh history, Gurus&apos; lives, and
                the significance of important events.
              </p>
              <p className='mt-6 text-[15px] font-semibold text-[#f39d2f] md:text-[16px]'>
                Every 2nd Sunday
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id='registration' className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px] text-center'>
          <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
            Register for Programs
          </h2>
          <p className='mx-auto mt-5 max-w-[820px] text-[16px] leading-[1.65] text-[#516075] md:text-[17px]'>
            Interested in enrolling in our educational programs? Contact us to
            register or learn more.
          </p>

          <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <button
              type='button'
              className='inline-flex h-12 items-center justify-center rounded-[12px] bg-[#f6ab3c] px-8 text-[15px] font-semibold text-white transition hover:bg-[#f0a12c] md:text-[16px]'
            >
              Contact for Registration
            </button>
            <button
              type='button'
              className='inline-flex h-12 items-center justify-center rounded-[12px] border border-[#2d4f9f] px-8 text-[15px] font-semibold text-[#2d4f9f] transition hover:bg-[#eef3ff] md:text-[16px]'
            >
              View Full Schedule
            </button>
          </div>
        </div>
      </section>

      <section className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <h2 className='text-center text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
            Why Enroll Your Child?
          </h2>

          <div className='mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4'>
            <div className='text-center'>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f6ab3c] text-white'>
                <BookOpen className='h-7 w-7 stroke-[2]' />
              </div>
              <h3 className='mt-6 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                Cultural Connection
              </h3>
              <p className='mx-auto mt-3 max-w-[240px] text-[15px] leading-[1.6] text-[#516075] md:text-[16px]'>
                Stay connected to Sikh heritage and traditions
              </p>
            </div>

            <div className='text-center'>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2d4f9f] text-white'>
                <Users className='h-7 w-7 stroke-[2]' />
              </div>
              <h3 className='mt-6 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                Community Building
              </h3>
              <p className='mx-auto mt-3 max-w-[240px] text-[15px] leading-[1.6] text-[#516075] md:text-[16px]'>
                Make friends and build lasting relationships
              </p>
            </div>

            <div className='text-center'>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f6ab3c] text-white'>
                <GraduationCap className='h-7 w-7 stroke-[2]' />
              </div>
              <h3 className='mt-6 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                Skill Development
              </h3>
              <p className='mx-auto mt-3 max-w-[240px] text-[15px] leading-[1.6] text-[#516075] md:text-[16px]'>
                Learn valuable languages and life skills
              </p>
            </div>

            <div className='text-center'>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2d4f9f] text-white'>
                <Heart className='h-7 w-7 stroke-[2]' />
              </div>
              <h3 className='mt-6 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                Spiritual Growth
              </h3>
              <p className='mx-auto mt-3 max-w-[240px] text-[15px] leading-[1.6] text-[#516075] md:text-[16px]'>
                Develop strong moral and spiritual foundations
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default YouthEducationPage
