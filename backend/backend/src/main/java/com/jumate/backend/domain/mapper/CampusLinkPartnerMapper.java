package com.jumate.backend.domain.mapper;

import com.jumate.backend.application.dto.campuslink.CreateCampusLinkPartnerRequest;
import com.jumate.backend.application.dto.campuslink.CreateCampusLinkPartnerResponse;
import com.jumate.backend.domain.model.CampusLinkPartner;
import com.jumate.backend.persistence.entity.CampusLinkPartnerEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CampusLinkPartnerMapper {
    CampusLinkPartner partnerRequestToModel(CreateCampusLinkPartnerRequest request);
    CreateCampusLinkPartnerResponse modelToPartnerResponse(CampusLinkPartner model);

    CampusLinkPartnerEntity modelToEntity(CampusLinkPartner model);
    CampusLinkPartner entityToModel(CampusLinkPartnerEntity entity);

}
