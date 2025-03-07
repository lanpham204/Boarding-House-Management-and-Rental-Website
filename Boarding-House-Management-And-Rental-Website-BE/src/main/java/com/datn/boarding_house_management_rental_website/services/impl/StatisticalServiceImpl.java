package com.datn.boarding_house_management_rental_website.services.impl;

import com.datn.boarding_house_management_rental_website.entity.enums.ContractStatus;
import com.datn.boarding_house_management_rental_website.entity.enums.RoomStatus;
import com.datn.boarding_house_management_rental_website.entity.models.Contract;
import com.datn.boarding_house_management_rental_website.entity.models.User;
import com.datn.boarding_house_management_rental_website.entity.payload.request.TotalNumberRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.response.CostResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.RevenueResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.TotalNumberResponse;
import com.datn.boarding_house_management_rental_website.exception.BadRequestException;
import com.datn.boarding_house_management_rental_website.repository.ContractRepository;
import com.datn.boarding_house_management_rental_website.repository.MaintenanceRepository;
import com.datn.boarding_house_management_rental_website.repository.RoomRepository;
import com.datn.boarding_house_management_rental_website.repository.UserRepository;
import com.datn.boarding_house_management_rental_website.services.BaseService;
import com.datn.boarding_house_management_rental_website.services.StatisticalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatisticalServiceImpl extends BaseService implements StatisticalService {

	private final ContractRepository contractRepository;
	private final UserRepository userRepository;
	private final RoomRepository roomRepository;
	private final MaintenanceRepository maintenanceRepository;

	 @Override
	    public TotalNumberRequest getNumberOfRentalerForStatistical() {
	        User user = userRepository.findById(getUserId()).orElseThrow(() -> new BadRequestException("Tài khoản không tồn tại"));
		 int total = 0;
		 for (Contract contract : contractRepository.getAllContract(getUserId())) {
			 Period period = Period.between(contract.getStartDate(), contract.getEndDate());
			 long months = period.toTotalMonths();
			 total += months * contract.getRoom().getPrice().intValue();
		 }

	        TotalNumberRequest totalNumberRequest = new TotalNumberRequest();
	        totalNumberRequest.setNumberOfRoom((int) roomRepository.countAllByUser(user));
	        totalNumberRequest.setNumberOfPeople(contractRepository.sumNumOfPeople((getUserId())) == null? 0:contractRepository.sumNumOfPeople(getUserId()).intValue());
	        totalNumberRequest.setRevenue(BigDecimal.valueOf(total));
	        return totalNumberRequest;
	    }

	@Override
	public TotalNumberResponse getStatisticalNumberOfAdmin() {
		TotalNumberResponse totalNumberResponse = new TotalNumberResponse();
		totalNumberResponse.setNumberOfAccount((int) userRepository.count());
		totalNumberResponse.setNumberOfApprove((int) roomRepository.countByIsApprove(true));
		totalNumberResponse.setNumberOfApproving((int) roomRepository.countByIsApprove(false));
		totalNumberResponse.setNumberOfRoom((int) roomRepository.count());
		return totalNumberResponse;
	}

	@Override
	public Page<RevenueResponse> getByMonth() {
		Map<YearMonth, BigDecimal> monthTotalMap = new HashMap<>();

		for (Contract contract : contractRepository.getAllContractByStatus(getUserId())) {
			LocalDate startDate = contract.getStartDate();
			LocalDate endDate = contract.getEndDate();

			if (endDate == null || endDate.isBefore(startDate)) {
				continue;
			}

			BigDecimal roomPrice = contract.getRoom().getPrice();

			YearMonth currentMonth = YearMonth.from(startDate);
			YearMonth endMonth = YearMonth.from(endDate);

			while (!currentMonth.isAfter(endMonth)) {
				monthTotalMap.merge(
						currentMonth,
						roomPrice,
						BigDecimal::add
				);
				currentMonth = currentMonth.plusMonths(1);
			}
		}

		List<RevenueResponse> revenueResponses = monthTotalMap.entrySet().stream()
				.map(entry -> {
					RevenueResponse response = new RevenueResponse();
					response.setMonth(entry.getKey().getMonthValue());
					response.setYear(entry.getKey().getYear());
					response.setRevenue(entry.getValue());
					return response;
				})
				.sorted(Comparator.comparing(RevenueResponse::getYear)
						.thenComparing(RevenueResponse::getMonth))
				.collect(Collectors.toList());

		return new PageImpl<>(revenueResponses);
	}
	@Override
	public Page<CostResponse> getByCost() {
		int total = 0;
		for (Contract contract : contractRepository.getAllContract(getUserId())) {
			Period period = Period.between(contract.getStartDate(), contract.getEndDate());
			long months = period.toTotalMonths();
			total += months * contract.getRoom().getPrice().intValue();
		}

		List<CostResponse> costResponses = new ArrayList<>();
		CostResponse costResponse1 = new CostResponse();
		costResponse1.setName("Doanh thu");
		costResponse1.setCost(BigDecimal.valueOf(total));

		CostResponse costResponse2 = new CostResponse();
		costResponse2.setCost(maintenanceRepository.sumPriceOfMaintenance(getUserId()));
		costResponse2.setName("Bảo trì");

		costResponses.add(costResponse1);
		costResponses.add(costResponse2);
		return new PageImpl<>(costResponses);
	}
}
