package com.datn.boarding_house_management_rental_website.entity.payload.response;


import com.datn.boarding_house_management_rental_website.entity.enums.ContractStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class ContractResponse {
    private Long id;
    private String name;
    private String file;
    private LocalDate startDate;
    private RoomResponse room;
    private UserResponse user;
    private LocalDate endDate;
    private ContractStatus status;
    private Integer numberOfRent;
}
