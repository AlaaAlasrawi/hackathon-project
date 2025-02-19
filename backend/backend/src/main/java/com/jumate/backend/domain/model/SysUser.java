package com.jumate.backend.domain.model;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SysUser {
    private Long id;

    private String username;

    private String password;

    private String name;

    private String email;

    private String major;

    private String collage;

    private String disabilities;

    private String tags;

    private String bio;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
