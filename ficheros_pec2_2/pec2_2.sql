CREATE DATABASE pec2_2;

-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-10-2017 a las 20:23:04
-- Versión del servidor: 10.1.25-MariaDB
-- Versión de PHP: 5.6.31
USE pec2_2;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pedidos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `CodCat` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`CodCat`, `Nombre`, `Descripcion`) VALUES
(1, 'Comida', 'Platos e ingredientes'),
(2, 'Bedidas sin', 'Bebidas sin alcohol'),
(3, 'Bebidas con', 'Bebidas con alcohol');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `CodPed` int(11) NOT NULL,
  `Fecha` datetime NOT NULL,
  `Enviado` int(11) NOT NULL,
  `Restaurante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`CodPed`, `Fecha`, `Enviado`, `Restaurante`) VALUES
(1, '2023-05-06 04:29:21', 0, 1),
(2, '2023-05-04 06:41:30', 0, 2),
(3, '2023-05-03 07:15:40', 0, 1),
(4, '2023-05-01 07:16:15', 0, 2),
(5, '2023-05-02 07:16:35', 0, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidosproductos`
--

CREATE TABLE `pedidosproductos` (
  `CodPedProd` int(11) NOT NULL,
  `CodPed` int(11) NOT NULL,
  `CodProd` int(11) NOT NULL,
  `Unidades` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pedidosproductos`
--

INSERT INTO `pedidosproductos` (`CodPedProd`, `CodPed`, `CodProd`, `Unidades`) VALUES
(1, 1, 6, 4),
(2, 1, 5, 1),
(3, 1, 4, 1),
(4, 1, 3, 4),
(5, 2, 2, 16),
(6, 3, 1, 1),
(7, 3, 2, 1),
(8, 3, 3, 1),
(9, 3, 4, 1),
(10, 3, 5, 2),
(11, 4, 5, 27),
(12, 4, 4, 19),
(13, 4, 3, 3),
(14, 5, 6, 36),
(15, 5, 2, 12),
(16, 5, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envios`
--

CREATE TABLE `envios` (
  `CodEnv` int(11) NOT NULL,
  `CodPed` int(11) NOT NULL,
  `FechaEnv` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pedidosproductos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `CodProd` int(11) NOT NULL,
  `Nombre` varchar(45) DEFAULT NULL,
  `Descripcion` varchar(90) NOT NULL,
  `Peso` float NOT NULL,
  `Stock` int(11) NOT NULL,
  `CodCat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`CodProd`, `Nombre`, `Descripcion`, `Peso`, `Stock`, `CodCat`) VALUES
(1, 'Harina', '8 paquetes de 1kg de harina cada uno', 8, 100, 1),
(2, 'Azúcar', '20 paquetes de 1kg cada uno', 20, 3, 1),
(3, 'Agua 0.5', '100 botellas de 0.5 litros cada una', 51, 100, 2),
(4, 'Agua 1.5', '20 botellas de 1.5 litros cada una', 31, 50, 2),
(5, 'Cerveza Alhambra tercio', '24 botellas de 33cl', 10, 0, 3),
(6, 'Vino tinto Rioja 0.75', '6 botellas de 0.75 ', 5.5, 10, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurantes`
--

CREATE TABLE `restaurantes` (
  `CodRes` int(11) NOT NULL,
  `Correo` varchar(90) NOT NULL,
  `Clave` varchar(45) NOT NULL,
  `Pais` varchar(45) NOT NULL,
  `CP` int(5) DEFAULT NULL,
  `Ciudad` varchar(45) NOT NULL,
  `Direccion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `restaurantes`
--

INSERT INTO `restaurantes` (`CodRes`, `Correo`, `Clave`, `Pais`, `CP`, `Ciudad`, `Direccion`) VALUES
(1, 'madrid1@empresa.com', '$2y$10$fG4EKUiaUiYkGWxuHFCrEu7B0MTlg0oyFkume17EUqsS8lV98AIoS', 'España', 28002, 'Madrid', 'C/ Padre  Claret, 8'),
(2, 'cadiz1@empresa.com', '$2y$10$fG4EKUiaUiYkGWxuHFCrEu7B0MTlg0oyFkume17EUqsS8lV98AIoS', 'España', 11001, 'Cádiz', 'C/ Portales, 2 ');

-- --------------------------------------------------------

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`CodCat`),
  ADD UNIQUE KEY `UN_NOM_CAT` (`Nombre`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`CodPed`),
  ADD KEY `Restaurante` (`Restaurante`);

--
-- Indices de la tabla `pedidosproductos`
--
ALTER TABLE `pedidosproductos`
  ADD PRIMARY KEY (`CodPedProd`),
  ADD KEY `CodPed` (`CodPed`),
  ADD KEY `CodProd` (`CodProd`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`CodProd`);

--
-- Indices de la tabla `restaurantes`
--
ALTER TABLE `restaurantes`
  ADD PRIMARY KEY (`CodRes`),
  ADD UNIQUE KEY `UN_RES_COR` (`Correo`);

--
-- Indices de la tabla `envios`
--
ALTER TABLE `envios`
  ADD PRIMARY KEY (`CodEnv`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `CodCat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `CodPed` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `pedidosproductos`
--
ALTER TABLE `pedidosproductos`
  MODIFY `CodPedProd` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `CodProd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `restaurantes`
--
ALTER TABLE `restaurantes`
  MODIFY `CodRes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `restaurantes`
--
ALTER TABLE `envios`
  MODIFY `CodEnv` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`CodCat`) REFERENCES `categorias` (`CodCat`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`Restaurante`) REFERENCES `restaurantes` (`CodRes`);

--
-- Filtros para la tabla `pedidosproductos`
--
ALTER TABLE `pedidosproductos`
  ADD CONSTRAINT `pedidosproductos_ibfk_1` FOREIGN KEY (`CodPed`) REFERENCES `pedidos` (`CodPed`),
  ADD CONSTRAINT `pedidosproductos_ibfk_2` FOREIGN KEY (`CodProd`) REFERENCES `productos` (`CodProd`);

ALTER TABLE `restaurantes`
  ADD Rol int(11) NOT NULL DEFAULT 0,
  MODIFY Clave VARCHAR(255);

--
-- Filtros para la tabla `envios`
--
ALTER TABLE `envios`
  ADD CONSTRAINT `envios_ibfk_1` FOREIGN KEY (`CodPed`) REFERENCES `pedidos` (`CodPed`);

--
-- Volcado de usuario administrador 
--

INSERT INTO `restaurantes` (`Correo`, `Clave`, `Pais`, `CP`, `Ciudad`, `Direccion`,`Rol`) VALUES
('admin@empresa.com', '$2y$10$fG4EKUiaUiYkGWxuHFCrEu7B0MTlg0oyFkume17EUqsS8lV98AIoS', 'España', 28002, 'Madrid', 'C/ Padre  Claret, 8',1);



COMMIT;

  
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
