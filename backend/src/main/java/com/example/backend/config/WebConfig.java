package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Áp dụng cho tất cả các endpoint
                .allowedOrigins("http://localhost:5173") // Chỉ cho phép frontend từ port 5173
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // Các method được phép
                .allowedHeaders("*") // Chấp nhận tất cả các headers
                .allowCredentials(true); // Cho phép gửi credentials (cookies, v.v.)
    }
}
