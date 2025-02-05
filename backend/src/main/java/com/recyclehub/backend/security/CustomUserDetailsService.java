package com.recyclehub.backend.security;

import com.recyclehub.backend.repositories.AdminRepository;
import com.recyclehub.backend.repositories.CollectorRepository;
import com.recyclehub.backend.repositories.HouseHoldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final CollectorRepository collectorRepository;
    private final HouseHoldRepository houseHoldRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Try to find user in admin table
        return adminRepository.findByEmail(email)
                .map(admin -> new User(
                        admin.getEmail(),
                        admin.getPassword(),
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
                ))
                // If not found, try collector table
                .orElseGet(() -> collectorRepository.findByEmail(email)
                        .map(collector -> new User(
                                collector.getEmail(),
                                collector.getPassword(),
                                Collections.singletonList(new SimpleGrantedAuthority("ROLE_COLLECTOR"))
                        ))
                        // If not found, try household table
                        .orElseGet(() -> houseHoldRepository.findByEmail(email)
                                .map(household -> new User(
                                        household.getEmail(),
                                        household.getPassword(),
                                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_INDIVIDUAL"))
                                ))
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"))
                        ));
    }
}
