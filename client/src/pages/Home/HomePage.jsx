// File: client/src/pages/Home/HomePage.jsx
import React from 'react'
import HeroSection from './components/HeroSection'
import HukamnamaSection from './components/HukamnamaSection'
import MediaFooterSection from './components/MediaFooterSection'
import NavbarSection from './components/NavbarSection'
import UpcomingEventsSection from './components/UpcomingEventsSection'
import YouthEducationSection from './components/YouthEducationSection'

const HomePage = () => {
  return (
    <div className='bg-[#f3f3f3]'>
      <div className='relative'>
        <NavbarSection />
        <HeroSection />
      </div>
      <HukamnamaSection />
      <UpcomingEventsSection />
      <YouthEducationSection />
      <MediaFooterSection />
    </div>
  )
}

export default HomePage
