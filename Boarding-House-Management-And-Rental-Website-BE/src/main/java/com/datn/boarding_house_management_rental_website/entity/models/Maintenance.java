package com.datn.boarding_house_management_rental_website.entity.models;

import com.datn.boarding_house_management_rental_website.entity.models.audit.DateAudit;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "maintenance")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Maintenance extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime maintenanceDate;
    private BigDecimal price;
    private String files;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_by")
    private String updatedBy;

    @ManyToOne
    @JoinColumn(name = "request_id")
    private Request request;

    public Maintenance(LocalDateTime maintenanceDate, BigDecimal price, String files, String createdBy, String updatedBy, Request request) {
        this.maintenanceDate = maintenanceDate;
        this.price = price;
        this.files = files;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.request = request;
    }
}
