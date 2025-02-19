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
public class CampusLinkPartner {
    private Long id;

    private String description;

    private String session;

    private String tags;

    private String username;


    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
