package com.kruger.kevaluacion.exception;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record ApiError(
        int status,
        String message,
        LocalDateTime timestamp,
        List<String> details
) {}
