package com.jumate.backend.domain.mapper;

import com.jumate.backend.application.dto.idm.UserAuthenticationRequest;
import com.jumate.backend.application.dto.idm.UserAuthenticationResponse;
import com.jumate.backend.domain.model.UserAuthentication;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserAuthenticationMapper {
    UserAuthentication requestToModel(UserAuthenticationRequest userAuthenticationRequest);
    UserAuthenticationResponse modelToResponse(UserAuthentication userAuthentication);
}
