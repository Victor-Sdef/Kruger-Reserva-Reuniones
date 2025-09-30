package com.kruger.kevaluacion.service.impl;

import com.kruger.kevaluacion.dto.auth.AuthRequest;
import com.kruger.kevaluacion.dto.auth.AuthResponse;
import com.kruger.kevaluacion.dto.auth.RegisterRequest;
import com.kruger.kevaluacion.entity.Role;
import com.kruger.kevaluacion.entity.User;
import com.kruger.kevaluacion.repository.UserRepository;
import com.kruger.kevaluacion.security.JwtService;
import com.kruger.kevaluacion.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        var user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String token = jwtService.generateToken(user.getUsername());
        return new AuthResponse(
                token,
                user.getUsername(),
                user.getRole().name()
        );
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.username()) ||
                userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Usuario o email ya registrados.");
        }

        User user = User.builder()
                .username(request.username())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER) // Siempre USER por defecto (ADMIN solo manual o por validación en controller)
                .build();

        userRepository.save(user);
        String token = jwtService.generateToken(user.getUsername());
        return new AuthResponse(
                token,
                user.getUsername(),
                user.getRole().name()
        );
    }
}
