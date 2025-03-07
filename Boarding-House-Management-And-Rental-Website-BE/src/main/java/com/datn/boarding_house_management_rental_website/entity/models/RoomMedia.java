package com.datn.boarding_house_management_rental_website.entity.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "room_media")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String files;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
