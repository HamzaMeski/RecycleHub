package com.recyclehub.backend.components.houseHold.dto;

import lombok.Data;

import java.util.Date;

@Data
public class HouseHoldResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private Date dateOfBirth;
    private String street;
    private String city;
    private String country;
    private String zipCode;
    private String profilePicture;
    private Integer points;
}
