import React, { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const DashboardAboutPage = lazy(() => import('@/pages/Dashboard/sections/DashboardAboutPage'))
const DashboardContactPage = lazy(() => import('@/pages/Dashboard/sections/DashboardContactPage'))
const DashboardDonatePage = lazy(() => import('@/pages/Dashboard/sections/DashboardDonatePage'))
const DashboardEventsPage = lazy(() => import('@/pages/Dashboard/sections/DashboardEventsPage'))
const DashboardMediaPage = lazy(() => import('@/pages/Dashboard/sections/DashboardMediaPage'))
const DashboardProfilePage = lazy(() => import('@/pages/Dashboard/sections/DashboardProfilePage'))
const DashboardServicesPage = lazy(() => import('@/pages/Dashboard/sections/DashboardServicesPage'))
const DashboardVisitorsPage = lazy(() => import('@/pages/Dashboard/sections/DashboardVisitorsPage'))

const DashboardPage = () => {
  return (
    <Suspense fallback={<div className='min-h-screen bg-[#f8faff]' />}>
      <Routes>
        <Route index element={<Navigate to='visitors' replace />} />
        <Route path='visitors' element={<DashboardVisitorsPage />} />
        <Route path='events' element={<DashboardEventsPage />} />
        <Route path='media' element={<DashboardMediaPage />} />
        <Route path='contact' element={<DashboardContactPage />} />
        <Route path='donate' element={<DashboardDonatePage />} />
        <Route path='services' element={<DashboardServicesPage />} />
        <Route path='about' element={<DashboardAboutPage />} />
        <Route path='about-us' element={<DashboardAboutPage />} />
        <Route path='profile' element={<DashboardProfilePage />} />
        <Route path='*' element={<Navigate to='visitors' replace />} />
      </Routes>
    </Suspense>
  )
}

export default DashboardPage
