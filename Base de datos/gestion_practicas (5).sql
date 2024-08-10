-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-08-2024 a las 03:19:39
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Base de datos: `gestion_practicas`

CREATE TABLE `administrador` (
  `ID_administrador` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Tipo_usuario` enum('administrador') NOT NULL,
  `Usuario` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `administrador` (`ID_administrador`, `Nombre`, `Password`, `Tipo_usuario`, `Usuario`) VALUES
(1, 'Administrador', '$2b$12$/AgMoKRDMwtBnIC8djd5vO2FtDWoA620jEzSWyVfIwg/xiTsrM2W.', 'administrador', 'administrador@uni.admin.co');

CREATE TABLE `busca_ofertas` (
  `estudiante_ID` int(11) NOT NULL,
  `ofertas_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `empresa` (
  `ID_empresa` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Tipo_usuario` enum('empresa') NOT NULL,
  `Usuario` varchar(100) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `empresa` (`ID_empresa`, `Nombre`, `Password`, `Tipo_usuario`, `Usuario`, `fecha_creacion`) VALUES
(5, 'Coca Cola', '$2b$12$/JbKbXspZl7LaQySQLEeRO36txgYBTum00BLVByFUJhA5j0KcL2ua', 'empresa', 'cocacola@uni.empresa.co', '2024-08-07 23:02:59'),
(6, 'Apple ', '$2b$12$C4XTBv4v5KMg9NEILdwceOwMiHfvNIqBCbRljNbqH5DetIj3XiAPu', 'empresa', 'apple@uni.empresa.co', '2024-08-07 23:03:20'),
(7, 'Funeraria la Luz', '$2b$12$u40Ot5tnzC8TXvy1l98iouLKFWOBYEDVPexEyEsIs3tTGzZwzaLqO', 'empresa', 'funerarialaluz@uni.empresa.co', '2024-08-07 23:06:34'),
(8, 'Samsung', '$2b$12$ZPs7M8BSZjuHOttRSKbi0u/lK0VMsfXQGFRt25I3FCWgZikn3RVy6', 'empresa', 'samsung@uni.empresa.co', '2024-08-08 17:27:48');

CREATE TABLE `estudiante` (
  `ID_estudiante` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Tipo_usuario` enum('estudiante') NOT NULL,
  `Usuario` varchar(100) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `estudiante` (`ID_estudiante`, `Nombre`, `Password`, `Tipo_usuario`, `Usuario`, `fecha_creacion`) VALUES
(11, 'randy lopez', '$2b$12$A0Dr7EM70VQeD883kowx2./wlb0aDycCbiwDoolazEAY0YgYyWzFy', 'estudiante', 'randylopez@uni.edu.co', '2024-08-07 22:54:42'),
(12, 'Pedro Gomez', '$2b$12$XULGBkPRaAMYpyB7HJ9JXecFkZnK5od5OXzlZ3F9DzOHe.KXEBC46', 'estudiante', 'pedrogomez@uni.edu.co', '2024-08-07 23:07:05'),
(13, 'Diego Padila', '$2b$12$R6onTdR.mW7UPIsMS0XUNeYWr5iLb1N4047cJF9U.xWt9HOVsIv/y', 'estudiante', 'diegopadila@uni.edu.co', '2024-08-07 23:07:40'),
(14, 'Andrea Ariza', '$2b$12$9CgPJBuEY6TngEO8wKUdSuSc55dzfR4XeAHX.uOXP0qkmwbuDDjCa', 'estudiante', 'andreaariza@uni.edu.co', '2024-08-08 17:41:03');

CREATE TABLE `formulario_hoja_de_vida` (
  `id` int(11) NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `edad` int(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `genero` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `carne_conducir` varchar(50) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `formaciones` text DEFAULT NULL,
  `experiencias` text DEFAULT NULL,
  `competencias` text DEFAULT NULL,
  `idiomas` text DEFAULT NULL,
  `referencias` text DEFAULT NULL,
  `pasatiempos` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `informacion_empresa` (
  `id` int(11) NOT NULL,
  `forma_juridica` text NOT NULL,
  `nombre_empresa` varchar(255) NOT NULL,
  `nit` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `informacion_empresa` (`id`, `forma_juridica`, `nombre_empresa`, `nit`, `descripcion`, `fecha_registro`) VALUES
(1, 'Sociedad por Acciones Simplificada (S.A.S.)', 'Coca cola', '847812748374', 'coca cola la mas sabrosa ', '2024-07-20 18:49:09'),
(2, 'Sociedad Colectiva', 'Funeraria la luz', '74094857918', 'somos una funeraria ', '2024-07-20 18:52:48'),
(3, 'Asociaciones sin ánimo de lucro', 'niños por la calle', '38591749716', 'hogar para los niños ', '2024-07-20 18:55:17'),
(4, 'Sociedad por Acciones Simplificada (S.A.S.)', 'kokorico', '40179832740', 'pollos', '2024-07-21 01:39:27'),
(5, 'Comunidad de Bienes', 'samsung ', '08510810248419281241', 'celulares', '2024-08-08 17:50:28');

CREATE TABLE `modificar_enpresa` (
  `empresa_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `modifica_estudiante` (
  `admin_ID` int(11) NOT NULL,
  `estudiante_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `ofertas_practicas` (
  `id` int(11) NOT NULL,
  `titulo_puesto` varchar(255) NOT NULL,
  `descripcion_empresa` text NOT NULL,
  `responsabilidades` text NOT NULL,
  `requisitos` text NOT NULL,
  `beneficios` text NOT NULL,
  `ubicacion` varchar(255) NOT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `ofertas_practicas` (`id`, `titulo_puesto`, `descripcion_empresa`, `responsabilidades`, `requisitos`, `beneficios`, `ubicacion`, `fecha_publicacion`) VALUES
(1, 'programador', 'funeraria la luz', 'programar', 'Tecnico profesional en Mantenimiento de Sistemas Informaticos', 'paga', 'barranquilla', '2024-08-21 12:36:45'),
(2, 'base de datos', 'cocacola', 'mantener la base de datos ', 'Tecnologo en Gestion de Sistemas Informaticos', 'buena paga ', 'Quilla', '2024-07-21 12:38:39'),
(3, 'electrico', 'tecnoglas', 'instalar ', 'Ingenieria Mecatronica', 'buena paga', 'soledad', '2024-07-21 12:39:43'),
(4, 'mecanico', 'tecno glas', 'arreglar ', 'Ingenieria Mecatronica', 'pagan', 'soledad', '2024-07-21 13:05:46'),
(5, 'Asistente / Coordinador de Prevención de Riesgos Laborales', 'samsung', 'observadora ', 'Tecnico profesional en Seguridad y Salud en el Trabajo, Tecnologo en gestion de Seguridad y Salud en el Trabajo', 'paga buena, arl', 'cartagena', '2024-08-08 18:03:21');

CREATE TABLE `publicar` (
  `empresa_id` int(11) NOT NULL,
  `ofertas_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tiene` (
  `empresa_ID` int(11) NOT NULL,
  `infoEmpresa_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tiene_hv` (
  `estudiante_ID` int(11) NOT NULL,
  `hojaVida_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `visualizar` (
  `id_estudiante` int(11) NOT NULL,
  `id_informacion_empresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `administrador`
  ADD PRIMARY KEY (`ID_administrador`);

ALTER TABLE `busca_ofertas`
  ADD PRIMARY KEY (`estudiante_ID`,`ofertas_ID`),
  ADD KEY `ofertas_ID` (`ofertas_ID`);

ALTER TABLE `empresa`
  ADD PRIMARY KEY (`ID_empresa`);

ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`ID_estudiante`);

ALTER TABLE `formulario_hoja_de_vida`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `informacion_empresa`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `modificar_enpresa`
  ADD PRIMARY KEY (`empresa_id`,`admin_id`),
  ADD KEY `admin_id` (`admin_id`);

ALTER TABLE `modifica_estudiante`
  ADD PRIMARY KEY (`admin_ID`,`estudiante_ID`),
  ADD KEY `estudiante_ID` (`estudiante_ID`);

ALTER TABLE `ofertas_practicas`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `publicar`
  ADD PRIMARY KEY (`empresa_id`,`ofertas_id`),
  ADD KEY `ofertas_id` (`ofertas_id`);

ALTER TABLE `tiene`
  ADD PRIMARY KEY (`empresa_ID`,`infoEmpresa_ID`),
  ADD KEY `infoEmpresa_ID` (`infoEmpresa_ID`);

ALTER TABLE `tiene_hv`
  ADD PRIMARY KEY (`estudiante_ID`,`hojaVida_ID`),
  ADD KEY `hojaVida_ID` (`hojaVida_ID`);

ALTER TABLE `visualizar`
  ADD PRIMARY KEY (`id_estudiante`,`id_informacion_empresa`),
  ADD KEY `id_informacion_empresa` (`id_informacion_empresa`);

ALTER TABLE `administrador`
  MODIFY `ID_administrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `empresa`
  MODIFY `ID_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `estudiante`
  MODIFY `ID_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `formulario_hoja_de_vida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `informacion_empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `ofertas_practicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `busca_ofertas`
  ADD CONSTRAINT `busca_ofertas_ibfk_1` FOREIGN KEY (`estudiante_ID`) REFERENCES `estudiante` (`ID_estudiante`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `busca_ofertas_ibfk_2` FOREIGN KEY (`ofertas_ID`) REFERENCES `ofertas_practicas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `modificar_enpresa`
  ADD CONSTRAINT `modificar_enpresa_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `administrador` (`ID_administrador`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `modificar_enpresa_ibfk_2` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`ID_empresa`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `modifica_estudiante`
  ADD CONSTRAINT `modifica_estudiante_ibfk_1` FOREIGN KEY (`admin_ID`) REFERENCES `administrador` (`ID_administrador`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `modifica_estudiante_ibfk_2` FOREIGN KEY (`estudiante_ID`) REFERENCES `estudiante` (`ID_estudiante`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `publicar`
  ADD CONSTRAINT `publicar_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`ID_empresa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publicar_ibfk_2` FOREIGN KEY (`ofertas_id`) REFERENCES `ofertas_practicas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tiene`
  ADD CONSTRAINT `tiene_ibfk_1` FOREIGN KEY (`empresa_ID`) REFERENCES `empresa` (`ID_empresa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tiene_ibfk_2` FOREIGN KEY (`infoEmpresa_ID`) REFERENCES `informacion_empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tiene_hv`
  ADD CONSTRAINT `tiene_hv_ibfk_1` FOREIGN KEY (`estudiante_ID`) REFERENCES `estudiante` (`ID_estudiante`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tiene_hv_ibfk_2` FOREIGN KEY (`hojaVida_ID`) REFERENCES `formulario_hoja_de_vida` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `visualizar`
  ADD CONSTRAINT `visualizar_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`ID_estudiante`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `visualizar_ibfk_2` FOREIGN KEY (`id_informacion_empresa`) REFERENCES `informacion_empresa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
