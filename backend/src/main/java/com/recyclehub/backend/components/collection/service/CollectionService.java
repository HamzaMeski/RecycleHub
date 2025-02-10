package com.recyclehub.backend.components.collection.service;

import com.recyclehub.backend.components.collection.dto.CollectionRequestDTO;
import com.recyclehub.backend.enums.RequestStatus;

import java.util.List;

public interface CollectionService {
    // Household methods
    CollectionRequestDTO createRequest(CollectionRequestDTO request, Long householdId);
    CollectionRequestDTO updateRequest(Long requestId, CollectionRequestDTO request, Long householdId);
    void deleteRequest(Long requestId, Long householdId);
    List<CollectionRequestDTO> getHouseholdRequests(Long householdId);
    
    // Collector methods
    List<CollectionRequestDTO> getAllAvailableRequests();
    CollectionRequestDTO updateRequestStatus(Long requestId, RequestStatus status, Long collectorId);
    CollectionRequestDTO completeCollection(Long requestId, Integer actualWeight, List<String> photos, Long collectorId);
    List<CollectionRequestDTO> getCollectorRequests(Long collectorId);
    
    // Common methods
    CollectionRequestDTO getRequestById(Long requestId);
    boolean canCreateNewRequest(Long householdId);
}
