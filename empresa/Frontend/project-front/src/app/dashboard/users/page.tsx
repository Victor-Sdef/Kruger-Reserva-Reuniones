'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/atoms'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { DataTable } from '@/components/molecules/data-table/data-table'
import { User } from '@/shared/services/users/types'
import { UserService } from '@/shared/services/users/users.service'
import { Users, Shield, UserCheck, Crown } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { useRole } from '@/shared/hooks/useRole'
import { toast } from 'sonner'

export default function UsersPage() {
  const { isAdmin } = useRole()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await UserService.getUsers()
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
        setError('Error al cargar los usuarios')
        toast.error('Error al cargar usuarios', {
          description: 'No se pudieron cargar los usuarios. Por favor, inténtelo nuevamente.'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue('id')}</span>
      ),
    },
    {
      accessorKey: 'username',
      header: 'Usuario',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.getValue('username')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        const email = row.getValue('email') as string
        return email ? (
          <span className="text-sm text-muted-foreground">{email}</span>
        ) : (
          <span className="text-sm text-muted-foreground italic">Sin email</span>
        )
      },
    },
    {
      accessorKey: 'role',
      header: 'Rol',
      cell: ({ row }) => {
        const role = row.getValue('role') as string
        const isAdminUser = role === 'ADMIN'
        return (
          <div className="flex items-center gap-2">
            {isAdminUser ? (
              <Crown className="h-4 w-4 text-yellow-600" />
            ) : (
              <Shield className="h-4 w-4 text-blue-600" />
            )}
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isAdminUser
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {isAdminUser ? 'Administrador' : 'Usuario'}
            </span>
          </div>
        )
      },
    },
  ]

  // Redirigir si no es admin
  if (!isAdmin()) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Acceso Restringido
          </h3>
          <p className="text-sm text-gray-600">
            Solo los administradores pueden acceder a la gestión de usuarios.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando usuarios...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
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
          <Users className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuarios del Sistema</CardTitle>
          <p className="text-sm text-muted-foreground">
            Visualiza y administra todos los usuarios registrados en el sistema
          </p>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={users}
          />
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Usuarios</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Crown className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Administradores</p>
                <p className="text-2xl font-bold">
                  {users.filter(user => user.role === 'ADMIN').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Usuarios Regulares</p>
                <p className="text-2xl font-bold">
                  {users.filter(user => user.role === 'USER').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}