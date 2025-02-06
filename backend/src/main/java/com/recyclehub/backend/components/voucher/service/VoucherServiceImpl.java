package com.recyclehub.backend.components.voucher.service;

import com.recyclehub.backend.components.houseHold.repository.HouseHoldRepository;
import com.recyclehub.backend.components.voucher.dto.VoucherDTO;
import com.recyclehub.backend.components.voucher.mapper.VoucherMapper;
import com.recyclehub.backend.components.voucher.repository.VoucherRepository;
import com.recyclehub.backend.entities.HouseHold;
import com.recyclehub.backend.entities.Voucher;
import com.recyclehub.backend.enums.VoucherType;
import com.recyclehub.backend.exception.ResourceNotFoundException;
import com.recyclehub.backend.exception.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class VoucherServiceImpl implements VoucherService {

    private final VoucherRepository voucherRepository;
    private final HouseHoldRepository houseHoldRepository;
    private final VoucherMapper voucherMapper;

    @Override
    @Transactional
    public VoucherDTO createVoucher(Long individualId, VoucherType type) {
        log.info("Creating {} voucher for individual: {}", type, individualId);
        
        HouseHold individual = houseHoldRepository.findById(individualId)
                .orElseThrow(() -> new ResourceNotFoundException("Individual not found"));

        if (individual.getPoints() < type.getRequiredPoints()) {
            throw new ValidationException("Insufficient points for " + type + " voucher");
        }

        Voucher voucher = Voucher.builder()
                .individual(individual)
                .pointsSpent(type.getRequiredPoints())
                .value((double) type.getValueInDh())
                .isUsed(false)
                .build();

        // Deduct points from individual
        individual.setPoints(individual.getPoints() - type.getRequiredPoints());
        houseHoldRepository.save(individual);

        Voucher savedVoucher = voucherRepository.save(voucher);
        log.info("Created voucher ID: {} for individual: {}", savedVoucher.getId(), individualId);
        
        return voucherMapper.toDTO(savedVoucher);
    }

    @Override
    @Transactional(readOnly = true)
    public List<VoucherDTO> getIndividualVouchers(Long individualId) {
        return voucherRepository.findByIndividualId(individualId)
                .stream()
                .map(voucherMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<VoucherDTO> getUnusedVouchers(Long individualId) {
        return voucherRepository.findByIndividualIdAndIsUsed(individualId, false)
                .stream()
                .map(voucherMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional
    public VoucherDTO useVoucher(Long voucherId, Long individualId) {
        log.info("Using voucher: {} for individual: {}", voucherId, individualId);
        
        Voucher voucher = voucherRepository.findById(voucherId)
                .orElseThrow(() -> new ResourceNotFoundException("Voucher not found"));

        if (!voucher.getIndividual().getId().equals(individualId)) {
            throw new ValidationException("Voucher belongs to another individual");
        }

        if (voucher.getIsUsed()) {
            throw new ValidationException("Voucher has already been used");
        }

        voucher.setIsUsed(true);
        Voucher usedVoucher = voucherRepository.save(voucher);
        log.info("Voucher {} has been marked as used", voucherId);
        
        return voucherMapper.toDTO(usedVoucher);
    }

    @Override
    @Transactional(readOnly = true)
    public int getAvailablePoints(Long individualId) {
        HouseHold individual = houseHoldRepository.findById(individualId)
                .orElseThrow(() -> new ResourceNotFoundException("Individual not found"));
        return individual.getPoints();
    }
}
