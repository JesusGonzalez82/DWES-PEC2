<?php
/*comprueba que el usuario haya abierto sesión o redirige*/
require 'sesiones.php';
require_once 'bd.php';
require_once 'bd_pec2_1.php';
comprobar_sesion();
?>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Tabla de productos por categoría</title>
</head>

<body>
	<?php
	require 'cabecera.php';

	$categoria = $_GET['categoria'];
	$pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 0;

	$cat = cargar_categoria($_GET['categoria']);
	$_SESSION['cat'] = $_GET['categoria'];
	$productos = cargar_productos_categoria($_GET['categoria'], 0, 10); // tenía 10, 10 y no funcionaba, modifico a 0, 10 y funciona.
	if ($cat === FALSE or $productos === FALSE) {
		echo "<p class='error'>Error al conectar con la base datos</p>";
		exit;
	}
	echo "<h1>" . $cat['Nombre'] . "</h1>";
	echo "<p>" . $cat['Descripcion'] . "</p>";

	// Me devuelve el numero total de productos por categoria
	$numProductos = productos_en_categoria($categoria);

	for ($i = 0; $i < ceil($numProductos / 10); $i++) {
		// Pintamos los enlaces en la página
		// echo "<a href='#' onclick='numero_de_productos($i)'>"  . ($i+1) . "</a>" . " "; Esto no funciona, ya que requeriria Ajax.
		echo "<a href='productos.php?categoria=" . urlencode($_GET['categoria']) . "&pagina=$i'>" . ($i+1) . "</a> ";
	}

	//Abrimos la tabla
	echo "<table>"; 
	echo "<tr><th>Nombre</th><th>Descripción</th><th>Peso</th><th>Stock</th><th>Comprar</th></tr>";
	numero_de_productos($pagina); // Aqui tenia numero_de_productos(0) y no funcionaba, siempre mostraba la página 0
	echo " ";
	echo "</table>";

	function numero_de_productos($numPagina){
		$productos = cargar_productos_categoria($_GET['categoria'], $numPagina * 10, 10);
		foreach ($productos as $producto) {
			if ($producto['Stock'] >= 0) {
				$cod = $producto['CodProd'];
				$nom = $producto['Nombre'];
				$des = $producto['Descripcion'];
				$peso = $producto['Peso'];
				$stock = $producto['Stock'];
				echo "<tr><td>$nom</td><td>$des</td><td>$peso</td><td>$stock</td>
			<td><form action = 'anadir.php' method = 'POST'>
			<input name = 'unidades' type='number' min = '1' value = '1'>
			<input type = 'submit' value='Comprar'><input name = 'cod' type='hidden' value = '$cod'>
			</form></td></tr>";
			}
		}
	}
	?>


</body>

</html>