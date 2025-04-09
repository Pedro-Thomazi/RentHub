package br.com.backend.backend.controller;

import br.com.backend.backend.exception.BusinessRuleException;
import br.com.backend.backend.model.Anuncio.Anuncio;
import br.com.backend.backend.model.Anuncio.DataCreateAnuncio;
import br.com.backend.backend.model.Anuncio.DataGetAnuncio;
import br.com.backend.backend.model.Anuncio.DataUpdateAnuncio;
import br.com.backend.backend.model.User.DataGetUser;
import br.com.backend.backend.model.User.User;
import br.com.backend.backend.service.AnuncioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:5173")
public class AnuncioController {
    private final AnuncioService anuncioService;

    public AnuncioController(AnuncioService anuncioService) {
        this.anuncioService = anuncioService;
    }

    @GetMapping("/anuncios")
    public ResponseEntity getAnuncios() {
        List<Anuncio> anuncios = anuncioService.getAnunciosByDisponivelTrue();
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
        System.out.println(res);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/hoteis")
    public ResponseEntity getHotels() {
        List<Anuncio> anuncios = anuncioService.getHoteisDisponiveis();
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
        System.out.println(res);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/casas")
    public ResponseEntity getHomes() {
        List<Anuncio> anuncios = anuncioService.getCasasDisponiveis();
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
        System.out.println(res);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/apartamentos")
    public ResponseEntity getApartment() {
        List<Anuncio> anuncios = anuncioService.getAparatamentosDisponiveis();
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
        System.out.println(res);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/anuncios/anuncio/{id}")
    public ResponseEntity getAnuncio(@PathVariable Long id) {
        Anuncio anuncio = anuncioService.getAnuncioByDisponivelTrue(id);
        return ResponseEntity.ok(new DataGetAnuncio(anuncio));
    }

    @GetMapping("/meus-anuncios")
    public ResponseEntity getMyAnuncios(@AuthenticationPrincipal User user) {
        List<Anuncio> anuncios = anuncioService.getMyAnuncios(user.getId());
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
        return ResponseEntity.ok(res);
    }

    @PostMapping("/create-anuncio")
    public ResponseEntity createAnuncio(@Valid
                                        @RequestBody DataCreateAnuncio data,
                                        @AuthenticationPrincipal User user) {
        try {
//            String uploadDir = "uploads/";
//            Files.createDirectories(Paths.get(uploadDir));
//            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
//            Path filePath = Paths.get(uploadDir + fileName);
//            Files.write(filePath, file.getBytes());

            var anuncio = anuncioService.create(data, user);
            return ResponseEntity.ok(new DataGetAnuncio(anuncio));
        } catch (Exception e) {
            System.out.println("Erro na criação do Anúncio: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro na criação do Anúncio");
        }
    }

    @PutMapping("/update-anuncio/{id}")
    public ResponseEntity updateAnuncio(@Valid @RequestBody DataUpdateAnuncio data,
                                        @PathVariable Long id,
                                        @AuthenticationPrincipal User user) {
        try {
//            String uploadDir = "uploads/";
//            Files.createDirectories(Paths.get(uploadDir));
//            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
//            Path filePath = Paths.get(uploadDir + fileName);
//            Files.write(filePath, file.getBytes());

            var anuncio = anuncioService.updateAnuncio(data, id, user);
            return ResponseEntity.ok(new DataGetAnuncio(anuncio));
        } catch (BusinessRuleException e) {
            System.out.println("Erro na atualização do Anúncio: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/unavailable-anuncio/{id}")
    public ResponseEntity unavailableAnuncio(@PathVariable Long id, @AuthenticationPrincipal User user) {
        anuncioService.unavailableAnuncio(id, user);
        return ResponseEntity.ok("Anúncio desativado!");
    }
}