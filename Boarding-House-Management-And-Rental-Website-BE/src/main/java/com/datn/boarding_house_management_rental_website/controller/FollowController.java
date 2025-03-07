package com.datn.boarding_house_management_rental_website.controller;

import com.datn.boarding_house_management_rental_website.services.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @GetMapping("{userId}")
    public ResponseEntity<?> followAgents(@PathVariable Long userId){
        return ResponseEntity.ok(followService.addFollow(userId));
    }

	@DeleteMapping("{userId}")
	public ResponseEntity<?> unFollowAgents(@PathVariable Long userId) {
		return ResponseEntity.ok(followService.deleteFollow(userId));
	}
	@GetMapping("check/{userId}")
	public ResponseEntity<?> checkFollowAgents(@PathVariable Long userId) {
		return ResponseEntity.ok(followService.checkFollow(userId));
	}

    @GetMapping
    public ResponseEntity<?> getAllAgents(@RequestParam Integer pageNo,
                                          @RequestParam Integer pageSize) {
        return ResponseEntity.ok(followService.getAllFollowOfCustomer(pageNo, pageSize));
    }
    @GetMapping("/rentaler/{id}")
    public ResponseEntity<?> getAllFollowOfRentaler(@PathVariable Long id) {
        return ResponseEntity.ok(followService.getAllFollowOfRentaler(id));
    }
    @GetMapping("/count/following")
	public ResponseEntity<?> countMyFollowing() {
		return ResponseEntity.ok(followService.countFollowing());
	}
    @GetMapping("/count/follower")
	public ResponseEntity<?> countMyFollower() {
		return ResponseEntity.ok(followService.countFollower());
	}
}
