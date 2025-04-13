<?php
require 'bd_pec2_2.php';

// Invoco a la funcion buscar_producto() de bd_pec2_2.php El resultado lo devuelvo en un json.
// input buscador llama al js, el js llama al buscador_json.php y este invoca a bd_pec2_2.php a la funcion buscar_productos con lo que le llegue en el GET
// Y devolvemos el array en el buscador

$cadena = isset($_GET['valor']) ? $_GET['valor'] : '';

$resultado = buscar_productos($cadena);

header('Content-Type: application/json');

echo json_encode($resultado);

?>