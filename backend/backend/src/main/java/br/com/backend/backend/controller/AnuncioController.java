package br.com.backend.backend.controller;

import br.com.backend.backend.model.Anuncio.Anuncio;
import br.com.backend.backend.model.Anuncio.DataCreateAnuncio;
import br.com.backend.backend.model.Anuncio.DataGetAnuncio;
import br.com.backend.backend.model.Anuncio.DataUpdateAnuncio;
import br.com.backend.backend.model.Imagens.Images;
import br.com.backend.backend.model.User.User;
import br.com.backend.backend.service.AnuncioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:5173")
public class AnuncioController {
    private final AnuncioService anuncioService;
    private static String pathImages = "uploads/images/";

    public AnuncioController(AnuncioService anuncioService) {
        this.anuncioService = anuncioService;
    }

    @GetMapping("/anuncios")
    public ResponseEntity getAnuncios() {
        List<Anuncio> anuncios = anuncioService.getAnunciosByDisponivelTrue();
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/top-anuncios")
    public ResponseEntity getTopFourAnuncios() {
        List<Anuncio> anuncios = anuncioService.getTopFourAnunciosByDisponivelTrue();
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/hoteis")
    public ResponseEntity getHotels() {
        List<Anuncio> anuncios = anuncioService.getHoteisDisponiveis();
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/hoteis/bests")
    public ResponseEntity getBestsHotels() {
        List<Anuncio> anuncios = anuncioService.getBestsHoteisDisponiveis();
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/casas")
    public ResponseEntity getHomes() {
        List<Anuncio> anuncios = anuncioService.getCasasDisponiveis();
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/casas/bests")
    public ResponseEntity getBestsHomes() {
        List<Anuncio> anuncios = anuncioService.getBestsCasasDisponiveis();
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/apartamentos")
    public ResponseEntity getApartment() {
        List<Anuncio> anuncios = anuncioService.getAparatamentosDisponiveis();
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/apartamentos/bests")
    public ResponseEntity getBestsApartment() {
        List<Anuncio> anuncios = anuncioService.getBestsAparatamentosDisponiveis();
        List<DataGetAnuncio> res = anuncios.stream().map(DataGetAnuncio::new).toList();
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
                                        @ModelAttribute DataCreateAnuncio data,
                                        @RequestParam("urlImage") MultipartFile[] files,
                                        @AuthenticationPrincipal User user) {
        try {
            List<String> images = new ArrayList<>();

            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    byte[] bytes = file.getBytes();
                    String nameImage = System.currentTimeMillis() + file.getOriginalFilename();
                    Path path = Paths.get(pathImages + String.valueOf(nameImage));
                    Files.write(path, bytes);

                    images.add(nameImage);
                }
            }

            var anuncio = anuncioService.create(data, images, user);
            return ResponseEntity.ok(new DataGetAnuncio(anuncio));
        } catch (Exception e) {
            System.out.println("Erro na criação do Anúncio: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro na criação do Anúncio");
        }
    }

    @PutMapping("/update-anuncio/{id}")
    public ResponseEntity updateAnuncio(@Valid @ModelAttribute DataUpdateAnuncio data,
                                        @RequestParam("urlImage") MultipartFile[] files,
                                        @PathVariable Long id,
                                        @AuthenticationPrincipal User user) {
        try {
            List<String> images = new ArrayList<>();

            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    byte[] bytes = file.getBytes();
                    String nameImage = System.currentTimeMillis() + file.getOriginalFilename();
                    Path path = Paths.get(pathImages + String.valueOf(nameImage));
                    Files.write(path, bytes);

                    images.add(nameImage);
                }
            }

            var anuncio = anuncioService.updateAnuncio(data, id, images, user);
            return ResponseEntity.ok(new DataGetAnuncio(anuncio));
        } catch (Exception e) {
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