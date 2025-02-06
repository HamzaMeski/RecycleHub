package com.recyclehub.backend.components.houseHold.controller;

import com.recyclehub.backend.components.houseHold.dto.HouseHoldRequest;
import com.recyclehub.backend.components.houseHold.dto.HouseHoldResponse;
import com.recyclehub.backend.components.houseHold.service.HouseHoldService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/households")
@RequiredArgsConstructor
public class HouseHoldController {

    private final HouseHoldService service;

    @PostMapping("/register")
    public ResponseEntity<HouseHoldResponse> register(@Valid @RequestBody HouseHoldRequest request) {
        return new ResponseEntity<>(service.register(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('HOUSEHOLD')")
    public ResponseEntity<HouseHoldResponse> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(service.getProfile(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('HOUSEHOLD')")
    public ResponseEntity<HouseHoldResponse> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody HouseHoldRequest request) {
        return ResponseEntity.ok(service.updateProfile(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('HOUSEHOLD')")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        service.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmailExists(@RequestParam String email) {
        return ResponseEntity.ok(service.existsByEmail(email));
    }
}
