package com.recyclehub.backend.components.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String userType;  // ADMIN, COLLECTOR, or INDIVIDUAL
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
}
