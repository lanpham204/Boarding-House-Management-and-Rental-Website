package com.datn.boarding_house_management_rental_website.services.impl;

import com.datn.boarding_house_management_rental_website.config.FileStorageProperties;
import com.datn.boarding_house_management_rental_website.exception.FileStorageException;
import com.datn.boarding_house_management_rental_website.exception.MyFileNotFoundException;
import com.datn.boarding_house_management_rental_website.services.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileStorageServiceImpl implements FileStorageService {
    private Path fileStorageLocation;

    @Autowired
    public FileStorageServiceImpl(FileStorageProperties fileStorageProperties) {
        // Lấy đường dẫn tới thư mục "uploads" trong project
        this.fileStorageLocation = Paths.get(System.getProperty("user.dir"), "uploads").toAbsolutePath().normalize();

        try {
            // Tạo thư mục nếu chưa tồn tại
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new FileStorageException("Không thể tạo thư mục để lưu trữ tệp: " + ex.getMessage());
        }
    }

    @Override
    public String storeFile(MultipartFile file) {
        // Normalize tên tệp
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            // Kiểm tra ký tự không hợp lệ
            if (fileName.contains("..")) {
                throw new FileStorageException("Tên tệp không hợp lệ: " + fileName);
            }

            // Xác định vị trí lưu tệp trong thư mục "uploads" của project
            Path targetLocation = this.fileStorageLocation.resolve(fileName);

            // Lưu tệp vào vị trí này
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Lỗi khi lưu tệp " + fileName + ": " + ex.getMessage());
        }
    }

    @Override
    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("Không tìm thấy tệp: " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("Không tìm thấy tệp: " + fileName, ex);
        }
    }
}
	