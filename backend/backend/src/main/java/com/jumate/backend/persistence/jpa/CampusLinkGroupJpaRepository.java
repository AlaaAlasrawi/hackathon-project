package com.jumate.backend.persistence.jpa;

import com.jumate.backend.persistence.entity.CampusLinkGroupEntity;
import com.jumate.backend.persistence.entity.SpecialNeedsRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampusLinkGroupJpaRepository extends JpaRepository<CampusLinkGroupEntity, Long> {
}
