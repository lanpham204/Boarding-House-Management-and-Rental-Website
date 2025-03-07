package com.datn.boarding_house_management_rental_website.repository;

import com.datn.boarding_house_management_rental_website.entity.models.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RequestRepository extends JpaRepository<Request, Long> {
	@Query("SELECT r FROM Request r " + "JOIN FETCH r.contract c " + "JOIN FETCH c.room ro "
			+ "WHERE (:keyword IS NULL OR r.name LIKE %:keyword% OR c.name LIKE %:keyword%) "
			+ "AND (:userId IS NULL OR :userId = 0 OR ro.user.id = :userId)")
	Page<Request> searchingOfRequest(@Param("keyword") String keyword, @Param("userId") Long userId, Pageable pageable);

	@Query(value = "SELECT r FROM Request r INNER JOIN Contract c ON r.contract.id = c.id "
			+ "WHERE (:keyword IS NULL OR r.name LIKE %:keyword% OR c.name LIKE %:keyword%) "
			+ "AND (:phone IS NULL OR r.phoneNumber = :phone)")
	Page<Request> searchingOfRequest(@Param("keyword") String keyword, @Param("phone") String phone, Pageable pageable);

	@Query(value = "SELECT r FROM Request r where r.contract.id = :contractId ")
	Page<Request> searchingByContract(@Param("contractId") Long contractId, Pageable pageable);

	@Query("SELECT r FROM Request r WHERE r.id = :id")
	Request getRequestById(@Param("id") Long id);
}
