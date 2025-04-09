package br.com.backend.backend.service;

import br.com.backend.backend.exception.BusinessRuleException;
import br.com.backend.backend.model.User.DataCreateUser;
import br.com.backend.backend.model.User.DataUpdateUser;
import br.com.backend.backend.model.User.StatusUser;
import br.com.backend.backend.model.User.User;
import br.com.backend.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User create(@Valid DataCreateUser data) {
        if (data.name() == null || data.name().isEmpty()) {
            throw new BusinessRuleException("O nome é obrigatório");
        }if (data.email() == null || data.email().isEmpty()) {
            throw new BusinessRuleException("O e-mail é obrigatório");
        }
        if (!data.password().equals(data.confirmPassword())) {
            throw new BusinessRuleException("Senha e confirmação de senha são diferentes.");
        }
        if (data.telefone() == null || data.telefone().isEmpty()) {
            throw new BusinessRuleException("O telefone é obrigatório");
        }
        if (data.cpf() == null || data.cpf().isEmpty()) {
            throw new BusinessRuleException("O CPF é obrigatório");
        }


        var passwordCriptografada = passwordEncoder.encode(data.password());
        var user = new User(data, passwordCriptografada, StatusUser.USUARIO);

        return repository.save(user);
    }

    @Transactional
    public User updateUser(@Valid DataUpdateUser data, User user) {
        user.atualizarUser(data);
        return repository.save(user);
    }

    @Transactional
    public void desativateUser(User user) {
        user.desativarUser();
        repository.save(user);
    }

    public User getMyDetails(User logado) {
        return repository.getReferenceById(logado.getId());
    }
}
