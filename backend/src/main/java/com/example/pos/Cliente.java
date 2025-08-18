package com.example.pos;
import jakarta.persistence.*; import jakarta.validation.constraints.*; import lombok.*;
@Entity @Table(name="table_cliente") @Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Cliente {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="idCliente") private Integer id;
  @NotBlank @Size(max=45) @Column(name="Nombre_Cliente", nullable=false, length=45) private String nombres;
  @NotBlank @Size(max=45) @Column(name="Apellido_Cliente", nullable=false, length=45) private String apellidos;
  @Size(max=200) @Column(name="razon_s_Cliente", length=200) private String razonSocial;
  @Size(max=20) @Column(name="ruc_Cliente", length=20) private String ruc;
  @Size(max=100) @Column(name="direccion_Cliente", length=100) private String direccion;
  @Size(max=20) @Column(name="telefono_Cliente", length=20) private String telefono;
  @Email @Size(max=50) @Column(name="correo_Cliente", length=50) private String correo;
}