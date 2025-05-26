package br.com.backend.backend.service;

import br.com.backend.backend.exception.BusinessRuleException;
import br.com.backend.backend.model.Anuncio.Anuncio;
import br.com.backend.backend.model.Anuncio.DataCreateAnuncio;
import br.com.backend.backend.model.Anuncio.DataUpdateAnuncio;
import br.com.backend.backend.model.Imagens.Images;
import br.com.backend.backend.model.User.DataGetUser;
import br.com.backend.backend.model.User.User;
import br.com.backend.backend.repository.AnuncioRepository;
import br.com.backend.backend.repository.ImageRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;
import java.util.Objects;

@Service
public class AnuncioService {
    private final AnuncioRepository repository;
    private final ImageRepository imageRepository;

    public AnuncioService(AnuncioRepository repository, ImageRepository imageRepository) {
        this.repository = repository;
        this.imageRepository = imageRepository;
    }

    @Transactional
    public Anuncio create(DataCreateAnuncio data, List<String> images, User user) {
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
        if (images == null) {
            throw new BusinessRuleException("Adicione uma imagem ao anúncio!");
        }
        if (images.size() > 5) {
            throw new BusinessRuleException("O número máximo de imagens por anúncio é [5]");
        }
        System.out.println("Print das imagens no create:");
        images.forEach(System.out::println);

        var anuncio = new Anuncio(data, user);
        anuncio = repository.save(anuncio);
        System.out.println("Salvei a porra do anuncio sem a porra da imagem");
        for (String nameImg : images) {
            Images image = new Images(nameImg, anuncio);
            imageRepository.save(image);
            System.out.println("Salvei as porras das images");
        }

        anuncio.setPrincipalImage(images.getFirst());
        System.out.println("Fim dessa porra!");
        return anuncio;
    }

    @Transactional
    public Anuncio updateAnuncio(@Valid DataUpdateAnuncio data, Long id, List<String> images, User user) {
        var anuncio = repository.getReferenceById(id);
        var userCheck = new DataGetUser(user);

        if (!Objects.equals(anuncio.getUsuario(), userCheck)) {
            throw new BusinessRuleException("O usuário não pode alterar o anúncio de outro.");
        }

        images.forEach(System.out::println);

        System.out.println();
        for (String nameImg : images) {
            Images image = new Images(nameImg, anuncio);
            imageRepository.save(image);
        }
        anuncio.setPrincipalImage(images.getFirst());
        return anuncio.updateAnuncio(data);
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

    public List<Anuncio> getTopFourAnunciosByDisponivelTrue() {
        return repository.findTop4ByDisponivelTrueOrderByAvaliacaoDesc();
    }

    public List<Anuncio> getBestsHoteisDisponiveis() {
        return repository.findTwoBestsHoteisDisponiveis();
    }

    public List<Anuncio> getBestsCasasDisponiveis() {
        return repository.findTwoBestsCasasDisponiveis();
    }

    public List<Anuncio> getBestsAparatamentosDisponiveis() {
        return repository.findTwoBestsAparatamentosDisponiveis();
    }
}
