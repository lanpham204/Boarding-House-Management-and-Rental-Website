package com.datn.boarding_house_management_rental_website.controller;

import com.datn.boarding_house_management_rental_website.entity.models.Location;
import com.datn.boarding_house_management_rental_website.entity.payload.response.LocationResponse;
import com.datn.boarding_house_management_rental_website.services.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LocationResponse>> getAllLocationsByUserId(@PathVariable Long userId) {
        List<LocationResponse> locations = locationService.getAllLocationsByUserId(userId);
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationResponse> getLocationById(@PathVariable Long id) {
        LocationResponse location = locationService.getLocationById(id);
        return ResponseEntity.ok(location);
    }

    @PostMapping
    public ResponseEntity<LocationResponse> createLocation(@RequestParam("cityName") String cityName,
                                                           @RequestParam("district") String district,
                                                           @RequestParam("ward") String ward,
                                                           @RequestParam(value = "address",required = false) String address,
                                                           @RequestParam("userId") Long userId) {
        LocationResponse createdLocation = locationService.createLocation(cityName,district,ward,address,userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLocation);
    }
}
