package com.datn.boarding_house_management_rental_website.services;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MaintenanceResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

public interface MaintenanceService {
	Page<MaintenanceResponse> getAllMaintenance(Long requestId, Integer pageNo, Integer pageSize);

    MessageResponse addNewMaintenance(String maintenanceDate, BigDecimal price, Long requestId, String file);

    MessageResponse editMaintenance(Long id, String maintenanceDate, BigDecimal price,String file);

    MessageResponse deleteMaintenance(Long id);

    MaintenanceResponse getMaintenance(Long id); 
}
