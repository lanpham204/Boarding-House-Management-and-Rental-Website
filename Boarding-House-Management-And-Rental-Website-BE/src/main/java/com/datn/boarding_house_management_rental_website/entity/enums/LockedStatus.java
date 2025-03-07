package com.datn.boarding_house_management_rental_website.entity.enums;

public enum LockedStatus {
    ENABLE("ENABLE"),
    DISABLE("DISABLE");


    private String value;

    LockedStatus(String value){
        this.value = value;
    }

    public String getValue(){
        return this.value;
    }
}
