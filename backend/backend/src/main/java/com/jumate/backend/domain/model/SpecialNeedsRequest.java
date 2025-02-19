package com.jumate.backend.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpecialNeedsRequest {
    private Long id;

    private String description;

    private LocalDateTime time;

    private String place;

    private String disabilitiesName;

    private Long requesterId;

    private String requesterUsername;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
