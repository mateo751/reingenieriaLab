package com.example.pos;
import org.springframework.data.jpa.repository.*; import java.util.*; 
public interface EspacioRepo extends JpaRepository<Espacio,Integer> {
  List<Espacio> findByEstadoIgnoreCase(String estado);
}