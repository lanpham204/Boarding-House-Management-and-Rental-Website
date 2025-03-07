package com.datn.boarding_house_management_rental_website.services.impl;
import com.datn.boarding_house_management_rental_website.entity.enums.RoleName;
import com.datn.boarding_house_management_rental_website.entity.models.Role;
import com.datn.boarding_house_management_rental_website.entity.models.User;
import com.datn.boarding_house_management_rental_website.entity.payload.request.RoleRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.request.SendEmailRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import com.datn.boarding_house_management_rental_website.exception.BadRequestException;
import com.datn.boarding_house_management_rental_website.repository.RoleRepository;
import com.datn.boarding_house_management_rental_website.repository.UserRepository;
import com.datn.boarding_house_management_rental_website.services.AccountService;
import com.datn.boarding_house_management_rental_website.utils.MapperUtils;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final UserRepository userRepository;
    private final MapperUtils mapperUtils;
    private final JavaMailSender mailSender;
    private final RoleRepository roleRepository;

    @Override
    public Page<User> getAllAccount(String keyword, Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return userRepository.searchingAccount(keyword,pageable);
    }

    @Override
    public User getAccountById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new BadRequestException("Tài khoản không tồn tại"));
    }

    @Override
    public MessageResponse sendEmailForRentaler(Long id, SendEmailRequest sendEmailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        sendEmailFromTemplate(sendEmailRequest);
        return MessageResponse.builder().message("Gửi mail thành công").build();
    }

    @Override
    public MessageResponse divideAuthorization(Long id, RoleRequest roleRequest) {
        User user = userRepository.findById(id).orElseThrow(() -> new BadRequestException("Tài khoản không tồn tại"));
        user.getRoles().clear();
        if (roleRequest.getRoleName().equals("RENTALER")) {
            Role userRole = roleRepository.findByName(RoleName.ROLE_RENTALER)
                    .orElseThrow(() -> new IllegalArgumentException("User Role not set."));
            Set<Role> roleSet = new HashSet<>();
            roleSet.add(userRole);
            user.setRoles(roleSet);
            userRepository.save(user);
        } else {
            Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new IllegalArgumentException("User Role not set."));
            Set<Role> roleSet = new HashSet<>();
            roleSet.add(userRole);
            user.setRoles(roleSet);
            userRepository.save(user);
        }

        return MessageResponse.builder().message("Phân quyền thành công.").build();
    }

    @Override
    public MessageResponse sendEmailForRentaler(SendEmailRequest sendEmailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        sendEmailFromTemplateForContact(sendEmailRequest);
        return MessageResponse.builder().message("Liện hệ đã được gửi thành công").build();
    }

    @Override
    public MessageResponse sendEmailOfCustomer(SendEmailRequest sendEmailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        sendEmailFromTemplateForCustomer(sendEmailRequest);
        return MessageResponse.builder().message("Liên hệ thành công.").build();
    }


    public void sendEmailFromTemplate(SendEmailRequest sendEmailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        message.setFrom(new InternetAddress("quantriviennhatro@gmail.com"));
        message.setRecipients(MimeMessage.RecipientType.TO, sendEmailRequest.getToEmail());
        message.setSubject(sendEmailRequest.getTitle());

        // Read the HTML template into a String variable
        String htmlTemplate = readFile("send-email.html");

        // Replace placeholders in the HTML template with dynamic values
        htmlTemplate = htmlTemplate.replace("NAME", sendEmailRequest.getNameOfRentaler());
        htmlTemplate = htmlTemplate.replace("DESCRIPTION", sendEmailRequest.getDescription());
        User user = userRepository.findByEmail(sendEmailRequest.getTitle()).orElseThrow(() -> new BadRequestException("Tài khoản không tồn tại"));
        htmlTemplate = htmlTemplate.replace("EMAIL", sendEmailRequest.getTitle());
        htmlTemplate = htmlTemplate.replace("PHONE",  user.getPhone());
        // Set the email's content to be the HTML template
        message.setContent(htmlTemplate, "text/html; charset=utf-8");

        mailSender.send(message);
    }

    public void sendEmailFromTemplateForCustomer(SendEmailRequest sendEmailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        message.setRecipients(MimeMessage.RecipientType.TO, sendEmailRequest.getToEmail());
        message.setSubject("Tin thuê phòng");

        // Read the HTML template into a String variable
        String htmlTemplate = readFile("send-email.html");

        // Replace placeholders in the HTML template with dynamic values
        htmlTemplate = htmlTemplate.replace("NAME", sendEmailRequest.getNameOfRentaler());
        htmlTemplate = htmlTemplate.replace("DESCRIPTION", sendEmailRequest.getDescription());
        User user = userRepository.findByEmail(sendEmailRequest.getTitle()).orElseThrow(() -> new BadRequestException("Tài khoản không tồn tại"));
        htmlTemplate = htmlTemplate.replace("EMAIL", sendEmailRequest.getTitle());
        htmlTemplate = htmlTemplate.replace("PHONE",  user.getPhone());
        // Set the email's content to be the HTML template
        message.setContent(htmlTemplate, "text/html; charset=utf-8");

        mailSender.send(message);
    }

    public void sendEmailFromTemplateForContact(SendEmailRequest sendEmailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        message.setFrom(new InternetAddress("quantriviennhatro@gmail.com"));
        message.setRecipients(MimeMessage.RecipientType.TO, sendEmailRequest.getToEmail());
        message.setSubject(sendEmailRequest.getTitle());

        // Read the HTML template into a String variable
        String htmlTemplate = readFile("send-email.html");

        // Replace placeholders in the HTML template with dynamic values
        htmlTemplate = htmlTemplate.replace("NAME", sendEmailRequest.getNameOfRentaler());
        htmlTemplate = htmlTemplate.replace("DESCRIPTION", sendEmailRequest.getDescription() );
        User user = userRepository.findByEmail(sendEmailRequest.getTitle()).orElseThrow(() -> new BadRequestException("Tài khoản không tồn tại"));
        htmlTemplate = htmlTemplate.replace("EMAIL", sendEmailRequest.getTitle());
        htmlTemplate = htmlTemplate.replace("PHONE",  user.getPhone());
        // Set the email's content to be the HTML template
        message.setContent(htmlTemplate, "text/html; charset=utf-8");

        mailSender.send(message);
    }

    public static String readFile(String filename) throws IOException {
        File file = ResourceUtils.getFile("classpath:send-email.html");
        byte[] encoded = Files.readAllBytes(file.toPath());
        return new String(encoded, StandardCharsets.UTF_8);
    }
}
