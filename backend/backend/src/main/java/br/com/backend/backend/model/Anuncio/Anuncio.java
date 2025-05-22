package br.com.backend.backend.model.Anuncio;

import br.com.backend.backend.model.Imagens.Images;
import br.com.backend.backend.model.User.DataGetUser;
import br.com.backend.backend.model.User.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "anuncios")
@Getter
@Setter
public class Anuncio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario; // Relacionamento com a tabela "users"
    private String titulo;
    private String descricao;
    private BigDecimal preco;
    @Enumerated(EnumType.STRING)
    private TipoImovel tipoImovel;
    private String endereco;
    private Boolean disponivel;
    @CreationTimestamp
    private LocalDateTime dataCadastro;
    private Double avaliacao;
    private String cidade;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "anuncio_id")
    private List<Images> urlImage = new ArrayList<>();
    private String principalImage;

    public Anuncio() {}

    public Anuncio(DataCreateAnuncio data, User user) {
        this.usuario = user;
        this.titulo = data.titulo();
        this.descricao = data.descricao();
        this.preco = data.preco();
        this.tipoImovel = data.tipoImovel();
        this.endereco = data.endereco();
        this.disponivel = true;
        this.dataCadastro = LocalDateTime.now();
        this.avaliacao = data.avaliacao();
        this.cidade = data.cidade();
    }

    public Anuncio updateAnuncio(DataUpdateAnuncio data) {
        if (data.titulo() != null) {
            this.titulo = data.titulo();
        }
        if (data.descricao() != null) {
            this.descricao = data.descricao();
        }
        if (data.preco() != null) {
            this.preco = data.preco();
        }
        if (data.tipoImovel() != null) {
            this.tipoImovel = data.tipoImovel();
        }
        if (data.endereco() != null) {
            this.endereco = data.endereco();
        }
        if (data.avaliacao() != null) {
            this.avaliacao = data.avaliacao();
        }
        if (data.cidade() != null) {
            this.cidade = data.cidade();
        }
        return this;
    }

    public void unavailable() {
        this.disponivel = false;
    }

    public DataGetUser getUsuario() {
        return new DataGetUser(this.usuario);
    }
}
