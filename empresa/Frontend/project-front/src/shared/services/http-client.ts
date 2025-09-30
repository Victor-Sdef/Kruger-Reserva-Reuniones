import axios from 'axios';
import { useAuthStore } from '../store/auth';

console.log('🔍 NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

httpClient.interceptors.request.use((config) => {
  console.log('🔍 HTTP Request:', {
    method: config.method?.toUpperCase(),
    url: config.url,
    baseURL: config.baseURL,
    fullURL: `${config.baseURL}${config.url}`
  });
  
  const tokens = useAuthStore.getState().tokens;
  
  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens}`;
  }
  
  return config;
});

// Interceptor de respuesta para manejar errores
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      const errorData = error.response.data;
      
      // Si el backend devuelve un formato específico de error
      if (errorData.details && Array.isArray(errorData.details)) {
        // Crear un error con el primer mensaje de details
        const customError = new Error(errorData.details[0] || errorData.message || 'Error del servidor');
        customError.name = 'BusinessError';
        throw customError;
      } else if (errorData.message) {
        // Si hay un mensaje específico
        const customError = new Error(errorData.message);
        customError.name = 'APIError';
        throw customError;
      }
    }
    
    // Si no hay formato específico, usar el error original
    throw error;
  }
);
