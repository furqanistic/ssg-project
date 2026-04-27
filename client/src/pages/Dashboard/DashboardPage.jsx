import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardAboutPage from '@/pages/Dashboard/sections/DashboardAboutPage'
import DashboardContactPage from '@/pages/Dashboard/sections/DashboardContactPage'
import DashboardDonatePage from '@/pages/Dashboard/sections/DashboardDonatePage'
import DashboardEventsPage from '@/pages/Dashboard/sections/DashboardEventsPage'
import DashboardMediaPage from '@/pages/Dashboard/sections/DashboardMediaPage'
import DashboardProfilePage from '@/pages/Dashboard/sections/DashboardProfilePage'
import DashboardVisitorsPage from '@/pages/Dashboard/sections/DashboardVisitorsPage'

const DashboardPage = () => {
  return (
    <Routes>
      <Route index element={<Navigate to='visitors' replace />} />
      <Route path='visitors' element={<DashboardVisitorsPage />} />
      <Route path='events' element={<DashboardEventsPage />} />
      <Route path='media' element={<DashboardMediaPage />} />
      <Route path='contact' element={<DashboardContactPage />} />
      <Route path='donate' element={<DashboardDonatePage />} />
      <Route path='about' element={<DashboardAboutPage />} />
      <Route path='about-us' element={<DashboardAboutPage />} />
      <Route path='profile' element={<DashboardProfilePage />} />
      <Route path='*' element={<Navigate to='visitors' replace />} />
    </Routes>
  )
}

export default DashboardPage
