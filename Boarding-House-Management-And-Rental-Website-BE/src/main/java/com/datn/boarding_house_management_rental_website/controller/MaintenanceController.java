package com.datn.boarding_house_management_rental_website.controller;

import com.datn.boarding_house_management_rental_website.services.MaintenanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/maintenance")
@RequiredArgsConstructor
public class MaintenanceController {

	private final MaintenanceService maintenanceService;

	@GetMapping
	public ResponseEntity<?> getAllMaintenance(@RequestParam Long requestId, @RequestParam Integer pageNo,
			@RequestParam Integer pageSize) {
		return ResponseEntity.ok(maintenanceService.getAllMaintenance(requestId, pageNo, pageSize));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getMaintenanceById(@PathVariable Long id) {
		return ResponseEntity.ok(maintenanceService.getMaintenance(id));
	}

	@PostMapping
	public ResponseEntity<?> addNewMaintenance(@RequestParam String maintenanceDate, @RequestParam BigDecimal price,
			@RequestParam Long requestId, @RequestParam String file) {
		return ResponseEntity.ok(maintenanceService.addNewMaintenance(maintenanceDate, price, requestId, file));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> editMaintenance(@PathVariable Long id, @RequestParam String maintenanceDate,
			@RequestParam BigDecimal price, @RequestParam(required = false) String file) {
		return ResponseEntity.ok(maintenanceService.editMaintenance(id, maintenanceDate, price, file));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteMaintenance(@PathVariable Long id) {
		return ResponseEntity.ok(maintenanceService.deleteMaintenance(id));
	}
}
