package com.recyclehub.backend.components.houseHold.service;

import com.recyclehub.backend.components.houseHold.dto.HouseHoldRequest;
import com.recyclehub.backend.components.houseHold.dto.HouseHoldResponse;
import com.recyclehub.backend.components.houseHold.mapper.HouseHoldMapper;
import com.recyclehub.backend.components.houseHold.repository.HouseHoldRepository;
import com.recyclehub.backend.entities.HouseHold;
import com.recyclehub.backend.exception.DuplicateResourceException;
import com.recyclehub.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class HouseHoldServiceImpl implements HouseHoldService {

    private final HouseHoldRepository repository;
    private final HouseHoldMapper mapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public HouseHoldResponse register(HouseHoldRequest request) {
        log.info("Registering new household with email: {}", request.getEmail());
        
        if (repository.existsByEmail(request.getEmail())) {
            log.error("Email already exists: {}", request.getEmail());
            throw new DuplicateResourceException("Email already exists");
        }

        HouseHold houseHold = mapper.toEntity(request);
        houseHold.setPassword(passwordEncoder.encode(request.getPassword()));
        houseHold.setPoints(0);

        HouseHold savedHouseHold = repository.save(houseHold);
        log.info("Household registered successfully with email: {}", savedHouseHold.getEmail());
        
        return mapper.toResponse(savedHouseHold);
    }

    @Override
    @Transactional(readOnly = true)
    public HouseHoldResponse getProfile(Long id) {
        log.info("Retrieving household profile for ID: {}", id);
        return mapper.toResponse(findHouseHoldById(id));
    }

    @Override
    @Transactional
    public HouseHoldResponse updateProfile(Long id, HouseHoldRequest request) {
        log.info("Updating household profile for ID: {}", id);
        
        HouseHold houseHold = findHouseHoldById(id);

        // Check if email is being changed and if it's already taken
        if (!houseHold.getEmail().equals(request.getEmail()) && 
            repository.existsByEmail(request.getEmail())) {
            log.error("Email already exists: {}", request.getEmail());
            throw new DuplicateResourceException("Email already exists");
        }

        // Update the password only if it's provided in the request
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            houseHold.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        // Update other fields
        houseHold.setEmail(request.getEmail());
        houseHold.setFirstName(request.getFirstName());
        houseHold.setLastName(request.getLastName());
        houseHold.setPhone(request.getPhone());
        houseHold.setDateOfBirth(request.getDateOfBirth());
        houseHold.setStreet(request.getStreet());
        houseHold.setCity(request.getCity());
        houseHold.setCountry(request.getCountry());
        houseHold.setZipCode(request.getZipCode());
        houseHold.setProfilePicture(request.getProfilePicture());

        HouseHold updatedHouseHold = repository.save(houseHold);
        log.info("Household profile updated successfully for email: {}", updatedHouseHold.getEmail());
        
        return mapper.toResponse(updatedHouseHold);
    }

    @Override
    @Transactional
    public void deleteProfile(Long id) {
        log.info("Deleting household profile for ID: {}", id);
        
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Household not found");
        }
        repository.deleteById(id);
        
        log.info("Household profile deleted successfully for ID: {}", id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    private HouseHold findHouseHoldById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Household not found"));
    }
}
