package com.recyclehub.backend.components.collection.dto;

import com.recyclehub.backend.enums.WasteType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WasteItemDTO {
    private Long id;
    private Long requestId;
    
    @NotNull(message = "Waste type is required")
    private WasteType type;
    
    @NotNull(message = "Weight is required")
    @Min(value = 0, message = "Weight must be positive")
    private Double weight;
    
    private Integer pointsPerKg;
}
