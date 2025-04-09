<?php
require_once 'sesiones_json.php';
require_once 'bd.php';
require_once 'bd_pec2_2.php';
if (!comprobar_sesion()) return;
$categorias = cargar_categorias();
$cat_json = json_encode(iterator_to_array($categorias));
echo $cat_json;