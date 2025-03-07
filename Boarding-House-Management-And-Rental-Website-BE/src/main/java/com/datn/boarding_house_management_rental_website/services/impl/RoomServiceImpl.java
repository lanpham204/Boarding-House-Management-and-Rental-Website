package com.datn.boarding_house_management_rental_website.services.impl;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;

import com.datn.boarding_house_management_rental_website.entity.enums.LockedStatus;
import com.datn.boarding_house_management_rental_website.entity.enums.RoomStatus;
import com.datn.boarding_house_management_rental_website.entity.models.*;
import com.datn.boarding_house_management_rental_website.entity.models.DTO.CommentDTO;
import com.datn.boarding_house_management_rental_website.entity.payload.request.AssetRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.request.RateRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.request.RoomRequest;
import com.datn.boarding_house_management_rental_website.entity.payload.response.MessageResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.RateResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.RoomResponse;
import com.datn.boarding_house_management_rental_website.exception.BadRequestException;
import com.datn.boarding_house_management_rental_website.repository.*;
import com.datn.boarding_house_management_rental_website.services.BaseService;
import com.datn.boarding_house_management_rental_website.services.FileStorageService;
import com.datn.boarding_house_management_rental_website.services.RoomService;
import com.datn.boarding_house_management_rental_website.utils.MapperUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl extends BaseService implements RoomService {
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final FileStorageService fileStorageService;
    private final RoomMediaRepository roomMediaRepository;
    private final CategoryRepository categoryRepository;
    private final AssetRepository assetRepository;
    private final RateRepository rateRepository;
    private final MapperUtils mapperUtils;

    @Override
    public MessageResponse addNewRoom(RoomRequest roomRequest) {
        Location location = locationRepository.
                findById(roomRequest.getLocationId()).orElseThrow(() -> new BadRequestException("Thành phố chưa tồn tại."));
        Category category = categoryRepository.findById(roomRequest.getCategoryId())
                .orElseThrow(() -> new BadRequestException("Danh mục không tồn tại"));
        Room room = new Room(
                roomRequest.getTitle(),
                roomRequest.getDescription(),
                roomRequest.getPrice(),
                roomRequest.getLatitude(),
                roomRequest.getLongitude(),
                getUsername(),
                getUsername(),
                location,
                category,
                getUser(),
                roomRequest.getStatus());
        roomRepository.save(room);
        for (String file : roomRequest.getFiles()) {
            RoomMedia roomMedia = new RoomMedia();
            roomMedia.setFiles(file);
            roomMedia.setRoom(room);
            roomMediaRepository.save(roomMedia);
        }

        for (AssetRequest asset: roomRequest.getAssets()) {
            Asset a = new Asset();
            a.setRoom(room);
            a.setName(asset.getName());
            a.setNumber(asset.getNumber());
            assetRepository.save(a);
        }
        return MessageResponse.builder().message("Thêm tin phòng thành công").build();
    }

    @Override
    public Page<RoomResponse> getRoomByRentaler(String title, Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<RoomResponse> result = mapperUtils.convertToResponsePage(roomRepository.searchingRoom(title, getUserId() ,pageable),RoomResponse.class,pageable);
        return mapperUtils.convertToResponsePage(roomRepository.searchingRoom(title, getUserId() ,pageable),RoomResponse.class,pageable);
    }

    @Override
    public RoomResponse getRoomById(Long id) {
        return mapperUtils.convertToResponse(roomRepository.findById(id).orElseThrow(() ->
                new BadRequestException("Phòng trọ này không tồn tại.")), RoomResponse.class);
    }

    @Override
    public MessageResponse disableRoom(Long id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new BadRequestException("Thông tin phòng không tồn tại."));
        room.setIsLocked(LockedStatus.DISABLE);
        roomRepository.save(room);
        return MessageResponse.builder().message("Bài đăng của phòng đã được ẩn đi.").build();
    }

    @Override
    @Transactional
    public MessageResponse updateRoomInfo(Long id, RoomRequest roomRequest) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new BadRequestException("Thông tin phòng không tồn tại."));
        Location location = locationRepository.
                findById(roomRequest.getLocationId()).orElseThrow(() -> new BadRequestException("Thành phố chưa tồn tại."));
        Category category = categoryRepository.findById(roomRequest.getCategoryId())
                .orElseThrow(() -> new BadRequestException("Danh mục không tồn tại"));
        room.setUpdatedBy(getUsername());
        room.setTitle(roomRequest.getTitle());
        room.setDescription(roomRequest.getDescription());
        room.setPrice(roomRequest.getPrice());
        room.setLatitude(roomRequest.getLatitude());
        room.setLongitude(roomRequest.getLongitude());
        room.setUpdatedBy(getUsername());
        room.setLocation(location);
        room.setCategory(category);
        room.setStatus(roomRequest.getStatus());
        roomRepository.save(room);

        if (!roomRequest.getFiles().isEmpty()) {	
            roomMediaRepository.deleteAllByRoom(room);
            for (String file : roomRequest.getFiles()) {
                RoomMedia roomMedia = new RoomMedia();
                roomMedia.setFiles(file);
                roomMedia.setRoom(room);
                roomMediaRepository.save(roomMedia);
            }
        }

        assetRepository.deleteAllByRoom(room);
        for (AssetRequest asset: roomRequest.getAssets()) {
            Asset a = new Asset();
            a.setRoom(room);
            a.setName(asset.getName());
            a.setNumber(asset.getNumber());
            assetRepository.save(a);
        }
        return MessageResponse.builder().message("Cập nhật thông tin thành công").build();
    }

    @Override
    public Page<RoomResponse> getRentOfHome() {
        Pageable pageable = PageRequest.of(0,100);
        return mapperUtils.convertToResponsePage(roomRepository.getAllRentOfHome( getUserId(), pageable), RoomResponse.class, pageable);
    }
    


    @Override
    public Page<RoomResponse> getAllRoomForAdmin(String title,Boolean approve, Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapperUtils.convertToResponsePage(roomRepository.searchingRoomForAdmin(title, approve ,pageable), RoomResponse.class, pageable);
    }

    @Override
    public Page<RoomResponse> getRoomByUserId(Long userId, Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapperUtils.convertToResponsePage(roomRepository.searchingRoomForCustomer(null,null,null,userId,null,null,null,null, pageable), RoomResponse.class, pageable );
    }

    private List<RoomResponse> sortRooms(List<RoomResponse> rooms, String typeSort) {
        if ("Thời gian: Mới đến cũ".equals(typeSort)) {
            rooms.sort(Comparator.comparing(RoomResponse::getCreatedAt).reversed());
        } else if ("Thời gian: Cũ đến mới".equals(typeSort)) {
            rooms.sort(Comparator.comparing(RoomResponse::getCreatedAt));
        } else if ("Giá: Thấp đến cao".equals(typeSort)) {
            rooms.sort(Comparator.comparing(RoomResponse::getPrice));
        } else if ("Giá: Cao đến thấp".equals(typeSort)) {
            rooms.sort(Comparator.comparing(RoomResponse::getPrice).reversed());
        }
        
        return rooms;
    }
    @Override
    public MessageResponse isApproveRoom(Long id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new BadRequestException("Phòng không còn tồn tại"));
        if (room.getIsApprove().equals(Boolean.TRUE)) {
            throw new BadRequestException("Phòng đã được phê duyệt");
        } else {
            room.setIsApprove(Boolean.TRUE);
        }
        roomRepository.save(room);
        return MessageResponse.builder().message("Phê duyệt tin phòng thành công.").build();
    }

    @Override
    public MessageResponse removeRoom(Long id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new BadRequestException("Phòng không còn tồn tại"));
        if(Boolean.TRUE.equals(room.getIsRemove())){
            throw new BadRequestException("Bài đăng đã bị gỡ");
        }
        room.setIsRemove(Boolean.TRUE);
        roomRepository.save(room);
        return MessageResponse.builder().message("Bài đăng đã bị gỡ thành công").build();
    }

    @Override
    public String addRate(Long id, RateRequest rateRequest) {
        try {
            Room room = roomRepository.findById(rateRequest.getRoom_id()).orElseThrow(() -> new BadRequestException("Phòng không còn tồn tại"));
            User user = userRepository.findById(id).orElseThrow(() -> new BadRequestException("Người dùng không tồn tại"));
            Rate rate = new Rate();
            rate.setRating(rateRequest.getRating());
            rate.setContent(rateRequest.getContent());
            rate.setUser(user);
            rate.setRoom(room);
            rateRepository.save(rate);
            return "Thêm đánh giá thành công";
        } catch (Exception e) {
            return "Thêm đánh giá thất bại";
        }
    }

    @Override
    public Page<RateResponse> getAllRateRoom(Long id,Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        Room room = roomRepository.findById(id).orElseThrow(() -> new BadRequestException("Phòng không còn tồn tại"));
        return mapperUtils.convertToResponsePage(rateRepository.findByRoomId(id,pageable), RateResponse.class,pageable);
    }
	
	private User getUser() {
        return userRepository.findById(getUserId()).orElseThrow(() -> new BadRequestException("Người dùng không tồn tại"));
    }
}
