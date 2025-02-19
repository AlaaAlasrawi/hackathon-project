package com.jumate.backend.persistence.repository;

import com.jumate.backend.domain.model.SysUser;
import org.springframework.stereotype.Repository;

@Repository
public interface SysUserRepository {
    SysUser getUserById(Long id);

    SysUser save(SysUser sysUser);

    SysUser findByUsername(String username);

    boolean isUsernameAlreadyExists(String username);
}
