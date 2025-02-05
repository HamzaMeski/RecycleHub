package com.recyclehub.backend.components.admin.service;

import com.recyclehub.backend.components.admin.dto.AdminResponse;

public interface AdminService {
    AdminResponse getProfile(Long id);
}
