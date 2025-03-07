package com.datn.boarding_house_management_rental_website.entity.payload.request;

import com.datn.boarding_house_management_rental_website.entity.enums.RoleName;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {
    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    private String phone;

    private String address;

    private String confirmPassword;

    private RoleName role;
}