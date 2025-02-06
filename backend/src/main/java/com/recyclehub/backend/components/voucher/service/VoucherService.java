package com.recyclehub.backend.components.voucher.service;

import com.recyclehub.backend.components.voucher.dto.VoucherDTO;
import com.recyclehub.backend.enums.VoucherType;

import java.util.List;

public interface VoucherService {
    VoucherDTO createVoucher(Long individualId, VoucherType type);
    List<VoucherDTO> getIndividualVouchers(Long individualId);
    List<VoucherDTO> getUnusedVouchers(Long individualId);
    VoucherDTO useVoucher(Long voucherId, Long individualId);
    int getAvailablePoints(Long individualId);
}
