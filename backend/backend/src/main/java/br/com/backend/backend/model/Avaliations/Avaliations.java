package br.com.backend.backend.model.Avaliations;

import br.com.backend.backend.model.User.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "avaliations")
@Getter
@Setter
public class Avaliations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario;
    private String comment;
    private BigDecimal avaliation;
    @CreationTimestamp
    private LocalDateTime dataComment;

    public Avaliations(){}

    public Avaliations(DataAvaliation data, User usuario) {
        this.usuario = usuario;
        this.comment = data.comment();
        this.avaliation = data.avaliation();
        this.dataComment = LocalDateTime.now();
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Long getId() {
        return id;
    }
}
