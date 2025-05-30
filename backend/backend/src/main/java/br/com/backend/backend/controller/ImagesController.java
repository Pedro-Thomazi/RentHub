package br.com.backend.backend.controller;

import br.com.backend.backend.model.Anuncio.DataGetAnuncio;
import br.com.backend.backend.model.Imagens.DataGetImages;
import br.com.backend.backend.model.Imagens.Images;
import br.com.backend.backend.repository.ImageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/images")
public class ImagesController {
    private final ImageRepository repository;

    public ImagesController(ImageRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{id}")
    public ResponseEntity getImagesAnuncio(@PathVariable Long id) {
        List<Images> images = repository.getImagesByAnuncioId(id);
        System.out.println("Pegando imagens");
        List<DataGetImages> res = images.stream().map(DataGetImages::new).toList();
        return ResponseEntity.ok(res);
    }
}
