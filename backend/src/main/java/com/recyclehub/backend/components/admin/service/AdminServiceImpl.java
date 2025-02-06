package com.recyclehub.backend.components.admin.service;

import com.recyclehub.backend.components.admin.dto.AdminRequest;
import com.recyclehub.backend.components.admin.dto.AdminResponse;
import com.recyclehub.backend.components.admin.mapper.AdminMapper;
import com.recyclehub.backend.components.admin.repository.AdminRepository;
import com.recyclehub.backend.entities.Admin;
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
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final AdminMapper adminMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public AdminResponse getProfile(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
        return adminMapper.toResponse(admin);
    }

    @Override
    @Transactional
    public AdminResponse register(AdminRequest request) {
        log.info("Registering new admin with email: {}", request.getEmail());
        
        if (adminRepository.findByEmail(request.getEmail()).isPresent()) {
            log.error("Email already exists: {}", request.getEmail());
            throw new DuplicateResourceException("Email already exists");
        }

        Admin admin = Admin.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .dateOfBirth(request.getDateOfBirth())
                .build();

        Admin savedAdmin = adminRepository.save(admin);
        log.info("Admin registered successfully with email: {}", savedAdmin.getEmail());
        
        return adminMapper.toResponse(savedAdmin);
    }
}
