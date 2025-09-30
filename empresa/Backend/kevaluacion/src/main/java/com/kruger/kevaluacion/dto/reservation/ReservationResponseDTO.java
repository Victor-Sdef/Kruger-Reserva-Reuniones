package com.kruger.kevaluacion.dto.reservation;

import com.kruger.kevaluacion.entity.ReservationStatus;

import java.time.LocalDateTime;

public record ReservationResponseDTO(
    Long id,
    LocalDateTime startTime,
    LocalDateTime endTime,
    String purpose,
    ReservationStatus status,
    LocalDateTime createdAt,
    Long userId,
    RoomSummaryDTO room,
    String userName
) {
    public record RoomSummaryDTO(
        Long id,
        String name,
        String location,
        Integer capacity
    ) {}
}