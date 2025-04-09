package br.com.backend.backend.infra.cors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfigurations {

    @Bean
    public WebMvcConfigurer corsConfigs() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Permite todas as rotas
                        .allowedOrigins("http://localhost:5173") // Permite o front-end acessar
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                        .allowedHeaders("*") // Permite qualquer header
                        .allowCredentials(true); // Permite envio de cookies/autenticação
            }
        };
    }
}
