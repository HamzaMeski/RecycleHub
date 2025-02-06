package com.recyclehub.backend.components.collector.controller;

import com.recyclehub.backend.components.collector.dto.CollectorRequest;
import com.recyclehub.backend.components.collector.dto.CollectorResponse;
import com.recyclehub.backend.components.collector.service.CollectorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/collectors")
@RequiredArgsConstructor
public class CollectorController {

    private final CollectorService collectorService;

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'COLLECTOR')")
    public ResponseEntity<CollectorResponse> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(collectorService.getProfile(id));
    }

    @GetMapping("/verified")
    public ResponseEntity<List<CollectorResponse>> getAllVerifiedCollectors() {
        return ResponseEntity.ok(collectorService.getAllVerifiedCollectors());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CollectorResponse> createCollector(@Valid @RequestBody CollectorRequest request) {
        return ResponseEntity.ok(collectorService.createCollector(request));
    }

    @PutMapping("/{id}/verify")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CollectorResponse> verifyCollector(@PathVariable Long id) {
        return ResponseEntity.ok(collectorService.verifyCollector(id));
    }
}
