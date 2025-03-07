package com.datn.boarding_house_management_rental_website.entity.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class RoomResponse {
    private Long id;

    private String title;

    private String description;

    private BigDecimal price;

    private Double latitude;

    private Double longitude;


    private String status;

    private String isLocked;

    private Boolean isApprove;

    private Boolean isRemove;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private LocationResponse location;

    private CategoryResponse category;
    private List<ContractRoomResponse> contracts;

    private List<AssetResponse> assets;

    private List<RoomMediaResponse> roomMedia;

    private UserResponse user;
}
