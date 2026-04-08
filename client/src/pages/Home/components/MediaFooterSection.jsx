import React from 'react'
import { CalendarDays, Heart, Users } from 'lucide-react'
import SiteFooter from '@/components/layout/SiteFooter'

const mediaImages = [
  {
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80',
    alt: 'Temple lights at night',
  },
  {
    src: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=900&q=80',
    alt: 'Community gathering',
  },
  {
    src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=80',
    alt: 'Volunteer outdoors',
  },
  {
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
    alt: 'Children learning together',
  },
]

const highlights = [
  {
    icon: CalendarDays,
    title: 'Daily Programs',
    text: 'Morning and evening prayers every day',
  },
  {
    icon: Users,
    title: 'Open to All',
    text: 'Everyone is welcome regardless of background',
  },
  {
    icon: Heart,
    title: 'Free Langar',
    text: 'Community kitchen serving free meals daily',
  },
]

const MediaFooterSection = () => {
  return (
    <section className='bg-[#f2f2f2]'>
      <div className='px-4 py-14 md:px-6 md:py-16'>
        <div className='mx-auto max-w-[1280px]'>
          <div>
            <h2 className='text-[28px] font-extrabold tracking-[-0.02em] text-[#111318] md:text-[40px]'>
              Latest Media
            </h2>
            <p className='mt-2 text-[17px] text-[#5a677a]'>
              Moments from our community
            </p>
          </div>

          <div className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
            {mediaImages.map((image) => (
              <div
                key={image.alt}
                className='h-[260px] overflow-hidden rounded-[16px] bg-[#d7dce5] md:h-[286px]'
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className='h-full w-full object-cover'
                  loading='lazy'
                />
              </div>
            ))}
          </div>

          <div className='mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8'>
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className='text-center'>
                <div className='mx-auto flex h-14 w-14 items-center justify-center text-[#f6ab3c]'>
                  <Icon className='h-11 w-11 stroke-[1.8]' />
                </div>
                <h3 className='mt-5 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                  {title}
                </h3>
                <p className='mt-3 text-[16px] text-[#5a677a]'>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />
    </section>
  )
}

export default MediaFooterSection
