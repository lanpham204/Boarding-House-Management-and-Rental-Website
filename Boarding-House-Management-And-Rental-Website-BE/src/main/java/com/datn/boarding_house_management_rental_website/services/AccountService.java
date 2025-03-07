package com.datn.boarding_house_management_rental_website.services;

import com.datn.boarding_house_management_rental_website.entity.models.User;
import com.datn.boarding_house_management_rental_website.entity.payload.request.RoleRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.request.SendEmailRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import org.springframework.data.domain.Page;
import org.springframework.messaging.MessagingException;

import java.io.IOException;

public interface AccountService {

    Page<User> getAllAccount(String keyword, Integer pageNo, Integer pageSize);

    User getAccountById(Long id);

    MessageResponse sendEmailForRentaler(Long id, SendEmailRequest sendEmailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException;

    MessageResponse divideAuthorization(Long id, RoleRequest roleRequest);

    MessageResponse sendEmailForRentaler(SendEmailRequest sendEmailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException;

    MessageResponse sendEmailOfCustomer(SendEmailRequest sendEmailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException;
}
