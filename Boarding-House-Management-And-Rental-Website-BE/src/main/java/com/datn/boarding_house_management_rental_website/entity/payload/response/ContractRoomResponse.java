package com.datn.boarding_house_management_rental_website.entity.payload.response;


import com.datn.boarding_house_management_rental_website.entity.enums.ContractStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class ContractRoomResponse {
    private Long id;
    private String name;
    private String file;
    private LocalDate endDate;
    private LocalDate startDate;
    private ContractStatus status;
    private Integer numberOfRent;
}
