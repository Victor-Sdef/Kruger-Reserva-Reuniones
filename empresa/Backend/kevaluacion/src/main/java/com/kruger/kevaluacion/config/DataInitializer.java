package com.kruger.kevaluacion.config;

import com.kruger.kevaluacion.entity.Role;
import com.kruger.kevaluacion.entity.Room;
import com.kruger.kevaluacion.entity.User;
import com.kruger.kevaluacion.repository.RoomRepository;
import com.kruger.kevaluacion.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Crear usuarios por defecto
        User admin = null;
        if (userRepository.findByUsername("admin").isEmpty()) {
            admin = userRepository.save(User.builder()
                    .username("admin")
                    .email("admin@kruger.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build()
            );
        } else {
            admin = userRepository.findByUsername("admin").get();
        }

        if (userRepository.findByUsername("user").isEmpty()) {
            userRepository.save(User.builder()
                        .username("user")
                    .email("user@kruger.com")
                    .password(passwordEncoder.encode("user123"))
                    .role(Role.USER)
                    .build()
            );
        }

        // Crear salas de ejemplo
        if (roomRepository.count() == 0) {
            roomRepository.save(Room.builder()
                    .name("Sala Ejecutiva")
                    .description("Sala principal para reuniones ejecutivas")
                    .capacity(12)
                    .location("Piso 10 - Oficina Central")
                    .equipment("Proyector 4K, Mesa de conferencias, Sistema de videoconferencia")
                    .active(true)
                    .createdAt(LocalDateTime.now())
                    .createdBy(admin)
                    .build()
            );

            roomRepository.save(Room.builder()
                    .name("Sala de Innovación")
                    .description("Espacio creativo para brainstorming")
                    .capacity(8)
                    .location("Piso 5 - Área de Desarrollo")
                    .equipment("Pizarra digital, TV 55\", Sillas colaborativas")
                    .active(true)
                    .createdAt(LocalDateTime.now())
                    .createdBy(admin)
                    .build()
            );

            roomRepository.save(Room.builder()
                    .name("Sala de Capacitación")
                    .description("Aula para entrenamientos y capacitaciones")
                    .capacity(20)
                    .location("Piso 3 - Centro de Entrenamiento")
                    .equipment("Proyector, Sistema de audio, 20 escritorios")
                    .active(true)
                    .createdAt(LocalDateTime.now())
                    .createdBy(admin)
                    .build()
            );

            roomRepository.save(Room.builder()
                    .name("Sala Pequeña")
                    .description("Sala íntima para reuniones de equipo")
                    .capacity(4)
                    .location("Piso 7 - Área de Gestión")
                    .equipment("TV 42\", Mesa redonda")
                    .active(true)
                    .createdAt(LocalDateTime.now())
                    .createdBy(admin)
                    .build()
            );
        }
    }
}
