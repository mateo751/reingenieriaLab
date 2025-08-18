package com.example.pos;
import org.springframework.web.bind.annotation.*; import org.springframework.http.*; import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid; import org.springframework.data.domain.*; import java.util.*;
@RestController @RequestMapping("/api/clientes") @CrossOrigin
public class ClienteController {
  @Autowired private ClienteRepo repo;
  @GetMapping public Page<Cliente> listar(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue="10") int size){
    return repo.findAll(PageRequest.of(page, size)); }
  @GetMapping("/buscar") public List<Cliente> buscar(@RequestParam String q){ return repo.buscar(q); }
  @PostMapping @ResponseStatus(HttpStatus.CREATED) public Cliente crear(@Valid @RequestBody Cliente c){ return repo.save(c); }
  @PutMapping("/{id}") public Cliente actualizar(@PathVariable Integer id, @Valid @RequestBody Cliente c){
    Cliente db = repo.findById(id).orElseThrow();
    db.setNombres(c.getNombres()); db.setApellidos(c.getApellidos()); db.setRazonSocial(c.getRazonSocial());
    db.setRuc(c.getRuc()); db.setDireccion(c.getDireccion()); db.setTelefono(c.getTelefono()); db.setCorreo(c.getCorreo());
    return repo.save(db); }
  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void eliminar(@PathVariable Integer id){ repo.deleteById(id); }
}