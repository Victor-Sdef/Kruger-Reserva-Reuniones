export enum ReservationStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface Reservation {
  id: number;
  startTime: string;
  endTime: string;
  purpose?: string;
  status: ReservationStatus;
  createdAt: string;
  userId: number;
  room: {
    id: number;
    name: string;
    location?: string;
    capacity: number;
  };
  userName: string;
}

export interface CreateReservationInput {
  startTime: string;
  endTime: string;
  roomId: number;
  purpose?: string;
}