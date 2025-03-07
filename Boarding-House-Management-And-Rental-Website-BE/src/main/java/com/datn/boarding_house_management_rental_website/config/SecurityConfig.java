package com.datn.boarding_house_management_rental_website.config;

import com.datn.boarding_house_management_rental_website.auditing.ApplicationAuditAware;
import com.datn.boarding_house_management_rental_website.secruity.CustomUserDetailsService;
import com.datn.boarding_house_management_rental_website.secruity.RestAuthenticationEntryPoint;
import com.datn.boarding_house_management_rental_website.secruity.TokenAuthenticationFilter;
import com.datn.boarding_house_management_rental_website.secruity.oauth2.CustomOAuth2UserService;
import com.datn.boarding_house_management_rental_website.secruity.oauth2.OAuth2AuthenticationFailureHandler;
import com.datn.boarding_house_management_rental_website.secruity.oauth2.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomOAuth2UserService customOAuth2UserService;

    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

	@Bean
	public AuditorAware<Long> auditorAware() {
		return new ApplicationAuditAware();
	}

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .exceptionHandling()
                .authenticationEntryPoint(new RestAuthenticationEntryPoint()).and()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/send",
                                "/ws/**",
                                "/room/**",
                                "/error",
                                "/auth/**",
                                "/oauth2/**",
                                "/export-bill/**",
                                "/customer/room/**",
                                "/account/send-mail/contact",
                                "/account/customer/**",
                                "/room/{userId}/rentaler/**",
                                "/account/{id}/**",
                                "/request/customer",
                                "/view-file/**",
                                "/document/**",
                                "/image/**"
                        ).permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(oauth2 -> oauth2
                        .authorizationEndpoint()
                        .baseUri("/oauth2/authorize")
                        .and()
                        .redirectionEndpoint()
                        .baseUri("/oauth2/callback/*").and()
                        .userInfoEndpoint()
                        .userService(customOAuth2UserService).and()
                        .successHandler(oAuth2AuthenticationSuccessHandler)
                        .failureHandler(oAuth2AuthenticationFailureHandler))
                .httpBasic().disable()
                .formLogin().disable();

        // Add custom token filter
        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}
