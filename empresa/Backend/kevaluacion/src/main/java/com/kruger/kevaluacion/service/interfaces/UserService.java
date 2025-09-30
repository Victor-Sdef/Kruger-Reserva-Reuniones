package com.kruger.kevaluacion.service.interfaces;

import com.kruger.kevaluacion.dto.user.UserRequestDTO;
import com.kruger.kevaluacion.dto.user.UserResponseDTO;

import java.util.List;

public interface UserService {
    UserResponseDTO create(UserRequestDTO request);
    List<UserResponseDTO> findAll();
    UserResponseDTO findById(Long id);
}
