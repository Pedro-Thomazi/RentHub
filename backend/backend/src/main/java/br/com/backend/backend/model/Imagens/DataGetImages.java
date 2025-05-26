package br.com.backend.backend.model.Imagens;

import br.com.backend.backend.model.Anuncio.Anuncio;

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
