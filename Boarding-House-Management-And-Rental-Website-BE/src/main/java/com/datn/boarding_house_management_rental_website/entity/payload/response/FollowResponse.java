package com.datn.boarding_house_management_rental_website.entity.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowResponse {
    private UserResponse customer;
    private UserResponse rentaler;
}
