package com.recyclehub.backend.components.collection.dto;

import com.recyclehub.backend.enums.RequestStatus;
import com.recyclehub.backend.enums.WasteType;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
public class CollectionRequestDTO {
    private Long id;

    @NotEmpty(message = "At least one type of waste must be selected")
    private Set<WasteType> wasteTypes;

    private List<String> photos;

    @NotNull(message = "Weight is required")
    @Min(value = 1000, message = "Weight must be at least 1000 grams")
    @Max(value = 10000, message = "Weight cannot exceed 10000 grams (10 kg)")
    private Integer weightInGrams;

    @NotBlank(message = "Collection address is required")
    private String collectionAddress;

    @NotBlank(message = "City is required")
    private String city;

    private String notes;

    private RequestStatus status;
    private Long householdId;
    private Long collectorId;
    private Integer actualWeightInGrams;
    private List<String> collectionPhotos;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
