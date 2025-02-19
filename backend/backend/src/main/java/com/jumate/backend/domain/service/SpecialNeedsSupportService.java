package com.jumate.backend.domain.service;

import com.jumate.backend.domain.model.SpecialNeedsRequest;
import com.jumate.backend.domain.model.SysUser;
import com.jumate.backend.domain.providers.IdentityProvider;
import com.jumate.backend.persistence.repository.SpecialNeedsRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SpecialNeedsSupportService {
    private final SpecialNeedsRequestRepository specialNeedsRequestRepository;
    private final IdentityProvider identityProvider;

    public SpecialNeedsRequest createRequest(SpecialNeedsRequest model) {
        SysUser user = identityProvider.currentIdentity();

        model.setRequesterId(user.getId());
        model.setRequesterUsername(user.getUsername());
        model.setCreatedAt(LocalDateTime.now());
        model.setUpdatedAt(LocalDateTime.now());

        return specialNeedsRequestRepository.save(model);
    }

    public Page<SpecialNeedsRequest> getAllRequests(int page, int size, String sortBy, String sortDirection,
                                                    String description, String disabilitiesName, String place,
                                                    LocalDateTime timeFrom, LocalDateTime timeTo) {
        return specialNeedsRequestRepository.getAllRequests(page, size, sortBy, sortDirection, description, disabilitiesName, place, timeFrom, timeTo);
    }

}
