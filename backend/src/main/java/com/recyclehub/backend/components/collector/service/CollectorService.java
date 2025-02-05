package com.recyclehub.backend.components.collector.service;

import com.recyclehub.backend.components.collector.dto.CollectorResponse;
import java.util.List;

public interface CollectorService {
    CollectorResponse getProfile(Long id);
    List<CollectorResponse> getAllVerifiedCollectors();
}
