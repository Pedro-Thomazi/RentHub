package br.com.backend.backend.model.Anuncio;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.math.BigDecimal;

public record DataUpdateAnuncio(
        String titulo,
        String descricao,
        BigDecimal preco,
        TipoImovel tipoImovel,
        String endereco,
        String cidade,
        Double avaliacao
) {
}
