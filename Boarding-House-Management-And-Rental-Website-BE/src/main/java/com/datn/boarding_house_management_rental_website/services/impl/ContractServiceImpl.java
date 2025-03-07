package com.datn.boarding_house_management_rental_website.services.impl;

import com.datn.boarding_house_management_rental_website.entity.enums.ContractStatus;
import com.datn.boarding_house_management_rental_website.entity.enums.LockedStatus;
import com.datn.boarding_house_management_rental_website.entity.enums.RoomStatus;
import com.datn.boarding_house_management_rental_website.entity.models.Contract;
import com.datn.boarding_house_management_rental_website.entity.models.Room;
import com.datn.boarding_house_management_rental_website.entity.models.User;
import com.datn.boarding_house_management_rental_website.entity.payload.response.ContractResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import com.datn.boarding_house_management_rental_website.exception.BadRequestException;
import com.datn.boarding_house_management_rental_website.repository.ContractRepository;
import com.datn.boarding_house_management_rental_website.repository.RoomRepository;
import com.datn.boarding_house_management_rental_website.repository.UserRepository;
import com.datn.boarding_house_management_rental_website.repository.specification.ContractSpecification;
import com.datn.boarding_house_management_rental_website.services.BaseService;
import com.datn.boarding_house_management_rental_website.services.ContractService;
import com.datn.boarding_house_management_rental_website.services.FileStorageService;
import com.datn.boarding_house_management_rental_website.utils.MapperUtils;
import lombok.RequiredArgsConstructor;

import org.apache.poi.util.SystemOutLogger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl extends BaseService implements ContractService {

	private final ContractRepository contractRepository;
	private final RoomRepository roomRepository;
	private final MapperUtils mapperUtils;

	@Override
	public MessageResponse createContract(String name, Long roomId, String phone, Integer numberOfRent,
			LocalDate startDate, LocalDate endDate, ContractStatus contractStatus, String file) {
		if (contractStatus.equals(ContractStatus.RENT) || contractStatus.equals(ContractStatus.BOOKING)) {
			isOverlapping(roomId, null, startDate, endDate);
		}
		Room room = roomRepository.findById(roomId)
				.orElseThrow(() -> new BadRequestException("Phòng đã không tồn tại"));
		User user = getUserRepository().findByPhone(phone)
				.orElseThrow(() -> new BadRequestException("User không tồn tại"));
		if (room.getIsLocked().equals(LockedStatus.DISABLE)) {
			throw new BadRequestException("Phòng đã bị khóa");
		}
		Contract contract = Contract.builder().user(user).room(room).name(name).startDate(startDate).endDate(endDate)
				.numberOfRent(numberOfRent).status(contractStatus).file(file).build();
		contractRepository.save(contract);
		return MessageResponse.builder().message("Thêm hợp đồng mới thành công").build();
	}

	@Override
	public MessageResponse deleteContract(Long id) {
		Contract contract = contractRepository.findById(id)
				.orElseThrow(() -> new BadRequestException("Hợp đồng không tồn tại"));
		contractRepository.delete(contract);
		return MessageResponse.builder().message("Xóa hợp đồng thành công").build();
	}

	@Override
	public Page<ContractResponse> getAllContractOfRentaler(String name, String phone, ContractStatus status,
			Integer pageNo, Integer pageSize, boolean not) {
		int page = pageNo == 0 ? pageNo : pageNo - 1;
		Pageable pageable = PageRequest.of(page, pageSize);
		if (not) {
			return mapperUtils.convertToResponsePage(
					contractRepository.searchingContactNotStatus(name, status, getUserId(), pageable),
					ContractResponse.class, pageable);
		}
		return mapperUtils.convertToResponsePage(
				contractRepository.searchingContact(name, status, getUserId(), pageable), ContractResponse.class,
				pageable);
	}

	@Override
	public MessageResponse checkoutRoom(Long id) {
		Contract contract = contractRepository.findById(id)
				.orElseThrow(() -> new BadRequestException("Hợp đồng không tồn tại"));
		contract.setStatus(ContractStatus.CHECKOUT);
		contractRepository.save(contract);
		return MessageResponse.builder().message("Trả phòng và xuất hóa đơn thành công.").build();
	}

	@Override
	public ContractResponse getContractById(Long id) {
		return mapperUtils.convertToResponse(
				contractRepository.findById(id).orElseThrow(() -> new BadRequestException("Hợp đồng không tồn tại!")),
				ContractResponse.class);
	}

	@Override
	public MessageResponse editContractInfo(Long id, String name, Long roomId, String nameOfRent, Long numOfPeople,
			String phone, String deadlineContract, ContractStatus contractStatus, String createdAt, String file) {
		Room room = roomRepository.findById(roomId)
				.orElseThrow(() -> new BadRequestException("Phòng đã không tồn tại"));
		User user = getUserRepository().findByPhone(phone)
				.orElseThrow(() -> new BadRequestException("User không tồn tại"));

		if (room.getIsLocked().equals(LockedStatus.DISABLE)) {
			throw new BadRequestException("Phòng đã bị khóa");
		}

//		Contract contract = contractRepository.findById(id)
//				.orElseThrow(() -> new BadRequestException("Hợp đồng không tồn tại!"));
//		contract.setEnd(LocalDate.parse(deadlineContract));
//		contract.setRoom(room);
//		contract.setName(name);
//		if (file != null) {
//			contract.setFile(file);
//		}
//		contract.setNumOfPeople(numOfPeople);
//		contract.setPhone(phone);
//		contract.setStatus(contractStatus);
//		contract.setStart(LocalDate.parse(createdAt));
//		contract.setUpdatedBy(user.getEmail());
//		contractRepository.save(contract);
		return MessageResponse.builder().message("Cập nhật hợp đồng thành công.").build();
	}

	@Override
	public Page<ContractResponse> getAllContractOfCustomer(Long userId, Integer pageNo, Integer pageSize) {
		User user = getUserRepository().findById(userId)
				.orElseThrow(() -> new BadRequestException("User không tồn tại"));
		int page = pageNo == 0 ? pageNo : pageNo - 1;
		Pageable pageable = PageRequest.of(page, pageSize);
		return mapperUtils.convertToResponsePage(contractRepository.findByUserId(userId, pageable),
				ContractResponse.class, pageable);
	}

	private List<Contract> checkOverlapping(Long roomId, LocalDate startDate, LocalDate endDate) {
		Specification<Contract> specification = Specification
				.where(ContractSpecification.isOverlapping(startDate, endDate))
				.and(ContractSpecification.hasStatus(ContractStatus.RENT).or(ContractSpecification.hasStatus(ContractStatus.BOOKING) )).and(ContractSpecification.hasRoomId(roomId));
		return contractRepository.findAll(specification);
	}

	private void isOverlapping(Long roomId, Long contractId, LocalDate startDate, LocalDate endDate) {
		List<Contract> list = checkOverlapping(roomId, startDate, endDate);
		if (!list.isEmpty()) {
			Contract contract = list.get(0);
			if (!contract.getId().equals(contractId)) {
				if ((startDate.isBefore(contract.getStartDate()) && endDate.isAfter(contract.getEndDate()))) {
					throw new BadRequestException(
							"Thời hạn hợp đồng không hợp lệ, ngày kết thúc của bạn phải trước ngày: %s"
									.formatted(contract.getStartDate()));
				} else {
					throw new BadRequestException(
							"Thời hạn hợp đồng không hợp lệ, ngày bắt đầu của bạn phải sau ngày: %s"
									.formatted(contract.getEndDate()));
				}
			}
		}
//			else if(startDate.isAfter(contract.getStartDate()) && endDate.isBefore(contract.getEndDate())) {
//				throw new BadRequestException(
//						"Thời hạn hợp đồng không hợp lệ, ngày bắt đầu của bạn phải sau ngày: %s"
//								.formatted(contract.getEndDate()));
//			}
//			else if(startDate.isBefore(contract.getStartDate()) && endDate.isAfter(contract.getEndDate())) {
//				throw new BadRequestException(
//						"Thời hạn hợp đồng không hợp lệ, ngày kết thúc của bạn phải trước ngày: %s"
//								.formatted(contract.getStartDate()));
//			}
//			else if(startDate.isBefore(contract.getEndDate()) && endDate.isAfter(contract.getEndDate())){
//				throw new BadRequestException(
//						"Thời hạn hợp đồng không hợp lệ, ngày bắt đầu của bạn phải sau ngày: %s"
//								.formatted(contract.getEndDate()));
//			}
	}

	@Override
	public MessageResponse requestContract(Long roomId, Integer numberOfRent, Integer numberOfMonth,
			LocalDate startDate, ContractStatus contractStatus, String fileUrl) {
		// tính toán ngày kết thúc hợp đồng
		int month = startDate.getMonthValue() + numberOfMonth;
		LocalDate endDate;
		if (month > 12) {
			if (month % 12 == 0) {
				endDate = startDate.withYear(startDate.getYear() + (int) Math.floor(month / 12)-1).withMonth(12);
			} else {
				endDate = startDate.withYear(startDate.getYear() + (int) Math.floor(month / 12)).withMonth(month % 12);
			}
		} else {
			endDate = startDate.withMonth(month);
		}
		isOverlapping(roomId, null, startDate, endDate);
		// luu data
		User user = getUserRepository().findById(getUserId())
				.orElseThrow(() -> new BadRequestException("User không tồn tại"));
		Room room = roomRepository.findById(roomId).orElseThrow(() -> new BadRequestException("Phòng không tồn tại"));
		if (room.getIsLocked().equals(LockedStatus.DISABLE)) {
			throw new BadRequestException("Phòng không bị khóa");
		}
		Contract contract = Contract.builder().user(user).room(room)
				.name("Hợp đồng thuê %s của %s".formatted(room.getTitle(), user.getName())).startDate(startDate)
				.endDate(endDate).numberOfRent(numberOfRent).status(contractStatus).file(fileUrl).build();
		contractRepository.save(contract);
		return new MessageResponse("Tạo hợp đồng thành công");
	}

	@Override
	public MessageResponse updateContract(Long contractId, String name, Integer numberOfRent, LocalDate startDate,
			LocalDate endDate, ContractStatus contractStatus, String fileUrl) {
		Contract contract = contractRepository.findById(contractId)
				.orElseThrow(() -> new BadRequestException("Hợp đồng không tồn tại"));
		if (contractStatus.equals(ContractStatus.RENT) || contractStatus.equals(ContractStatus.BOOKING)) {
			isOverlapping(contract.getRoom().getId(), contractId, startDate, endDate);
		}
		contract.setName(name);
		contract.setNumberOfRent(numberOfRent);
		contract.setStartDate(startDate);
		contract.setEndDate(endDate);
		contract.setStatus(contractStatus);
		if (fileUrl != null) {
			contract.setFile(fileUrl);
		}
		contractRepository.save(contract);
		return new MessageResponse("Cập nhật hợp đồng thành công");
	}
}
