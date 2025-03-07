package com.datn.boarding_house_management_rental_website.repository;

import com.datn.boarding_house_management_rental_website.entity.enums.RoomStatus;
import com.datn.boarding_house_management_rental_website.entity.models.Room;
import com.datn.boarding_house_management_rental_website.entity.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;


public interface RoomRepository extends JpaRepository<Room, Long> {
    long countAllByUser(User user);

    long count();
    long countAllByStatusAndUser(RoomStatus status, User user);

    Room[] findByUser(User user);

    long countByIsApprove(Boolean isApprove);
    @Query(value = "SELECT r FROM Room r WHERE (:title IS NULL OR r.title LIKE %:title%) " +
            "AND (:userId IS NULL OR :userId = 0 OR r.user.id = :userId)")
    Page<Room> searchingRoom(@Param("title") String title, @Param("userId") Long userId, Pageable pageable);

    @Query(value = "SELECT r FROM Room r WHERE 1=1 AND (:title IS NULL OR r.title LIKE %:title%) " +
            "AND (:approve IS NULL OR r.isApprove = :approve)")
    Page<Room> searchingRoomForAdmin(@Param("title") String title, @Param("approve") Boolean approve, Pageable pageable);

    @Query(value = "SELECT r FROM Room r LEFT JOIN r.contracts c WHERE " +
            "(:title IS NULL OR r.title LIKE %:title%) " +
            "AND (:city IS NULL OR :city like 'undefined' OR r.location.cityName LIKE %:city%) " +
            "AND (:district IS NULL OR r.location.district LIKE %:district%) " +
            "AND (:ward IS NULL OR r.location.ward LIKE %:ward%) " +
            "AND (:price IS NULL OR :price = 0 OR r.price = :price) " +
            "AND (:categoryId IS NULL OR :categoryId = 0 OR r.category.id = :categoryId) " +
            "AND (:userId IS NULL OR :userId = 0 OR r.user.id = :userId) " +
            "AND (:endDate IS NULL OR c IS NULL OR c.endDate < :endDate) " +
            "AND r.isApprove = true " +
            "AND r.isLocked = 'ENABLE' " +
            "AND r.isRemove = false " +
            "ORDER BY r.id DESC")
    Page<Room> searchingRoomForCustomer(@Param("title") String title,
                                        @Param("price") BigDecimal price,
                                        @Param("categoryId") Long categoryId,
                                        @Param("userId") Long userId,
                                        @Param("city") String city,
                                        @Param("district") String district,
                                        @Param("ward") String ward,
                                        @Param("endDate") LocalDate endDate,
                                        Pageable pageable);
    @Query(value = "SELECT r FROM Room r WHERE "+
            " r.isLocked = 'ENABLE' " +
            "AND (:userId IS NULL OR :userId = 0 OR r.user.id = :userId)")
    Page<Room> getAllRentOfHome(@Param("userId") Long userId, Pageable pageable);
}
