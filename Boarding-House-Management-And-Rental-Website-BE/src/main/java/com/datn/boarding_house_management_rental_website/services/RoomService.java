package com.datn.boarding_house_management_rental_website.services;


import java.util.List;

import com.datn.boarding_house_management_rental_website.entity.models.DTO.CommentDTO;
import com.datn.boarding_house_management_rental_website.entity.models.Rate;
import com.datn.boarding_house_management_rental_website.entity.payload.request.RateRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.request.RoomRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.RateResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.RoomResponse;
import org.springframework.data.domain.Page;

public interface RoomService {

    MessageResponse addNewRoom(RoomRequest roomRequest);

    Page<RoomResponse> getRoomByRentaler(String title, Integer pageNo, Integer pageSize);

    RoomResponse getRoomById(Long id);

    MessageResponse disableRoom(Long id);

    MessageResponse updateRoomInfo(Long id, RoomRequest roomRequest);

    Page<RoomResponse> getRentOfHome();


    MessageResponse isApproveRoom(Long id);

    MessageResponse removeRoom(Long id);

	String addRate(Long id, RateRequest rateRequest);

	Page<RateResponse> getAllRateRoom(Long id,Integer pageNo, Integer pageSize);

    Page<RoomResponse> getAllRoomForAdmin(String title,Boolean approve, Integer pageNo, Integer pageSize);

    Page<RoomResponse> getRoomByUserId(Long userId, Integer pageNo, Integer pageSize);
}
