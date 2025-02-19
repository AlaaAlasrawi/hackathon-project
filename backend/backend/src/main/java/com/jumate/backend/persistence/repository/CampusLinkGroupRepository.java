package com.jumate.backend.persistence.repository;

import com.jumate.backend.domain.model.CampusLinkGroup;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
public interface CampusLinkGroupRepository {
    CampusLinkGroup save(CampusLinkGroup campusLinkGroup);

    Page<CampusLinkGroup> getAllGroups(int page, int size, String sortBy, String sortDirection,
                                              String description, String groupName, String session, String username);

}
