import { httpClient } from '../http-client';
import { Reservation, CreateReservationInput } from './types';

export class ReservationService {
  private static readonly BASE_PATH = '/reservations';

  static async getAll(): Promise<Reservation[]> {
    const { data } = await httpClient.get<Reservation[]>(`${this.BASE_PATH}/all`);
    return data;
  }

  static async getMyReservations(): Promise<Reservation[]> {
    const { data } = await httpClient.get<Reservation[]>(this.BASE_PATH);
    return data;
  }

  static async getById(id: number): Promise<Reservation> {
    const { data } = await httpClient.get<Reservation>(`${this.BASE_PATH}/${id}`);
    return data;
  }

  static async create(reservationData: CreateReservationInput): Promise<Reservation> {
    const { data } = await httpClient.post<Reservation>(this.BASE_PATH, reservationData);
    return data;
  }

  static async cancel(id: number): Promise<void> {
    await httpClient.delete(`${this.BASE_PATH}/${id}`);
  }
}