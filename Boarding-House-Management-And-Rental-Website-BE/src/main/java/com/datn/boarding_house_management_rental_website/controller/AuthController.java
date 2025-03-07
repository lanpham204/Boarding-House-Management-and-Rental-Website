package com.datn.boarding_house_management_rental_website.controller;

import com.datn.boarding_house_management_rental_website.entity.payload.request.*;
import com.datn.boarding_house_management_rental_website.entity.payload.response.ApiResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.AuthResponse;
import com.datn.boarding_house_management_rental_website.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.activemq.kaha.impl.index.BadMagicException;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.MessagingException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(new AuthResponse(authService.login(loginRequest)));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        return ResponseEntity.created(authService.registerAccount(signUpRequest))
                .body(new ApiResponse(true, "User registered successfully@"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody EmailRequest emailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        return ResponseEntity.ok(authService.forgotPassword(emailRequest));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        return ResponseEntity.ok(authService.resetPassword(resetPasswordRequest));
    }

    @PostMapping("/confirmed")
    public ResponseEntity<?> confirmedAccount(@RequestBody EmailRequest emailRequest){
        return ResponseEntity.ok(authService.confirmedAccount(emailRequest));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        return ResponseEntity.ok(authService.changePassword(changePasswordRequest));
    }

    @PostMapping("/upload-avatar")
    public  ResponseEntity<?> changeImage(@RequestParam(required = false) MultipartFile file){
        return ResponseEntity.ok(authService.changeImage(file));
    }

    @PostMapping("/upload-profile")
    public ResponseEntity<?> changeImage(@RequestParam(required = false) String file,
                                         @RequestParam(required = false) String zalo,
                                         @RequestParam(required = false) String facebook,
                                         @RequestParam(required = false) String address,
                                         @RequestParam(required = false) String name,
                                         @RequestParam(required = false) String phone
                                         ) throws BadMagicException {
        return ResponseEntity.ok(authService.uploadProfile(file, zalo, facebook, address,name,phone));
    }


    @PostMapping("/{id}/locked")
    private ResponseEntity<?> lockedAccount(@PathVariable Long id) {
        return ResponseEntity.ok(authService.lockAccount(id));
    }
}
