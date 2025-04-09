package br.com.backend.backend.model.Anuncio;

import br.com.backend.backend.model.User.DataGetUser;
import br.com.backend.backend.model.User.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "anuncios")
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
    private String urlImage;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public DataGetUser getUsuario() {
        return new DataGetUser(this.usuario);
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public TipoImovel getTipoImovel() {
        return tipoImovel;
    }

    public void setTipoImovel(TipoImovel tipoImovel) {
        this.tipoImovel = tipoImovel;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public Boolean getDisponivel() {
        return disponivel;
    }

    public void setDisponivel(Boolean disponivel) {
        this.disponivel = disponivel;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public Double getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(Double avaliacao) {
        this.avaliacao = avaliacao;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }
}
