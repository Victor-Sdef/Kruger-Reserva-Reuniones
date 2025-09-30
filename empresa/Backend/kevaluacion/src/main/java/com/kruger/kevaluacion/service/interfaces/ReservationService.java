package com.kruger.kevaluacion.service.interfaces;

import com.kruger.kevaluacion.dto.reservation.ReservationRequestDTO;
import com.kruger.kevaluacion.dto.reservation.ReservationResponseDTO;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface ReservationService {
    ReservationResponseDTO create(ReservationRequestDTO dto, UserDetails userDetails);
    List<ReservationResponseDTO> findByUser(UserDetails userDetails);
    List<ReservationResponseDTO> findAll(UserDetails userDetails); // Solo ADMIN
    ReservationResponseDTO findById(Long id, UserDetails userDetails);
    void cancel(Long id, UserDetails userDetails);
}