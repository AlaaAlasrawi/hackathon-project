package com.jumate.backend.persistence.adapter;

import com.jumate.backend.application.dto.specialneed.CreateSpicalNeedRequest;
import com.jumate.backend.domain.mapper.SpecialNeedsSupportMapper;
import com.jumate.backend.domain.model.SpecialNeedsRequest;
import com.jumate.backend.persistence.entity.SpecialNeedsRequestEntity;
import com.jumate.backend.persistence.jpa.SpecialNeedsRequestJpaRepository;
import com.jumate.backend.persistence.repository.SpecialNeedsRequestRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class SpecialNeedsSupportAdapter implements SpecialNeedsRequestRepository {
    private final SpecialNeedsRequestJpaRepository specialNeedsRequestJpaRepository;
    private final SpecialNeedsSupportMapper specialNeedsSupportMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public SpecialNeedsRequest save(SpecialNeedsRequest model) {
        SpecialNeedsRequestEntity entity = specialNeedsSupportMapper.modelToEntity(model);
        return specialNeedsSupportMapper.entityToModel(specialNeedsRequestJpaRepository.save(entity));
    }

    @Override
    public Page<SpecialNeedsRequest> getAllRequests(int page, int size, String sortBy, String sortDirection,
                                                    String description, String disabilitiesName, String place,
                                                    LocalDateTime timeFrom, LocalDateTime timeTo) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<SpecialNeedsRequestEntity> criteriaQuery = criteriaBuilder.createQuery(SpecialNeedsRequestEntity.class);
        Root<SpecialNeedsRequestEntity> root = criteriaQuery.from(SpecialNeedsRequestEntity.class);

        List<Predicate> predicates = new ArrayList<>();

        if (description != null && !description.isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("description"), "%" + description + "%"));
        }
        if (disabilitiesName != null && !disabilitiesName.isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("disabilitiesName"), "%" + disabilitiesName + "%"));
        }
        if (place != null && !place.isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("place"), "%" + place + "%"));
        }
        if (timeFrom != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("time"), timeFrom));
        }
        if (timeTo != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("time"), timeTo));
        }

        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        criteriaQuery.orderBy(direction.isAscending() ? criteriaBuilder.asc(root.get(sortBy)) : criteriaBuilder.desc(root.get(sortBy)));

        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        List<SpecialNeedsRequestEntity> results = entityManager.createQuery(criteriaQuery)
                .setFirstResult(page * size)
                .setMaxResults(size)
                .getResultList();

        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        countQuery.select(criteriaBuilder.count(countQuery.from(SpecialNeedsRequestEntity.class)))
                .where(predicates.toArray(new Predicate[0]));
        Long totalElements = entityManager.createQuery(countQuery).getSingleResult();

        List<SpecialNeedsRequest> requests = results.stream()
                .map(specialNeedsSupportMapper::entityToModel)
                .toList();

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        return new PageImpl<>(requests, pageable, totalElements);
    }

    @Override
    public SpecialNeedsRequest getById(Long postId) {
        return specialNeedsSupportMapper.entityToModel(specialNeedsRequestJpaRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("Special needs support request not found")
        ));
    }
}
