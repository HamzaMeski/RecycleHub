package com.recyclehub.backend.components.collection.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CompleteCollectionDTO {
    @NotNull(message = "Actual weight is required")
    private Integer actualWeight;
    private List<String> photos;
}
