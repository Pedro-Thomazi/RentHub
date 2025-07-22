package br.com.backend.backend.model.Avaliations;

import br.com.backend.backend.model.User.DataGetUser;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DataGetAvaliation(
        DataGetUser user,
        Long id,
        String comment,
        BigDecimal avaliation,
        LocalDateTime dataComment
) {
    public DataGetAvaliation(Avaliations avaliations) {
        this(
                avaliations.getUser(),
                avaliations.getId(),
                avaliations.getComment(),
                avaliations.getAvaliation(),
                avaliations.getDataComment()
        );
    }
}
