import { Button } from '@/components/atoms/button';
import { useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

export function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Acceso No Autorizado
        </h1>
        <p className="text-gray-600 mb-6">
          No tienes permisos suficientes para acceder a esta página.
          <br />
          Se requiere rol de ADMIN.
        </p>
        <div className="space-x-4">
          <Button 
            onClick={() => router.back()}
            variant="outline"
          >
            Volver
          </Button>
          <Button 
            onClick={() => router.push('/dashboard')}
          >
            Ir al Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
