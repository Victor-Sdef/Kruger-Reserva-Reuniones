'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { Button } from '@/components/atoms'
import { Building2, Calendar, Users, Clock } from 'lucide-react'
import { useRole } from '@/shared/hooks/useRole'
import { RoomService } from '@/shared/services/rooms/room.service'
import { ReservationService } from '@/shared/services/reservations/reservation.service'

export default function DashboardPage() {
  const router = useRouter()
  const { isAdmin } = useRole()
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalReservations: 0,
    myReservations: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [rooms, reservations] = await Promise.all([
          RoomService.getAll(),
          ReservationService.getAll(),
        ])
        
        setStats({
          totalRooms: rooms.length,
          totalReservations: reservations.length,
          myReservations: reservations.filter(r => r.userId === parseInt(localStorage.getItem('userId') || '0')).length,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  const quickActions = [
    {
      title: 'Ver Salas',
      description: 'Explorar salas disponibles',
      icon: Building2,
      action: () => router.push('/dashboard/rooms'),
      color: 'bg-white hover:bg-blue-50 border-blue-300 shadow-md hover:shadow-lg',
      iconColor: 'text-blue-600',
      titleColor: 'text-gray-900',
    },
    {
      title: 'Nueva Reserva',
      description: 'Reservar una sala',
      icon: Calendar,
      action: () => router.push('/dashboard/reservations/new'),
      color: 'bg-white hover:bg-emerald-50 border-emerald-300 shadow-md hover:shadow-lg',
      iconColor: 'text-emerald-600',
      titleColor: 'text-gray-900',
    },
    {
      title: 'Mis Reservas',
      description: 'Ver mis reservas activas',
      icon: Clock,
      action: () => router.push('/dashboard/reservations'),
      color: 'bg-white hover:bg-violet-50 border-violet-300 shadow-md hover:shadow-lg',
      iconColor: 'text-violet-600',
      titleColor: 'text-gray-900',
    },
  ]

  if (isAdmin()) {
    quickActions.splice(1, 0, {
      title: 'Nueva Sala',
      description: 'Agregar sala de reuniones',
      icon: Building2,
      action: () => router.push('/dashboard/rooms/new'),
      color: 'bg-white hover:bg-orange-50 border-orange-300 shadow-md hover:shadow-lg',
      iconColor: 'text-orange-600',
      titleColor: 'text-gray-900',
    })

    quickActions.push({
      title: 'Gestionar Usuarios',
      description: 'Administrar usuarios del sistema',
      icon: Users,
      action: () => router.push('/dashboard/users'),
      color: 'bg-white hover:bg-rose-50 border-rose-300 shadow-md hover:shadow-lg',
      iconColor: 'text-rose-600',
      titleColor: 'text-gray-900',
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">
          ¡Bienvenido al Sistema de Reservas!
        </h1>
        <p className="text-gray-200">
          Gestiona las reservas de salas de reuniones de forma eficiente
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-md border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Salas Totales</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalRooms}</div>
            <p className="text-xs text-muted-foreground">
              Salas disponibles en el sistema
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              {isAdmin() ? 'Reservas Totales' : 'Mis Reservas'}
            </CardTitle>
            <Calendar className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {isAdmin() ? stats.totalReservations : stats.myReservations}
            </div>
            <p className="text-xs text-muted-foreground">
              {isAdmin() ? 'Reservas en el sistema' : 'Reservas activas'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Acceso Rápido</CardTitle>
            <Clock className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => router.push('/dashboard/reservations/new')}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white"
            >
              Reservar Ahora
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className={`cursor-pointer transition-all duration-200 ${action.color}`}
              onClick={action.action}
            >
              <CardHeader className="space-y-1">
                <div className="flex items-center space-x-2">
                  <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                  <CardTitle className={`text-base ${action.titleColor}`}>{action.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
