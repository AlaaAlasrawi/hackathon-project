package com.jumate.backend.domain.providers;

import com.jumate.backend.domain.model.SysUser;
import com.jumate.backend.domain.service.security.SysUserDetailsService;
import com.jumate.backend.persistence.repository.SysUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class IdentityProvider {
    private final SysUserRepository sysUserRepository;
    private final SysUserDetailsService sysUserDetailsService;

    public SysUser currentIdentity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.isAuthenticated()) {
            if(authentication.getPrincipal() instanceof UserDetails userDetails) {
                return sysUserRepository.findByUsername(userDetails.getUsername());
            }

            if(authentication.getPrincipal() instanceof String username) {
                return sysUserRepository.findByUsername(username);
            }
        }

        return null;
    }

    public UserDetails currentIdentityDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.isAuthenticated()) {
            if(authentication.getPrincipal() instanceof UserDetails userDetails) {
                return userDetails;
            }

            if(authentication.getPrincipal() instanceof String username) {
                return sysUserDetailsService.loadUserByUsername(username);
            }
        }

        return null;
    }
}