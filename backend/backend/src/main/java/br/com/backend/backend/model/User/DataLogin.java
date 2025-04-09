package br.com.backend.backend.model.User;

import jakarta.validation.constraints.NotBlank;

public record DataLogin(
        @NotBlank
        String email,
        @NotBlank
        String password
) {
}
