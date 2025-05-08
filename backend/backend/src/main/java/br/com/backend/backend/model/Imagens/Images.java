package br.com.backend.backend.model.Imagens;

import br.com.backend.backend.model.Anuncio.Anuncio;
import jakarta.persistence.*;

@Entity
@Table(name = "images")
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    private String nameImageFile;
    @ManyToOne
    @JoinColumn(name = "anuncio_id")
    private Anuncio anuncio;

    public Images(){}

    public Images(String nameImageFile, Anuncio anuncio) {
        this.nameImageFile = nameImageFile;
        this.anuncio = anuncio;
    }

    public String getNameImageFile() {
        return nameImageFile;
    }

    public void setNameImageFile(String nameImageFile) {
        this.nameImageFile = nameImageFile;
    }

    public Anuncio getAnuncio() {
        return anuncio;
    }

    public void setAnuncio(Anuncio anuncio) {
        this.anuncio = anuncio;
    }
}
