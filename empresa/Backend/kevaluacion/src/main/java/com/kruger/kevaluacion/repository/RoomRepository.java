package com.kruger.kevaluacion.repository;

import com.kruger.kevaluacion.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    
    // Buscar salas activas
    List<Room> findByActiveTrue();
    
    // Buscar salas por nombre (ignorando mayúsculas/minúsculas)
    List<Room> findByNameContainingIgnoreCase(String name);
    
    // Buscar salas por capacidad mínima
    List<Room> findByCapacityGreaterThanEqualAndActiveTrue(Integer capacity);
    
    // Buscar salas disponibles en un período de tiempo específico
    @Query("SELECT r FROM Room r WHERE r.active = true AND r.id NOT IN " +
           "(SELECT res.room.id FROM Reservation res WHERE res.status = 'ACTIVE' " +
           "AND ((res.startTime <= ?2 AND res.endTime > ?1)))")
    List<Room> findAvailableRooms(java.time.LocalDateTime startTime, java.time.LocalDateTime endTime);
}