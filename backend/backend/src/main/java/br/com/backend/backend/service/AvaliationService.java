package br.com.backend.backend.service;

import br.com.backend.backend.exception.BusinessRuleException;
import br.com.backend.backend.model.Avaliations.Avaliations;
import br.com.backend.backend.model.Avaliations.DataAvaliation;
import br.com.backend.backend.model.User.User;
import br.com.backend.backend.repository.AvaliationRepository;
import org.springframework.stereotype.Service;

@Service
public class AvaliationService {
    private final AvaliationRepository repository;

    public AvaliationService(AvaliationRepository repository) {
        this.repository = repository;
    }

    public Avaliations toAssess(DataAvaliation data, User user) {
        if (data.comment() == null || data.comment().isEmpty()) {
            throw new BusinessRuleException("O comentario é obrigatório");
        }
        if (data.avaliation() == null) {
            throw new BusinessRuleException("Adicione uma nota ao anúncio: [0 - 10]");
        }

        var avaliation = new Avaliations(data, user);
        avaliation = repository.save(avaliation);
        return avaliation;
    }
}
