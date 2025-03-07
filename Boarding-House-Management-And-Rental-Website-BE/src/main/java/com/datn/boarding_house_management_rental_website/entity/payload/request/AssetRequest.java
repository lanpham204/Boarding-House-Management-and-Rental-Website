package com.datn.boarding_house_management_rental_website.entity.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssetRequest {
    private String name;
    private Integer number;
}
