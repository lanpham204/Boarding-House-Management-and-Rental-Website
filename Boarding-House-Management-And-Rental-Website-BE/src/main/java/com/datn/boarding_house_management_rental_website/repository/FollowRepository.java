package com.datn.boarding_house_management_rental_website.repository;

import com.datn.boarding_house_management_rental_website.entity.models.Follow;
import com.datn.boarding_house_management_rental_website.entity.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long>  {
    Optional<Follow> findByCustomerAndRentaler(User customer, User rentaler);
    List<Follow> findByRentalerId(Long id);
    void deleteByCustomerIdAndRentalerId(Long customerId, Long rentalerId);
    Optional<Follow> findByCustomerIdAndRentalerId(Long customerId, Long rentalerId);
    @Query(value = "SELECT f FROM Follow f WHERE (:userId IS NULL OR :userId = 0 OR f.customer.id = :userId)")
    Page<Follow> getPageFollow(@Param("userId") Long userId, Pageable pageable);
    Long countByRentalerId(Long id);
    Long countByCustomerId(Long id);
}
