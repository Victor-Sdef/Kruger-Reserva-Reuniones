package com.kruger.kevaluacion.mapper;

import com.kruger.kevaluacion.dto.room.RoomRequestDTO;
import com.kruger.kevaluacion.dto.room.RoomResponseDTO;
import com.kruger.kevaluacion.entity.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    @Mapping(target = "createdBy", source = "createdBy.username")
    RoomResponseDTO toDTO(Room entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "reservations", ignore = true)
    Room toEntity(RoomRequestDTO dto);
}