package br.com.backend.backend.model.User;

public record DataGetUser(
        Long id,
        String name,
        String email,
        String telefone,
        StatusUser status,
        String cpf,
        Boolean ativo
) {
    public DataGetUser(User user) {
        this(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getTelefone(),
                user.getStatus(),
                user.getCpf(),
                user.getAtivo()
        );
    }
}
