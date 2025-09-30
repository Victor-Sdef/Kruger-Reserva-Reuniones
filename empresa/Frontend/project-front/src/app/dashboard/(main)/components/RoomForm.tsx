'use client'

import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/atoms'
import { FormFieldAdapter } from '@/components/adapters/react-hook-form/form-field-adapter'
import { Input } from '@/components/atoms/input'
import { Room } from '@/shared/services/rooms/types'

const roomSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().optional(),
  capacity: z.coerce.number().min(1, 'La capacidad debe ser al menos 1'),
  location: z.string().optional(),
  equipment: z.string().optional(),
})

type RoomFormData = z.infer<typeof roomSchema>

interface RoomFormProps {
  onSubmit: (data: RoomFormData) => void | Promise<void>
  initialData?: Room
  isSubmitting?: boolean
}

export function RoomForm({ onSubmit, initialData, isSubmitting = false }: RoomFormProps) {
  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: '',
      description: '',
      capacity: 1,
      location: '',
      equipment: '',
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description || '',
        capacity: initialData.capacity,
        location: initialData.location || '',
        equipment: initialData.equipment || '',
      })
    }
  }, [initialData, form])

  const handleSubmit = async (data: RoomFormData) => {
    await onSubmit(data)
    if (!initialData) {
      form.reset()
    }
  }

  const getSubmitButtonText = () => {
    if (isSubmitting) return 'Guardando...'
    return initialData ? 'Actualizar sala' : 'Crear sala'
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormFieldAdapter
          name="name"
          label="Nombre de la sala *"
        >
          {(field) => (
            <Input placeholder="Ej: Sala Ejecutiva" {...field} />
          )}
        </FormFieldAdapter>

        <FormFieldAdapter
          name="description"
          label="Descripción"
        >
          {(field) => (
            <Input placeholder="Descripción de la sala" {...field} />
          )}
        </FormFieldAdapter>

        <FormFieldAdapter
          name="capacity"
          label="Capacidad *"
        >
          {(field) => (
            <Input
              type="number"
              placeholder="Número de personas"
              min="1"
              {...field}
            />
          )}
        </FormFieldAdapter>

        <FormFieldAdapter
          name="location"
          label="Ubicación"
        >
          {(field) => (
            <Input placeholder="Ej: Piso 10 - Oficina Central" {...field} />
          )}
        </FormFieldAdapter>

        <FormFieldAdapter
          name="equipment"
          label="Equipamiento"
        >
          {(field) => (
            <Input placeholder="Ej: Proyector, TV, Mesa de conferencias" {...field} />
          )}
        </FormFieldAdapter>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {getSubmitButtonText()}
        </Button>
      </form>
    </FormProvider>
  )
}