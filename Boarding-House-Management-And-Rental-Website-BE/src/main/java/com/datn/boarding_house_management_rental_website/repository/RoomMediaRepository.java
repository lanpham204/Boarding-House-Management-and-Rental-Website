package com.datn.boarding_house_management_rental_website.repository;

import com.datn.boarding_house_management_rental_website.entity.models.Room;
import com.datn.boarding_house_management_rental_website.entity.models.RoomMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomMediaRepository extends JpaRepository<RoomMedia, Long> {

    void deleteAllByRoom(Room room);
}
