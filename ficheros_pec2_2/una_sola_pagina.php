<!DOCTYPE html>
<html>
<head>
	<title>Formulario de login</title>
	<meta charset="UTF-8">
	<script type="text/javascript" src="js/cargarDatos.js"></script>
	<script type="text/javascript" src="js/sesion.js"></script>
	<!-- <script type="text/javascript" src="js/examen.js"></script> -->
	<script type="text/javascript" src="js/pec2_2.js"></script>
</head>
<body>
	<section id="login">
		<form onsubmit="return login()" method="POST">
			Usuario <input id="usuario" type="text">
			Clave <input id="clave" type="password">
			<input type="submit">
		</form>
	</section>
	<section id="principal" style="display:none">
		<header>
			<span id="cab_usuario"></span>	
			<a href="#" onclick="return cargarZonaAdmin();">Administrador</a>
 			<a href="#" onclick="return cargarCategorias();">Home</a>
 			<a href="#" onclick="return cargarCarrito();">Carrito</a>
 			<a href="#" onclick="return cerrarSesionUnaPagina();">Cerrar sesión</a>
		</header>
		<hr>
		<h2 id="titulo"></h2>
		<section id="contenido">
		</section>
	</section>
</body>
</html>