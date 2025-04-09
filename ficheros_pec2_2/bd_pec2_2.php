<?php

function buscar_productos(string $cadena_busqueda){
	$res = leer_config(dirname(__FILE__) . "/configuracion.xml", dirname(__FILE__) . "/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);
	$sql = "select * from productos";
	$preparada=$bd->prepare($sql);
	$preparada->execute(array('%'.$cadena_busqueda.'%'));
	$datos=$preparada->fetchAll(PDO::FETCH_ASSOC);
	return $datos;
}

?>