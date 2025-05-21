package br.com.backend.backend.model.Imagens;

import br.com.backend.backend.model.Anuncio.Anuncio;
import jakarta.persistence.*;

@Entity
@Table(name = "images")
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(name = "name_img_file", nullable = false)
    private String nameImgFile;
    @ManyToOne
    @JoinColumn(name = "anuncio_id", nullable = false)
    private Anuncio anuncio;

    public Images(){}

    public Images(String nameImageFile, Anuncio anuncio) {
        this.nameImgFile = nameImageFile;
        this.anuncio = anuncio;
    }

    public String getNameImgFile() {
        return nameImgFile;
    }

    public void setNameImgFile(String nameImageFile) {
        this.nameImgFile = nameImageFile;
    }

    public Anuncio getAnuncio() {
        return anuncio;
    }

    public void setAnuncio(Anuncio anuncio) {
        this.anuncio = anuncio;
    }
}
