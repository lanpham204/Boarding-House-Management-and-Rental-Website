package com.datn.boarding_house_management_rental_website.entity.payload.response;

import com.datn.boarding_house_management_rental_website.entity.enums.AuthProvider;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserResponse {

    private Long id;

    private String name;

    private String email;

    private Boolean isLocked;

    private String address;

    private String phone;

    private String imageUrl;

    private String zaloUrl;

    private String facebookUrl;

    private AuthProvider provider;
}
