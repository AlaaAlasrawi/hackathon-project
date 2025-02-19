package com.jumate.backend.application.controller;

import com.jumate.backend.application.dto.specialneed.CreateSpicalNeedRequest;
import com.jumate.backend.application.dto.specialneed.CreateSpicalNeedResponse;
import com.jumate.backend.domain.mapper.SpecialNeedsSupportMapper;
import com.jumate.backend.domain.model.SpecialNeedsRequest;
import com.jumate.backend.domain.service.SpecialNeedsSupportService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/SpecialNeedsSupport")
@RequiredArgsConstructor
public class SpecialNeedsSupportController {
    private final SpecialNeedsSupportService specialNeedsSupportService;
    private final SpecialNeedsSupportMapper specialNeedsSupportMapper;

    @PostMapping("/request")
    public ResponseEntity<CreateSpicalNeedResponse> createRequest(@RequestBody CreateSpicalNeedRequest request) {
        SpecialNeedsRequest model = specialNeedsSupportMapper.requestToModel(request);
        return ResponseEntity.ok(specialNeedsSupportMapper.modelToResponse(specialNeedsSupportService.createRequest(model)));
    }

    @GetMapping
    public ResponseEntity<Page<SpecialNeedsRequest>> getAllRequests(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "createdAt") String sortBy,
            @RequestParam(name = "sortDirection", defaultValue = "desc") String sortDirection,
            @RequestParam(name = "description", required = false) String description,
            @RequestParam(name = "disabilitiesName", required = false) String disabilitiesName,
            @RequestParam(name = "place", required = false) String place,
            @RequestParam(name = "timeFrom", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime timeFrom,
            @RequestParam(name = "timeTo", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime timeTo) {

        Page<SpecialNeedsRequest> requests = specialNeedsSupportService.getAllRequests(
                page, size, sortBy, sortDirection, description, disabilitiesName, place, timeFrom, timeTo);

        return ResponseEntity.ok(requests);
    }

}
