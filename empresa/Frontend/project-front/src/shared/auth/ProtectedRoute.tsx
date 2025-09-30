"use client";
import { useEffect } from 'react'
import { useAuth } from '@/shared/hooks/useAuth'
import { Loading } from '@/components/atoms/loading'

interface ProtectedRouteProps {
  children: React.ReactNode
  isPublic?: boolean
}

export const ProtectedRoute = ({ children, isPublic = false }: ProtectedRouteProps) => {
  const { isLoading, requireAuth, requireGuest } = useAuth()

  useEffect(() => {
    if (isPublic) {
      requireGuest()
    } else {
      requireAuth()
    }
  }, [isPublic, requireAuth, requireGuest])

  if (isLoading) {
    return <Loading />
  }

  return <>{children}</>
}
