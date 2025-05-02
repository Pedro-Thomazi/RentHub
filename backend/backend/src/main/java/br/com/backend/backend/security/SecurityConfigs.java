package br.com.backend.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigs {
    @Autowired
    private final SecurityFilter securityFilter;

    public SecurityConfigs(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors()
                .and()
                .authorizeHttpRequests(
                        req -> {
                            req.requestMatchers(HttpMethod.GET, "/uploads/**").permitAll();
                            req.requestMatchers(HttpMethod.POST, "/register").permitAll();
                            req.requestMatchers(HttpMethod.POST, "/login").permitAll();
                            req.requestMatchers(HttpMethod.GET, "/anuncios").permitAll();
                            req.requestMatchers(HttpMethod.GET, "/top-anuncios").permitAll();
                            req.requestMatchers(HttpMethod.GET, "/hoteis/**").permitAll();
                            req.requestMatchers(HttpMethod.GET, "/casas/**").permitAll();
                            req.requestMatchers(HttpMethod.GET, "/apartamentos/**").permitAll();
                            req.requestMatchers(HttpMethod.GET, "/anuncios/anuncio/{id}").permitAll();
                            req.anyRequest().authenticated();
                        }
                )
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
