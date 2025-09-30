package com.kruger.kevaluacion.repository;

import com.kruger.kevaluacion.entity.Reservation;
import com.kruger.kevaluacion.entity.ReservationStatus;
import com.kruger.kevaluacion.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    
    // Buscar reservas por usuario
    List<Reservation> findByUserOrderByStartTimeDesc(User user);
    
    // Buscar reservas por usuario y estado
    List<Reservation> findByUserAndStatusOrderByStartTimeDesc(User user, ReservationStatus status);
    
    // Buscar todas las reservas ordenadas por fecha (para ADMIN)
    List<Reservation> findAllByOrderByStartTimeDesc();
    
    // Buscar reservas por sala
    List<Reservation> findByRoomIdOrderByStartTimeDesc(Long roomId);
    
    // Verificar si hay conflictos de horario para una sala
    @Query("SELECT COUNT(r) > 0 FROM Reservation r WHERE r.room.id = ?1 " +
           "AND r.status = 'ACTIVE' " +
           "AND ((r.startTime <= ?3 AND r.endTime > ?2))")
    boolean existsConflictingReservation(Long roomId, LocalDateTime startTime, LocalDateTime endTime);
    
    // Buscar reservas activas de un usuario en un período
    @Query("SELECT r FROM Reservation r WHERE r.user = ?1 AND r.status = 'ACTIVE' " +
           "AND ((r.startTime <= ?3 AND r.endTime > ?2))")
    List<Reservation> findUserActiveReservationsInPeriod(User user, LocalDateTime startTime, LocalDateTime endTime);
}