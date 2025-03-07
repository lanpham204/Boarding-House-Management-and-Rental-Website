package com.datn.boarding_house_management_rental_website.scheduling;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.datn.boarding_house_management_rental_website.entity.enums.ContractStatus;
import com.datn.boarding_house_management_rental_website.entity.models.Contract;
import com.datn.boarding_house_management_rental_website.repository.ContractRepository;
import com.datn.boarding_house_management_rental_website.repository.specification.ContractSpecification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ContractScheduling {
	private final ContractRepository repository;
	
	@Scheduled(cron = "0 0 2 * * ?", zone = "Asia/Ho_Chi_Minh")
	public void updateEndTime() {
		Specification<Contract> specificationContractExpired = Specification
				.where(ContractSpecification.hasContractExpired(LocalDate.now()))
				.and(ContractSpecification.hasStatus(ContractStatus.RENT));
		Specification<Contract> specificationContractRent = Specification
				.where(ContractSpecification.hasContractRent(LocalDate.now()))
				.and(ContractSpecification.hasStatus(ContractStatus.BOOKING));
		List<Contract> listContractExpired = repository.findAll(specificationContractExpired);
		listContractExpired = listContractExpired.stream().map(e -> {
			e.setStatus(ContractStatus.CHECKOUT);
			return e;
		}).toList();
		List<Contract> listContractRent = repository.findAll(specificationContractRent);
		listContractRent = listContractRent.stream().map(e -> {
			e.setStatus(ContractStatus.RENT);
			return e;
		}).toList();
		log.info("List contract expired: {}", listContractExpired.size());
		log.info("List contract rent: {}", listContractRent.size());
		repository.saveAll(listContractExpired);
		repository.saveAll(listContractRent);
	}
	
}

