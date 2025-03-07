package com.datn.boarding_house_management_rental_website.controller;
import com.datn.boarding_house_management_rental_website.entity.payload.request.RoleRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.request.SendEmailRequest;
import com.datn.boarding_house_management_rental_website.services.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.MessagingException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @GetMapping
    private ResponseEntity<?> getAllAccount(@RequestParam(required = false) String keyword,
                                            @RequestParam Integer pageNo,
                                            @RequestParam Integer pageSize) {
        return ResponseEntity.ok(accountService.getAllAccount(keyword,pageNo,pageSize));
    }

    @GetMapping("/customer")
    private ResponseEntity<?> getAllAccountForCustomer(@RequestParam(required = false) String keyword,
                                            @RequestParam Integer pageNo,
                                            @RequestParam Integer pageSize) {
        return ResponseEntity.ok(accountService.getAllAccount(keyword,pageNo,pageSize));
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getAccountById(@PathVariable Long id) {
        return ResponseEntity.ok(accountService.getAccountById(id));
    }

    @PostMapping("/send-email/{id}")
    private ResponseEntity<?> sendEmail(@PathVariable Long id, @RequestBody SendEmailRequest sendEmailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        return ResponseEntity.ok(accountService.sendEmailForRentaler(id, sendEmailRequest));
    }

    @PostMapping("/send-mail/contact")
    private ResponseEntity<?> sendEmailForContact(@RequestBody SendEmailRequest sendEmailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        return ResponseEntity.ok(accountService.sendEmailForRentaler(sendEmailRequest));
    }

    @PostMapping("/send-mail-rentaler")
    private ResponseEntity<?> sendEmailForRentaler(@RequestBody SendEmailRequest sendEmailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        return ResponseEntity.ok(accountService.sendEmailOfCustomer(sendEmailRequest));
    }


    @PostMapping("/{id}/authorization")
    private ResponseEntity<?> divideAuthorization(@PathVariable Long id, @RequestBody RoleRequest roleRequest) {
        return ResponseEntity.ok(accountService.divideAuthorization(id, roleRequest));
    }
}
