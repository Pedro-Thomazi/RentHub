package br.com.backend.backend.repository;

import br.com.backend.backend.model.Imagens.Images;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Images, Long> {
}
