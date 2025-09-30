package com.kruger.kevaluacion.service.impl;

import com.kruger.kevaluacion.dto.user.UserRequestDTO;
import com.kruger.kevaluacion.dto.user.UserResponseDTO;
import com.kruger.kevaluacion.entity.User;
import com.kruger.kevaluacion.mapper.UserMapper;
import com.kruger.kevaluacion.repository.UserRepository;
import com.kruger.kevaluacion.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Override
    public UserResponseDTO create(UserRequestDTO request) {
        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.password()));
        return userMapper.toDTO(userRepository.save(user));
    }

    @Override
    public List<UserResponseDTO> findAll() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDTO)
                .toList();
    }

    @Override
    public UserResponseDTO findById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}
