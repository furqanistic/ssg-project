import React from 'react'
import { ArrowRight, GraduationCap, Heart, Users } from 'lucide-react'

const educationCards = [
  {
    title: 'Gurmukhi Classes',
    description:
      'Learn to read and write Punjabi in the traditional Gurmukhi script. Classes for all age groups.',
    icon: GraduationCap,
    accent: 'bg-[#f6ab3c] text-white',
  },
  {
    title: 'German Language',
    description:
      'Integration support through German language classes for community members of all levels.',
    icon: GraduationCap,
    accent: 'bg-[#2d4f9f] text-white',
  },
  {
    title: 'Youth Camps',
    description:
      'Summer camps, workshops, and activities that combine fun with spiritual and cultural learning.',
    icon: Users,
    accent: 'bg-[#f6ab3c] text-white',
  },
]

const ctaCards = [
  {
    title: 'Volunteer With Us',
    description:
      'Join our community of volunteers and contribute your time to serve others. Opportunities available in various areas including kitchen, events, and education.',
    icon: Users,
    buttonLabel: 'Get Started',
    buttonClass:
      'bg-white text-[#264f9e] hover:bg-white/90',
  },
  {
    title: 'Support Our Mission',
    description:
      'Your generous donations help us maintain the Gurudwara, support community programs, and serve langar to all visitors. Every contribution makes a difference.',
    icon: Heart,
    buttonLabel: 'Donate Now',
    buttonClass:
      'bg-[#f6ab3c] text-white hover:bg-[#f0a12c]',
  },
]

const EducationCard = ({ title, description, icon: Icon, accent }) => {
  return (
    <article className='rounded-[16px] border border-[#d8dce4] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-[14px] ${accent}`}
      >
        <Icon className='h-6 w-6 stroke-[2]' />
      </div>
      <h3 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318]'>
        {title}
      </h3>
      <p className='mt-3 max-w-[32ch] text-[15px] leading-[1.5] text-[#5a677a] md:text-[16px]'>
        {description}
      </p>
      <button
        type='button'
        className='mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#f6ab3c] transition hover:text-[#eb9e2a]'
      >
        Learn More
        <ArrowRight className='h-4 w-4' />
      </button>
    </article>
  )
}

const CtaCard = ({ title, description, icon: Icon, buttonLabel, buttonClass }) => {
  return (
    <article className='rounded-[20px] bg-[rgba(255,255,255,0.12)] px-7 py-7 text-white backdrop-blur-[2px]'>
      <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#f6ab3c] text-white'>
        <Icon className='h-6 w-6 stroke-[2]' />
      </div>
      <h3 className='text-[22px] font-bold tracking-[-0.02em] text-white md:text-[23px]'>
        {title}
      </h3>
      <p className='mt-4 max-w-[48ch] text-[15px] leading-[1.55] text-white/92 md:text-[16px]'>
        {description}
      </p>
      <button
        type='button'
        className={`mt-6 inline-flex h-11 items-center justify-center rounded-[11px] px-7 text-[15px] font-semibold transition ${buttonClass}`}
      >
        {buttonLabel}
      </button>
    </article>
  )
}

const YouthEducationSection = () => {
  return (
    <section className='bg-[#f2f2f2]'>
      <div className='px-4 py-10 md:px-6 md:py-12'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='text-center'>
            <h2 className='text-[26px] font-extrabold tracking-[-0.02em] text-[#111318] md:text-[32px]'>
              Youth & Education
            </h2>
            <p className='mt-2.5 text-[15px] text-[#5a677a] md:text-[16px]'>
              Nurturing the next generation through learning and values
            </p>
          </div>

          <div className='mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3'>
            {educationCards.map((card) => (
              <EducationCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>

      <div className='bg-[#3567c4] px-4 py-10 md:px-6 md:py-11'>
        <div className='mx-auto grid max-w-[1280px] grid-cols-1 gap-5 lg:grid-cols-2'>
          {ctaCards.map((card) => (
            <CtaCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default YouthEducationSection
