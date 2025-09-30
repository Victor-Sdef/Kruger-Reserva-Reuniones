import { httpClient } from '../http-client';
import { LoginInput, RegisterInput, User } from '@/shared/store/auth/types';

export interface AuthResponse {
  user: User;
  token: string;
}

// Respuesta real del backend
interface BackendAuthResponse {
  token: string;
  username: string;
  role: 'USER' | 'ADMIN';
  id?: number;
  email?: string;
}

export class AuthService {
  private static readonly BASE_PATH = '/auth';

  static async login(credentials: LoginInput): Promise<AuthResponse> {
    const { data } = await httpClient.post<BackendAuthResponse>(
      `${this.BASE_PATH}/login`,
      credentials
    );
    
    // Adaptar la respuesta del backend al formato esperado por el frontend
    return {
      user: {
        id: data.id || 1, // Si no hay ID, usar 1 por defecto
        username: data.username,
        email: data.email || `${data.username}@example.com`, // Email por defecto si no existe
        role: data.role
      },
      token: data.token
    };
  }

  static async register(userData: RegisterInput): Promise<AuthResponse> {
    const { data } = await httpClient.post<BackendAuthResponse>(
      `${this.BASE_PATH}/register`,
      userData
    );
    
    // Adaptar la respuesta del backend al formato esperado por el frontend
    return {
      user: {
        id: data.id || 1,
        username: data.username,
        email: data.email || `${data.username}@example.com`,
        role: data.role
      },
      token: data.token
    };
  }
}
