<?php
require 'sesiones_json.php';
require_once 'bd.php';
require_once 'bd_pec2_2.php';
if (!comprobar_sesion()) return;
$pedidos = pedidos_no_enviados();
// hay que añadir las unidades
echo json_encode(iterator_to_array($pedidos));
