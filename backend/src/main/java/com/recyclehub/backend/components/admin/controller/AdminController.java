package com.recyclehub.backend.components.admin.controller;

import com.recyclehub.backend.components.admin.dto.AdminResponse;
import com.recyclehub.backend.components.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admins")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService service;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminResponse> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(service.getProfile(id));
    }
}
