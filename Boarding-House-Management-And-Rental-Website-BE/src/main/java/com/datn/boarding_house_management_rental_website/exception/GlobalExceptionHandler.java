package com.datn.boarding_house_management_rental_website.exception;

import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageResponse.builder().message(ex.getMessage()));
    }
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> handleBadRequestException(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageResponse.builder().message(ex.getMessage()));
    }
    @ExceptionHandler(FileStorageException.class)
    public ResponseEntity<?> handleFileStorageException(FileStorageException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageResponse.builder().message(ex.getMessage()));
    }
    @ExceptionHandler(MyFileNotFoundException.class)
    public ResponseEntity<?> handleMyFileNotFoundException(MyFileNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageResponse.builder().message(ex.getMessage()));
    }
    @ExceptionHandler(OAuth2AuthenticationProcessingException.class)
    public ResponseEntity<?> handleOAuth2AuthenticationProcessingException(OAuth2AuthenticationProcessingException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageResponse.builder().message(ex.getMessage()));
    }
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleFileStorageException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageResponse.builder().message(ex.getMessage()));
    }
}

