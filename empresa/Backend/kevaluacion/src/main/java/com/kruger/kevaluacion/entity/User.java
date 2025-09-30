package com.kruger.kevaluacion.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users") // evita conflicto con palabra reservada en algunas bases
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password; // se almacenará encriptada

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // Relaciones futuras:
    // Un usuario puede ser propietario de proyectos
    //@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    //private List<Project> projects;

    // Un usuario puede tener tareas asignadas
    //@OneToMany(mappedBy = "assignedTo", cascade = CascadeType.ALL)
    //private List<Task> tasks;
}
