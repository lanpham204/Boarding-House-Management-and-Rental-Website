package com.datn.boarding_house_management_rental_website.entity.payload.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RateResponse {
    private String content;
    private Double rating;
    private Long room_id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserResponse user;
}
