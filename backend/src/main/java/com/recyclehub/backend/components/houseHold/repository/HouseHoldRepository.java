package com.recyclehub.backend.components.houseHold.repository;

import com.recyclehub.backend.entities.HouseHold;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HouseHoldRepository extends JpaRepository<HouseHold, Long> {
    Optional<HouseHold> findByEmail(String email);
    boolean existsByEmail(String email);
}
