package com.kruger.kevaluacion.dto.room;

import java.time.LocalDateTime;

public record RoomResponseDTO(
    Long id,
    String name,
    String description,
    Integer capacity,
    String location,
    String equipment,
    Boolean active,
    LocalDateTime createdAt,
    String createdBy
) {}