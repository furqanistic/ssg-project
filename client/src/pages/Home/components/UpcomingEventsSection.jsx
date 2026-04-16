import React from 'react'
import { ArrowRight, CalendarDays, Clock3, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useEventsContentQuery } from '@/hooks/useEventsContent'

const EventMetaRow = ({ icon, text }) => (
  <div className='flex items-center gap-2 text-[15px] text-[#5a677a] md:text-[16px]'>
    {React.createElement(icon, { className: 'h-4 w-4 text-[#f5a437]' })}
    <span>{text}</span>
  </div>
)

const UpcomingEventsSection = () => {
  const { t } = useTranslation()
  const { events } = useEventsContentQuery()
  const featuredEvents = events.slice(0, 3)

  return (
    <section className='bg-[#f2f2f2] px-4 pb-8 pt-2 md:px-6 md:pb-11 md:pt-3'>
      <div className='mx-auto w-full max-w-[1280px]'>
        <div className='mb-5 flex items-start justify-between gap-4 md:mb-6'>
          <div>
            <h2 className='text-[34px] font-extrabold tracking-[-0.02em] text-[#111318] md:text-[38px]'>
              {t('home.events.title')}
            </h2>
            <p className='mt-1 text-[15px] text-[#5b687a] md:text-[16px]'>
              {t('home.events.subtitle')}
            </p>
          </div>

          <Link
            to='/events/programs#all'
            className='mt-1 hidden items-center gap-2 text-[14px] font-semibold text-[#f5a437] transition hover:text-[#e99a2b] md:flex'
          >
            {t('common.actions.viewAllEvents')}
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>

        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {featuredEvents.length > 0 ? (
            featuredEvents.map((event) => (
              <article
                key={event.id}
                className='overflow-hidden rounded-[12px] border border-[#d6d9df] bg-[#f4f5f7]'
              >
                <div className='h-[210px] w-full bg-[#9ca7ba] md:h-[240px]'>
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className='h-full w-full object-cover'
                      loading='lazy'
                    />
                  ) : null}
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
            ))
          ) : (
            <div className='rounded-[12px] border border-dashed border-[#d6d9df] bg-white px-6 py-10 text-center text-[#5a677a] lg:col-span-3'>
              No events are available right now. When you add them in the dashboard, they will appear here automatically.
            </div>
          )}
        </div>

        <Link
          to='/events/programs#all'
          className='mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#f5a437] transition hover:text-[#e99a2b] md:hidden'
        >
          {t('common.actions.viewAllEvents')}
          <ArrowRight className='h-4 w-4' />
        </Link>
      </div>
    </section>
  )
}

export default UpcomingEventsSection
