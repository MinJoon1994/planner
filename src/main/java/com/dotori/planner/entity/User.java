package com.dotori.planner.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    public enum MembershipType {
        FREE, PRO
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String role = "ROLE_USER"; // Default role

    @Column(nullable = false)
    private boolean enabled = true;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MembershipType membershipType = MembershipType.FREE;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(nullable = true)
    private Integer budgetStartDay = 1;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
