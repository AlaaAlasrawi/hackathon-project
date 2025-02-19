package com.jumate.backend.application.controller;

import com.jumate.backend.application.dto.idm.UserAuthenticationRequest;
import com.jumate.backend.application.dto.idm.UserAuthenticationResponse;
import com.jumate.backend.domain.mapper.UserAuthenticationMapper;
import com.jumate.backend.domain.model.SysUser;
import com.jumate.backend.domain.service.IdmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/idm")
@RequiredArgsConstructor
public class IdmController {
    private final IdmService idmService;
    private final UserAuthenticationMapper userAuthenticationMapper;

    @PostMapping("/login")
    public ResponseEntity<UserAuthenticationResponse> login(@RequestBody UserAuthenticationRequest request){
        return ResponseEntity.ok(userAuthenticationMapper.modelToResponse(idmService.login(userAuthenticationMapper.requestToModel(request))));
    }

    @GetMapping("/{username}")
    public ResponseEntity<SysUser> getUserByUsername(@PathVariable("username") String username){
        return ResponseEntity.ok(idmService.getUserByUsername(username));
    }
}
