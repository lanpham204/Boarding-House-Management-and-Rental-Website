package com.datn.boarding_house_management_rental_website.entity.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {

	private Long id;
	private String userName;
	private String imageUrl;
	private String message;
}
