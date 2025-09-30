package com.kruger.kevaluacion.mapper;

import com.kruger.kevaluacion.dto.reservation.ReservationRequestDTO;
import com.kruger.kevaluacion.dto.reservation.ReservationResponseDTO;
import com.kruger.kevaluacion.entity.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    @Mapping(target = "room.id", source = "room.id")
    @Mapping(target = "room.name", source = "room.name")
    @Mapping(target = "room.location", source = "room.location")
    @Mapping(target = "room.capacity", source = "room.capacity")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", source = "user.username")
    ReservationResponseDTO toDTO(Reservation entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "room", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Reservation toEntity(ReservationRequestDTO dto);
}