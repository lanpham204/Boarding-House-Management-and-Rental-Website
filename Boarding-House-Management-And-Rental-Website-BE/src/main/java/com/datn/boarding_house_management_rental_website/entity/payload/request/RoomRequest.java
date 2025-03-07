package com.datn.boarding_house_management_rental_website.entity.payload.request;

import com.datn.boarding_house_management_rental_website.entity.enums.RoomStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequest {
    private String title;

    private String description;

    private BigDecimal price;

    private Double latitude;

    private Double longitude;


    private Long locationId;

    private Long categoryId;

    private RoomStatus status;

    private List<AssetRequest> assets;

    private List<String> files;

}
