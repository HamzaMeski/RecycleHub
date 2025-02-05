package com.recyclehub.backend.components.admin.service;

import com.recyclehub.backend.components.admin.dto.AdminResponse;
import com.recyclehub.backend.components.admin.mapper.AdminMapper;
import com.recyclehub.backend.components.admin.repository.AdminRepository;
import com.recyclehub.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    
    private final AdminRepository repository;
    private final AdminMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public AdminResponse getProfile(Long id) {
        return repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
    }
}
