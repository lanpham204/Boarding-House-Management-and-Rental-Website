package com.datn.boarding_house_management_rental_website.entity.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CostResponse {
    private String name;
    private BigDecimal cost;
}
