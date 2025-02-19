package com.jumate.backend.persistence.adapter;

import com.jumate.backend.domain.mapper.CampusLinkGroupMapper;
import com.jumate.backend.domain.model.CampusLinkGroup;
import com.jumate.backend.domain.model.SpecialNeedsRequest;
import com.jumate.backend.persistence.entity.CampusLinkGroupEntity;
import com.jumate.backend.persistence.entity.SpecialNeedsRequestEntity;
import com.jumate.backend.persistence.jpa.CampusLinkGroupJpaRepository;
import com.jumate.backend.persistence.repository.CampusLinkGroupRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CampusLinkGroupAdapter implements CampusLinkGroupRepository {
    private final CampusLinkGroupJpaRepository campusLinkGroupJpaRepository;
    private final CampusLinkGroupMapper campusLinkGroupMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public CampusLinkGroup save(CampusLinkGroup campusLinkGroup) {
        return campusLinkGroupMapper.entityToModel(campusLinkGroupJpaRepository.save(campusLinkGroupMapper.modelToEntity(campusLinkGroup)));
    }

    @Override
    public Page<CampusLinkGroup> getAllGroups(int page, int size, String sortBy, String sortDirection,
                                              String description, String groupName, String session, String username) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<CampusLinkGroupEntity> criteriaQuery = criteriaBuilder.createQuery(CampusLinkGroupEntity.class);
        Root<CampusLinkGroupEntity> root = criteriaQuery.from(CampusLinkGroupEntity.class);

        List<Predicate> predicates = new ArrayList<>();

        // Adding filters conditionally
        if (description != null && !description.isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("description"), "%" + description + "%"));
        }
        if (groupName != null && !groupName.isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("groupName"), "%" + groupName + "%"));
        }
        if (session != null && !session.isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("session"), "%" + session + "%"));
        }
        if (username != null && !username.isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("members"), "%" + username + "%"));
        }

        // Apply sorting
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        criteriaQuery.orderBy(direction.isAscending() ? criteriaBuilder.asc(root.get(sortBy)) : criteriaBuilder.desc(root.get(sortBy)));

        // Combine all predicates
        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        // Execute query
        List<CampusLinkGroupEntity> results = entityManager.createQuery(criteriaQuery)
                .setFirstResult(page * size)
                .setMaxResults(size)
                .getResultList();

        // Count query for total elements
        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        countQuery.select(criteriaBuilder.count(countQuery.from(CampusLinkGroupEntity.class)))
                .where(predicates.toArray(new Predicate[0]));
        Long totalElements = entityManager.createQuery(countQuery).getSingleResult();

        // Convert to DTOs or models
        List<CampusLinkGroup> model = results.stream()
                .map(campusLinkGroupMapper::entityToModel)
                .toList();

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        return new PageImpl<>(model, pageable, totalElements);
    }
}
