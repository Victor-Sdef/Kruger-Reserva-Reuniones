import { httpClient } from '../http-client';
import { Room, CreateRoomInput, UpdateRoomInput } from './types';

export class RoomService {
  private static readonly BASE_PATH = '/rooms';

  static async getAll(): Promise<Room[]> {
    const { data } = await httpClient.get<Room[]>(this.BASE_PATH);
    return data;
  }

  static async getById(id: number): Promise<Room> {
    const { data } = await httpClient.get<Room>(`${this.BASE_PATH}/${id}`);
    return data;
  }

  static async getAvailable(startTime: string, endTime: string): Promise<Room[]> {
    const { data } = await httpClient.get<Room[]>(`${this.BASE_PATH}/available`, {
      params: { startTime, endTime }
    });
    return data;
  }

  static async create(roomData: CreateRoomInput): Promise<Room> {
    const { data } = await httpClient.post<Room>(this.BASE_PATH, roomData);
    return data;
  }

  static async update(id: number, roomData: UpdateRoomInput): Promise<Room> {
    const { data } = await httpClient.put<Room>(`${this.BASE_PATH}/${id}`, roomData);
    return data;
  }

  static async delete(id: number): Promise<void> {
    await httpClient.delete(`${this.BASE_PATH}/${id}`);
  }
}