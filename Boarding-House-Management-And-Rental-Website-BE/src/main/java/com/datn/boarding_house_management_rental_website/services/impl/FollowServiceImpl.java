package com.datn.boarding_house_management_rental_website.services.impl;

import com.datn.boarding_house_management_rental_website.entity.models.Follow;
import com.datn.boarding_house_management_rental_website.entity.models.User;
import com.datn.boarding_house_management_rental_website.entity.payload.request.FollowRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.response.CheckResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.FollowResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import com.datn.boarding_house_management_rental_website.exception.BadRequestException;
import com.datn.boarding_house_management_rental_website.repository.FollowRepository;
import com.datn.boarding_house_management_rental_website.repository.UserRepository;
import com.datn.boarding_house_management_rental_website.services.BaseService;
import com.datn.boarding_house_management_rental_website.services.FollowService;
import com.datn.boarding_house_management_rental_website.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl extends BaseService implements FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    private final MapperUtils mapperUtils;

    @Override
    public CheckResponse addFollow(Long id) {
        User customer = userRepository.findById(getUserId()).orElseThrow(() -> new BadRequestException("Tài khoảng không tồn tại"));
        User rentaler = userRepository.findById(id).orElseThrow(() -> new BadRequestException("Tài khoảng không tồn tại"));
        Optional<Follow> followOptional = followRepository.findByCustomerAndRentaler(customer, rentaler);
        if (followOptional.isPresent()) {
            throw new BadRequestException("Người cho thuê đã được theo dõi.");
        }
        Follow follow = new Follow();
        follow.setCustomer(customer);
        follow.setRentaler(rentaler);
        followRepository.save(follow);
        return new CheckResponse(true);
    }

    @Override
    public Page<FollowResponse> getAllFollowOfCustomer(Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapperUtils.convertToResponsePage(followRepository.getPageFollow(getUserId(),pageable),FollowResponse.class, pageable);
    }
    @Override
    public List<FollowResponse> getAllFollowOfRentaler(Long id) {
        return mapperUtils.convertToEntityList(followRepository.findByRentalerId(id),FollowResponse.class);
    }

	@Override
	public Long countFollowing() {
		return followRepository.countByCustomerId(getUserId());
	}

	@Override
	public Long countFollower() {
			return followRepository.countByRentalerId(getUserId());
	}

	@Override
	@Transactional
	public CheckResponse deleteFollow(Long id) {
		Long customerId=getUserId();
		followRepository.deleteByCustomerIdAndRentalerId(customerId, id);
		return new CheckResponse(true);
	}

	@Override
	public CheckResponse checkFollow(Long id) {
		Long customerId=getUserId();
		Optional<Follow> follow = followRepository.findByCustomerIdAndRentalerId(customerId, id);
		if(follow.isPresent()){
			return new CheckResponse(true);
		}return new CheckResponse(false);
	}
}
