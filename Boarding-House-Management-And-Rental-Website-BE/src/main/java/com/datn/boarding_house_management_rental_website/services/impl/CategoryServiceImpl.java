package com.datn.boarding_house_management_rental_website.services.impl;

import com.datn.boarding_house_management_rental_website.entity.models.Category;
import com.datn.boarding_house_management_rental_website.entity.payload.response.CategoryResponse;
import com.datn.boarding_house_management_rental_website.repository.CategoryRepository;
import com.datn.boarding_house_management_rental_website.services.CategoryService;
import com.datn.boarding_house_management_rental_website.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final MapperUtils mapperUtils;

    @Override
    public Page<CategoryResponse> getAllCategories(Pageable pageable) {
       return mapperUtils.convertToResponsePage(categoryRepository.findAll(pageable), CategoryResponse.class, pageable);
    }

    @Override
    public CategoryResponse getCategoryById(Long id) {
        return mapperUtils.convertToResponse(categoryRepository.findById(id), CategoryResponse.class);
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id, Category updatedCategory) {
        return categoryRepository.findById(id)
                .map(category -> {
                    category.setName(updatedCategory.getName());
                    // Cập nhật các thuộc tính khác nếu có
                    return categoryRepository.save(category);
                })
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
