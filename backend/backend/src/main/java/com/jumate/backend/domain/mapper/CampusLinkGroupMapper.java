package com.jumate.backend.domain.mapper;

import com.jumate.backend.application.dto.campuslink.CreateCampusLinkGroupRequest;
import com.jumate.backend.application.dto.campuslink.CreateCampusLinkGroupResponse;
import com.jumate.backend.domain.model.CampusLinkGroup;
import com.jumate.backend.persistence.entity.CampusLinkGroupEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CampusLinkGroupMapper {
    CampusLinkGroup RequestToModel(CreateCampusLinkGroupRequest request);
    CreateCampusLinkGroupResponse modelToResponse(CampusLinkGroup model);

    CampusLinkGroupEntity modelToEntity(CampusLinkGroup model);
    CampusLinkGroup entityToModel(CampusLinkGroupEntity entity);
}
