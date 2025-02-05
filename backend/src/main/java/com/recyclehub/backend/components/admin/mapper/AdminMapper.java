package com.recyclehub.backend.components.admin.mapper;

import com.recyclehub.backend.components.admin.dto.AdminResponse;
import com.recyclehub.backend.entities.Admin;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AdminMapper {
    AdminResponse toResponse(Admin admin);
}
