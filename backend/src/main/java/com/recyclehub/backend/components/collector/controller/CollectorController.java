package com.recyclehub.backend.components.collector.controller;

import com.recyclehub.backend.components.collector.dto.CollectorResponse;
import com.recyclehub.backend.components.collector.service.CollectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/collectors")
@RequiredArgsConstructor
public class CollectorController {

    private final CollectorService service;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('COLLECTOR')")
    public ResponseEntity<CollectorResponse> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(service.getProfile(id));
    }

    @GetMapping("/verified")
    @PreAuthorize("hasAnyRole('INDIVIDUAL', 'ADMIN')")
    public ResponseEntity<List<CollectorResponse>> getAllVerifiedCollectors() {
        return ResponseEntity.ok(service.getAllVerifiedCollectors());
    }
}
