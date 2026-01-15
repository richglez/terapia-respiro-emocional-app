-- mysql -u root -p

CREATE DATABASE IF NOT EXISTS terapia_respiro_emocional;


use terapia_respiro_emocional;

CREATE TABLE pacientes (
    id_paciente INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    expediente_paciente VARCHAR(255),
    nombre_paciente VARCHAR(255),
    apellido_paterno VARCHAR(255),
    apellido_materno VARCHAR(255),
    sexo_paciente CHAR(1),
    edad_paciente INT,
    ingreso_programa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    nacionalidad VARCHAR(255),
    domicilio VARCHAR(255),
    colonia VARCHAR(255),
    alcaldia_municipio VARCHAR(255),
    entidadFederativa VARCHAR(255),
    diagnostico VARCHAR(255),
    parentesco_con_cuidador VARCHAR(255),  -- Nueva columna
    tipoPrograma VARCHAR(255),
    observaciones VARCHAR(255),
    recomendaciones VARCHAR(255),
    id_cuidador_paciente INT UNSIGNED,
    FOREIGN KEY (id_cuidador_paciente) REFERENCES cuidadores(id_cuidador_paciente)
);


/* Un cuidador cuida a varios pacientes: En la tabla pacientes, el campo id_cuidador_paciente es una clave foránea que referencia a la tabla cuidadores. */

CREATE TABLE cuidadores(
    id_cuidador_paciente int unsigned auto_increment primary key,
    nombreCuidador varchar(255) not null,
    apPatCuidador varchar(255) not null,
    apMatCuidador varchar(255) not null,
    sexoCuidador char not null,
    edadCuidador int not null,
    telefonoCuidador varchar(30) not null,
    ingreso_programa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    num_suplencias INT NOT NULL DEFAULT 0
);


CREATE TABLE suplencias (
    id_suplencia INT unsigned PRIMARY KEY AUTO_INCREMENT,
    dia_suplencia VARCHAR(255),
    hora_inicial VARCHAR(255),
    hora_final VARCHAR(255),
    costoGuardia INT,
    particular VARCHAR(80),
    concurrencia_anual CHAR(12),
    id_cuidador_paciente INT unsigned,
    id_paciente INT unsigned,
    FOREIGN KEY (id_cuidador_paciente) REFERENCES cuidadores(id_cuidador_paciente),
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente)
);

/* Un cuidador tiene suplencias por cada paciente en específico: En la tabla suplencias, los campos id_cuidador_paciente e id_paciente son claves foráneas que referencian a las tablas cuidadores y pacientes respectivamente. */




show tables;

drop table pacientes;
drop table cuidadores;
drop table suplencias;

use terapia_respiro_emocional;
DESCRIBE pacientes;
DESCRIBE cuidadores;
DESCRIBE suplencias;


SELECT * FROM pacientes;
SELECT * FROM Cuidadores;
SELECT * FROM suplencias;





