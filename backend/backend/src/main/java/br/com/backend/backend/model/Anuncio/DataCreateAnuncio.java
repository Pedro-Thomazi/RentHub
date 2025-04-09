package br.com.backend.backend.model.Anuncio;

import br.com.backend.backend.model.User.User;

import java.math.BigDecimal;
import java.security.Timestamp;

public record DataCreateAnuncio(
        String titulo,
        String descricao,
        BigDecimal preco,
        TipoImovel tipoImovel,
        String endereco,
        Double avaliacao,
        String cidade,
        Boolean disponivel
) {
}
