package com.jumate.backend.application.dto.specialneed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateSpicalNeedRequest {
    private String description;

    private LocalDateTime time;

    private String place;

    private String disabilitiesName;
}
