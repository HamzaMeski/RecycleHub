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
@Table(name = "house_holds")
public class HouseHold extends User {
    @OneToMany(mappedBy = "individual")
    private List<CollectionRequest> requests;
    
    @OneToMany(mappedBy = "individual")
    private List<Voucher> vouchers;
    
    private Integer points = 0;
}
