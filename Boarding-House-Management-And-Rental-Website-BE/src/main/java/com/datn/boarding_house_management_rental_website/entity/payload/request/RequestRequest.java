package com.datn.boarding_house_management_rental_website.entity.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestRequest {
    private String description;
    private String nameOfRent;
    private Long contractId;
    private String phone;
}
