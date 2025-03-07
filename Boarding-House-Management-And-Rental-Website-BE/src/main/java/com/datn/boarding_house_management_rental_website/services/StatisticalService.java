package com.datn.boarding_house_management_rental_website.services;

import com.datn.boarding_house_management_rental_website.entity.payload.request.TotalNumberRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.response.CostResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.RevenueResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.TotalNumberResponse;
import org.springframework.data.domain.Page;

public interface StatisticalService {
    TotalNumberRequest getNumberOfRentalerForStatistical();

    TotalNumberResponse getStatisticalNumberOfAdmin();

    Page<RevenueResponse> getByMonth();

    Page<CostResponse> getByCost();
}
