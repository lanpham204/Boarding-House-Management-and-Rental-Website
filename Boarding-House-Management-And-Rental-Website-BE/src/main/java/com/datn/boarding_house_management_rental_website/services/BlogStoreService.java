package com.datn.boarding_house_management_rental_website.services;
import com.datn.boarding_house_management_rental_website.entity.payload.response.BlogStoreResponse;
import com.datn.boarding_house_management_rental_website.entity.payload.response.CheckResponse;
import org.springframework.data.domain.Page;

public interface BlogStoreService {
    CheckResponse saveBlog(Long roomId);
    CheckResponse deleteBlog(Long roomId);
    CheckResponse checkBlog(Long roomId);
    Page<BlogStoreResponse> getPageOfBlog(Integer pageNo, Integer pageSize);
}
