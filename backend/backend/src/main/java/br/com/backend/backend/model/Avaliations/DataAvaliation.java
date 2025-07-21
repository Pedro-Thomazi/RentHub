package br.com.backend.backend.model.Avaliations;

import java.math.BigDecimal;

public record DataAvaliation(
        String comment,
        BigDecimal avaliation
) {
}
