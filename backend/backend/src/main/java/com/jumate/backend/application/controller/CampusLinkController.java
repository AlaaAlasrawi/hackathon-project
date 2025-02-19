package com.jumate.backend.application.controller;

import com.jumate.backend.application.dto.campuslink.CreateCampusLinkGroupRequest;
import com.jumate.backend.application.dto.campuslink.CreateCampusLinkGroupResponse;
import com.jumate.backend.application.dto.campuslink.CreateCampusLinkPartnerRequest;
import com.jumate.backend.application.dto.campuslink.CreateCampusLinkPartnerResponse;
import com.jumate.backend.domain.mapper.CampusLinkGroupMapper;
import com.jumate.backend.domain.mapper.CampusLinkPartnerMapper;
import com.jumate.backend.domain.model.CampusLinkGroup;
import com.jumate.backend.domain.model.CampusLinkPartner;
import com.jumate.backend.domain.model.SpecialNeedsRequest;
import com.jumate.backend.domain.service.CampusLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/campuslink")
@RequiredArgsConstructor
public class CampusLinkController {
    private final CampusLinkService campusLinkService;
    private final CampusLinkPartnerMapper campusLinkPartnerMapper;
    private final CampusLinkGroupMapper campusLinkGroupMapper;

    @PostMapping("/partner")
    public ResponseEntity<CreateCampusLinkPartnerResponse> createCampusLinkPartner(@RequestBody CreateCampusLinkPartnerRequest request) {
        CampusLinkPartner campusLinkPartner = campusLinkPartnerMapper.partnerRequestToModel(request);
        return ResponseEntity.ok(campusLinkPartnerMapper.modelToPartnerResponse(campusLinkService.createCampusLinkPartner(campusLinkPartner)));
    }

    @PostMapping("/groups")
    public ResponseEntity<CreateCampusLinkGroupResponse> createCampusLinkGroup(@RequestBody CreateCampusLinkGroupRequest request){
        CampusLinkGroup campusLinkGroup = campusLinkGroupMapper.RequestToModel(request);
        return ResponseEntity.ok(campusLinkGroupMapper.modelToResponse(campusLinkService.createCampusLinkGroup(campusLinkGroup)));
    }

    @GetMapping("/partner")
    public ResponseEntity<Page<CampusLinkPartner>> getAllPartners(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy,
            @RequestParam(name = "sortDirection", defaultValue = "desc") String sortDirection,
            @RequestParam(name = "description", required = false) String description,
            @RequestParam(name = "username", required = false) String username,
            @RequestParam(name = "tags", required = false) String tags,
            @RequestParam(name = "session", required = false) String session) {

        Page<CampusLinkPartner> partners = campusLinkService.getAllPartners(
                page, size, sortBy, sortDirection, description, username, tags, session);

        return ResponseEntity.ok(partners);
    }


    @GetMapping("/groups")
    public ResponseEntity<Page<CampusLinkGroup>> getAllGroups(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy,
            @RequestParam(name = "sortDirection", defaultValue = "desc") String sortDirection,
            @RequestParam(name = "description", required = false) String description,
            @RequestParam(name = "groupName", required = false) String groupName,
            @RequestParam(name = "session", required = false) String session,
            @RequestParam(name = "username", required = false) String username) {

        Page<CampusLinkGroup> groups = campusLinkService.getAllGroups(
                page, size, sortBy, sortDirection, description, groupName, session, username);

        return ResponseEntity.ok(groups);
    }

}
