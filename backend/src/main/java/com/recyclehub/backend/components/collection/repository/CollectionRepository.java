package com.recyclehub.backend.components.collection.repository;

import com.recyclehub.backend.entities.CollectionRequest;
import com.recyclehub.backend.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CollectionRepository extends JpaRepository<CollectionRequest, Long> {
    List<CollectionRequest> findByIndividualId(Long individualId);
    
    List<CollectionRequest> findByCollectorId(Long collectorId);
    
    Optional<CollectionRequest> findByIdAndIndividualId(Long id, Long individualId);
    
    Optional<CollectionRequest> findByIdAndCollectorId(Long id, Long collectorId);
    
    List<CollectionRequest> findByCityAndStatus(String city, RequestStatus status);
    
    @Query("SELECT COUNT(cr) FROM CollectionRequest cr WHERE cr.individual.id = ?1 AND cr.status IN ?2")
    long countByIndividualIdAndStatusIn(Long individualId, List<RequestStatus> statuses);

    @Query("SELECT cr FROM CollectionRequest cr WHERE cr.status = 'PENDING' AND cr.collector IS NULL")
    List<CollectionRequest> findAllAvailableRequests();
}
