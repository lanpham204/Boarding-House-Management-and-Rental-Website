package com.datn.boarding_house_management_rental_website.controller;

import com.datn.boarding_house_management_rental_website.entity.payload.request.BlogStoreRequest;
import com.datn.boarding_house_management_rental_website.services.BlogStoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class BlogStoreController {
	private final BlogStoreService blogStoreService;

	@GetMapping("/blog-store/save/{roomId}")
	public ResponseEntity<?> saveBlog(@PathVariable Long roomId) {
		return ResponseEntity.ok(blogStoreService.saveBlog(roomId));
	}

	@DeleteMapping("/blog-store/delete/{roomId}")
	public ResponseEntity<?> deleteBlog(@PathVariable Long roomId) {
		return ResponseEntity.ok(blogStoreService.deleteBlog(roomId));
	}

	@GetMapping("/blog-store/check/{roomId}")
	public ResponseEntity<?> checkBlog(@PathVariable Long roomId) {
		return ResponseEntity.ok(blogStoreService.checkBlog(roomId));
	}

	@GetMapping("/blog-store/all")
	public ResponseEntity<?> getAllBlog(@RequestParam Integer pageNo, @RequestParam Integer pageSize) {
		return ResponseEntity.ok(blogStoreService.getPageOfBlog(pageNo, pageSize));
	}
}
