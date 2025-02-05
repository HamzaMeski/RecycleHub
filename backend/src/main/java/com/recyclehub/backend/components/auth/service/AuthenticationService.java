package com.recyclehub.backend.components.auth.service;

import com.recyclehub.backend.components.auth.dto.AuthenticationRequest;
import com.recyclehub.backend.components.auth.dto.AuthenticationResponse;
import com.recyclehub.backend.components.houseHold.repository.HouseHoldRepository;
import com.recyclehub.backend.components.admin.repository.AdminRepository;
import com.recyclehub.backend.components.collector.repository.CollectorRepository;
import com.recyclehub.backend.entities.Admin;
import com.recyclehub.backend.entities.Collector;
import com.recyclehub.backend.entities.HouseHold;
import com.recyclehub.backend.exception.AuthenticationException;
import com.recyclehub.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AdminRepository adminRepository;
    private final CollectorRepository collectorRepository;
    private final HouseHoldRepository houseHoldRepository;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // Try to authenticate
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );
        } catch (Exception e) {
            throw new AuthenticationException("Invalid email or password");
        }

        // Find user in appropriate repository
        return adminRepository.findByEmail(request.getEmail())
                .map(admin -> buildAuthResponse(admin, "ADMIN"))
                .orElseGet(() -> collectorRepository.findByEmail(request.getEmail())
                        .map(collector -> buildAuthResponse(collector, "COLLECTOR"))
                        .orElseGet(() -> houseHoldRepository.findByEmail(request.getEmail())
                                .map(household -> buildAuthResponse(household, "INDIVIDUAL"))
                                .orElseThrow(() -> new AuthenticationException("User not found"))
                        ));
    }

    private AuthenticationResponse buildAuthResponse(Admin admin, String userType) {
        String token = jwtService.generateToken(admin.getEmail(), userType, admin.getId());
        return AuthenticationResponse.builder()
                .token(token)
                .userType(userType)
                .userId(admin.getId())
                .email(admin.getEmail())
                .firstName(admin.getFirstName())
                .lastName(admin.getLastName())
                .build();
    }

    private AuthenticationResponse buildAuthResponse(Collector collector, String userType) {
        String token = jwtService.generateToken(collector.getEmail(), userType, collector.getId());
        return AuthenticationResponse.builder()
                .token(token)
                .userType(userType)
                .userId(collector.getId())
                .email(collector.getEmail())
                .firstName(collector.getFirstName())
                .lastName(collector.getLastName())
                .build();
    }

    private AuthenticationResponse buildAuthResponse(HouseHold houseHold, String userType) {
        String token = jwtService.generateToken(houseHold.getEmail(), userType, houseHold.getId());
        return AuthenticationResponse.builder()
                .token(token)
                .userType(userType)
                .userId(houseHold.getId())
                .email(houseHold.getEmail())
                .firstName(houseHold.getFirstName())
                .lastName(houseHold.getLastName())
                .build();
    }
}
