package com.datn.boarding_house_management_rental_website.services;
import com.datn.boarding_house_management_rental_website.entity.payload.response.RoomResponse;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public interface BlogService {
    Page<RoomResponse> getAllRoomForAdmin(String title, Boolean approve, Integer pageNo, Integer pageSize);

    Page<RoomResponse> getAllRoomForCustomer(String title, BigDecimal price, Long category, String city, String district, String ward, LocalDate to, Integer pageNo, Integer pageSize);
}
