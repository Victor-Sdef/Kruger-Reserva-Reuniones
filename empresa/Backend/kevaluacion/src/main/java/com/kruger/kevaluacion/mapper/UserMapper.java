package com.kruger.kevaluacion.mapper;

import com.kruger.kevaluacion.dto.user.UserRequestDTO;
import com.kruger.kevaluacion.dto.user.UserResponseDTO;
import com.kruger.kevaluacion.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserResponseDTO toDTO(User user);

    @Mapping(target = "id", ignore = true)
   // @Mapping(target = "projects", ignore = true)
    // @Mapping(target = "tasks", ignore = true)
    User toEntity(UserRequestDTO dto);
}
