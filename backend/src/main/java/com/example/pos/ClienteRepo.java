package com.example.pos;
import org.springframework.data.jpa.repository.*; import org.springframework.data.repository.query.Param; import java.util.List;
public interface ClienteRepo extends JpaRepository<Cliente,Integer> {
  @Query("select c from Cliente c where lower(c.nombres) like lower(concat('%',:q,'%')) or lower(c.apellidos) like lower(concat('%',:q,'%')) or lower(c.ruc) like lower(concat('%',:q,'%'))")
  List<Cliente> buscar(@Param("q") String q);
}