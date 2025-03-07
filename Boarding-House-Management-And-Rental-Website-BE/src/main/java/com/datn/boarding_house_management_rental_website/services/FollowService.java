package com.datn.boarding_house_management_rental_website.services;

import com.datn.boarding_house_management_rental_website.entity.payload.request.FollowRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.response.CheckResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.FollowResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface FollowService {
    CheckResponse addFollow(Long id);
    CheckResponse deleteFollow(Long id);
    CheckResponse checkFollow(Long id);
    Page<FollowResponse> getAllFollowOfCustomer(Integer pageNo, Integer pageSize);
    List<FollowResponse> getAllFollowOfRentaler(Long id);
    Long countFollowing();
    Long countFollower();
}
