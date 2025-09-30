import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/shared/store/auth'

export const useAuth = () => {

  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading, logout } = useAuthStore()

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/login?returnTo=${encodeURIComponent(pathname)}`)
    }
  }

  const requireGuest = () => {
    if (!isLoading && isAuthenticated) {
      router.replace('/')
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    requireAuth,
    requireGuest
  }
}
