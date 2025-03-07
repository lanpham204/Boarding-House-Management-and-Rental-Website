package com.datn.boarding_house_management_rental_website.repository;

import com.datn.boarding_house_management_rental_website.entity.models.Maintenance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
public interface MaintenanceRepository extends JpaRepository<Maintenance, Long>{
	    	@Query(value = "SELECT m FROM Maintenance m where m.request.id = :requestId	")
	    Page<Maintenance> searchingMaintenance(@Param("requestId") Long requestId, Pageable pageable);

	    	@Query(value = "select sum(m.price) from Maintenance m where m.request.id = :requestId")
	    	Long sumPrice(@Param("requestId") Long requestId);

		@Query("SELECT COALESCE(SUM(m.price), 0) " +
				"FROM Maintenance m " +
				"JOIN m.request r " +
				"WHERE (:userId IS NULL OR r.contract.room.user.id = :userId)")
		BigDecimal sumPriceOfMaintenance(@Param("userId") Long userId);
}
