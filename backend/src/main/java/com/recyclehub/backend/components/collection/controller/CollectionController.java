package com.recyclehub.backend.components.collection.controller;

import com.recyclehub.backend.components.collection.dto.CollectionRequestDTO;
import com.recyclehub.backend.components.collection.dto.CompleteCollectionDTO;
import com.recyclehub.backend.components.collection.service.CollectionService;
import com.recyclehub.backend.enums.RequestStatus;
import com.recyclehub.backend.security.CurrentUser;
import com.recyclehub.backend.security.UserPrincipal;
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

    // Individual endpoints
    @PostMapping
    @PreAuthorize("hasRole('ROLE_INDIVIDUAL')")
    public ResponseEntity<CollectionRequestDTO> createRequest(
            @Valid @RequestBody CollectionRequestDTO request,
            @CurrentUser UserPrincipal user) {
        return ResponseEntity.ok(collectionService.createRequest(request, user.getId()));
    }

    @PutMapping("/{requestId}")
    @PreAuthorize("hasRole('ROLE_INDIVIDUAL')")
    public ResponseEntity<CollectionRequestDTO> updateRequest(
            @PathVariable Long requestId,
            @Valid @RequestBody CollectionRequestDTO request,
            @CurrentUser UserPrincipal user) {
        return ResponseEntity.ok(collectionService.updateRequest(requestId, request, user.getId()));
    }

    @DeleteMapping("/{requestId}")
    @PreAuthorize("hasRole('ROLE_INDIVIDUAL')")
    public ResponseEntity<Void> deleteRequest(
            @PathVariable Long requestId,
            @CurrentUser UserPrincipal user) {
        collectionService.deleteRequest(requestId, user.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/household")
    @PreAuthorize("hasRole('ROLE_INDIVIDUAL')")
    public ResponseEntity<List<CollectionRequestDTO>> getHouseholdRequests(@CurrentUser UserPrincipal user) {
        return ResponseEntity.ok(collectionService.getHouseholdRequests(user.getId()));
    }

    // Collector endpoints
    @GetMapping("/available")
    @PreAuthorize("hasRole('ROLE_COLLECTOR')")
    public ResponseEntity<List<CollectionRequestDTO>> getAvailableRequests(@RequestParam String city) {
        return ResponseEntity.ok(collectionService.getAvailableRequestsInCity(city));
    }

    @PutMapping("/{requestId}/status")
    @PreAuthorize("hasRole('ROLE_COLLECTOR')")
    public ResponseEntity<CollectionRequestDTO> updateRequestStatus(
            @PathVariable Long requestId,
            @RequestParam RequestStatus status,
            @CurrentUser UserPrincipal user) {
        return ResponseEntity.ok(collectionService.updateRequestStatus(requestId, status, user.getId()));
    }

    @PutMapping("/{requestId}/complete")
    @PreAuthorize("hasRole('ROLE_COLLECTOR')")
    public ResponseEntity<CollectionRequestDTO> completeCollection(
            @PathVariable Long requestId,
            @Valid @RequestBody CompleteCollectionDTO completeRequest,
            @CurrentUser UserPrincipal user) {
        return ResponseEntity.ok(collectionService.completeCollection(
                requestId, 
                completeRequest.getActualWeight(), 
                completeRequest.getPhotos(), 
                user.getId()));
    }

    @GetMapping("/collector")
    @PreAuthorize("hasRole('ROLE_COLLECTOR')")
    public ResponseEntity<List<CollectionRequestDTO>> getCollectorRequests(@CurrentUser UserPrincipal user) {
        return ResponseEntity.ok(collectionService.getCollectorRequests(user.getId()));
    }

    // Common endpoints
    @GetMapping("/{requestId}")
    @PreAuthorize("hasAnyRole('ROLE_INDIVIDUAL', 'ROLE_COLLECTOR')")
    public ResponseEntity<CollectionRequestDTO> getRequestById(@PathVariable Long requestId) {
        return ResponseEntity.ok(collectionService.getRequestById(requestId));
    }
}
