<?php
require 'bd_pec2_2.php';

// Invoco a la funcion de bd_pec2_2.php El resultado lo devuelvo en un json.
// input buscardor llama al js, el js llama al buscador_json.php y este invoca a bd_pec2_2.php a la funcion buscar_productos con lo que le llegue en el GET
// Y devolvemos el array en el buscador