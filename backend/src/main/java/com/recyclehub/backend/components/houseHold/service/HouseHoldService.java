package com.recyclehub.backend.components.houseHold.service;

import com.recyclehub.backend.components.houseHold.dto.HouseHoldRequest;
import com.recyclehub.backend.components.houseHold.dto.HouseHoldResponse;

public interface HouseHoldService {
    HouseHoldResponse register(HouseHoldRequest request);
    HouseHoldResponse getProfile(Long id);
    HouseHoldResponse updateProfile(Long id, HouseHoldRequest request);
    void deleteProfile(Long id);
    boolean existsByEmail(String email);
}
