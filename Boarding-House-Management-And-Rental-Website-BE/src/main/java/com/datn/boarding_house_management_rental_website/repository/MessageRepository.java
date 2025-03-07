package com.datn.boarding_house_management_rental_website.repository;

import java.util.List;

import com.datn.boarding_house_management_rental_website.entity.models.Message;
import com.datn.boarding_house_management_rental_website.entity.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{

    Message findBySenderAndReceiver(User sender, User receiver);

    List<Message> findBySender(User sender);

    List<Message> findByReceiver(User receiver);

}
