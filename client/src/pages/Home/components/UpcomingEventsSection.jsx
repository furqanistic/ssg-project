import React from 'react'
import { ArrowRight, CalendarDays, Clock3, MapPin } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Vaisakhi Celebration 2026',
    date: 'April 14, 2026',
    time: '9:00 AM - 6:00 PM',
    location: 'Singh Sabha Gurudwara Berlin',
    description:
      'Join us for the grand celebration of Vaisakhi, commemorating the formation of the Khalsa.',
    image:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Weekly Kirtan Darbar',
    date: 'Every Sunday',
    time: '11:00 AM - 1:00 PM',
    location: 'Main Hall',
    description:
      'Weekly congregational singing of hymns from Sri Guru Granth Sahib Ji.',
    image:
      'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Gurmukhi Learning Session',
    date: 'Every Saturday',
    time: '3:00 PM - 5:00 PM',
    location: 'Education Room',
    description: 'Learn to read and write Gurmukhi script. All ages welcome.',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
  },
]

const EventMetaRow = ({ icon: Icon, text }) => (
  <div className='flex items-center gap-2 text-[15px] text-[#5a677a] md:text-[16px]'>
    <Icon className='h-4 w-4 text-[#f5a437]' />
    <span>{text}</span>
  </div>
)

const UpcomingEventsSection = () => {
  return (
    <section className='bg-[#f2f2f2] px-4 pb-8 pt-2 md:px-6 md:pb-11 md:pt-3'>
      <div className='mx-auto w-full max-w-[1280px]'>
        <div className='mb-5 flex items-start justify-between gap-4 md:mb-6'>
          <div>
            <h2 className='text-[34px] font-extrabold tracking-[-0.02em] text-[#111318] md:text-[38px]'>
              Upcoming Events
            </h2>
            <p className='mt-1 text-[15px] text-[#5b687a] md:text-[16px]'>
              Join us for spiritual and community programs
            </p>
          </div>

          <button
            type='button'
            className='mt-1 hidden items-center gap-2 text-[14px] font-semibold text-[#f5a437] transition hover:text-[#e99a2b] md:flex'
          >
            View All Events
            <ArrowRight className='h-4 w-4' />
          </button>
        </div>

        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {events.map((event) => (
            <article
              key={event.id}
              className='overflow-hidden rounded-[12px] border border-[#d6d9df] bg-[#f4f5f7]'
            >
              <div className='h-[210px] w-full bg-[#9ca7ba] md:h-[240px]'>
                <img
                  src={event.image}
                  alt={event.title}
                  className='h-full w-full object-cover'
                  loading='lazy'
                />
              </div>

              <div className='px-5 py-5'>
                <h3 className='text-[20px] font-bold text-[#13161b] md:text-[21px]'>
                  {event.title}
                </h3>

                <div className='mt-3.5 space-y-2'>
                  <EventMetaRow icon={CalendarDays} text={event.date} />
                  <EventMetaRow icon={Clock3} text={event.time} />
                  <EventMetaRow icon={MapPin} text={event.location} />
                </div>

                <p className='mt-3.5 text-[15px] leading-[1.5] text-[#5a677a] md:text-[16px]'>
                  {event.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <button
          type='button'
          className='mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#f5a437] transition hover:text-[#e99a2b] md:hidden'
        >
          View All Events
          <ArrowRight className='h-4 w-4' />
        </button>
      </div>
    </section>
  )
}

export default UpcomingEventsSection
