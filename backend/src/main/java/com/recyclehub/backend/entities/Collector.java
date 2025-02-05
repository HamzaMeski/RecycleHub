package com.recyclehub.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "collectors")
public class Collector extends User {
    @OneToMany(mappedBy = "collector")
    private List<CollectionRequest> assignedRequests;
    
    private String companyName;
    private String companyAddress;
    private String licenseNumber;
    private Boolean isVerified = false;
    private Boolean isAvailable = true;
}