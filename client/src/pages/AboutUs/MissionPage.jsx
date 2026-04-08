import React from 'react'
import { BookOpen, Globe, Heart, Users } from 'lucide-react'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const missionCards = [
  {
    title: 'Spiritual Growth',
    description:
      'Foster spiritual development through daily prayers, kirtan, and the teachings of Sri Guru Granth Sahib Ji.',
    icon: Heart,
    accent: 'bg-[#f6ab3c]',
  },
  {
    title: 'Community Service',
    description:
      'Embody the principle of seva through langar, volunteer programs, and support for those in need.',
    icon: Users,
    accent: 'bg-[#2d4f9f]',
  },
  {
    title: 'Education',
    description:
      'Provide educational programs for all ages to preserve Sikh heritage, language, and values.',
    icon: BookOpen,
    accent: 'bg-[#f6ab3c]',
  },
  {
    title: 'Inclusivity',
    description:
      'Welcome people of all backgrounds and create a space of equality, respect, and unity.',
    icon: Globe,
    accent: 'bg-[#2d4f9f]',
  },
]

const coreValues = [
  {
    title: 'Naam Japna',
    description:
      "Meditation on God's name and remembering the Divine in all aspects of life.",
  },
  {
    title: 'Kirat Karni',
    description: 'Earning an honest living through hard work and integrity.',
  },
  {
    title: 'Vand Chakna',
    description:
      'Sharing with others and contributing to the welfare of the community.',
  },
]

const MissionPage = () => {
  return (
    <div className='min-h-screen bg-white font-["Manrope","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='px-4 pb-18 pt-28 md:px-6 md:pb-20 md:pt-26'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[900px] text-center'>
              <h1 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
                Our Mission
              </h1>
              <p className='mx-auto mt-6 max-w-[900px] text-[17px] leading-[1.6] text-[#516075] md:text-[18px]'>
                To provide a welcoming spiritual home where individuals can
                connect with Waheguru, practice Sikh values, and serve the
                community with compassion and humility.
              </p>
            </div>

            <div className='mx-auto mt-12 grid max-w-[870px] grid-cols-1 gap-6 md:grid-cols-2'>
              {missionCards.map(({ title, description, icon: Icon, accent }) => (
                <article
                  key={title}
                  className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-[12px] text-white ${accent}`}
                  >
                    <Icon className='h-5 w-5 stroke-[2]' />
                  </div>
                  <h2 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318]'>
                    {title}
                  </h2>
                  <p className='mt-3 text-[15px] leading-[1.55] text-[#5a677a] md:text-[16px]'>
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[870px]'>
            <h2 className='text-center text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Core Values
            </h2>

            <div className='mt-10 space-y-6'>
              {coreValues.map((value) => (
                <article
                  key={value.title}
                  className='rounded-[14px] border border-[#e2e6ed] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
                >
                  <h3 className='text-[18px] font-extrabold text-[#f39d2f] md:text-[19px]'>
                    {value.title}
                  </h3>
                  <p className='mt-3 text-[15px] leading-[1.55] text-[#516075] md:text-[16px]'>
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default MissionPage
