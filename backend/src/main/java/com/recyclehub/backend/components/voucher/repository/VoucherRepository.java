package com.recyclehub.backend.components.voucher.repository;

import com.recyclehub.backend.entities.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    List<Voucher> findByIndividualId(Long individualId);
    List<Voucher> findByIndividualIdAndIsUsed(Long individualId, Boolean isUsed);
}
