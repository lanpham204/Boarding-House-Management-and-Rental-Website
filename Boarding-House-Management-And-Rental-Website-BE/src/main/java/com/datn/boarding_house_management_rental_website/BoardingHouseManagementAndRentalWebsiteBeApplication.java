package com.datn.boarding_house_management_rental_website;

import com.datn.boarding_house_management_rental_website.config.AppProperties;
import com.datn.boarding_house_management_rental_website.config.FileStorageProperties;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.scheduling.annotation.EnableScheduling;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

@SpringBootApplication
@EnableScheduling
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableConfigurationProperties({FileStorageProperties.class, AppProperties.class})
public class BoardingHouseManagementAndRentalWebsiteBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoardingHouseManagementAndRentalWebsiteBeApplication.class, args);
	}
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
