package com.datn.boarding_house_management_rental_website.services.impl;

import com.datn.boarding_house_management_rental_website.entity.payload.response.RoomResponse;
import com.datn.boarding_house_management_rental_website.repository.RoomRepository;
import com.datn.boarding_house_management_rental_website.services.BlogService;
import com.datn.boarding_house_management_rental_website.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final RoomRepository roomRepository;
    private final MapperUtils mapperUtils;
    @Override
    public Page<RoomResponse> getAllRoomForAdmin(String title, Boolean approve, Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapperUtils.convertToResponsePage(roomRepository.searchingRoomForAdmin(title, approve ,pageable), RoomResponse.class, pageable);
    }


    public Page<RoomResponse> getAllRoomForCustomer(String title, BigDecimal price, Long categoryId, String city, String district, String ward, LocalDate to, Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapperUtils.convertToResponsePage(roomRepository.searchingRoomForCustomer(title,price,categoryId,null,city,district,ward,to,pageable),RoomResponse.class,pageable);
    }
}
