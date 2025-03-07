package com.datn.boarding_house_management_rental_website.entity.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TotalNumberRequest {
    private Integer numberOfRoom;
    private Integer numberOfPeople;
    private BigDecimal revenue;
}
