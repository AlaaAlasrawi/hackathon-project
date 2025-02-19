package com.jumate.backend.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity(name = "campus_link_Group")
@Table(name = "campus_link_Group")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CampusLinkGroupEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "members")
    private String members;

    @Column(name = "session")
    private String session;

    @Column(name = "tags")
    private String tags;

    @Column(name = "group_name")
    private String groupName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
