package com.datn.boarding_house_management_rental_website.entity.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class MaintenanceResponse {
    private Long id;
    private LocalDateTime maintenanceDate;
    private BigDecimal price;
    private LocalDateTime createAt;
    private RoomResponse room;
    private String files;
}
