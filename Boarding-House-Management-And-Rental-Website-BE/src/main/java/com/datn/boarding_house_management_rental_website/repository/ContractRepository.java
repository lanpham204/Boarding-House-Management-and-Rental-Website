package com.datn.boarding_house_management_rental_website.repository;

import com.datn.boarding_house_management_rental_website.entity.enums.ContractStatus;
import com.datn.boarding_house_management_rental_website.entity.enums.RoomStatus;
import com.datn.boarding_house_management_rental_website.entity.models.Contract;
import com.datn.boarding_house_management_rental_website.entity.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface ContractRepository extends JpaRepository<Contract, Long>, JpaSpecificationExecutor<Contract> {
	   @Query(value = "SELECT sum(c.numberOfRent) from Contract c INNER JOIN Room r ON c.room.id = r.id WHERE " +
			   " (:userId IS NULL OR :userId = 0 OR r.user.id = :userId)")
	    Long sumNumOfPeople(@Param("userId") Long userId);
	@Query(value = "SELECT c FROM Contract c INNER JOIN Room r ON c.room.id = r.id WHERE (:name IS NULL OR c.name LIKE %:name%) " +
//			"AND (:phone IS NULL OR c.phone = :phone) " +
			"AND (:userId IS NULL OR :userId = 0 OR r.user.id = :userId)" +
			"AND (:status IS NULL OR c.status = :status)")
	Page<Contract> searchingContact(@Param("name") String name,
//									@Param("phone") String phone,
									@Param("status") ContractStatus status,
									@Param("userId") Long userId,
									Pageable pageable);
	@Query(value = "SELECT c FROM Contract c INNER JOIN Room r ON c.room.id = r.id WHERE (:name IS NULL OR c.name LIKE %:name%) " +
//			"AND (:phone IS NULL OR c.phone = :phone) " +
			"AND (:userId IS NULL OR :userId = 0 OR r.user.id = :userId)" +
			"AND (:status IS NULL OR c.status != :status)")
	Page<Contract> searchingContactNotStatus(@Param("name") String name,
//									@Param("phone") String phone,
									@Param("status") ContractStatus status,
									@Param("userId") Long userId,
									Pageable pageable);
//	Optional<Contract> findByStartDateAndEndDate(LocalDate startDate, LocalDate endDate);

	long countAllByStatusAndUser(ContractStatus status, User user);
	@Query(value = "SELECT c FROM Contract c INNER JOIN Room r ON c.room.id = r.id WHERE (:userId IS NULL OR :userId = 0 OR r.user.id = :userId)")
	List<Contract> getAllContract(@Param("userId") Long userId);
	@Query(value = "SELECT c FROM Contract c INNER JOIN Room r ON c.room.id = r.id WHERE (:userId IS NULL OR :userId = 0 OR r.user.id = :userId)" +
			" AND (c.status = 'RENT' OR c.status = 'BOOKING' OR c.status = 'CHECKOUT')")
	List<Contract> getAllContractByStatus(@Param("userId") Long userId);
	@Query(value = "SELECT c FROM Contract c INNER JOIN Room r ON c.room.id = r.id")
	Page<Contract> searchingContact(@Param("phone") String phone, Pageable pageable);
	Page<Contract> findByUserId(Long userId,Pageable pageable);
}
