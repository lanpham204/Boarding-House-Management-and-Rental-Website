package com.datn.boarding_house_management_rental_website.entity.payload.request;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendEmailRequest {
    @Email
    private String toEmail;
    private String title;
    private String nameOfRentaler;
    private String description;
}
