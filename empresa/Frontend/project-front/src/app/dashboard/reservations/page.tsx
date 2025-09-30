'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/atoms'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { Reservation } from '@/shared/services/reservations/types'
import { ReservationService } from '@/shared/services/reservations/reservation.service'
import { Calendar, Plus, Clock } from 'lucide-react'
import { useRole } from '@/shared/hooks/useRole'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function ReservationsPage() {
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAdmin } = useRole()

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = isAdmin() 
          ? await ReservationService.getAll()
          : await ReservationService.getMyReservations()
        setReservations(response)
      } catch (error) {
        console.error('Error fetching reservations:', error)
        setError('Error al cargar las reservas')
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, []) // Sin dependencias para evitar loops

  const fetchReservations = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = isAdmin() 
        ? await ReservationService.getAll()
        : await ReservationService.getMyReservations()
      setReservations(response)
    } catch (error) {
      console.error('Error fetching reservations:', error)
      setError('Error al cargar las reservas')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelReservation = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      try {
        await ReservationService.cancel(id)
        toast.success('Reserva cancelada exitosamente', {
          description: 'La reserva ha sido cancelada correctamente.'
        })
        fetchReservations()
      } catch (error) {
        console.error('Error canceling reservation:', error)
        toast.error('Error al cancelar la reserva', {
          description: 'Ocurrió un error al cancelar la reserva. Por favor, inténtelo nuevamente.'
        })
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando reservas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <Button onClick={fetchReservations} className="mt-4">
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          <h2 className="text-2xl font-bold">
            {isAdmin() ? 'Todas las Reservas' : 'Mis Reservas'}
          </h2>
        </div>
        <Button onClick={() => router.push('/dashboard/reservations/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Reserva
        </Button>
      </div>

      {reservations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Clock className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay reservas</h3>
            <p className="text-muted-foreground text-center mb-4">
              {isAdmin() 
                ? 'No hay reservas en el sistema todavía.'
                : 'No tienes reservas activas. ¡Crea tu primera reserva!'
              }
            </p>
            <Button onClick={() => router.push('/dashboard/reservations/new')}>
              Crear Primera Reserva
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((reservation) => (
            <Card key={reservation.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{reservation.room.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    reservation.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                    reservation.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {reservation.status === 'ACTIVE' ? 'Activa' :
                     reservation.status === 'CANCELLED' ? 'Cancelada' : 'Completada'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Fecha y hora</p>
                  <p className="font-medium">
                    {new Date(reservation.startTime).toLocaleDateString('es-ES')}
                  </p>
                  <p className="text-sm">
                    {new Date(reservation.startTime).toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })} - {new Date(reservation.endTime).toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                
                {reservation.room.location && (
                  <div>
                    <p className="text-sm text-muted-foreground">Ubicación</p>
                    <p className="text-sm">{reservation.room.location}</p>
                  </div>
                )}
                
                {reservation.purpose && (
                  <div>
                    <p className="text-sm text-muted-foreground">Propósito</p>
                    <p className="text-sm">{reservation.purpose}</p>
                  </div>
                )}
                
                {isAdmin() && (
                  <div>
                    <p className="text-sm text-muted-foreground">Usuario</p>
                    <p className="text-sm font-medium">{reservation.userName}</p>
                  </div>
                )}
                
                {reservation.status === 'ACTIVE' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-red-600 hover:text-red-800"
                    onClick={() => handleCancelReservation(reservation.id)}
                  >
                    Cancelar Reserva
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}