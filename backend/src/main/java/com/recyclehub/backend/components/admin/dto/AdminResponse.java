package com.recyclehub.backend.components.admin.dto;

import lombok.Data;
import java.util.Date;

@Data
public class AdminResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private Date dateOfBirth;
    private String profilePicture;
}
