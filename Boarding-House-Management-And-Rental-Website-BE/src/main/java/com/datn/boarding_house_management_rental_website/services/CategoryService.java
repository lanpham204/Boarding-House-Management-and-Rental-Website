package com.datn.boarding_house_management_rental_website.services;

import com.datn.boarding_house_management_rental_website.entity.models.Category;
import com.datn.boarding_house_management_rental_website.entity.payload.response.CategoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    Page<CategoryResponse> getAllCategories(Pageable pageable);
    CategoryResponse getCategoryById(Long id);
    Category createCategory(Category category);
    Category updateCategory(Long id, Category updatedCategory);
    void deleteCategory(Long id);
}
