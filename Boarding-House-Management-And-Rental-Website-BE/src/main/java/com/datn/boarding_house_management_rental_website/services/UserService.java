package com.datn.boarding_house_management_rental_website.services;

import com.datn.boarding_house_management_rental_website.entity.models.DTO.MessageDTO;
import com.datn.boarding_house_management_rental_website.entity.models.Message;
import com.datn.boarding_house_management_rental_website.entity.models.MessageChat;
import com.datn.boarding_house_management_rental_website.entity.models.User;

import java.util.List;

public interface UserService {

	String updateImageUser(Long id, String image);

	String updateUser(User user);

	List<MessageDTO> getMessageUser();

	MessageDTO toMessageDTO(User user, Message message);

	List<User> findMessageUser(String userName);

	Message getMessageChatUser(Long userId, Long guestId);

	String addChatUser(Long id, Long userId, MessageChat messageChat);
	User findByPhoneNumber(String phoneNumber);	
}
