package com.jumate.backend.persistence.jpa;

import com.jumate.backend.persistence.entity.SysUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SysUserJpaRepository extends JpaRepository<SysUserEntity, Long> {
    boolean existsByUsername(String username);

   Optional<SysUserEntity> findByUsername(String username);
}
