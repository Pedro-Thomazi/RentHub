package br.com.backend.backend.repository;

import br.com.backend.backend.model.Anuncio.Anuncio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.util.List;

public interface AnuncioRepository extends JpaRepository<Anuncio, Long> {
    List<Anuncio> findByDisponivelTrue();

    Anuncio findByIdAndDisponivelTrue(Long id);

    List<Anuncio> findByUsuarioId(Long id);

//  Querys para Hotel
    @Query("SELECT a FROM Anuncio a WHERE a.tipoImovel = 'HOTEL' AND a.disponivel = true")
    List<Anuncio> findHoteisDisponiveis();
    @Query("SELECT a FROM Anuncio a WHERE a.tipoImovel = 'HOTEL' AND a.disponivel = true ORDER BY a.avaliacao DESC LIMIT 2")
    List<Anuncio> findTwoBestsHoteisDisponiveis();

//  Querys para Casa
    @Query("SELECT a FROM Anuncio a WHERE a.tipoImovel = 'CASA' AND a.disponivel = true")
    List<Anuncio> findCasasDisponiveis();
    @Query("SELECT a FROM Anuncio a WHERE a.tipoImovel = 'CASA' AND a.disponivel = true ORDER BY a.avaliacao DESC LIMIT 2")
    List<Anuncio> findTwoBestsCasasDisponiveis();


//  Querys para Apartamento
    @Query("SELECT a FROM Anuncio a WHERE a.tipoImovel = 'APARTAMENTO' AND a.disponivel = true")
    List<Anuncio> findAparatamentosDisponiveis();
    @Query("SELECT a FROM Anuncio a WHERE a.tipoImovel = 'APARTAMENTO' AND a.disponivel = true ORDER BY a.avaliacao DESC LIMIT 2")
    List<Anuncio> findTwoBestsAparatamentosDisponiveis();

//  Query para pegar os quatro mais bem avaliados
    @Query(value = "SELECT a FROM Anuncio a WHERE a.disponivel = true ORDER BY a.avaliacao DESC LIMIT 4")
    List<Anuncio> findTop4ByDisponivelTrueOrderByAvaliacaoDesc();

    List<Anuncio> findByTituloContainingIgnoreCaseOrDescricaoContainingIgnoreCaseOrCidadeContainingIgnoreCase(String titulo, String descricao, String cidade);
}
