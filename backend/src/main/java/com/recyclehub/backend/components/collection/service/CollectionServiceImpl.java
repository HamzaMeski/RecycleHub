package com.recyclehub.backend.components.collection.service;

import com.recyclehub.backend.components.collection.dto.CollectionRequestDTO;
import com.recyclehub.backend.components.collection.mapper.CollectionMapper;
import com.recyclehub.backend.components.collection.repository.CollectionRepository;
import com.recyclehub.backend.components.houseHold.repository.HouseHoldRepository;
import com.recyclehub.backend.components.collector.repository.CollectorRepository;
import com.recyclehub.backend.entities.*;
import com.recyclehub.backend.enums.RequestStatus;
import com.recyclehub.backend.enums.WasteType;
import com.recyclehub.backend.exception.ResourceNotFoundException;
import com.recyclehub.backend.exception.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CollectionServiceImpl implements CollectionService {

    private final CollectionRepository collectionRepository;
    private final HouseHoldRepository houseHoldRepository;
    private final CollectorRepository collectorRepository;
    private final CollectionMapper collectionMapper;

    @Override
    @Transactional
    public CollectionRequestDTO createRequest(CollectionRequestDTO requestDTO, Long householdId) {
        log.info("Creating collection request for household: {}", householdId);

        HouseHold household = houseHoldRepository.findById(householdId)
                .orElseThrow(() -> new ResourceNotFoundException("Household not found"));

        if (!canCreateNewRequest(householdId)) {
            throw new ValidationException("Maximum number of pending requests (3) reached");
        }

        CollectionRequest request = CollectionRequest.builder()
                .individual(household)
                .street(requestDTO.getCollectionAddress())
                .city(requestDTO.getCity())
                .notes(requestDTO.getNotes())
                .status(RequestStatus.PENDING)
                .estimatedWeight(requestDTO.getWeightInGrams() / 1000.0) // Convert to kg
                .createdAt(LocalDateTime.now())
                .build();

        // Create waste items
        List<WasteItem> wasteItems = requestDTO.getWasteTypes().stream()
                .map(type -> WasteItem.builder()
                        .request(request)
                        .type(type)
                        .weight(requestDTO.getWeightInGrams() / (1000.0 * requestDTO.getWasteTypes().size())) // Distribute weight evenly
                        .pointsPerKg(type.getPointsPerKg())
                        .build())
                .collect(Collectors.toList());
        request.setWasteItems(wasteItems);

        // Create photos
        if (requestDTO.getPhotos() != null && !requestDTO.getPhotos().isEmpty()) {
            List<RequestPhoto> photos = requestDTO.getPhotos().stream()
                    .map(url -> RequestPhoto.builder()
                            .request(request)
                            .photoUrl(url)
                            .isCollectorPhoto(false)
                            .uploadedAt(LocalDateTime.now())
                            .build())
                    .collect(Collectors.toList());
            request.setPhotos(photos);
        }

        CollectionRequest savedRequest = collectionRepository.save(request);
        log.info("Collection request created with ID: {}", savedRequest.getId());

        return collectionMapper.toDTO(savedRequest);
    }

    @Override
    @Transactional
    public CollectionRequestDTO updateRequest(Long requestId, CollectionRequestDTO requestDTO, Long householdId) {
        log.info("Updating collection request: {} for household: {}", requestId, householdId);

        CollectionRequest request = collectionRepository.findByIdAndIndividualId(requestId, householdId)
                .orElseThrow(() -> new ResourceNotFoundException("Collection request not found"));

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new ValidationException("Only pending requests can be updated");
        }

        request.setStreet(requestDTO.getCollectionAddress());
        request.setCity(requestDTO.getCity());
        request.setNotes(requestDTO.getNotes());
        request.setEstimatedWeight(requestDTO.getWeightInGrams() / 1000.0);

        // Clear and update waste items
        List<WasteItem> existingItems = request.getWasteItems();
        existingItems.clear();

        List<WasteItem> newWasteItems = requestDTO.getWasteTypes().stream()
                .map(type -> WasteItem.builder()
                        .request(request)
                        .type(type)
                        .weight(requestDTO.getWeightInGrams() / (1000.0 * requestDTO.getWasteTypes().size()))
                        .pointsPerKg(type.getPointsPerKg())
                        .build())
                .collect(Collectors.toList());
        existingItems.addAll(newWasteItems);

        // Update photos if provided
        if (requestDTO.getPhotos() != null) {
            List<RequestPhoto> existingPhotos = request.getPhotos();
            existingPhotos.removeIf(photo -> !photo.getIsCollectorPhoto());

            List<RequestPhoto> newPhotos = requestDTO.getPhotos().stream()
                    .map(url -> RequestPhoto.builder()
                            .request(request)
                            .photoUrl(url)
                            .isCollectorPhoto(false)
                            .uploadedAt(LocalDateTime.now())
                            .build())
                    .collect(Collectors.toList());
            existingPhotos.addAll(newPhotos);
        }

        request.setUpdatedAt(LocalDateTime.now());
        CollectionRequest updatedRequest = collectionRepository.save(request);
        log.info("Collection request updated: {}", updatedRequest.getId());

        return collectionMapper.toDTO(updatedRequest);
    }

    @Override
    @Transactional
    public void deleteRequest(Long requestId, Long householdId) {
        log.info("Deleting collection request: {} for household: {}", requestId, householdId);

        CollectionRequest request = collectionRepository.findByIdAndIndividualId(requestId, householdId)
                .orElseThrow(() -> new ResourceNotFoundException("Collection request not found"));

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new ValidationException("Only pending requests can be deleted");
        }

        collectionRepository.delete(request);
        log.info("Collection request deleted: {}", requestId);
    }

    @Override
    @Transactional
    public CollectionRequestDTO updateRequestStatus(Long requestId, RequestStatus status, Long collectorId) {
        log.info("Updating request: {} status to: {} by collector: {}", requestId, status, collectorId);

        CollectionRequest request = collectionRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Collection request not found"));

        validateStatusTransition(request.getStatus(), status);

        if (status == RequestStatus.OCCUPIED) {
            Collector collector = collectorRepository.findById(collectorId)
                    .orElseThrow(() -> new ResourceNotFoundException("Collector not found"));
            request.setCollector(collector);
        }

        request.setStatus(status);
        request.setUpdatedAt(LocalDateTime.now());

        CollectionRequest updatedRequest = collectionRepository.save(request);
        log.info("Request status updated successfully: {}", requestId);

        return collectionMapper.toDTO(updatedRequest);
    }

    @Override
    @Transactional
    public CollectionRequestDTO completeCollection(Long requestId, Integer actualWeight, List<String> photos, Long collectorId) {
        log.info("Completing collection for request: {} by collector: {}", requestId, collectorId);

        CollectionRequest request = collectionRepository.findByIdAndCollectorId(requestId, collectorId)
                .orElseThrow(() -> new ResourceNotFoundException("Collection request not found"));

        if (request.getStatus() != RequestStatus.IN_PROGRESS) {
            throw new ValidationException("Request must be in progress to complete collection");
        }

        request.setActualWeight(actualWeight / 1000.0); // Convert to kg

        // Add collector photos
        if (photos != null && !photos.isEmpty()) {
            List<RequestPhoto> collectorPhotos = photos.stream()
                    .map(url -> RequestPhoto.builder()
                            .request(request)
                            .photoUrl(url)
                            .isCollectorPhoto(true)
                            .uploadedAt(LocalDateTime.now())
                            .build())
                    .collect(Collectors.toList());
            request.getPhotos().addAll(collectorPhotos);
        }

        request.setStatus(RequestStatus.VALIDATED);
        request.setUpdatedAt(LocalDateTime.now());

        // Update waste item weights proportionally and calculate points
        double totalEstimatedWeight = request.getWasteItems().stream()
                .mapToDouble(WasteItem::getWeight)
                .sum();

        for (WasteItem item : request.getWasteItems()) {
            double proportion = item.getWeight() / totalEstimatedWeight;
            item.setWeight(request.getActualWeight() * proportion);
        }

        // Award points to household
        awardPoints(request);

        CollectionRequest completedRequest = collectionRepository.save(request);
        log.info("Collection completed successfully: {}", requestId);

        return collectionMapper.toDTO(completedRequest);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CollectionRequestDTO> getHouseholdRequests(Long householdId) {
        return collectionRepository.findByIndividualId(householdId)
                .stream()
                .map(collectionMapper::toDTO)
                .toList();
    }

    @Override
    public List<CollectionRequestDTO> getAllAvailableRequests() {
        return collectionRepository.findAllAvailableRequests()
                .stream()
                .map(collectionMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CollectionRequestDTO> getCollectorRequests(Long collectorId) {
        return collectionRepository.findByCollectorId(collectorId)
                .stream()
                .map(collectionMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CollectionRequestDTO getRequestById(Long requestId) {
        return collectionMapper.toDTO(
                collectionRepository.findById(requestId)
                        .orElseThrow(() -> new ResourceNotFoundException("Collection request not found"))
        );
    }

    @Override
    @Transactional(readOnly = true)
    public boolean canCreateNewRequest(Long householdId) {
        long pendingRequests = collectionRepository.countByIndividualIdAndStatusIn(
                householdId,
                List.of(RequestStatus.PENDING, RequestStatus.OCCUPIED, RequestStatus.IN_PROGRESS)
        );
        return pendingRequests < 3;
    }

    private void validateStatusTransition(RequestStatus currentStatus, RequestStatus newStatus) {
        boolean isValid = switch (currentStatus) {
            case PENDING -> newStatus == RequestStatus.OCCUPIED || newStatus == RequestStatus.REJECTED;
            case OCCUPIED -> newStatus == RequestStatus.IN_PROGRESS || newStatus == RequestStatus.REJECTED;
            case IN_PROGRESS -> newStatus == RequestStatus.VALIDATED || newStatus == RequestStatus.REJECTED;
            case VALIDATED, REJECTED -> false;
        };

        if (!isValid) {
            throw new ValidationException("Invalid status transition from " + currentStatus + " to " + newStatus);
        }
    }

    private void awardPoints(CollectionRequest request) {
        HouseHold household = request.getIndividual();
        int totalPoints = request.getWasteItems().stream()
                .mapToInt(item -> (int) (item.getWeight() * item.getPointsPerKg()))
                .sum();

        household.setPoints(household.getPoints() + totalPoints);
        houseHoldRepository.save(household);

        log.info("Awarded {} points to household {} for collection {}",
                totalPoints, household.getId(), request.getId());
    }
}