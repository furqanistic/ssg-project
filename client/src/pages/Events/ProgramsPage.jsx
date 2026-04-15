import React, { useEffect } from 'react'
import { CalendarDays, Clock3, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSiteContentQuery } from '@/hooks/useContent'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const tabs = ['all', 'daily', 'weekly', 'monthly', 'yearly']

const defaultEvents = [
  {
    title: 'Vaisakhi Celebration 2026',
    date: 'April 14, 2026',
    time: '9:00 AM - 6:00 PM',
    location: 'Singh Sabha Gurudwara Berlin',
    description:
      'Join us for the grand celebration of Vaisakhi, commemorating the formation of the Khalsa.',
    image:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    category: 'yearly',
  },
  {
    title: 'Gurpurab - Guru Nanak Dev Ji',
    date: 'November 15, 2026',
    time: '6:00 AM - 10:00 PM',
    location: 'Singh Sabha Gurudwara Berlin',
    description:
      'Celebrate the birth anniversary of Guru Nanak Dev Ji with kirtan, prayers, and langar.',
    image:
      'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80',
    category: 'yearly',
  },
  {
    title: 'Weekly Kirtan Darbar',
    date: 'Every Sunday',
    time: '11:00 AM - 1:00 PM',
    location: 'Main Hall',
    description:
      'Weekly congregational singing of hymns from Sri Guru Granth Sahib Ji followed by langar.',
    image:
      'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80',
    category: 'weekly',
  },
  {
    title: 'Asa Di Var - Morning Prayer',
    date: 'Daily',
    time: '5:00 AM - 7:00 AM',
    location: 'Main Hall',
    description: 'Daily morning prayers with recitation of Asa Di Var.',
    image: null,
    category: 'daily',
  },
  {
    title: 'Rehras Sahib - Evening Prayer',
    date: 'Daily',
    time: '6:00 PM - 7:00 PM',
    location: 'Main Hall',
    description: 'Daily evening prayers with Rehras Sahib.',
    image: null,
    category: 'daily',
  },
  {
    title: 'Gurmukhi Learning Session',
    date: 'Every Saturday',
    time: '3:00 PM - 5:00 PM',
    location: 'Education Room',
    description:
      'Learn to read and write Gurmukhi script. All ages welcome.',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    category: 'weekly',
  },
  {
    title: 'Monthly Sangat Gathering',
    date: 'First Saturday of Every Month',
    time: '4:00 PM - 7:00 PM',
    location: 'Community Hall',
    description:
      'Monthly congregation gathering for prayer, discussion, and fellowship.',
    image:
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
    category: 'monthly',
  },
  {
    title: 'Diwali Celebration',
    date: 'October 20, 2026',
    time: '5:00 PM - 9:00 PM',
    location: 'Singh Sabha Gurudwara Berlin',
    description:
      'Join the community for prayers, kirtan, and celebration on Diwali.',
    image:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    category: 'yearly',
  },
]

const EventMetaRow = ({ icon: Icon, text }) => (
  <div className='flex items-center gap-2 text-[15px] text-[#5a677a]'>
    <Icon className='h-4 w-4 text-[#f39d2f]' />
    <span>{text}</span>
  </div>
)

const ProgramsPage = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { data: content } = useSiteContentQuery()
  const events =
    Array.isArray(content?.events?.items) && content.events.items.length > 0
      ? content.events.items
      : defaultEvents

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
            {filteredEvents.map((event) => (
              <article
                key={`${event.title}-${event.date}`}
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
            ))}
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
