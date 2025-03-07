package com.datn.boarding_house_management_rental_website.controller;

import com.datn.boarding_house_management_rental_website.entity.enums.ContractStatus;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import com.datn.boarding_house_management_rental_website.services.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/contract")
@RequiredArgsConstructor
public class ContractController {
	private final ContractService contractService;

	@PostMapping("request")
	private ResponseEntity<?> requestContract(@RequestParam Long roomId, @RequestParam Integer numberOfRent,
			@RequestParam Integer numberOfMonth, @RequestParam LocalDate startDate, @RequestParam ContractStatus status,
			@RequestParam(required = false) String fileUrl) {
		try {
			MessageResponse messageResponse = contractService.requestContract(roomId, numberOfRent, numberOfMonth,
					startDate, status, fileUrl);
			return ResponseEntity.ok(messageResponse);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
	}

	@PostMapping
	public ResponseEntity<?> createContract(@RequestParam String name, @RequestParam Long roomId, @RequestParam String phone, @RequestParam Integer numberOfRent, @RequestParam LocalDate startDate, @RequestParam LocalDate endDate, @RequestParam ContractStatus contractStatus, @RequestParam(required = false) String file) {
		try {
			MessageResponse messageResponse = contractService.createContract(name, roomId, phone, numberOfRent, startDate, endDate, contractStatus, file);
			return ResponseEntity.ok(messageResponse);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
	}
	@GetMapping
	private ResponseEntity<?> getAllContract(@RequestParam(required = false) String name,
			@RequestParam(required = false) String phone, @RequestParam(required = false) ContractStatus status,
			@RequestParam Integer pageNo, @RequestParam Integer pageSize, @RequestParam(required = false) boolean not) {
		return ResponseEntity.ok(contractService.getAllContractOfRentaler(name, phone, status, pageNo, pageSize, not));
	}

	@GetMapping("/customer")
	private ResponseEntity<?> getAllContractForCustomer(@RequestParam(required = false) Long userId,
			@RequestParam Integer pageNo, @RequestParam Integer pageSize) {
		return ResponseEntity.ok(contractService.getAllContractOfCustomer(userId, pageNo, pageSize));
	}

	@GetMapping("/{id}")
	private ResponseEntity<?> getContractById(@PathVariable Long id) {
		return ResponseEntity.ok(contractService.getContractById(id));
	}

	@PutMapping("/{id}")
	private ResponseEntity<?> updateContractInfo(@PathVariable Long id, @RequestParam String name,
			@RequestParam Integer numberOfRent, @RequestParam LocalDate startDate, @RequestParam LocalDate endDate,
			@RequestParam ContractStatus status, @RequestParam(required = false) String file) {
		try {
			MessageResponse message = contractService.updateContract(id, name, numberOfRent, startDate, endDate, status,
					file);
			return ResponseEntity.ok(message);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
	}

	@DeleteMapping("/{id}")
	private ResponseEntity<?> deleteContract(@PathVariable Long id) {
		return ResponseEntity.ok(contractService.deleteContract(id));
	}

	@PostMapping("/{id}/checkout")
	public ResponseEntity<?> checkoutRoom(@PathVariable Long id) {
		return ResponseEntity.ok(contractService.checkoutRoom(id));
	}
}
