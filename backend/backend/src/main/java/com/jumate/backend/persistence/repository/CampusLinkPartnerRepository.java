package com.jumate.backend.persistence.repository;

import com.jumate.backend.domain.model.CampusLinkPartner;
import org.springframework.data.domain.Page;

public interface CampusLinkPartnerRepository {
    CampusLinkPartner save(CampusLinkPartner campusLinkPartner);

    Page<CampusLinkPartner> getAllPartners(int page, int size, String sortBy, String sortDirection,
                                                  String description, String username, String tags, String session);

}
