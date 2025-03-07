package com.datn.boarding_house_management_rental_website.entity.models;

import com.datn.boarding_house_management_rental_website.entity.enums.LockedStatus;
import com.datn.boarding_house_management_rental_website.entity.enums.RoomStatus;
import com.datn.boarding_house_management_rental_website.entity.models.audit.DateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "room")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Room extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private BigDecimal price;

    private Double latitude;

    private Double longitude;


    @Enumerated(EnumType.STRING)
    private RoomStatus status;

    @Enumerated(EnumType.STRING)
    private LockedStatus isLocked;

    @Column(name = "is_approve")
    private Boolean isApprove;

    @Column(name = "is_remove")
    private Boolean isRemove;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_by")
    private String updatedBy;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "room")
    private List<Contract> contracts;

    @OneToMany(mappedBy = "room")
    private List<Asset> assets;

    @OneToMany(mappedBy = "room")
    private List<Rate> rates;

    @OneToMany(mappedBy = "room")
    private List<RoomMedia> roomMedia;

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    private List<BlogStore> stores;


    public Room(String title, String description, BigDecimal price, Double latitude, Double longitude, String createdBy, String updatedBy, Location location, Category category, User user, RoomStatus roomStatus) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.location = location;
        this.category = category;
        this.user = user;
        this.status = roomStatus;
        this.isLocked = LockedStatus.ENABLE;
        this.isApprove = Boolean.FALSE;
        this.isRemove = Boolean.FALSE;
    }
}
