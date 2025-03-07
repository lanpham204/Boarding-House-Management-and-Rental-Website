package com.datn.boarding_house_management_rental_website.services.impl;

import com.datn.boarding_house_management_rental_website.entity.models.Location;
import com.datn.boarding_house_management_rental_website.entity.models.User;
import com.datn.boarding_house_management_rental_website.entity.payload.response.LocationResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.UserResponse;
import com.datn.boarding_house_management_rental_website.exception.BadRequestException;
import com.datn.boarding_house_management_rental_website.repository.LocationRepository;
import com.datn.boarding_house_management_rental_website.repository.UserRepository;
import com.datn.boarding_house_management_rental_website.services.LocationService;
import com.datn.boarding_house_management_rental_website.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
@Service
@RequiredArgsConstructor
public class LocationServiceImp implements LocationService {
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;
    private final MapperUtils mapperUtils;

    public List<LocationResponse> getAllLocationsByUserId(Long userId) {
        return mapperUtils.convertToResponseList(locationRepository.findByUserId(userId), LocationResponse.class);
    }


    public LocationResponse getLocationById(Long id) {
        Location location = locationRepository.findById(id).orElseThrow(() -> new BadRequestException("Địa chỉ không tồn tại"));
        return mapperUtils.convertToResponse(location, LocationResponse.class);
    }

    
    public LocationResponse createLocation(String cityName,
                                           String district,
                                           String ward,
                                           String address,
                                           Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("Địa chỉ không tồn tại"));
        Location location = new Location();
        location.setCityName(cityName);
        location.setDistrict(district);
        location.setWard(ward);
        location.setAddress(address);
        location.setUser(user);
        return mapperUtils.convertToResponse(locationRepository.save(location), LocationResponse.class);
    }

  
    
}
