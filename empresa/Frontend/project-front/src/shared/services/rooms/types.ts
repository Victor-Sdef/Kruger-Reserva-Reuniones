export interface Room {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  location?: string;
  equipment?: string;
  active: boolean;
  createdAt: string;
  createdBy: string;
}

export interface CreateRoomInput {
  name: string;
  description?: string;
  capacity: number;
  location?: string;
  equipment?: string;
  active?: boolean;
}

export interface UpdateRoomInput {
  name: string;
  description?: string;
  capacity: number;
  location?: string;
  equipment?: string;
  active?: boolean;
}