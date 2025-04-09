package br.com.backend.backend.model.Anuncio;

import br.com.backend.backend.model.User.DataGetUser;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DataGetAnuncio(
        DataGetUser user,
        Long id,
        String titulo,
        String descricao,
        BigDecimal preco,
        TipoImovel tipoImovel,
        String endereco,
        Boolean disponivel,
        String cidade,
        Double avaliacao,
        LocalDateTime dataCadastro
) {
    public DataGetAnuncio(Anuncio anuncio) {
        this(
                anuncio.getUsuario(),
                anuncio.getId(),
                anuncio.getTitulo(),
                anuncio.getDescricao(),
                anuncio.getPreco(),
                anuncio.getTipoImovel(),
                anuncio.getEndereco(),
                anuncio.getDisponivel(),
                anuncio.getCidade(),
                anuncio.getAvaliacao(),
                anuncio.getDataCadastro()
        );
    }
}
