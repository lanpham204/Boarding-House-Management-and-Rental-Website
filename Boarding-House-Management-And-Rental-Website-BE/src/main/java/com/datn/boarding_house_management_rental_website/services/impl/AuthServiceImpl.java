package com.datn.boarding_house_management_rental_website.services.impl;

import com.datn.boarding_house_management_rental_website.entity.enums.AuthProvider;
import com.datn.boarding_house_management_rental_website.entity.enums.RoleName;
import com.datn.boarding_house_management_rental_website.entity.models.Role;
import com.datn.boarding_house_management_rental_website.entity.models.User;
import com.datn.boarding_house_management_rental_website.entity.payload.request.*;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import com.datn.boarding_house_management_rental_website.exception.BadRequestException;
import com.datn.boarding_house_management_rental_website.repository.RoleRepository;
import com.datn.boarding_house_management_rental_website.repository.UserRepository;
import com.datn.boarding_house_management_rental_website.secruity.TokenProvider;
import com.datn.boarding_house_management_rental_website.services.AuthService;
import com.datn.boarding_house_management_rental_website.services.BaseService;
import com.datn.boarding_house_management_rental_website.services.FileStorageService;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.apache.activemq.kaha.impl.index.BadMagicException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.MessagingException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Collections;
import java.util.Objects;

@Service
public class AuthServiceImpl extends BaseService implements AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private FileStorageService fileStorageService;


    @Override
    public URI registerAccount(SignUpRequest signUpRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email đã được sử dụng!!");
        }

        if (userRepository.findByPhone(signUpRequest.getPhone()).isPresent()) {
            throw new BadMagicException("Số điện thoại đã được sử dụng.");
        }

        if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())) {
            throw new BadRequestException("Mật khẩu không khớp. Vui lòng thử lại.");
        }
        
        if (!signUpRequest.getEmail().endsWith("@gmail.com")) {
        	throw new BadRequestException("Định dạng email không hợp lệ. Vui lòng thử lại.");
        }

        // Creating user's account
        User user = new User();
        User result = null;
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);
        user.setIsLocked(false);
        user.setIsConfirmed(false);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        sendEmailConfirmed(signUpRequest.getEmail(),signUpRequest.getName());

        if (RoleName.ROLE_USER.equals(signUpRequest.getRole())) {
            Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new IllegalArgumentException("User Role not set."));
            user.setPhone(signUpRequest.getPhone());
            user.setRoles(Collections.singleton(userRole));
            result = userRepository.save(user);

        } else if(RoleName.ROLE_RENTALER.equals(signUpRequest.getRole())){
            Role userRole = roleRepository.findByName(RoleName.ROLE_RENTALER)
                    .orElseThrow(() -> new IllegalArgumentException("User Role not set."));
            user.setAddress(signUpRequest.getAddress());
            user.setPhone(signUpRequest.getPhone());
            user.setRoles(Collections.singleton(userRole));
            result = userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Bạn không có quyền tạo tài khoản!!!!");
        }

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();
        return location;
    }

    @Override
    public String login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            return tokenProvider.createToken(authentication);
        } catch (BadCredentialsException ex) {
            throw new RuntimeException("Tài khoản hoặc mật khẩu không đúng.");
        } catch (Exception ex) {
            throw new RuntimeException("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    }

    @Override
    public MessageResponse forgotPassword(EmailRequest emailRequest) throws MessagingException, IOException, jakarta.mail.MessagingException {
        userRepository.findByEmail(emailRequest.getEmail()).orElseThrow(() -> new BadRequestException("Email này không tồn tại."));
        sendEmailFromTemplate(emailRequest.getEmail());
        return MessageResponse.builder().message("Gửi yêu cầu thành công.").build();
    }

    @Override
    public MessageResponse resetPassword(ResetPasswordRequest resetPasswordRequest) {
        if (!resetPasswordRequest.getPassword().equals(resetPasswordRequest.getConfirmedPassword())) {
            throw new BadRequestException("Mật khẩu không trùng khớp.");
        }
        User user = userRepository.findByEmail(resetPasswordRequest.getEmail()).orElseThrow(() -> new BadRequestException("Email này không tồn tại."));
        user.setPassword(resetPasswordRequest.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return MessageResponse.builder().message("Thay đổi mật khẩu mới thành công").build();
    }

    @Override
    public MessageResponse confirmedAccount(EmailRequest emailRequest) {
        User user = userRepository.findByEmail(emailRequest.getEmail()).orElseThrow(() -> new BadRequestException("Email này không tồn tại."));
        user.setIsConfirmed(true);
        userRepository.save(user);
        return MessageResponse.builder().message("Tài khoản đã được xác thực. Vui lòng đăng nhập").build();
    }

    @Override
    public MessageResponse changePassword(ChangePasswordRequest changePasswordRequest) {
        User user = userRepository.findById(getUserId()).orElseThrow(() -> new BadRequestException("Tài khoảng không tồn tại"));
        boolean passwordMatch = BCrypt.checkpw(changePasswordRequest.getOldPassword(), user.getPassword());
        if (!passwordMatch) {
            throw new BadRequestException("Mật khẩu cũ không chính xác");
        }
        if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
            throw new BadRequestException("Mật khẩu không trùng khớp");
        }

        user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        userRepository.save(user);
        return MessageResponse.builder().message("Cập nhật mật khẩu thành công").build();
    }

    @Override
    public MessageResponse changeImage(MultipartFile file) {
        User user = userRepository.findById(getUserId()).orElseThrow(() -> new BadRequestException("Tài khoảng không tồn tại"));
        if (Objects.nonNull(file)) {
            String image = fileStorageService.storeFile(file).replace("photographer/files/", "");
            user.setImageUrl("http://localhost:8080/image/" + image);
        }
        userRepository.save(user);
        return MessageResponse.builder().message("Thay ảnh đại diện thành công.").build();
    }

    @Override
    public MessageResponse lockAccount(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        if (user.getIsLocked().equals(true)) {
            user.setIsLocked(false);
        } else {
            user.setIsLocked(true);
        }
        userRepository.save(user);
        return MessageResponse.builder().message("Cập nhật trạng thái của tài khoản thành công").build();
    }

    @Override
    public MessageResponse uploadProfile(String file, String zalo, String facebook, String address, String name, String phone) throws BadMagicException {

        User user = userRepository.findById(getUserId()).orElseThrow(() -> new BadRequestException("Tài khoảng không tồn tại"));
         if(userRepository.findByPhone(phone).isPresent() && !user.getPhone().equals(phone)){
            throw new BadMagicException("Số điện thoại đã được sử dụng.");
        }
        user.setZaloUrl(zalo);
        user.setFacebookUrl(facebook);
        user.setAddress(address);
        user.setName(name);
        user.setPhone(phone);
        if (file != null) {
			user.setImageUrl(file);
		}	
        userRepository.save(user);
        return MessageResponse.builder().message("Thay thông tin cá nhân thành công.").build();
    }

    public void sendEmailFromTemplate(String email) throws MessagingException, IOException, jakarta.mail.MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        message.setFrom(new InternetAddress("ngominhhieu2004pt@gmail.com"));
        message.setRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject("Yêu cầu cấp lại mật khẩu!!!");

        // Read the HTML template into a String variable
        String htmlTemplate = readFile("forgot-password.html");

        htmlTemplate = htmlTemplate.replace("EMAILINFO", email);

        // Set the email's content to be the HTML template
        message.setContent(htmlTemplate, "text/html; charset=utf-8");

        mailSender.send(message);
    }

    public void sendEmailConfirmed(String email,String name) throws MessagingException, IOException, jakarta.mail.MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        message.setFrom(new InternetAddress("quantriviennhatro@gmail.com"));
        message.setRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject("Xác thực tài khoản.");

        // Read the HTML template into a String variable
        String htmlTemplate = readFileConfirmed("confirm-email.html");

        htmlTemplate = htmlTemplate.replace("NAME", name);
        htmlTemplate = htmlTemplate.replace("EMAIL", email);

        // Set the email's content to be the HTML template
        message.setContent(htmlTemplate, "text/html; charset=utf-8");

        mailSender.send(message);
    }

    public static String readFile(String filename) throws IOException {
        File file = ResourceUtils.getFile("classpath:forgot-password.html");
        byte[] encoded = Files.readAllBytes(file.toPath());
        return new String(encoded, StandardCharsets.UTF_8);
    }

    public static String readFileConfirmed(String filename) throws IOException {
        File file = ResourceUtils.getFile("classpath:confirm-email.html");
        byte[] encoded = Files.readAllBytes(file.toPath());
        return new String(encoded, StandardCharsets.UTF_8);
    }
}

