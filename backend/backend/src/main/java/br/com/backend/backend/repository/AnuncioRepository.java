package br.com.backend.backend.repository;

import br.com.backend.backend.model.Anuncio.Anuncio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnuncioRepository extends JpaRepository<Anuncio, Long> {
    List<Anuncio> findByDisponivelTrue();

    Anuncio findByIdAndDisponivelTrue(Long id);

    List<Anuncio> findByUsuarioId(Long id);

    @Query("SELECT a FROM Anuncio a WHERE a.tipoImovel = 'HOTEL' AND a.disponivel = true")
    List<Anuncio> findHoteisDisponiveis();

    @Query("SELECT a FROM Anuncio a WHERE a.tipoImovel = 'CASA' AND a.disponivel = true")
    List<Anuncio> findCasasDisponiveis();

    @Query("SELECT a FROM Anuncio a WHERE a.tipoImovel = 'APARTAMENTO' AND a.disponivel = true")
    List<Anuncio> findAparatamentosDisponiveis();
}
