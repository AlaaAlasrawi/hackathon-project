package com.jumate.backend.domain.mapper;

import com.jumate.backend.application.dto.specialneed.CreateSpicalNeedRequest;
import com.jumate.backend.application.dto.specialneed.CreateSpicalNeedResponse;
import com.jumate.backend.domain.model.SpecialNeedsRequest;
import com.jumate.backend.persistence.entity.SpecialNeedsRequestEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SpecialNeedsSupportMapper { //SpecialNeedsRequest (model)
    SpecialNeedsRequest requestToModel(CreateSpicalNeedRequest request);
    CreateSpicalNeedResponse modelToResponse(SpecialNeedsRequest model);

    SpecialNeedsRequestEntity modelToEntity(SpecialNeedsRequest model);
    SpecialNeedsRequest entityToModel(SpecialNeedsRequestEntity entity);
}
