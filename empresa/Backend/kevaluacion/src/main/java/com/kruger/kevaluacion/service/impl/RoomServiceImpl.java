package com.kruger.kevaluacion.service.impl;

import com.kruger.kevaluacion.dto.room.RoomRequestDTO;
import com.kruger.kevaluacion.dto.room.RoomResponseDTO;
import com.kruger.kevaluacion.entity.Room;
import com.kruger.kevaluacion.entity.Role;
import com.kruger.kevaluacion.entity.User;
import com.kruger.kevaluacion.mapper.RoomMapper;
import com.kruger.kevaluacion.repository.RoomRepository;
import com.kruger.kevaluacion.repository.UserRepository;
import com.kruger.kevaluacion.service.interfaces.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final RoomMapper roomMapper;

    @Override
    public RoomResponseDTO create(RoomRequestDTO dto, UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Solo ADMIN puede crear salas
        if (user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Solo los administradores pueden crear salas");
        }

        Room room = roomMapper.toEntity(dto);
        room.setCreatedBy(user);
        room.setCreatedAt(LocalDateTime.now());
        room.setActive(true);

        return roomMapper.toDTO(roomRepository.save(room));
    }

    @Override
    public List<RoomResponseDTO> findAll() {
        return roomRepository.findByActiveTrue()
                .stream()
                .map(roomMapper::toDTO)
                .toList();
    }

    @Override
    public List<RoomResponseDTO> findAvailableRooms(LocalDateTime startTime, LocalDateTime endTime) {
        return roomRepository.findAvailableRooms(startTime, endTime)
                .stream()
                .map(roomMapper::toDTO)
                .toList();
    }

    @Override
    public RoomResponseDTO findById(Long id) {
        return roomRepository.findById(id)
                .map(roomMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Sala no encontrada"));
    }

    @Override
    public RoomResponseDTO update(Long id, RoomRequestDTO dto, UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Solo ADMIN puede actualizar salas
        if (user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Solo los administradores pueden actualizar salas");
        }

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sala no encontrada"));

        room.setName(dto.name());
        room.setDescription(dto.description());
        room.setCapacity(dto.capacity());
        room.setLocation(dto.location());
        room.setEquipment(dto.equipment());

        return roomMapper.toDTO(roomRepository.save(room));
    }

    @Override
    public void delete(Long id, UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Solo ADMIN puede eliminar salas
        if (user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Solo los administradores pueden eliminar salas");
        }

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sala no encontrada"));

        // Soft delete - marcar como inactiva
        room.setActive(false);
        roomRepository.save(room);
    }
}