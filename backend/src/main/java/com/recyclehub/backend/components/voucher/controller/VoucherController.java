package com.recyclehub.backend.components.voucher.controller;

import com.recyclehub.backend.components.voucher.dto.VoucherDTO;
import com.recyclehub.backend.components.voucher.service.VoucherService;
import com.recyclehub.backend.enums.VoucherType;
import com.recyclehub.backend.security.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vouchers")
@RequiredArgsConstructor
public class VoucherController {

    private final VoucherService voucherService;

    @PostMapping
    @PreAuthorize("hasRole('HOUSEHOLD')")
    public ResponseEntity<VoucherDTO> createVoucher(
            @RequestParam VoucherType type,
            @CurrentUser Long userId) {
        return ResponseEntity.ok(voucherService.createVoucher(userId, type));
    }

    @GetMapping
    @PreAuthorize("hasRole('HOUSEHOLD')")
    public ResponseEntity<List<VoucherDTO>> getVouchers(@CurrentUser Long userId) {
        return ResponseEntity.ok(voucherService.getIndividualVouchers(userId));
    }

    @GetMapping("/unused")
    @PreAuthorize("hasRole('HOUSEHOLD')")
    public ResponseEntity<List<VoucherDTO>> getUnusedVouchers(@CurrentUser Long userId) {
        return ResponseEntity.ok(voucherService.getUnusedVouchers(userId));
    }

    @PostMapping("/{voucherId}/use")
    @PreAuthorize("hasRole('HOUSEHOLD')")
    public ResponseEntity<VoucherDTO> useVoucher(
            @PathVariable Long voucherId,
            @CurrentUser Long userId) {
        return ResponseEntity.ok(voucherService.useVoucher(voucherId, userId));
    }

    @GetMapping("/points")
    @PreAuthorize("hasRole('HOUSEHOLD')")
    public ResponseEntity<Integer> getAvailablePoints(@CurrentUser Long userId) {
        return ResponseEntity.ok(voucherService.getAvailablePoints(userId));
    }
}
