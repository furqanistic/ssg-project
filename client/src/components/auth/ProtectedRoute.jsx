import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const ProtectedRoute = ({ children }) => {
  const session = useAuthStore((state) => state.session)

  if (!session?.accessToken) {
    return <Navigate to='/auth' replace />
  }

  return children
}

export default ProtectedRoute
