package com.recyclehub.backend.security;

import com.recyclehub.backend.components.admin.repository.AdminRepository;
import com.recyclehub.backend.components.collector.repository.CollectorRepository;
import com.recyclehub.backend.components.houseHold.repository.HouseHoldRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final CollectorRepository collectorRepository;
    private final HouseHoldRepository houseHoldRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("Attempting to load user by email: {}", email);
        
        // Try to find user in admin table
        return adminRepository.findByEmail(email)
                .map(admin -> {
                    log.info("Found admin user: {}", admin.getEmail());
                    return UserPrincipal.builder()
                            .id(admin.getId())
                            .email(admin.getEmail())
                            .password(admin.getPassword())
                            .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")))
                            .build();
                })
                // If not found, try collector table
                .orElseGet(() -> collectorRepository.findByEmail(email)
                        .map(collector -> {
                            log.info("Found collector user: {}", collector.getEmail());
                            return UserPrincipal.builder()
                                    .id(collector.getId())
                                    .email(collector.getEmail())
                                    .password(collector.getPassword())
                                    .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_COLLECTOR")))
                                    .build();
                        })
                        // If not found, try household table
                        .orElseGet(() -> houseHoldRepository.findByEmail(email)
                                .map(household -> {
                                    log.info("Found household user: {}", household.getEmail());
                                    return UserPrincipal.builder()
                                            .id(household.getId())
                                            .email(household.getEmail())
                                            .password(household.getPassword())
                                            .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_HOUSEHOLD")))
                                            .build();
                                })
                                .orElseThrow(() -> {
                                    log.error("No user found with email: {}", email);
                                    return new UsernameNotFoundException("User not found");
                                })
                        ));
    }
}
