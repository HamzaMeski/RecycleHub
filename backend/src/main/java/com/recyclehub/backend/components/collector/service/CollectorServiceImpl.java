package com.recyclehub.backend.components.collector.service;

import com.recyclehub.backend.components.collector.dto.CollectorRequest;
import com.recyclehub.backend.components.collector.dto.CollectorResponse;
import com.recyclehub.backend.components.collector.mapper.CollectorMapper;
import com.recyclehub.backend.components.collector.repository.CollectorRepository;
import com.recyclehub.backend.entities.Collector;
import com.recyclehub.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CollectorServiceImpl implements CollectorService {

    private final CollectorRepository collectorRepository;
    private final CollectorMapper collectorMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public CollectorResponse getProfile(Long id) {
        Collector collector = collectorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Collector not found"));
        return collectorMapper.toResponse(collector);
    }

    @Override
    @Transactional
    public CollectorResponse createCollector(CollectorRequest request) {
        log.info("Creating new collector with email: {}", request.getEmail());
        
        if (collectorRepository.findByEmail(request.getEmail()).isPresent()) {
            log.error("Email already taken: {}", request.getEmail());
            throw new IllegalStateException("Email already taken");
        }

        Collector collector = Collector.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .dateOfBirth(request.getDateOfBirth())
                .companyName(request.getCompanyName())
                .companyAddress(request.getCompanyAddress())
                .licenseNumber(request.getLicenseNumber())
                .isVerified(false)
                .isAvailable(true)
                .build();

        Collector savedCollector = collectorRepository.save(collector);
        log.info("Collector created successfully with email: {}", savedCollector.getEmail());
        
        return collectorMapper.toResponse(savedCollector);
    }

    @Override
    @Transactional
    public CollectorResponse verifyCollector(Long id) {
        log.info("Verifying collector with ID: {}", id);
        
        Collector collector = collectorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Collector not found"));
        
        collector.setIsVerified(true);
        Collector savedCollector = collectorRepository.save(collector);
        
        log.info("Collector verified successfully: {}", savedCollector.getEmail());
        return collectorMapper.toResponse(savedCollector);
    }

    @Override
    @Transactional(readOnly = true)
    public CollectorResponse getByEmail(String email) {
        Collector collector = collectorRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Collector not found"));
        return collectorMapper.toResponse(collector);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CollectorResponse> getAllVerifiedCollectors() {
        return collectorRepository.findByIsVerifiedTrue()
                .stream()
                .map(collectorMapper::toResponse)
                .collect(Collectors.toList());
    }
}
