package com.example.pos;
import org.springframework.web.bind.annotation.*; import org.springframework.http.*; import org.springframework.beans.factory.annotation.Autowired; import java.util.*;
@RestController @RequestMapping("/api/espacios") @CrossOrigin
public class EspacioController {
  @Autowired private EspacioRepo repo;
  @GetMapping public List<Espacio> listar(@RequestParam(required=false) String estado){
    if(estado==null) return repo.findAll(); return repo.findByEstadoIgnoreCase(estado); }
  @PostMapping @ResponseStatus(HttpStatus.CREATED) public Espacio crear(@RequestBody Espacio e){ return repo.save(e); }
  @PutMapping("/{id}/ocupar") public Espacio ocupar(@PathVariable Integer id){
    Espacio e = repo.findById(id).orElseThrow(); e.setEstado("ocupado"); return repo.save(e); }
  @PutMapping("/{id}/liberar") public Espacio liberar(@PathVariable Integer id){
    Espacio e = repo.findById(id).orElseThrow(); e.setEstado("libre"); return repo.save(e); }
  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void eliminar(@PathVariable Integer id){ repo.deleteById(id); }
}