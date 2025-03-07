package com.datn.boarding_house_management_rental_website.services;


import java.util.List;
import java.util.Optional;

import com.datn.boarding_house_management_rental_website.entity.payload.response.LocationResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.datn.boarding_house_management_rental_website.entity.models.Location;
import com.datn.boarding_house_management_rental_website.repository.LocationRepository;

import lombok.RequiredArgsConstructor;

public interface LocationService {

    List<LocationResponse> getAllLocationsByUserId(Long userId);

    LocationResponse getLocationById(Long id);

    LocationResponse createLocation(String cityName,
                                    String district,
                                    String ward,
                                    String address,
                                    Long userId);

}

