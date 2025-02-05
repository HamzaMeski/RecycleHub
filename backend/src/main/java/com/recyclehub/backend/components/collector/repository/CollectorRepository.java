package com.recyclehub.backend.components.collector.repository;

import com.recyclehub.backend.entities.Collector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CollectorRepository extends JpaRepository<Collector, Long> {
    Optional<Collector> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Collector> findByIsVerifiedTrue();
}
