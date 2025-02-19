package com.jumate.backend.domain.service;

import com.jumate.backend.domain.model.CampusLinkGroup;
import com.jumate.backend.domain.model.CampusLinkPartner;
import com.jumate.backend.domain.providers.IdentityProvider;
import com.jumate.backend.persistence.repository.CampusLinkGroupRepository;
import com.jumate.backend.persistence.repository.CampusLinkPartnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CampusLinkService {
    private final CampusLinkPartnerRepository campusLinkPartnerRepository;
    private final CampusLinkGroupRepository campusLinkGroupRepository;
    private final IdentityProvider identityProvider;

    public CampusLinkPartner createCampusLinkPartner(CampusLinkPartner campusLinkPartner) {
        campusLinkPartner.setUsername(identityProvider.currentIdentity().getUsername());
        campusLinkPartner.setCreatedAt(LocalDateTime.now());
        campusLinkPartner.setUpdatedAt(LocalDateTime.now());
        
        return campusLinkPartnerRepository.save(campusLinkPartner);
    }

    public CampusLinkGroup createCampusLinkGroup(CampusLinkGroup campusLinkGroup) {
        campusLinkGroup.setCreatedAt(LocalDateTime.now());
        campusLinkGroup.setUpdatedAt(LocalDateTime.now());
        
        return campusLinkGroupRepository.save(campusLinkGroup);
    }

    public Page<CampusLinkPartner> getAllPartners(int page, int size, String sortBy, String sortDirection,
                                                  String description, String username, String tags, String session) {
        return campusLinkPartnerRepository.getAllPartners(page, size, sortBy, sortDirection, description, username, tags, session);
    }

    public Page<CampusLinkGroup> getAllGroups(int page, int size, String sortBy, String sortDirection,
                                              String description, String groupName, String session, String username) {
        return campusLinkGroupRepository.getAllGroups(page, size, sortBy, sortDirection, description, groupName, session, username);
    }

}
