package com.kruger.kevaluacion.dto.room;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RoomRequestDTO(
    @NotBlank(message = "El nombre de la sala es obligatorio")
    String name,
    
    String description,
    
    @NotNull(message = "La capacidad es obligatoria")
    @Min(value = 1, message = "La capacidad debe ser al menos 1")
    Integer capacity,
    
    String location,
    
    String equipment
) {}