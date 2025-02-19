package com.jumate.backend.persistence.adapter;

import com.jumate.backend.domain.mapper.CampusLinkPartnerMapper;
import com.jumate.backend.domain.model.CampusLinkGroup;
import com.jumate.backend.domain.model.CampusLinkPartner;
import com.jumate.backend.persistence.entity.CampusLinkGroupEntity;
import com.jumate.backend.persistence.entity.CampusLinkPartnerEntity;
import com.jumate.backend.persistence.jpa.CampusLinkPartnerJpaRepository;
import com.jumate.backend.persistence.repository.CampusLinkPartnerRepository;
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
public class CampusLinkPartnerAdapter implements CampusLinkPartnerRepository {
    private final CampusLinkPartnerJpaRepository campusLinkPartnerJpaRepository;
    private final CampusLinkPartnerMapper campusLinkPartnerMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public CampusLinkPartner save(CampusLinkPartner campusLinkPartner) {
        return campusLinkPartnerMapper.entityToModel(campusLinkPartnerJpaRepository.save(campusLinkPartnerMapper.modelToEntity(campusLinkPartner)));
    }

    @Override
    public Page<CampusLinkPartner> getAllPartners(int page, int size, String sortBy, String sortDirection,
                                                  String description, String username, String tags, String session) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<CampusLinkPartnerEntity> criteriaQuery = criteriaBuilder.createQuery(CampusLinkPartnerEntity.class);
        Root<CampusLinkPartnerEntity> root = criteriaQuery.from(CampusLinkPartnerEntity.class);

        List<Predicate> predicates = new ArrayList<>();

        // Adding filters conditionally
        if (description != null && !description.isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("description"), "%" + description + "%"));
        }
        if (username != null && !username.isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("username"), "%" + username + "%"));
        }
        if (tags != null && !tags.isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("tags"), "%" + tags + "%"));
        }
        if (session != null && !session.isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("session"), "%" + session + "%"));
        }

        // Apply sorting
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        criteriaQuery.orderBy(direction.isAscending() ? criteriaBuilder.asc(root.get(sortBy)) : criteriaBuilder.desc(root.get(sortBy)));

        // Combine all predicates
        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        // Execute query
        List<CampusLinkPartnerEntity> results = entityManager.createQuery(criteriaQuery)
                .setFirstResult(page * size)
                .setMaxResults(size)
                .getResultList();

        // Count query for total elements
        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        countQuery.select(criteriaBuilder.count(countQuery.from(CampusLinkPartnerEntity.class)))
                .where(predicates.toArray(new Predicate[0]));
        Long totalElements = entityManager.createQuery(countQuery).getSingleResult();

        // Convert to DTOs or models
        List<CampusLinkPartner> model = results.stream()
                .map(campusLinkPartnerMapper::entityToModel)
                .toList();

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        return new PageImpl<>(model, pageable, totalElements);
    }
}
