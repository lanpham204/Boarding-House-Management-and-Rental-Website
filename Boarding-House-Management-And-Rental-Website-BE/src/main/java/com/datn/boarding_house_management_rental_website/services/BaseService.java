package com.datn.boarding_house_management_rental_website.services;

import com.datn.boarding_house_management_rental_website.repository.UserRepository;
import com.datn.boarding_house_management_rental_website.secruity.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;



public abstract class BaseService {
    @Autowired
    UserRepository userRepository;

    public String getUsername(){
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return user.getUsername();
    }

    public Long getUserId(){
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return user.getId();
    }
    public UserRepository getUserRepository() {
 		return userRepository;
 	}

}
