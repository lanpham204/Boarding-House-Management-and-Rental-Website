package com.datn.boarding_house_management_rental_website.services;

import com.datn.boarding_house_management_rental_website.entity.payload.request.*;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import jakarta.mail.MessagingException;
import org.apache.activemq.kaha.impl.index.BadMagicException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;

public interface AuthService {
    URI registerAccount(SignUpRequest signUpRequest) throws MessagingException, IOException;

    String login(LoginRequest loginRequest);

    MessageResponse forgotPassword(EmailRequest emailRequest) throws MessagingException, IOException;

    MessageResponse resetPassword(ResetPasswordRequest resetPasswordRequest);

    MessageResponse confirmedAccount(EmailRequest emailRequest);

    MessageResponse changePassword(ChangePasswordRequest changePasswordRequest);

    MessageResponse changeImage(MultipartFile file);

    MessageResponse lockAccount(Long id);

    MessageResponse uploadProfile(String file, String zalo, String facebook, String address, String name, String phone) throws BadMagicException;
}
