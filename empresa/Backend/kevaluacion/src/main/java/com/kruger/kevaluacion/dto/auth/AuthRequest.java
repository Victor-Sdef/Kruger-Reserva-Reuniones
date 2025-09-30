package com.kruger.kevaluacion.dto.auth;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO para solicitud de login.
 */
public record AuthRequest(
        @NotBlank String username,
        @NotBlank String password
) {}
