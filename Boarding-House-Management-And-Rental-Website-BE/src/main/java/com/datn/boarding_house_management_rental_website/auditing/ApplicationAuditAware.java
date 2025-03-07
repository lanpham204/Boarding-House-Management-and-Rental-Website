package com.datn.boarding_house_management_rental_website.auditing;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.datn.boarding_house_management_rental_website.entity.models.User;
import com.datn.boarding_house_management_rental_website.secruity.UserPrincipal;

public class ApplicationAuditAware implements AuditorAware<Long> {

	@Override
	public Optional<Long> getCurrentAuditor() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !authentication.isAuthenticated()
				|| authentication instanceof AnonymousAuthenticationToken) {
			return Optional.empty();
		}
		Object principal = authentication.getPrincipal();
		if (principal instanceof UserPrincipal) {
			UserPrincipal userPrincipal = (UserPrincipal) principal;
			return Optional.ofNullable(userPrincipal.getId());
		} else if (principal instanceof String) {
			// Nếu principal là String (thường là username), xử lý thêm ở đây
			String username = (String) principal;
			System.out.println(username);
			// Ví dụ: Lấy UserPrincipal từ username qua UserService
//	        UserPrincipal userPrincipal = userService.loadUserByUsername(username);
//	        return Optional.ofNullable(userPrincipal.getId());
			return Optional.empty();
		} else {
			// Xử lý các trường hợp khác (nếu cần)
			return Optional.empty();
		}
//		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
//	    // Lấy ID từ UserPrincipal
//	    return Optional.ofNullable(userPrincipal.getId());
	}
}
