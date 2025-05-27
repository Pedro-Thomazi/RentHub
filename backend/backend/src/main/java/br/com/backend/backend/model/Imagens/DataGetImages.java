package br.com.backend.backend.model.Imagens;

import br.com.backend.backend.model.Anuncio.Anuncio;
import br.com.backend.backend.model.Anuncio.TipoImovel;

public record DataGetImages(
        Long idImage,
        String nameImgFile,
        Long idAnuncio,
        String tituloAnuncio,
        String descricaoAnuncio,
        TipoImovel tipoAnuncio
) {
    public DataGetImages(Images images) {
        this(
                images.id,
                images.getNameImgFile(),
                images.getAnuncio().getId(),
                images.getAnuncio().getTitulo(),
                images.getAnuncio().getDescricao(),
                images.getAnuncio().getTipoImovel()
        );
    }
}
