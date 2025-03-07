package com.datn.boarding_house_management_rental_website.services.impl;

import com.datn.boarding_house_management_rental_website.entity.models.Contract;
import com.datn.boarding_house_management_rental_website.entity.models.Request;
import com.datn.boarding_house_management_rental_website.entity.models.Room;
import com.datn.boarding_house_management_rental_website.entity.payload.request.RequestRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.RequireResponse;
import com.datn.boarding_house_management_rental_website.exception.BadRequestException;
import com.datn.boarding_house_management_rental_website.repository.ContractRepository;
import com.datn.boarding_house_management_rental_website.repository.MaintenanceRepository;
import com.datn.boarding_house_management_rental_website.repository.RequestRepository;
import com.datn.boarding_house_management_rental_website.repository.RoomRepository;
import com.datn.boarding_house_management_rental_website.services.BaseService;
import com.datn.boarding_house_management_rental_website.services.RequestService;
import com.datn.boarding_house_management_rental_website.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RequestServiceImpl extends BaseService implements RequestService {

	private final RequestRepository requestRepository;
	private final ContractRepository contractRepository;
	private final MaintenanceRepository maintenanceRepository;
	private final MapperUtils mapperUtils;

	@Override
	public Page<RequireResponse> getRequestOfRentHome(String keyword, Integer pageNo, Integer pageSize) {
		int page = pageNo == 0 ? pageNo : pageNo - 1;
		Pageable pageable = PageRequest.of(page, pageSize);
		return mapperUtils.convertToResponsePage(requestRepository.searchingOfRequest(keyword, getUserId(), pageable),
				RequireResponse.class, pageable);
	}

	@Override
	public MessageResponse changeStatusOfRequest(Long id) {
		Request request = requestRepository.findById(id)
				.orElseThrow(() -> new BadRequestException("Yêu cầu này không tồn tại"));
		request.setAnswer(true);
		requestRepository.save(request);
		return MessageResponse.builder().message("Yêu cầu đã được xử lý").build();
	}

	@Override
	public RequireResponse getRequest(Long id) {
		return mapperUtils.convertToResponse(
				requestRepository.findById(id).orElseThrow(() -> new BadRequestException("Yêu cầu này không tồn tại")),
				RequireResponse.class);
	}

	@Override
	public Page<RequireResponse> getRequestOfCustomer(String keyword, String phone, Integer pageNo, Integer pageSize) {
		int page = pageNo == 0 ? pageNo : pageNo - 1;
		Pageable pageable = PageRequest.of(page, pageSize);
		return mapperUtils.convertToResponsePage(requestRepository.searchingOfRequest(keyword, phone, pageable),
				RequireResponse.class, pageable);
	}

	@Override
	public MessageResponse addRequest(RequestRequest request) {
		Contract contract = contractRepository.findById(request.getContractId())
				.orElseThrow(() -> new BadRequestException("Hợp động không tồn tại"));
		Request result = new Request(request.getNameOfRent(), request.getPhone(), request.getDescription(), contract);
		requestRepository.save(result);
		return MessageResponse.builder().message("Gửi yêu cầu thành công.").build();
	}

	@Override
	public Page<RequireResponse> getRequestOfContract(Long contractId, Integer pageNo, Integer pageSize) {
		int page = pageNo == 0 ? pageNo : pageNo - 1;
		Pageable pageable = PageRequest.of(page, pageSize);
		return mapperUtils.convertToResponsePage(requestRepository.searchingByContract(contractId, pageable),
				RequireResponse.class, pageable);
	}

	@Override
	public Long getTotalMaintenance(Long id) {
		return maintenanceRepository.sumPrice(id);	
	}
}
