package com.datn.boarding_house_management_rental_website.entity.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "request")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phoneNumber;
    private String description;
    private boolean answer;
    @ManyToOne
    @JoinColumn(name = "contract_id")
    @JsonManagedReference
    private Contract contract;

    public Request(String name, String phoneNumber, String description, Contract contract) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.contract = contract;
    }
}
