package br.com.backend.backend.controller;

import br.com.backend.backend.model.Authentication.DataToken;
import br.com.backend.backend.model.Avaliations.Avaliations;
import br.com.backend.backend.model.Avaliations.DataAvaliation;
import br.com.backend.backend.model.Avaliations.DataGetAvaliation;
import br.com.backend.backend.model.User.User;
import br.com.backend.backend.service.AvaliationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/avaliar")
public class AvaliationsController {
    private final AvaliationService service;

    public AvaliationsController(AvaliationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity avaliar(@Valid @RequestBody DataAvaliation data, @AuthenticationPrincipal User user) {

//        -------------------- Lembrar de adicionar o id do anúncio --------------------
        try {
            var avaliation = service.toAssess(data, user);
            System.out.println("Criando avaliação: " + avaliation);
            return ResponseEntity.ok(new DataGetAvaliation(avaliation));
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Erro ao adicionar avaliação: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
