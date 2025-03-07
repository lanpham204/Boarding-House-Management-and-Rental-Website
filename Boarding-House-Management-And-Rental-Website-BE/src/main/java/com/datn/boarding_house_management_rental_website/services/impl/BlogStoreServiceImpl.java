package com.datn.boarding_house_management_rental_website.services.impl;

import com.datn.boarding_house_management_rental_website.entity.models.BlogStore;
import com.datn.boarding_house_management_rental_website.entity.models.Room;
import com.datn.boarding_house_management_rental_website.entity.models.User;
import com.datn.boarding_house_management_rental_website.entity.payload.request.BlogStoreRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.response.BlogStoreResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.CheckResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import com.datn.boarding_house_management_rental_website.exception.BadRequestException;
import com.datn.boarding_house_management_rental_website.repository.BlogStoreRepository;
import com.datn.boarding_house_management_rental_website.repository.RoomRepository;
import com.datn.boarding_house_management_rental_website.repository.UserRepository;
import com.datn.boarding_house_management_rental_website.services.BaseService;
import com.datn.boarding_house_management_rental_website.services.BlogStoreService;
import com.datn.boarding_house_management_rental_website.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogStoreServiceImpl extends BaseService implements BlogStoreService {
	private final BlogStoreRepository blogStoreRepository;
	private final RoomRepository roomRepository;
	private final UserRepository userRepository;
	private final MapperUtils mapperUtils;

	@Override
	public CheckResponse saveBlog(Long roomId) {
		User customer = userRepository.findById(getUserId())
				.orElseThrow(() -> new BadRequestException("Tài khoảng không tồn tại"));
		Room room = roomRepository.findById(roomId)
				.orElseThrow(() -> new BadRequestException("Thông tin phòng không tồn tại."));
		Optional<BlogStore> blogStore = blogStoreRepository.findByRoomAndUser(room, customer);
		if (blogStore.isPresent()) {
			throw new BadRequestException("Bài đăng đã được lưu.");
		}
		BlogStore blogStore1 = new BlogStore();
		blogStore1.setRoom(room);
		blogStore1.setUser(customer);
		blogStoreRepository.save(blogStore1);
		return new CheckResponse(true);
	}

	@Override
	public Page<BlogStoreResponse> getPageOfBlog(Integer pageNo, Integer pageSize) {
		int page = pageNo == 0 ? pageNo : pageNo - 1;
		Pageable pageable = PageRequest.of(page, pageSize);
		return mapperUtils.convertToResponsePage(blogStoreRepository.getPageOfBlogStore(getUserId(), pageable),
				BlogStoreResponse.class, pageable);
	}

	@Override
	@Transactional
	public CheckResponse deleteBlog(Long roomId) {
		Long userId = getUserId();
		blogStoreRepository.deleteByUserIdAndRoomId(userId, roomId);
		return new CheckResponse(true);

	}

	@Override
	public CheckResponse checkBlog(Long roomId) {
		Long userId = getUserId();
		Optional<BlogStore> blogStore = blogStoreRepository.findByUserIdAndRoomId(userId, roomId);
		if (blogStore.isPresent()) {
			return new CheckResponse(true);
		}
		return new CheckResponse(false);
	}
}
