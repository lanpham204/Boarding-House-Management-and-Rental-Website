package com.datn.boarding_house_management_rental_website.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(
        prefix = "file",
        ignoreUnknownFields = true,
        ignoreInvalidFields = true
)
public class FileStorageProperties {
    private String uploadDir;
    private String tempExportExcel;
    private String libreOfficePath;

    public FileStorageProperties() {
        // TODO document why this constructor is empty
    }

    public String getUploadDir() {
        return this.uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }

    public String getTempExportExcel() {
        return this.tempExportExcel;
    }

    public void setTempExportExcel(String tempExportExcel) {
        this.tempExportExcel = tempExportExcel;
    }

    public String getLibreOfficePath() {
        return this.libreOfficePath;
    }

    public void setLibreOfficePath(String libreOfficePath) {
        this.libreOfficePath = libreOfficePath;
    }
}

