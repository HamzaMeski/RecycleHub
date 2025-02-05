package com.recyclehub.backend.components.collector.mapper;

import com.recyclehub.backend.components.collector.dto.CollectorResponse;
import com.recyclehub.backend.entities.Collector;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CollectorMapper {
    CollectorResponse toResponse(Collector collector);
}
