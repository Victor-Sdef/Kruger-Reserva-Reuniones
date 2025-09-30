package com.kruger.kevaluacion.controller;

import com.kruger.kevaluacion.dto.room.RoomRequestDTO;
import com.kruger.kevaluacion.dto.room.RoomResponseDTO;
import com.kruger.kevaluacion.service.interfaces.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
@Tag(name = "Rooms", description = "Gestión de salas de reuniones")
@SecurityRequirement(name = "bearerAuth")
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Crear sala", description = "Solo ADMIN puede crear salas")
    public ResponseEntity<RoomResponseDTO> create(@RequestBody @Valid RoomRequestDTO dto,
                                                  @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(201).body(roomService.create(dto, userDetails));
    }

    @GetMapping
    @Operation(summary = "Listar todas las salas", description = "Obtiene todas las salas disponibles")
    public ResponseEntity<List<RoomResponseDTO>> findAll() {
        return ResponseEntity.ok(roomService.findAll());
    }

    @GetMapping("/available")
    @Operation(summary = "Buscar salas disponibles", description = "Busca salas disponibles en un período específico")
    public ResponseEntity<List<RoomResponseDTO>> findAvailable(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        return ResponseEntity.ok(roomService.findAvailableRooms(startTime, endTime));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener sala por ID", description = "Obtiene los detalles de una sala específica")
    public ResponseEntity<RoomResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.findById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Actualizar sala", description = "Solo ADMIN puede actualizar salas")
    public ResponseEntity<RoomResponseDTO> update(@PathVariable Long id,
                                                  @RequestBody @Valid RoomRequestDTO dto,
                                                  @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(roomService.update(id, dto, userDetails));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Eliminar sala", description = "Solo ADMIN puede eliminar salas (soft delete)")
    public ResponseEntity<Void> delete(@PathVariable Long id,
                                       @AuthenticationPrincipal UserDetails userDetails) {
        roomService.delete(id, userDetails);
        return ResponseEntity.noContent().build();
    }
}