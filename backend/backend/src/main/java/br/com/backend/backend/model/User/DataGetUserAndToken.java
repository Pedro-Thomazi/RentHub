package br.com.backend.backend.model.User;

public record DataGetUserAndToken(
        Long id,
        String name,
        String email,
        String telefone,
        StatusUser status,
        String cpf,
        Boolean ativo,
        String token
) {
    public DataGetUserAndToken(User user, String token) {
        this(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getTelefone(),
                user.getStatus(),
                user.getCpf(),
                user.getAtivo(),
                token
        );
    }
}
