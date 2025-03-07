package com.datn.boarding_house_management_rental_website.entity.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class MessageResponse {
    private String message;
//    @Builder.Default
//    private boolean success=true;
//	public MessageResponse(String message) {
//		super();
//		this.message = message;
//	}
}
