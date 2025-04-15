package br.com.backend.backend.service;

import br.com.backend.backend.exception.BusinessRuleException;
import br.com.backend.backend.model.Anuncio.Anuncio;
import br.com.backend.backend.model.Anuncio.DataCreateAnuncio;
import br.com.backend.backend.model.Anuncio.DataUpdateAnuncio;
import br.com.backend.backend.model.User.DataGetUser;
import br.com.backend.backend.model.User.User;
import br.com.backend.backend.repository.AnuncioRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class AnuncioService {
    private final AnuncioRepository repository;

    public AnuncioService(AnuncioRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Anuncio create(DataCreateAnuncio data, String urlImage, User user) {
        if (data.titulo() == null || data.titulo().isEmpty()) {
            throw new BusinessRuleException("O título é obrigatório");
        }if (data.descricao() == null || data.descricao().isEmpty()) {
            throw new BusinessRuleException("A descrição é obrigatório");
        }
        if (data.preco() == null) {
            throw new BusinessRuleException("O preço é obrigatório");
        }
        if (data.tipoImovel() == null || data.tipoImovel().describeConstable().isEmpty()) {
            throw new BusinessRuleException("Escolha uma das opções [HOTEL - CASA - APARTAMENTO]");
        }
        if (data.endereco() == null || data.endereco().isEmpty()) {
            throw new BusinessRuleException("O endereço é obrigatório");
        }
        if (urlImage == null || urlImage.isEmpty()) {
            throw new BusinessRuleException("Adicione uma imagem ao anúncio!");
        }
        var anuncio = new Anuncio(data, urlImage, user);
        return repository.save(anuncio);
    }

    @Transactional
    public Anuncio updateAnuncio(@Valid DataUpdateAnuncio data, Long id, String urlImage, User user) {
        var anuncio = repository.getReferenceById(id);
        var userCheck = new DataGetUser(user);

        if (!Objects.equals(anuncio.getUsuario(), userCheck)) {
            throw new BusinessRuleException("O usuário não pode alterar o anúncio de outro.");
        }
        return anuncio.updateAnuncio(data, urlImage);
    }

    @Transactional
    public void unavailableAnuncio(Long id, User user) {
        var anuncio = repository.getReferenceById(id);
        var userCheck = new DataGetUser(user);

        if (!Objects.equals(anuncio.getUsuario(), userCheck)) {
            throw new BusinessRuleException("O usuário não pode desativar o anúncio de outro.");
        }

        anuncio.unavailable();
    }

    public List<Anuncio> getAnunciosByDisponivelTrue() {
        return repository.findByDisponivelTrue();
    }

    public Anuncio getAnuncioByDisponivelTrue(Long id) {
        return repository.findByIdAndDisponivelTrue(id);
    }

    public List<Anuncio> getMyAnuncios(Long id) {
        return repository.findByUsuarioId(id);
    }

    public List<Anuncio> getHoteisDisponiveis() {
        return repository.findHoteisDisponiveis();
    }

    public List<Anuncio> getCasasDisponiveis() {
        return repository.findCasasDisponiveis();
    }

    public List<Anuncio> getAparatamentosDisponiveis() {
        return repository.findAparatamentosDisponiveis();
    }
}
