package com.datn.boarding_house_management_rental_website.entity.models.DTO;

import java.time.LocalDateTime;

import com.datn.boarding_house_management_rental_website.entity.payload.response.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

	private String content;
	private Double rateRating;
	private Long room_id;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private UserResponse user;
}
