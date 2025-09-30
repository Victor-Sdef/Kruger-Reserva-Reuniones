package com.kruger.kevaluacion.dto.reservation;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ReservationRequestDTO(
    @NotNull(message = "La fecha y hora de inicio es obligatoria")
    @Future(message = "La fecha de inicio debe ser futura")
    LocalDateTime startTime,
    
    @NotNull(message = "La fecha y hora de fin es obligatoria") 
    LocalDateTime endTime,
    
    @NotNull(message = "El ID de la sala es obligatorio")
    Long roomId,
    
    String purpose
) {}