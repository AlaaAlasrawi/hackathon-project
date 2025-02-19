package com.jumate.backend.persistence.repository;

import com.jumate.backend.application.dto.specialneed.CreateSpicalNeedRequest;
import com.jumate.backend.domain.model.SpecialNeedsRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface SpecialNeedsRequestRepository {
    SpecialNeedsRequest save(SpecialNeedsRequest model);

    Page<SpecialNeedsRequest> getAllRequests(int page, int size, String sortBy, String sortDirection,
                                                    String description, String disabilitiesName, String place,
                                                    LocalDateTime timeFrom, LocalDateTime timeTo);

    SpecialNeedsRequest getById(Long postId);
}
