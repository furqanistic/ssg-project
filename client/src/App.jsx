// File: client/src/App.jsx
import HomePage from '@/pages/Home/HomePage'
import CommitteePage from '@/pages/AboutUs/CommitteePage'
import ContactPage from '@/pages/Contact/ContactPage'
import DonatePage from '@/pages/Donate/DonatePage'
import GovernancePage from '@/pages/AboutUs/GovernancePage'
import HistoryPage from '@/pages/AboutUs/HistoryPage'
import MissionPage from '@/pages/AboutUs/MissionPage'
import AuthPage from '@/pages/Auth/AuthPage'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import DashboardPage from '@/pages/Dashboard/DashboardPage'
import ProgramsPage from '@/pages/Events/ProgramsPage'
import MediaCenterPage from '@/pages/Media/MediaCenterPage'
import VisitorGuidePage from '@/pages/Visitors/VisitorGuidePage'
import YouthEducationPage from '@/pages/YouthEducation/YouthEducationPage'
import CremationFundPage from '@/pages/Services/CremationFundPage'
import LibraryPage from '@/pages/Resources/LibraryPage'
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/'>
            <Route index element={<HomePage />} />
            <Route path='about-us/committee' element={<CommitteePage />} />
            <Route path='about-us/governance' element={<GovernancePage />} />
            <Route path='about-us/history' element={<HistoryPage />} />
            <Route path='about-us/mission' element={<MissionPage />} />
            <Route path='auth' element={<AuthPage />} />
            <Route
              path='dashboard/*'
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path='contact' element={<ContactPage />} />
            <Route path='donate' element={<DonatePage />} />
            <Route path='events/programs' element={<ProgramsPage />} />
            <Route path='media' element={<MediaCenterPage />} />
            <Route path='resources/library' element={<LibraryPage />} />
            <Route path='visitors/guide' element={<VisitorGuidePage />} />
            <Route path='youth-education' element={<YouthEducationPage />} />
            <Route path='services/antim-sanskar-fund' element={<CremationFundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
