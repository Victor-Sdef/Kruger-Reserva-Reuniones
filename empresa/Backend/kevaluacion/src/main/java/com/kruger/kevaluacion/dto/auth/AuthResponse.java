package com.kruger.kevaluacion.dto.auth;

/**
 * DTO de respuesta que contiene el token JWT.
 */
public record AuthResponse(
        String token,
        String username,
        String role
) {}
