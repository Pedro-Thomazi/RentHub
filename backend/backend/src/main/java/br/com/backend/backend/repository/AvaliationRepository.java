package br.com.backend.backend.repository;

import br.com.backend.backend.model.Avaliations.Avaliations;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvaliationRepository extends JpaRepository<Avaliations, Long> {
}
