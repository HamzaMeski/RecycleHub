package com.recyclehub.backend.components.houseHold.service;

import com.recyclehub.backend.components.houseHold.dto.HouseHoldRequest;
import com.recyclehub.backend.components.houseHold.dto.HouseHoldResponse;
import com.recyclehub.backend.components.houseHold.mapper.HouseHoldMapper;
import com.recyclehub.backend.components.houseHold.repository.HouseHoldRepository;
import com.recyclehub.backend.entities.HouseHold;
import com.recyclehub.backend.exception.DuplicateResourceException;
import com.recyclehub.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HouseHoldServiceImpl implements HouseHoldService {

    private final HouseHoldRepository repository;
    private final HouseHoldMapper mapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public HouseHoldResponse register(HouseHoldRequest request) {
        if (repository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        HouseHold houseHold = mapper.toEntity(request);
        houseHold.setPassword(passwordEncoder.encode(request.getPassword()));
        houseHold.setPoints(0);

        return mapper.toResponse(repository.save(houseHold));
    }

    @Override
    @Transactional(readOnly = true)
    public HouseHoldResponse getProfile(Long id) {
        return mapper.toResponse(findHouseHoldById(id));
    }

    @Override
    @Transactional
    public HouseHoldResponse updateProfile(Long id, HouseHoldRequest request) {
        HouseHold houseHold = findHouseHoldById(id);

        // Check if email is being changed and if it's already taken
        if (!houseHold.getEmail().equals(request.getEmail()) && 
            repository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        mapper.updateEntity(request, houseHold);
        
        // Only update password if it's provided in the request
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            houseHold.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return mapper.toResponse(repository.save(houseHold));
    }

    @Override
    @Transactional
    public void deleteProfile(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("HouseHold not found");
        }
        repository.deleteById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    private HouseHold findHouseHoldById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HouseHold not found"));
    }
}
