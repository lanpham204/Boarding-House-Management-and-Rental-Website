package com.datn.boarding_house_management_rental_website.repository;

import com.datn.boarding_house_management_rental_website.entity.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>  {

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    Boolean existsByEmail(String email);
    
    List<User> findByName(String name);

    long count();
    @Query(value = "SELECT u FROM User u WHERE u.email NOT IN ('master@gmail.com') " +
            "AND (:keyword IS NULL OR  :keyword = '' OR u.name LIKE %:keyword% OR u.email LIKE %:keyword%)")
    Page<User> searchingAccount(@Param("keyword") String keyword, Pageable pageable);


}
