package com.kruger.kevaluacion.dto.user;

import com.kruger.kevaluacion.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO para crear nuevos usuarios. Solo lo usará el ADMIN.
 */
public record UserRequestDTO(
        @NotBlank String username,
        @NotBlank @Email String email,
        @NotBlank String password,
        @NotNull Role role
) {}
