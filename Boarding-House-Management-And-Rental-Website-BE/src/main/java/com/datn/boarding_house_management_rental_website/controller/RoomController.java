package com.datn.boarding_house_management_rental_website.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.datn.boarding_house_management_rental_website.entity.enums.RoomStatus;
import com.datn.boarding_house_management_rental_website.entity.models.DTO.CommentDTO;
import com.datn.boarding_house_management_rental_website.entity.payload.request.AssetRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.request.RateRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.request.RoomRequest;
//import com.datn.boarding_house_management_rental_website.entity.payload.request.RoomRequest;
import com.datn.boarding_house_management_rental_website.secruity.CurrentUser;
import com.datn.boarding_house_management_rental_website.secruity.UserPrincipal;
import com.datn.boarding_house_management_rental_website.services.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {

	private final RoomService roomService;

	@GetMapping("/{userId}/rentaler")
	public ResponseEntity<?> getAllRoomOfUserId(@PathVariable Long userId, @RequestParam Integer pageNo,
			@RequestParam Integer pageSize) {
		return ResponseEntity.ok(roomService.getRoomByUserId(userId, pageNo, pageSize));
	}

	@GetMapping
	public ResponseEntity<?> getRoomByRentaler(@RequestParam(required = false) String title,
			@RequestParam Integer pageNo, @RequestParam Integer pageSize) {
		return ResponseEntity.ok(roomService.getRoomByRentaler(title, pageNo, pageSize));
	}

	@GetMapping("/rent-home")
	public ResponseEntity<?> getRentOfHome() {
		return ResponseEntity.ok(roomService.getRentOfHome());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getRoomById(@PathVariable Long id) {
		return ResponseEntity.ok(roomService.getRoomById(id));
	}

	@PostMapping("/{id}")
	public ResponseEntity<?> disableRoom(@PathVariable Long id) {
		return ResponseEntity.ok(roomService.disableRoom(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateRoomInfo(@PathVariable Long id, MultipartHttpServletRequest request) {
		return ResponseEntity.ok(roomService.updateRoomInfo(id, putRoomRequest(request)));
	}

	@PostMapping
	public ResponseEntity<?> addRoom(MultipartHttpServletRequest request) {
		return ResponseEntity.ok(roomService.addNewRoom(putRoomRequest(request)));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removeRoom(@PathVariable Long id) {
		return ResponseEntity.ok(roomService.removeRoom(id));
	}

	@PostMapping("/{id}/approve")
	public ResponseEntity<?> isApprove(@PathVariable Long id) {
		return ResponseEntity.ok(roomService.isApproveRoom(id));
	}

	@GetMapping("/{roomId}/rates")
	public ResponseEntity<?> getAllRate(@PathVariable Long roomId, @RequestParam Integer pageNo,
			@RequestParam Integer pageSize) {
		return ResponseEntity.ok(roomService.getAllRateRoom(roomId, pageNo, pageSize));
	}

	@PostMapping("/{roomId}/rates")
//	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> addRate(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long roomId,
			@RequestBody RateRequest rateRequest) {
		return roomService.addRate(userPrincipal.getId(), rateRequest).equals("Thêm đánh giá thành công")
				? ResponseEntity.ok("Thêm  đánh giá thành công")
				: new ResponseEntity<String>("Thêm  đánh giá thất bại", HttpStatus.BAD_REQUEST);
	}

	private RoomRequest putRoomRequest(MultipartHttpServletRequest request) {
		String title = request.getParameter("title");
		String description = request.getParameter("description");
		BigDecimal price = BigDecimal.valueOf(Double.valueOf(request.getParameter("price")));
		Double latitude = Double.valueOf(request.getParameter("latitude"));
		Double longitude = Double.valueOf(request.getParameter("longitude"));
		Long locationId = Long.valueOf(request.getParameter("locationId"));
		Long categoryId = Long.valueOf(request.getParameter("categoryId"));
		List<AssetRequest> assets = new ArrayList<>();
		for (int i = 0; i < Integer.valueOf(request.getParameter("asset")); i++) {
			String assetName = request.getParameterValues("assets[" + i + "][name]")[0];
			Integer assetNumber = Integer.valueOf(request.getParameterValues("assets[" + i + "][number]")[0]);
			assets.add(new AssetRequest(assetName, assetNumber));
		}
		List<String> files = new ArrayList<>();
		String filesString = request.getParameter("files");
		if (filesString != null) {
			files = Arrays.asList(filesString.split(","));
		}
		return new RoomRequest(title, description, price, latitude, longitude, locationId, categoryId,
				RoomStatus.ROOM_RENT, assets, files);
	}

}
