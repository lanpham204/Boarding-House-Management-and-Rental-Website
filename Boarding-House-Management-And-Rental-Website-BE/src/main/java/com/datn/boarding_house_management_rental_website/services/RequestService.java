package com.datn.boarding_house_management_rental_website.services;

import com.datn.boarding_house_management_rental_website.entity.payload.request.RequestRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.RequireResponse;
import org.springframework.data.domain.Page;

public interface RequestService {
    Page<RequireResponse> getRequestOfRentHome(String keyword, Integer pageNo, Integer pageSize);

    MessageResponse changeStatusOfRequest(Long id);

    RequireResponse getRequest(Long id);
    Long getTotalMaintenance(Long id);

    Page<RequireResponse> getRequestOfCustomer(String keyword, String phone, Integer pageNo, Integer pageSize);
    Page<RequireResponse> getRequestOfContract(Long contractId, Integer pageNo, Integer pageSize);

    MessageResponse addRequest(RequestRequest request);
}
