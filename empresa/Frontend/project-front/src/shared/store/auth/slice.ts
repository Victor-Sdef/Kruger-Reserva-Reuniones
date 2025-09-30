import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { RegisterInput, User, LoginInput } from './types'
import { AuthService } from '@/shared/services/auth'
import { toast } from 'sonner'

interface AuthState {
  user: User | null
  tokens: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  register: (data: RegisterInput) => Promise<void>
  login: (credentials: LoginInput) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setTokens: (tokens: string | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user })
      },

      setTokens: (tokens) => {
        set({ tokens })
      },

      register: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const response = await AuthService.register(data)
          set({ 
            user: response.user,
            tokens: response.token,
            isAuthenticated: true,
            isLoading: false 
          })
          toast.success('¡Registro exitoso!', {
            description: 'Tu cuenta ha sido creada correctamente.'
          })
        } catch (error) {
          const errorMessage = (error as Error).message
          set({ 
            error: errorMessage,
            isLoading: false 
          })
          toast.error('Error en el registro', {
            description: errorMessage || 'Ocurrió un error al crear la cuenta.'
          })
        }
      },

      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          console.log('🔍 Login attempt with:', credentials)
          const response = await AuthService.login(credentials)
          console.log('🔍 Login response:', response)
          
          set({ 
            user: response.user,
            tokens: response.token,
            isAuthenticated: true,
            isLoading: false 
          })
          
          console.log('🔍 Auth state updated:', {
            user: response.user,
            hasToken: !!response.token,
            isAuthenticated: true
          })
        } catch (error) {
          console.error('🔍 Login error:', error)
          const errorMessage = (error as Error).message
          set({ 
            error: errorMessage,
            isLoading: false 
          })
          toast.error('Error al iniciar sesión', {
            description: errorMessage || 'Credenciales inválidas. Por favor, inténtelo nuevamente.'
          })
        }
      },

      logout: () => {
        console.log('🚪 Logging out and clearing localStorage...');
        
        // Limpiar el estado de Zustand
        set({ 
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        })
        
        // Limpiar manualmente el localStorage por si acaso
        try {
          localStorage.removeItem('auth-storage');
          console.log('🗑️ localStorage cleared manually');
        } catch (error) {
          console.warn('⚠️ Could not clear localStorage:', error);
        }
        
        console.log('✅ Logout completed');
      }
    }),
    {
      name: 'auth-storage', // nombre para el almacenamiento
      partialize: (state) => ({ 
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated
      }) // solo guardamos estos campos
    }
  )
)
