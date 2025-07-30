package com.mangastore.miappweb.controller;

import com.mangastore.miappweb.model.Manga;
import com.mangastore.miappweb.repository.MangaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mangas")
@CrossOrigin(origins = "*")
public class MangaController {

    @Autowired
    private MangaRepository mangaRepository;


    // Obtener todos los mangas
    @GetMapping
    public List<Manga> listarMangas() {
        return mangaRepository.findAll();
    }

    // Obtener un manga por ID
    @GetMapping("/{id}")
    public ResponseEntity<Manga> obtenerMangaPorId(@PathVariable Long id) {
        Optional<Manga> manga = mangaRepository.findById(id);
        return manga.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo manga
    @PostMapping
    public Manga crearManga(@RequestBody Manga manga) {
        return mangaRepository.save(manga);
    }

    // Actualizar manga existente
    @PutMapping("/{id}")
    public ResponseEntity<Manga> actualizarManga(@PathVariable Long id, @RequestBody Manga datosActualizados) {
        Optional<Manga> mangaExistente = mangaRepository.findById(id);

        if (mangaExistente.isPresent()) {
            Manga manga = mangaExistente.get();
            manga.setTitulo(datosActualizados.getTitulo());
            manga.setAutor(datosActualizados.getAutor());
            manga.setGenero(datosActualizados.getGenero());
            manga.setPrecio(datosActualizados.getPrecio());
            return ResponseEntity.ok(mangaRepository.save(manga));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar manga
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarManga(@PathVariable Long id) {
        if (mangaRepository.existsById(id)) {
            mangaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
