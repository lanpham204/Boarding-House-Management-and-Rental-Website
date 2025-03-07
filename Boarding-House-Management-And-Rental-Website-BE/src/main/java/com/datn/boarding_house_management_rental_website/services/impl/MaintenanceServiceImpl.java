package com.datn.boarding_house_management_rental_website.services.impl;

import com.datn.boarding_house_management_rental_website.entity.models.Maintenance;
import com.datn.boarding_house_management_rental_website.entity.models.Request;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MaintenanceResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import com.datn.boarding_house_management_rental_website.exception.BadRequestException;
import com.datn.boarding_house_management_rental_website.repository.MaintenanceRepository;
import com.datn.boarding_house_management_rental_website.repository.RequestRepository;
import com.datn.boarding_house_management_rental_website.services.BaseService;
import com.datn.boarding_house_management_rental_website.services.FileStorageService;
import com.datn.boarding_house_management_rental_website.services.MaintenanceService;
import com.datn.boarding_house_management_rental_website.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MaintenanceServiceImpl extends BaseService implements MaintenanceService {
	private final MaintenanceRepository maintenanceRepository;
	private final MapperUtils mapperUtils;
	private final RequestRepository requestRepository;
	private final FileStorageService fileStorageService;

	@Override
	public Page<MaintenanceResponse> getAllMaintenance(Long requestId, Integer pageNo, Integer pageSize) {
		int page = pageNo == 0 ? pageNo : pageNo - 1;
		Pageable pageable = PageRequest.of(page, pageSize);
		return mapperUtils.convertToResponsePage(maintenanceRepository.searchingMaintenance(requestId, pageable),
				MaintenanceResponse.class, pageable);
	}

	@Override
	public MessageResponse addNewMaintenance(String maintenanceDate, BigDecimal price, Long requestId, String file) {
		Request request = requestRepository.findById(requestId)
				.orElseThrow(() -> new BadRequestException("Phòng đã không tồn tại"));
		Maintenance maintenance = new Maintenance(LocalDateTime.parse(maintenanceDate), price, file, getUsername(),
				getUsername(), request);
		maintenanceRepository.save(maintenance);
		return MessageResponse.builder().message("Thêm phiếu bảo trì thành công").build();
	}

	@Override
	public MessageResponse editMaintenance(Long id, String maintenanceDate, BigDecimal price,
			String file) {
		Maintenance maintenance = maintenanceRepository.findById(id)
				.orElseThrow(() -> new BadRequestException("Phiếu bảo trì không tồn tại"));
		maintenance.setMaintenanceDate(LocalDateTime.parse(maintenanceDate));
		maintenance.setPrice(price);
		if (Objects.nonNull(file)) {
			maintenance.setFiles(file);
		}
		maintenanceRepository.save(maintenance);
		return MessageResponse.builder().message("Cập nhật thành công").build();
	}

	@Override
	public MessageResponse deleteMaintenance(Long id) {
		maintenanceRepository.deleteById(id);
		return MessageResponse.builder().message("Xóa phiếu bảo trì thành công").build();
	}

	@Override
	public MaintenanceResponse getMaintenance(Long id) {
		return mapperUtils.convertToResponse(
				maintenanceRepository.findById(id).orElseThrow(() -> new BadRequestException("Không tồn tại")),
				MaintenanceResponse.class);
	}

}
