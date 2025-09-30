package com.kruger.kevaluacion.service.impl;

import com.kruger.kevaluacion.dto.reservation.ReservationRequestDTO;
import com.kruger.kevaluacion.dto.reservation.ReservationResponseDTO;
import com.kruger.kevaluacion.entity.*;
import com.kruger.kevaluacion.mapper.ReservationMapper;
import com.kruger.kevaluacion.repository.ReservationRepository;
import com.kruger.kevaluacion.repository.RoomRepository;
import com.kruger.kevaluacion.repository.UserRepository;
import com.kruger.kevaluacion.service.interfaces.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ReservationMapper reservationMapper;

    @Override
    public ReservationResponseDTO create(ReservationRequestDTO dto, UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Room room = roomRepository.findById(dto.roomId())
                .orElseThrow(() -> new RuntimeException("Sala no encontrada"));

        // Validaciones
        validateReservationTime(dto);
        validateRoomAvailability(dto.roomId(), dto.startTime(), dto.endTime());
        validateUserAvailability(user, dto.startTime(), dto.endTime());

        Reservation reservation = reservationMapper.toEntity(dto);
        reservation.setUser(user);
        reservation.setRoom(room);
        reservation.setStatus(ReservationStatus.ACTIVE);
        reservation.setCreatedAt(LocalDateTime.now());

        return reservationMapper.toDTO(reservationRepository.save(reservation));
    }

    @Override
    public List<ReservationResponseDTO> findByUser(UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return reservationRepository.findByUserOrderByStartTimeDesc(user)
                .stream()
                .map(reservationMapper::toDTO)
                .toList();
    }

    @Override
    public List<ReservationResponseDTO> findAll(UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Solo ADMIN puede ver todas las reservas
        if (user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Solo los administradores pueden ver todas las reservas");
        }

        return reservationRepository.findAllByOrderByStartTimeDesc()
                .stream()
                .map(reservationMapper::toDTO)
                .toList();
    }

    @Override
    public ReservationResponseDTO findById(Long id, UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        // Verificar permisos: el usuario puede ver su propia reserva o ser ADMIN
        if (!reservation.getUser().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("No tienes permisos para ver esta reserva");
        }

        return reservationMapper.toDTO(reservation);
    }

    @Override
    public void cancel(Long id, UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        // Verificar permisos: el creador de la reserva o ADMIN puede cancelar
        if (!reservation.getUser().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("No tienes permisos para cancelar esta reserva");
        }

        if (reservation.getStatus() == ReservationStatus.CANCELLED) {
            throw new RuntimeException("La reserva ya está cancelada");
        }

        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }

    private void validateReservationTime(ReservationRequestDTO dto) {
        if (dto.startTime().isAfter(dto.endTime())) {
            throw new IllegalArgumentException("La fecha de inicio debe ser anterior a la fecha de fin");
        }

        if (dto.startTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("No se pueden crear reservas en el pasado");
        }

        // Validar que la reserva sea en horario laboral (8:00 - 18:00)
        int startHour = dto.startTime().getHour();
        int endHour = dto.endTime().getHour();
        if (startHour < 8 || endHour > 18) {
            throw new IllegalArgumentException("Las reservas deben ser en horario laboral (8:00 - 18:00)");
        }
    }

    private void validateRoomAvailability(Long roomId, LocalDateTime startTime, LocalDateTime endTime) {
        if (reservationRepository.existsConflictingReservation(roomId, startTime, endTime)) {
            throw new RuntimeException("La sala no está disponible en el horario solicitado");
        }
    }

    private void validateUserAvailability(User user, LocalDateTime startTime, LocalDateTime endTime) {
        List<Reservation> conflictingReservations = reservationRepository
                .findUserActiveReservationsInPeriod(user, startTime, endTime);
        
        if (!conflictingReservations.isEmpty()) {
            throw new RuntimeException("Ya tienes una reserva en este horario");
        }
    }
}