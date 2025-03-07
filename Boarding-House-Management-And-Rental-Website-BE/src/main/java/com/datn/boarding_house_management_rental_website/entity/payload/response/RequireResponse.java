package com.datn.boarding_house_management_rental_website.entity.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequireResponse {
    private Long id;
    private String name;
    private String phoneNumber;
    private String description;
    private Boolean answer;
    private ContractResponse contract;
}
