<?php

function buscar_productos(string $cadena_busqueda){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);
	$sql = "select * FROM productos WHERE nombre LIKE ?";
	$preparada=$bd->prepare($sql);
	$preparada->execute(array('%'.$cadena_busqueda.'%'));
	$productos= $preparada->fetchAll(PDO::FETCH_COLUMN);
	return [
		"encontrado" => count($productos),
		"productos" => $productos
	];
}
?>