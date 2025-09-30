package com.kruger.kevaluacion.service.interfaces;

import com.kruger.kevaluacion.dto.room.RoomRequestDTO;
import com.kruger.kevaluacion.dto.room.RoomResponseDTO;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.List;

public interface RoomService {
    RoomResponseDTO create(RoomRequestDTO dto, UserDetails userDetails);
    List<RoomResponseDTO> findAll();
    List<RoomResponseDTO> findAvailableRooms(LocalDateTime startTime, LocalDateTime endTime);
    RoomResponseDTO findById(Long id);
    RoomResponseDTO update(Long id, RoomRequestDTO dto, UserDetails userDetails);
    void delete(Long id, UserDetails userDetails);
}