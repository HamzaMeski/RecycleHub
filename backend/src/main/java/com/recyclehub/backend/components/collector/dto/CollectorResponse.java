package com.recyclehub.backend.components.collector.dto;

import lombok.Data;
import java.util.Date;

@Data
public class CollectorResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private Date dateOfBirth;
    private String profilePicture;
    private String companyName;
    private String companyAddress;
    private String licenseNumber;
    private Boolean isVerified;
}
