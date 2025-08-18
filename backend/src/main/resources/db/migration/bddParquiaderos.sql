CREATE TABLE IF NOT EXISTS table_cliente (
  idCliente INT AUTO_INCREMENT PRIMARY KEY,
  Nombre_Cliente VARCHAR(45) NOT NULL,
  Apellido_Cliente VARCHAR(45) NOT NULL,
  razon_s_Cliente VARCHAR(200),
  ruc_Cliente VARCHAR(20),
  direccion_Cliente VARCHAR(100),
  telefono_Cliente VARCHAR(20),
  correo_Cliente VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS table_espacio (
  id_espacio INT AUTO_INCREMENT PRIMARY KEY,
  zona VARCHAR(50) NOT NULL,
  estado VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO table_espacio (zona, estado) VALUES ('A-01','libre'),('A-02','libre'),('A-03','ocupado')
ON DUPLICATE KEY UPDATE estado=VALUES(estado);
