package com.recyclehub.backend.entities;

import com.recyclehub.backend.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CollectionRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "individual_id")
    private HouseHold individual;
    
    @ManyToOne
    @JoinColumn(name = "collector_id")
    private Collector collector;
    
    @OneToMany(mappedBy = "request", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<WasteItem> wasteItems = new ArrayList<>();
    
    @OneToMany(mappedBy = "request", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<RequestPhoto> photos = new ArrayList<>();
    
    private String street;
    private String city;
    private String country;
    private String zipCode;
    
    private LocalDateTime desiredDateTime;
    private String notes;
    
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private RequestStatus status = RequestStatus.PENDING;
    
    private Double actualWeight;  // recorded by collector
    private Double estimatedWeight;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
