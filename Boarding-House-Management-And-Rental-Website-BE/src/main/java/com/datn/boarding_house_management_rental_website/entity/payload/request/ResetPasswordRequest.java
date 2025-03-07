package com.datn.boarding_house_management_rental_website.entity.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {
    private String email;
    private String password;
    private String confirmedPassword;
}
