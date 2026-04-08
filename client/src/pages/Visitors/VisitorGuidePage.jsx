import React, { useEffect } from 'react'
import {
  BookOpen,
  Clock3,
  Info,
  Mail,
  MapPin,
  Phone,
  Shirt,
  UtensilsCrossed,
} from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useSiteContentQuery } from '@/hooks/useContent'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'

const etiquetteCards = [
  {
    title: 'Head Covering',
    description:
      "All visitors must cover their heads before entering the prayer hall. Scarves are available at the entrance if you don't have one.",
    icon: Shirt,
    accent: 'bg-[#f6ab3c]',
  },
  {
    title: 'Shoes Off',
    description:
      'Please remove your shoes before entering the main building. Shoe racks are provided at the entrance.',
    icon: Info,
    accent: 'bg-[#2d4f9f]',
  },
  {
    title: 'No Tobacco or Alcohol',
    description:
      'Tobacco products and alcohol are strictly prohibited on the Gurudwara premises.',
    icon: UtensilsCrossed,
    accent: 'bg-[#f6ab3c]',
  },
  {
    title: 'Modest Dress',
    description:
      'Please dress modestly. Legs and shoulders should be covered. Long pants or skirts and shirts with sleeves are appropriate.',
    icon: Info,
    accent: 'bg-[#2d4f9f]',
  },
]

const additionalGuidelines = [
  'Sit on the floor in the prayer hall (cushions are provided)',
  'Keep your feet pointed away from Sri Guru Granth Sahib Ji',
  'Maintain silence in the prayer hall',
  'Photography is permitted, but please be respectful during prayers',
  'All food served is vegetarian',
]

const dailySchedule = [
  { label: 'Morning Prayer (Asa Di Var)', value: '5:00 AM - 7:00 AM' },
  { label: 'Gurudwara Open', value: '6:00 AM - 9:00 PM' },
  { label: 'Evening Prayer (Rehras Sahib)', value: '6:00 PM - 7:00 PM' },
  { label: 'Night Prayer (Kirtan Sohila)', value: '8:30 PM' },
]

const langarSchedule = [
  { label: 'Lunch', value: '12:00 PM - 2:00 PM' },
  { label: 'Dinner', value: '7:00 PM - 8:00 PM' },
]

const faqItems = [
  {
    question: 'Do I need to be Sikh to visit?',
    answer:
      'No! Everyone is welcome regardless of religion, race, or background. The Gurudwara is open to all.',
  },
  {
    question: 'Is the langar really free?',
    answer:
      'Yes, langar (community meal) is completely free for everyone. This is a core principle of Sikhism - sharing food with all without distinction.',
  },
  {
    question: 'What should I wear?',
    answer:
      "Dress modestly with covered legs and shoulders. You'll need to cover your head (scarves provided) and remove shoes before entering.",
  },
  {
    question: 'Can I take photos?',
    answer:
      'Yes, but please be respectful, especially during prayers. Ask permission before photographing people.',
  },
  {
    question: 'Is there a donation expected?',
    answer:
      'Donations are welcome but not required. There is no entrance fee or expectation.',
  },
]

const VisitorGuidePage = () => {
  const location = useLocation()
  const { data: content } = useSiteContentQuery()
  const [visitorContent, setVisitorContent] = React.useState({
    rulesEtiquette: etiquetteCards.map((item) => item.description),
    openingTimings: {
      dailySchedule,
      langarSchedule,
      sundaySpecial: 'Weekly Kirtan Darbar: 11:00 AM - 1:00 PM followed by Langar',
    },
    location: {
      addressLines: ['Sikh Tempel Berlin', 'Wollankstraße 8', '13187 Berlin', 'Germany'],
      howToReach: [
        'U-Bahn: Take U8 to Pankstraße station (5 min walk)',
        'Tram: M1 or 50 to Wollankstraße/Soldiner Straße',
      ],
    },
    contact: {
      phone: '+49 30 47375651',
      email: 'info@ssgberlin.de',
    },
  })

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const target = document.getElementById(location.hash.slice(1))
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

  useEffect(() => {
    if (!content) {
      return
    }

    setVisitorContent((prev) => ({
      ...prev,
      rulesEtiquette:
        content?.visitors?.rulesEtiquette?.length > 0
          ? content.visitors.rulesEtiquette
          : prev.rulesEtiquette,
      openingTimings: {
        dailySchedule:
          content?.visitors?.openingTimings?.dailySchedule?.length > 0
            ? content.visitors.openingTimings.dailySchedule
            : prev.openingTimings.dailySchedule,
        langarSchedule:
          content?.visitors?.openingTimings?.langarSchedule?.length > 0
            ? content.visitors.openingTimings.langarSchedule
            : prev.openingTimings.langarSchedule,
        sundaySpecial:
          content?.visitors?.openingTimings?.sundaySpecial ??
          prev.openingTimings.sundaySpecial,
      },
      location: {
        addressLines:
          content?.visitors?.location?.addressLines?.length > 0
            ? content.visitors.location.addressLines
            : prev.location.addressLines,
        howToReach:
          content?.visitors?.location?.howToReach?.length > 0
            ? content.visitors.location.howToReach
            : prev.location.howToReach,
      },
      contact: {
        phone: content?.contact?.phone ?? prev.contact.phone,
        email: content?.contact?.email ?? prev.contact.email,
      },
    }))
  }, [content])

  return (
    <div className='min-h-screen bg-white font-["Manrope","Segoe_UI",sans-serif]'>
      <div className='relative'>
        <NavbarSection />
        <section className='bg-[#3567c4] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[1040px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                Visitor Information
              </h1>
              <p className='mt-3 text-[17px] text-white/90 md:text-[18px]'>
                Welcome! Here&apos;s everything you need to know before your
                visit
              </p>
            </div>
          </div>
        </section>
      </div>

      <section id='visitor-guide' className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1040px]'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Visitor Guide
            </h2>
            <p className='mt-7 text-[16px] leading-[1.6] text-[#1d2431] md:text-[17px]'>
              Singh Sabha Gurudwara Berlin welcomes visitors of all
              backgrounds, faiths, and beliefs. A Gurudwara is a place of
              worship for Sikhs, but our doors are open to everyone who comes
              with a respectful heart.
              <br />
              Whether you&apos;re visiting for worship, to learn about Sikhism,
              or to enjoy a free meal in our langar hall, you are welcome here.
            </p>
          </div>
        </div>
      </section>

      <section
        id='rules-etiquette'
        className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'
      >
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1040px]'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Rules & Etiquette
            </h2>

            <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-2'>
              {visitorContent.rulesEtiquette.map((rule, index) => {
                const card = etiquetteCards[index % etiquetteCards.length]
                const Icon = card.icon
                return (
                  <article
                    key={`${rule}-${index}`}
                    className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
                  >
                    <div
                      className={`mb-5 flex h-12 w-12 items-center justify-center rounded-[12px] text-white ${card.accent}`}
                    >
                      <Icon className='h-5 w-5 stroke-[2]' />
                    </div>
                    <h3 className='text-[20px] font-bold tracking-[-0.02em] text-[#111318]'>
                      {card.title}
                    </h3>
                    <p className='mt-4 text-[15px] leading-[1.6] text-[#5a677a] md:text-[16px]'>
                      {rule}
                    </p>
                  </article>
                )
              })}
            </div>

            <div className='mt-8 rounded-[14px] border border-[#cfe0ff] bg-[#ebf3ff] px-6 py-6'>
              <div className='flex items-center gap-3'>
                <BookOpen className='h-5 w-5 text-[#2d4f9f]' />
                <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                  Additional Guidelines
                </h3>
              </div>
              <ul className='mt-5 space-y-3 text-[15px] leading-[1.55] text-[#516075] md:text-[16px]'>
                {additionalGuidelines.map((guideline) => (
                  <li key={guideline}>• {guideline}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id='opening-timings' className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1040px]'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Opening Timings
            </h2>

            <div className='mt-8 rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
              <div className='space-y-8'>
                <div>
                  <div className='flex items-center gap-4'>
                    <Clock3 className='h-5 w-5 text-[#f39d2f]' />
                    <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                      Daily Schedule
                    </h3>
                  </div>
                  <div className='mt-4 space-y-3'>
                    {visitorContent.openingTimings.dailySchedule.map((item) => (
                      <div
                        key={item.label}
                        className='flex flex-col gap-1 text-[15px] text-[#516075] sm:flex-row sm:items-center sm:justify-between md:text-[16px]'
                      >
                        <span>{item.label}</span>
                        <span className='font-semibold text-[#4d5d76]'>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='border-t border-[#e5e9f0] pt-8'>
                  <div className='flex items-center gap-4'>
                    <Clock3 className='h-5 w-5 text-[#f39d2f]' />
                    <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                      Langar (Free Meal)
                    </h3>
                  </div>
                  <div className='mt-4 space-y-3'>
                    {visitorContent.openingTimings.langarSchedule.map((item) => (
                      <div
                        key={item.label}
                        className='flex flex-col gap-1 text-[15px] text-[#516075] sm:flex-row sm:items-center sm:justify-between md:text-[16px]'
                      >
                        <span>{item.label}</span>
                        <span className='font-semibold text-[#4d5d76]'>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='border-t border-[#e5e9f0] pt-8'>
                  <div className='flex items-center gap-4'>
                    <Clock3 className='h-5 w-5 text-[#f39d2f]' />
                    <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                      Sunday Special
                    </h3>
                  </div>
                  <p className='mt-4 text-[15px] leading-[1.55] text-[#516075] md:text-[16px]'>
                    {visitorContent.openingTimings.sundaySpecial}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='location-map' className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1040px]'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Location & How to Reach
            </h2>

            <div className='mt-8 rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
              <div className='flex items-start gap-4'>
                <MapPin className='mt-1 h-5 w-5 text-[#f39d2f]' />
                <div>
                  <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                    Address
                  </h3>
                  <p className='mt-4 text-[15px] leading-[1.55] text-[#516075] md:text-[16px]'>
                    {visitorContent.location.addressLines.map((line) => (
                      <React.Fragment key={line}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>

              <div className='mt-8 flex h-[300px] items-center justify-center rounded-[14px] bg-[#edf1f7] text-[16px] text-[#7a879b] md:h-[430px]'>
                Map integration would be here
              </div>

              <div className='mt-8 text-[15px] leading-[1.65] text-[#516075] md:text-[16px]'>
                <h3 className='font-bold text-[#111318]'>By Public Transport</h3>
                <p className='mt-3'>
                  {visitorContent.location.howToReach[0] ?? ''}
                </p>
                <p>
                  {visitorContent.location.howToReach[1] ?? ''}
                </p>

                <h3 className='mt-7 font-bold text-[#111318]'>By Car</h3>
                <p className='mt-3'>
                  Limited parking available nearby. Street parking also
                  available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='contact-information' className='px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1040px]'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Contact Information
            </h2>

            <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
              <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
                <Phone className='h-7 w-7 text-[#f39d2f]' />
                <h3 className='mt-6 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                  Phone
                </h3>
                <p className='mt-3 text-[16px] text-[#516075]'>{visitorContent.contact.phone}</p>
              </article>

              <article className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'>
                <Mail className='h-7 w-7 text-[#f39d2f]' />
                <h3 className='mt-6 text-[18px] font-bold text-[#111318] md:text-[19px]'>
                  Email
                </h3>
                <p className='mt-3 text-[16px] text-[#516075]'>{visitorContent.contact.email}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id='faq' className='bg-[#f4f6f9] px-4 py-16 md:px-6 md:py-18'>
        <div className='mx-auto max-w-[1280px]'>
          <div className='mx-auto max-w-[1040px]'>
            <h2 className='text-[34px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[38px]'>
              Frequently Asked Questions
            </h2>

            <div className='mt-8 space-y-6'>
              {faqItems.map((item) => (
                <article
                  key={item.question}
                  className='rounded-[18px] border border-[#dbe1ea] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(13,23,45,0.02)]'
                >
                  <h3 className='text-[18px] font-bold text-[#111318] md:text-[19px]'>
                    {item.question}
                  </h3>
                  <p className='mt-4 text-[15px] leading-[1.6] text-[#516075] md:text-[16px]'>
                    {item.answer}
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

export default VisitorGuidePage
