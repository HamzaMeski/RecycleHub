package com.recyclehub.backend.entities;

import com.recyclehub.backend.enums.WasteType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class WasteItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "request_id")
    private CollectionRequest request;
    
    @Enumerated(EnumType.STRING)
    private WasteType type;
    
    private Double weight;
    private Integer pointsPerKg;
    
    @PrePersist
    protected void onCreate() {
        if (type != null) {
            this.pointsPerKg = type.getPointsPerKg();
        }
    }
}
