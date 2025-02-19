package com.jumate.backend.application.dto.campuslink;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCampusLinkPartnerRequest {
    private String description;

    private String session;

    private String tags;
}
