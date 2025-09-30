'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/atoms'
import { FormFieldAdapter } from '@/components/adapters/react-hook-form/form-field-adapter'
import { Input } from '@/components/atoms/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { RoomService } from '@/shared/services/rooms/room.service'
import { ArrowLeft, Building2 } from 'lucide-react'
import { toast } from 'sonner'

const roomSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').max(100, 'El nombre no puede exceder 100 caracteres'),
  description: z.string().optional(),
  capacity: z.coerce.number().min(1, 'La capacidad debe ser al menos 1').max(100, 'La capacidad no puede exceder 100'),
  location: z.string().optional(),
  equipment: z.string().optional(),
  active: z.boolean(),
})

type RoomFormData = z.infer<typeof roomSchema>

export default function NewRoomPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: '',
      description: '',
      capacity: 1,
      location: '',
      equipment: '',
      active: true,
    },
  })

  const handleSubmit = async (data: RoomFormData) => {
    setIsSubmitting(true)
    try {
      await RoomService.create({
        name: data.name,
        description: data.description || undefined,
        capacity: data.capacity,
        location: data.location || undefined,
        equipment: data.equipment || undefined,
        active: data.active,
      })
      toast.success('¡Sala creada exitosamente!', {
        description: 'La sala ha sido registrada correctamente.'
      })
      router.push('/dashboard/rooms')
    } catch (error) {
      console.error('Error creating room:', error)
      toast.error('Error al crear la sala', {
        description: 'Ocurrió un error al procesar la sala. Por favor, inténtelo nuevamente.'
      })
    } finally {
      setIsSubmitting(false)
    }
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
            <Building2 className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Nueva Sala</h2>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Crear Nueva Sala de Reuniones</CardTitle>
            <p className="text-sm text-muted-foreground">
              Complete la información de la nueva sala
            </p>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormFieldAdapter
                  name="name"
                  label="Nombre de la sala *"
                >
                  {(field) => (
                    <Input
                      placeholder="Ej: Sala de Juntas Principal"
                      {...field}
                    />
                  )}
                </FormFieldAdapter>

                <FormFieldAdapter
                  name="description"
                  label="Descripción"
                >
                  {(field) => (
                    <Input
                      placeholder="Descripción opcional de la sala"
                      {...field}
                    />
                  )}
                </FormFieldAdapter>

                <FormFieldAdapter
                  name="capacity"
                  label="Capacidad *"
                >
                  {(field) => (
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      placeholder="Número máximo de personas"
                      {...field}
                    />
                  )}
                </FormFieldAdapter>

                <FormFieldAdapter
                  name="location"
                  label="Ubicación"
                >
                  {(field) => (
                    <Input
                      placeholder="Ej: Edificio A, Piso 2"
                      {...field}
                    />
                  )}
                </FormFieldAdapter>

                <FormFieldAdapter
                  name="equipment"
                  label="Equipamiento"
                >
                  {(field) => (
                    <Input
                      placeholder="Ej: Proyector, Pizarra, Sistema de videoconferencia"
                      {...field}
                    />
                  )}
                </FormFieldAdapter>

                <div className="flex items-center space-x-2">
                  <FormFieldAdapter
                    name="active"
                    label=""
                  >
                    {(field) => (
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="active"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4"
                        />
                        <label htmlFor="active" className="text-sm font-medium">
                          Sala activa
                        </label>
                      </div>
                    )}
                  </FormFieldAdapter>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="flex-1"
                  >
                    {isSubmitting ? 'Creando...' : 'Crear Sala'}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}