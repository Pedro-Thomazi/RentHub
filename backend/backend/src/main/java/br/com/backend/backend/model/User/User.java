package br.com.backend.backend.model.User;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String telefone;
    @Enumerated(EnumType.STRING)
    private StatusUser status;
    private String cpf;
    private Boolean ativo;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public User() {
    }

    public User(DataCreateUser data, String passwordCriptografada, StatusUser status) {
        this.name = data.name();
        this.email = data.email();
        this.password = passwordCriptografada;
        this.telefone = data.telefone();
        this.status = status;
        this.cpf = data.cpf();
        this.ativo = true;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public User atualizarUser(DataUpdateUser data) {
        if (data.name() != null) {
            this.name = data.name();
        }
        if (data.telefone() != null) {
            this.telefone = data.telefone();
        }
        if (data.cpf() != null) {
            this.cpf = data.cpf();
        }
        return this;
    }

    public void desativarUser() {
        this.ativo = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public StatusUser getStatus() {
        return status;
    }

    public void setStatus(StatusUser status) {
        this.status = status;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
