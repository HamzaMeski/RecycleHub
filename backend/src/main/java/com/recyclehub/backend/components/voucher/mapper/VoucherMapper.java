package com.recyclehub.backend.components.voucher.mapper;

import com.recyclehub.backend.components.voucher.dto.VoucherDTO;
import com.recyclehub.backend.entities.Voucher;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VoucherMapper {
    
    @Mapping(target = "individualId", source = "individual.id")
    VoucherDTO toDTO(Voucher voucher);

    @Mapping(target = "individual", ignore = true)
    Voucher toEntity(VoucherDTO dto);
}
