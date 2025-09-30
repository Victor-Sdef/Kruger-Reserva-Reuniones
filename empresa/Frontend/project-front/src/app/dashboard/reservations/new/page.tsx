'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/atoms'
import { FormFieldAdapter } from '@/components/adapters/react-hook-form/form-field-adapter'
import { Input } from '@/components/atoms/input'
import { Room } from '@/shared/services/rooms/types'
import { RoomService } from '@/shared/services/rooms/room.service'
import { ReservationService } from '@/shared/services/reservations/reservation.service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react'
import { toast } from 'sonner'

const reservationSchema = z.object({
  roomId: z.coerce.number().min(1, 'Debe seleccionar una sala'),
  startTime: z.string().min(1, 'La fecha y hora de inicio es obligatoria'),
  endTime: z.string().min(1, 'La fecha y hora de fin es obligatoria'),
  purpose: z.string().optional(),
}).refine((data) => {
  if (data.startTime && data.endTime) {
    return new Date(data.startTime) < new Date(data.endTime)
  }
  return true
}, {
  message: "La fecha de fin debe ser posterior a la fecha de inicio",
  path: ["endTime"],
})

type ReservationFormData = z.infer<typeof reservationSchema>

export default function NewReservationPage() {
  const router = useRouter()
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableRooms, setAvailableRooms] = useState<Room[]>([])

  // Generar fechas por defecto futuras
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(9, 0, 0, 0) // 9:00 AM mañana
  
  const tomorrowEnd = new Date(tomorrow)
  tomorrowEnd.setHours(10, 0, 0, 0) // 10:00 AM mañana

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      roomId: 0,
      startTime: tomorrow.toISOString().slice(0, 16), // formato YYYY-MM-DDTHH:mm
      endTime: tomorrowEnd.toISOString().slice(0, 16),
      purpose: '',
    },
  })

  const fetchRooms = useCallback(async () => {
    try {
      const response = await RoomService.getAll()
      setRooms(response)
    } catch (error) {
      console.error('Error fetching rooms:', error)
    }
  }, [])

  useEffect(() => {
    fetchRooms()
  }, [fetchRooms])

  const handleTimeChange = async () => {
    const { startTime, endTime } = form.getValues()
    
    if (startTime && endTime) {
      try {
        const available = await RoomService.getAvailable(startTime, endTime)
        setAvailableRooms(available)
      } catch (error) {
        console.error('Error fetching available rooms:', error)
        setAvailableRooms([])
      }
    }
  }

  const handleSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true)
    try {
      await ReservationService.create({
        roomId: data.roomId,
        startTime: data.startTime,
        endTime: data.endTime,
        purpose: data.purpose,
      })
      toast.success('¡Reserva creada exitosamente!', {
        description: 'La reserva ha sido registrada correctamente.'
      })
      router.push('/dashboard/reservations')
    } catch (error) {
      console.error('Error creating reservation:', error)
      toast.error('Error al crear la reserva', {
        description: 'Ocurrió un error al procesar la reserva. Por favor, inténtelo nuevamente.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRoomSelect = (roomId: number) => {
    const room = rooms.find(r => r.id === roomId)
    setSelectedRoom(room || null)
    form.setValue('roomId', roomId)
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Nueva Reserva</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la Reserva</CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormFieldAdapter
                    name="startTime"
                    label="Fecha y hora de inicio *"
                  >
                    {(field) => (
                      <Input
                        type="datetime-local"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleTimeChange()
                        }}
                      />
                    )}
                  </FormFieldAdapter>

                  <FormFieldAdapter
                    name="endTime"
                    label="Fecha y hora de fin *"
                  >
                    {(field) => (
                      <Input
                        type="datetime-local"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleTimeChange()
                        }}
                      />
                    )}
                  </FormFieldAdapter>

                  <FormFieldAdapter
                    name="purpose"
                    label="Propósito de la reunión"
                  >
                    {(field) => (
                      <Input
                        placeholder="Ej: Reunión de equipo, Presentación de proyecto"
                        {...field}
                      />
                    )}
                  </FormFieldAdapter>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !selectedRoom} 
                    className="w-full"
                  >
                    {isSubmitting ? 'Creando reserva...' : 'Crear Reserva'}
                  </Button>
                </form>
              </FormProvider>
            </CardContent>
          </Card>

          {/* Lista de salas */}
          <Card>
            <CardHeader>
              <CardTitle>Seleccionar Sala</CardTitle>
              <p className="text-sm text-muted-foreground">
                {availableRooms.length > 0 
                  ? `${availableRooms.length} sala(s) disponible(s) en el horario seleccionado`
                  : 'Seleccione fecha y hora para ver disponibilidad'
                }
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {(availableRooms.length > 0 ? availableRooms : rooms).map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    className={`border rounded-lg p-4 cursor-pointer transition-colors w-full text-left ${
                      selectedRoom?.id === room.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    } ${availableRooms.length > 0 && !availableRooms.find(r => r.id === room.id)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={() => {
                      if (availableRooms.length === 0 || availableRooms.find(r => r.id === room.id)) {
                        handleRoomSelect(room.id)
                      }
                    }}
                    disabled={availableRooms.length > 0 && !availableRooms.find(r => r.id === room.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{room.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {room.capacity}
                      </div>
                    </div>
                    
                    {room.description && (
                      <p className="text-sm text-muted-foreground mb-2">{room.description}</p>
                    )}
                    
                    {room.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        {room.location}
                      </div>
                    )}
                    
                    {room.equipment && (
                      <p className="text-xs text-muted-foreground">
                        <strong>Equipamiento:</strong> {room.equipment}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}