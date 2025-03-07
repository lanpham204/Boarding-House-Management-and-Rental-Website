package com.datn.boarding_house_management_rental_website.repository.specification;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.datn.boarding_house_management_rental_website.entity.enums.ContractStatus;
import com.datn.boarding_house_management_rental_website.entity.models.Contract;

public class ContractSpecification {
	public static Specification<Contract> isOverlapping(LocalDate startDate, LocalDate endDate ) {
		return (root, query, builder) ->
		builder.and(
		        builder.lessThanOrEqualTo(root.get("startDate"), endDate),
		        builder.greaterThanOrEqualTo(root.get("endDate"), startDate));
//		        builder.or(
//				builder.and(builder.greaterThanOrEqualTo(root.get("endDate"), startDate),
//						builder.lessThanOrEqualTo(root.get("endDate"), endDate)),
//				builder.and(builder.greaterThanOrEqualTo(root.get("startDate"), startDate),
//						builder.lessThanOrEqualTo(root.get("startDate"), endDate)));
	}
	public static Specification<Contract> hasStatus(ContractStatus status) {
		return (root, query, builder) -> builder.equal(root.get("status"), status);
	}
	public static Specification<Contract> hasRoomId(Long roomId) {
		return (root, query, builder) -> builder.equal(root.get("room").get("id"), roomId);
	}
	public static Specification<Contract> hasContractExpired(LocalDate endDate) {
		return (root, query, builder) -> builder.lessThan(root.get("endDate"), endDate);
	}
	public static Specification<Contract> hasContractRent(LocalDate startDate) {
		return (root, query, builder) -> builder.equal(root.get("startDate"), startDate);
	}
	
}
