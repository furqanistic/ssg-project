// File: client/src/App.jsx
import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

const HomePage = lazy(() => import('@/pages/Home/HomePage'))
const CommitteePage = lazy(() => import('@/pages/AboutUs/CommitteePage'))
const ContactPage = lazy(() => import('@/pages/Contact/ContactPage'))
const DonatePage = lazy(() => import('@/pages/Donate/DonatePage'))
const GovernancePage = lazy(() => import('@/pages/AboutUs/GovernancePage'))
const HistoryPage = lazy(() => import('@/pages/AboutUs/HistoryPage'))
const MissionPage = lazy(() => import('@/pages/AboutUs/MissionPage'))
const AuthPage = lazy(() => import('@/pages/Auth/AuthPage'))
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'))
const ProgramsPage = lazy(() => import('@/pages/Events/ProgramsPage'))
const MediaCenterPage = lazy(() => import('@/pages/Media/MediaCenterPage'))
const VisitorGuidePage = lazy(() => import('@/pages/Visitors/VisitorGuidePage'))
const YouthEducationPage = lazy(() => import('@/pages/YouthEducation/YouthEducationPage'))
const CremationFundPage = lazy(() => import('@/pages/Services/CremationFundPage'))
const LibraryPage = lazy(() => import('@/pages/Resources/LibraryPage'))

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className='min-h-screen bg-[#f8faff]' />}>
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
      </Suspense>
    </BrowserRouter>
  )
}

export default App
