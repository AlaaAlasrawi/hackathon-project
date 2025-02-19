package com.jumate.backend.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity(name = "special_needs_requests")
@Table(name = "special_needs_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecialNeedsRequestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "time")
    private LocalDateTime time;

    @Column(name = "place")
    private String place;

    @Column(name = "disabilities_name")
    private String disabilitiesName;

    @Column(name = "requester_id")
    private Long requesterId;

    @Column(name = "requester_username")
    private String requesterUsername;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
