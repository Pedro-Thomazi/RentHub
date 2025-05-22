package br.com.backend.backend.repository;

import br.com.backend.backend.model.Imagens.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRepository extends JpaRepository<Images, Long> {


    @Query("SELECT i FROM Images i WHERE i.anuncio.id = :id")
    List<Images> getImagesByAnuncioId(Long id);
}
