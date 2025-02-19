package com.jumate.backend.domain.mapper;

import com.jumate.backend.domain.model.SysUser;
import com.jumate.backend.persistence.entity.SysUserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SysUserMapper {
    SysUserEntity modelToEntity(SysUser sysUser);

    SysUser entityToModel(SysUserEntity entity);

}