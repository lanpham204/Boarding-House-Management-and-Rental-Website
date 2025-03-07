package com.datn.boarding_house_management_rental_website.repository;

import com.datn.boarding_house_management_rental_website.entity.models.Asset;
import com.datn.boarding_house_management_rental_website.entity.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    void deleteAllByRoom(Room room);
}
