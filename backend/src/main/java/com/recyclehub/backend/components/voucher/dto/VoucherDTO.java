package com.recyclehub.backend.components.voucher.dto;

import com.recyclehub.backend.enums.VoucherType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VoucherDTO {
    private Long id;
    private Long individualId;
    private Integer pointsSpent;
    private Double value;
    private Boolean isUsed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
