package com.recyclehub.backend.components.admin.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.Data;

import java.util.Date;

@Data
public class AdminRequest {
    @Email(message = "Please provide a valid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Phone is required")
    private String phone;

    @Past(message = "Date of birth must be in the past")
    private Date dateOfBirth;
}
