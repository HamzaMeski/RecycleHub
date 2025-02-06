package com.recyclehub.backend.components.collector.service;

import com.recyclehub.backend.components.collector.dto.CollectorRequest;
import com.recyclehub.backend.components.collector.dto.CollectorResponse;

import java.util.List;

public interface CollectorService {
    CollectorResponse getProfile(Long id);
    CollectorResponse createCollector(CollectorRequest request);
    CollectorResponse verifyCollector(Long id);
    CollectorResponse getByEmail(String email);
    List<CollectorResponse> getAllVerifiedCollectors();
}
