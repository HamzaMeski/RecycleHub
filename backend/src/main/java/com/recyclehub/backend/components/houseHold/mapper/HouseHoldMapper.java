package com.recyclehub.backend.components.houseHold.mapper;

import com.recyclehub.backend.components.houseHold.dto.HouseHoldRequest;
import com.recyclehub.backend.components.houseHold.dto.HouseHoldResponse;
import com.recyclehub.backend.entities.HouseHold;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface HouseHoldMapper {
    
    HouseHoldResponse toResponse(HouseHold houseHold);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "requests", ignore = true)
    @Mapping(target = "vouchers", ignore = true)
    @Mapping(target = "points", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    HouseHold toEntity(HouseHoldRequest request);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "requests", ignore = true)
    @Mapping(target = "vouchers", ignore = true)
    @Mapping(target = "points", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(HouseHoldRequest request, @MappingTarget HouseHold houseHold);
}
