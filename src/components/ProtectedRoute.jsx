import React from 'react'
import { useAuthContext } from "../context/AuthContext/AuthContextProvider"
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoute() {
    const { user } = useAuthContext()

  return (
    user ? <Outlet /> : <Navigate to={'/login'} replace/>
  )
}

export default ProtectedRoute