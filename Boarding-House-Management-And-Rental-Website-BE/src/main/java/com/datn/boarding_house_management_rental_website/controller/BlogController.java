package com.datn.boarding_house_management_rental_website.controller;
import com.datn.boarding_house_management_rental_website.services.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;

    @GetMapping("/room/all")
    private ResponseEntity<?> getAllRoom(@RequestParam(required = false) String title,
                                         @RequestParam(required = false) Boolean approve,
                                         @RequestParam Integer pageNo,
                                         @RequestParam Integer pageSize) {
        return ResponseEntity.ok(blogService.getAllRoomForAdmin(title,approve, pageNo, pageSize));
    }

    @GetMapping("/customer/room")
    private ResponseEntity<?> getAllRoomForCustomer(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) BigDecimal price,
            @RequestParam(required = false) Long  categoryId,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String ward,
            @RequestParam(required = false) String end,
            @RequestParam Integer pageNo,
            @RequestParam Integer pageSize
    ){

        return ResponseEntity.ok(blogService.getAllRoomForCustomer(title, price,categoryId,city,
                district,ward,end==null	  ? null:LocalDate.parse(end), pageNo, pageSize));
    }

}
