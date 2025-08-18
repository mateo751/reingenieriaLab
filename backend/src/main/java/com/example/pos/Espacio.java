package com.example.pos;
import jakarta.persistence.*; import jakarta.validation.constraints.*; import lombok.*;
@Entity @Table(name="table_espacio") @Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Espacio {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="id_espacio") private Integer id;
  @NotBlank @Column(name="zona", nullable=false) private String zona;
  @NotBlank @Column(name="estado", nullable=false) private String estado; // libre | ocupado
}