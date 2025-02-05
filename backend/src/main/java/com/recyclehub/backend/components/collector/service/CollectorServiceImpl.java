package com.recyclehub.backend.components.collector.service;

import com.recyclehub.backend.components.collector.dto.CollectorResponse;
import com.recyclehub.backend.components.collector.mapper.CollectorMapper;
import com.recyclehub.backend.components.collector.repository.CollectorRepository;
import com.recyclehub.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CollectorServiceImpl implements CollectorService {
    
    private final CollectorRepository repository;
    private final CollectorMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public CollectorResponse getProfile(Long id) {
        return repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Collector not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CollectorResponse> getAllVerifiedCollectors() {
        return repository.findByIsVerifiedTrue()
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }
}
