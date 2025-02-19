package com.jumate.backend.persistence.jpa;

import com.jumate.backend.domain.model.SpecialNeedsRequest;
import com.jumate.backend.persistence.entity.SpecialNeedsRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialNeedsRequestJpaRepository extends JpaRepository<SpecialNeedsRequestEntity, Long> {

}
