package br.com.backend.backend.model.User;

public record DataCreateUser(
        String name,
        String password,
        String confirmPassword,
        String email,
        String telefone,
        String cpf
        ) {}
