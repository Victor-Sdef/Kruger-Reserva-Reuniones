package com.kruger.kevaluacion.controller;

import com.kruger.kevaluacion.dto.reservation.ReservationRequestDTO;
import com.kruger.kevaluacion.dto.reservation.ReservationResponseDTO;
import com.kruger.kevaluacion.service.interfaces.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
@Tag(name = "Reservations", description = "Gestión de reservas de salas")
@SecurityRequirement(name = "bearerAuth")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    @Operation(summary = "Crear reserva", description = "Crea una nueva reserva de sala")
    public ResponseEntity<ReservationResponseDTO> create(@RequestBody @Valid ReservationRequestDTO dto,
                                                         @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(201).body(reservationService.create(dto, userDetails));
    }

    @GetMapping
    @Operation(summary = "Mis reservas", description = "Obtiene las reservas del usuario autenticado")
    public ResponseEntity<List<ReservationResponseDTO>> findMyReservations(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(reservationService.findByUser(userDetails));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Todas las reservas", description = "Solo ADMIN puede ver todas las reservas")
    public ResponseEntity<List<ReservationResponseDTO>> findAll(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(reservationService.findAll(userDetails));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener reserva por ID", description = "Obtiene una reserva específica (solo propietario o ADMIN)")
    public ResponseEntity<ReservationResponseDTO> findById(@PathVariable Long id,
                                                           @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(reservationService.findById(id, userDetails));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancelar reserva", description = "Cancela una reserva (solo propietario o ADMIN)")
    public ResponseEntity<Void> cancel(@PathVariable Long id,
                                       @AuthenticationPrincipal UserDetails userDetails) {
        reservationService.cancel(id, userDetails);
        return ResponseEntity.noContent().build();
    }
}