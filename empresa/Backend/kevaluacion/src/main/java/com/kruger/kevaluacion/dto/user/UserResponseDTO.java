package com.kruger.kevaluacion.dto.user;

import com.kruger.kevaluacion.entity.Role;

/**
 * DTO para mostrar usuarios.
 */
public record UserResponseDTO(
        Long id,
        String username,
        String email,
        Role role
) {}
