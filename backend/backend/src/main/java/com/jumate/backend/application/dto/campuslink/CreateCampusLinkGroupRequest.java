package com.jumate.backend.application.dto.campuslink;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCampusLinkGroupRequest {
    private String description;

    private String members;

    private String session;

    private String tags;

    private String groupName;
}
