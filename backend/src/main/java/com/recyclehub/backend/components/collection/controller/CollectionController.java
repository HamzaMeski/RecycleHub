package com.recyclehub.backend.components.collection.controller;

import com.recyclehub.backend.components.collection.dto.CollectionRequestDTO;
import com.recyclehub.backend.components.collection.service.CollectionService;
import com.recyclehub.backend.enums.RequestStatus;
import com.recyclehub.backend.security.CurrentUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/collections")
@RequiredArgsConstructor
public class CollectionController {

    private final CollectionService collectionService;

    // Household endpoints
    @PostMapping
    @PreAuthorize("hasRole('HOUSEHOLD')")
    public ResponseEntity<CollectionRequestDTO> createRequest(
            @Valid @RequestBody CollectionRequestDTO request,
            @CurrentUser Long userId) {
        return ResponseEntity.ok(collectionService.createRequest(request, userId));
    }

    @PutMapping("/{requestId}")
    @PreAuthorize("hasRole('HOUSEHOLD')")
    public ResponseEntity<CollectionRequestDTO> updateRequest(
            @PathVariable Long requestId,
            @Valid @RequestBody CollectionRequestDTO request,
            @CurrentUser Long userId) {
        return ResponseEntity.ok(collectionService.updateRequest(requestId, request, userId));
    }

    @DeleteMapping("/{requestId}")
    @PreAuthorize("hasRole('HOUSEHOLD')")
    public ResponseEntity<Void> deleteRequest(
            @PathVariable Long requestId,
            @CurrentUser Long userId) {
        collectionService.deleteRequest(requestId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/household")
    @PreAuthorize("hasRole('HOUSEHOLD')")
    public ResponseEntity<List<CollectionRequestDTO>> getHouseholdRequests(@CurrentUser Long userId) {
        return ResponseEntity.ok(collectionService.getHouseholdRequests(userId));
    }

    // Collector endpoints
    @GetMapping("/available")
    @PreAuthorize("hasRole('COLLECTOR')")
    public ResponseEntity<List<CollectionRequestDTO>> getAvailableRequests(@RequestParam String city) {
        return ResponseEntity.ok(collectionService.getAvailableRequestsInCity(city));
    }

    @PutMapping("/{requestId}/status")
    @PreAuthorize("hasRole('COLLECTOR')")
    public ResponseEntity<CollectionRequestDTO> updateRequestStatus(
            @PathVariable Long requestId,
            @RequestParam RequestStatus status,
            @CurrentUser Long userId) {
        return ResponseEntity.ok(collectionService.updateRequestStatus(requestId, status, userId));
    }

    @PutMapping("/{requestId}/complete")
    @PreAuthorize("hasRole('COLLECTOR')")
    public ResponseEntity<CollectionRequestDTO> completeCollection(
            @PathVariable Long requestId,
            @RequestParam Integer actualWeight,
            @RequestBody List<String> photos,
            @CurrentUser Long userId) {
        return ResponseEntity.ok(collectionService.completeCollection(requestId, actualWeight, photos, userId));
    }

    @GetMapping("/collector")
    @PreAuthorize("hasRole('COLLECTOR')")
    public ResponseEntity<List<CollectionRequestDTO>> getCollectorRequests(@CurrentUser Long userId) {
        return ResponseEntity.ok(collectionService.getCollectorRequests(userId));
    }

    // Common endpoints
    @GetMapping("/{requestId}")
    @PreAuthorize("hasAnyRole('HOUSEHOLD', 'COLLECTOR')")
    public ResponseEntity<CollectionRequestDTO> getRequestById(@PathVariable Long requestId) {
        return ResponseEntity.ok(collectionService.getRequestById(requestId));
    }
}
