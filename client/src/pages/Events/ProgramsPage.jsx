import React, { useEffect } from 'react'
import { CalendarDays, Clock3, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEventsContentQuery } from '@/hooks/useEventsContent'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const tabs = ['all', 'daily', 'weekly', 'monthly', 'yearly']

const EventMetaRow = ({ icon, text }) => (
  <div className='flex items-center gap-2 text-[15px] text-[#5a677a]'>
    {React.createElement(icon, { className: 'h-4 w-4 text-[#f39d2f]' })}
    <span>{text}</span>
  </div>
)

const ProgramsPage = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { events } = useEventsContentQuery()

  const currentTab = tabs.includes(location.hash.slice(1))
    ? location.hash.slice(1)
    : 'all'

  useEffect(() => {
    const hash = location.hash.slice(1)
    if (!hash) {
      navigate('/events/programs#all', { replace: true })
      return
    }

    const target = document.getElementById('events-tabs')
    if (!target) {
      return
    }

    requestAnimationFrame(() => {
      const navbarOffset = 88
      const top =
        target.getBoundingClientRect().top + window.scrollY - navbarOffset

      window.scrollTo({ top, behavior: 'smooth' })
    })
  }, [location.hash, navigate])

  const filteredEvents =
    currentTab === 'all'
      ? events
      : events.filter((event) => event.category === currentTab)

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='bg-[#3567c4] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[1040px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                {t('eventsPage.heading')}
              </h1>
              <p className='mt-3 text-[17px] text-white/90 md:text-[18px]'>
                {t('eventsPage.subtitle')}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section id='events-tabs' className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='inline-flex rounded-full bg-[#f1f3f6] p-1.5'>
            {tabs.map((tab) => {
              const isActive = currentTab === tab

              return (
                <button
                  key={tab}
                  type='button'
                  onClick={() => navigate(`/events/programs#${tab}`)}
                  className={`rounded-full px-4 py-2 text-[14px] font-medium capitalize transition ${
                    isActive
                      ? 'bg-white text-[#111318] shadow-[0_1px_2px_rgba(13,23,45,0.08)]'
                      : 'text-[#111318] hover:text-[#264fb2]'
                  }`}
                >
                  {tab === 'all' ? t('eventsPage.tabs.all') : t(`eventsPage.tabs.${tab}`)}
                </button>
              )
            })}
          </div>

          <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <article
                  key={event.id}
                  className='overflow-hidden rounded-[16px] border border-[#dbe1ea] bg-white shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
                >
                  {event.image ? (
                    <div className='h-[220px] w-full bg-[#d8dde6]'>
                      <img
                        src={event.image}
                        alt={event.title}
                        className='h-full w-full object-cover'
                        loading='lazy'
                      />
                    </div>
                  ) : (
                    <div className='h-[220px] w-full bg-white' />
                  )}

                  <div className='px-5 py-5'>
                    <h2 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318]'>
                      {event.title}
                    </h2>

                    <div className='mt-4 space-y-2.5'>
                      <EventMetaRow icon={CalendarDays} text={event.date} />
                      <EventMetaRow icon={Clock3} text={event.time} />
                      <EventMetaRow icon={MapPin} text={event.location} />
                    </div>

                    <p className='mt-4 text-[15px] leading-[1.6] text-[#5a677a] md:text-[16px]'>
                      {event.description}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <div className='rounded-[16px] border border-dashed border-[#dbe1ea] bg-[#fafbfc] px-6 py-10 text-center text-[#5a677a] md:col-span-2 xl:col-span-3'>
                No events have been published yet. Add them from the dashboard and they will appear here automatically.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <h2 className='text-center text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
            {t('eventsPage.programsTitle')}
          </h2>

          <div className='mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            {t('eventsPage.highlights', { returnObjects: true }).map((program) => (
              <article
                key={program.title}
                className='rounded-[16px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
              >
                <h3 className='text-[18px] font-extrabold tracking-[-0.02em] text-[#f39d2f] md:text-[19px]'>
                  {program.title}
                </h3>
                <p className='mt-4 text-[15px] leading-[1.6] text-[#516075] md:text-[16px]'>
                  {program.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default ProgramsPage
