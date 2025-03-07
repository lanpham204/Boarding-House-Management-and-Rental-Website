package com.datn.boarding_house_management_rental_website.repository;

import com.datn.boarding_house_management_rental_website.entity.models.BlogStore;
import com.datn.boarding_house_management_rental_website.entity.models.Room;
import com.datn.boarding_house_management_rental_website.entity.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface BlogStoreRepository extends JpaRepository<BlogStore, Long> {
    Optional<BlogStore> findByRoomAndUser(Room room, User user);
    void deleteByUserIdAndRoomId(Long userId, Long roomId);
    Optional<BlogStore> findByUserIdAndRoomId(Long userId, Long roomId);
    @Query(value = "SELECT bs FROM BlogStore bs WHERE (:userId IS NULL OR :userId = 0 OR bs.user.id = :userId)")
    Page<BlogStore> getPageOfBlogStore(@Param("userId") Long userId, Pageable pageable);
}
