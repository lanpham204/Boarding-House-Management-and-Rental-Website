package com.datn.boarding_house_management_rental_website.entity.payload.request;


import java.time.LocalDateTime;

import com.datn.boarding_house_management_rental_website.entity.payload.response.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RateRequest {

    private String content;
    private Double rating;
    private Long room_id;

}
