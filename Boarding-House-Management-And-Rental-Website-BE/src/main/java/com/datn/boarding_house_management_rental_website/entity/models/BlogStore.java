package com.datn.boarding_house_management_rental_website.entity.models;

import com.datn.boarding_house_management_rental_website.entity.models.audit.DateAudit;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "blog_store")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogStore extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
