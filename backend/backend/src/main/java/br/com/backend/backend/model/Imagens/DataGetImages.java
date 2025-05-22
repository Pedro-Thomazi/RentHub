package br.com.backend.backend.model.Imagens;

import br.com.backend.backend.model.Anuncio.Anuncio;

import java.util.List;

public record DataGetImages(
        String nameImgFile,
        Anuncio anuncio
) {
    public DataGetImages(Images images) {
        this(
                images.getNameImgFile(),
                images.getAnuncio()
        );
    }
}
