'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { DataTable } from '@/components/molecules/data-table/data-table'
import { Room } from '@/shared/services/rooms/types'
import { RoomService } from '@/shared/services/rooms/room.service'
import { Plus, Building2, Users, MapPin, Settings } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { useRole } from '@/shared/hooks/useRole'
import { toast } from 'sonner'

export default function RoomsPage() {
  const router = useRouter()
  const { isAdmin } = useRole()
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await RoomService.getAll()
        setRooms(response)
      } catch (error) {
        console.error('Error fetching rooms:', error)
        setError('Error al cargar las salas')
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await RoomService.getAll()
      setRooms(response)
    } catch (error) {
      console.error('Error fetching rooms:', error)
      setError('Error al cargar las salas')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (room: Room) => {
    router.push(`/dashboard/rooms/edit/${room.id}`)
  }

  const handleDelete = async (room: Room) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la sala "${room.name}"?`)) {
      try {
        await RoomService.delete(room.id)
        toast.success('Sala eliminada exitosamente', {
          description: `La sala "${room.name}" ha sido eliminada correctamente.`
        })
        await fetchRooms()
      } catch (error) {
        console.error('Error deleting room:', error)
        toast.error('Error al eliminar la sala', {
          description: 'Ocurrió un error al eliminar la sala. Por favor, inténtelo nuevamente.'
        })
      }
    }
  }

  const columns: ColumnDef<Room>[] = [
    {
      accessorKey: 'name',
      header: 'Nombre',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.getValue('name')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Descripción',
      cell: ({ row }) => {
        const description = row.getValue('description') as string
        return description ? (
          <span className="text-sm text-muted-foreground">{description}</span>
        ) : (
          <span className="text-sm text-muted-foreground italic">Sin descripción</span>
        )
      },
    },
    {
      accessorKey: 'capacity',
      header: 'Capacidad',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{row.getValue('capacity')} personas</span>
        </div>
      ),
    },
    {
      accessorKey: 'location',
      header: 'Ubicación',
      cell: ({ row }) => {
        const location = row.getValue('location') as string
        return location ? (
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{location}</span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground italic">No especificada</span>
        )
      },
    },
    {
      accessorKey: 'equipment',
      header: 'Equipamiento',
      cell: ({ row }) => {
        const equipment = row.getValue('equipment') as string
        return equipment ? (
          <span className="text-sm">{equipment}</span>
        ) : (
          <span className="text-sm text-muted-foreground italic">Sin equipamiento</span>
        )
      },
    },
    {
      accessorKey: 'active',
      header: 'Estado',
      cell: ({ row }) => {
        const isActive = row.getValue('active') as boolean
        return (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {isActive ? 'Activa' : 'Inactiva'}
          </span>
        )
      },
    },
  ]

  if (isAdmin()) {
    columns.push({
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(row.original)}
          >
            <Settings className="h-4 w-4" />
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(row.original)}
            className="text-red-600 hover:text-red-800"
          >
            Eliminar
          </Button>
        </div>
      ),
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando salas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <Button onClick={fetchRooms} className="mt-4">
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
          <Building2 className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Gestión de Salas</h2>
        </div>
        {isAdmin() && (
          <Button onClick={() => router.push('/dashboard/rooms/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Sala
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Salas de Reuniones</CardTitle>
          <p className="text-sm text-muted-foreground">
            {isAdmin() 
              ? 'Administra las salas de reuniones disponibles en el sistema'
              : 'Visualiza las salas de reuniones disponibles para reservar'
            }
          </p>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={rooms}
          />
        </CardContent>
      </Card>
    </div>
  )
}