function anadirProductos(formulario) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			alert("Producto añadido con éxito");
			cargarCarrito();
		}
	};
	var params = "cod=" + formulario.elements['cod'].value + "&unidades=" + formulario.elements['unidades'].value;
	xhttp.open("POST", "anadir_json.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(params);
	return false;
}

function cargarZonaAdmin(){
	var contenido = document.getElementById("contenido");
	contenido.innerHTML = `
	<ol>
		<li><a href=# onclick="return cargarBuscador();"}> Buscador de productos </a></li>
		<li><a href=# onclick="return cargarValidarEnvios();"}> Validar envíos </a></li>
	</ol>

	<ul>
		<li><a href=# onclick="return cargarZonaAdmin();"}> Datos de restaurantes </a></li>
		<li><a href=# onclick="return cargarZonaAdmin();"}> Claves de restaurantes </a></li>
		<li><a href=# onclick="return cargarZonaAdmin();"}> Altas y bajas de restaurantes </a></li>
	</ul>
`;
	var titulo = document.getElementById("titulo");
	titulo.innerHTML = `<h1>Zona de administración</h1>`;

	return false;
}


function cargarCarrito() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var contenido = document.getElementById("contenido");
			contenido.innerHTML = "";
			var titulo = document.getElementById("titulo");
			titulo.innerHTML = "Carrito de la compra";
			try {
				var filas = pedidos;
				tabla = crearTablaCarrito(filas);
				contenido.appendChild(tabla);
				/*ahora el vínculo de procesar pedio*/
				var procesar = document.createElement("a");
				procesar.href = "#";
				procesar.innerHTML = "Realizar pedido";
				procesar.onclick = function () { return procesarPedido(); };
				contenido.appendChild(procesar);
			} catch (e) {
				var mensaje = document.createElement("p");
				mensaje.innerHTML = "Todavía no tiene productos";
				contenido.appendChild(mensaje);
			}

		}
	};
	xhttp.open("GET", "carrito_json.php", true);
	xhttp.send();
	return false;
}

function cargarCategorias() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var cats = pedidos;
			var lista = document.createElement("ul");
			for (var i = 0; i < cats.length; i++) {
				var elem = document.createElement("li");
				vinculo = crearVinculoCategorias(cats[i].nombre, cats[i].codCat);
				elem.appendChild(vinculo);
				lista.appendChild(elem);
			}
			var contenido = document.getElementById("contenido");
			contenido.innerHTML = "";
			var titulo = document.getElementById("titulo");
			titulo.innerHTML = "Categorías";
			contenido.appendChild(lista);
		}
	};
	xhttp.open("GET", "categorias_json.php", true);
	xhttp.send();
	return false;
}

function cargarProductos(destino) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var prod = document.getElementById("contenido");
			var titulo = document.getElementById("titulo");
			titulo.innerHTML = "Productos";
			try {
				var filas = pedidos;
				var tabla = crearTablaProductos(filas);
				prod.innerHTML = "";
				prod.appendChild(tabla);
			} catch (e) {
				var mensaje = document.createElement("p");
				mensaje.innerHTML = "Categoría sin productos";
				prod.innerHTML = "";
				prod.appendChild(mensaje);
			}
		}
	};
	xhttp.open("GET", destino, true);
	xhttp.send();
	return false;
}






function crear_fila(campos, tipo) {
	var fila = document.createElement("tr");
	for (var i = 0; i < campos.length; i++) {
		var celda = document.createElement(tipo);
		celda.innerHTML = campos[i];
		fila.appendChild(celda);
	}
	return fila;
}

function crearFormulario(texto, cod, funcion) {
	var formu = document.createElement("form");
	var unidades = document.createElement("input");
	unidades.value = 1;
	unidades.name = "unidades";
	var codigo = document.createElement("input");
	codigo.value = cod;
	codigo.type = "hidden";
	codigo.name = "cod";
	var bsubmit = document.createElement("input");
	bsubmit.type = "submit";
	bsubmit.value = texto;
	formu.onsubmit = function () { return funcion(this); }
	formu.appendChild(unidades);
	formu.appendChild(codigo);
	formu.appendChild(bsubmit);
	return formu;
}

function crearTablaCarrito(productos) {
	var tabla = document.createElement("table");
	var cabecera = crear_fila(["Código", "Nombre", "Descripción", "Unidades", "Eliminar"], "th");
	tabla.appendChild(cabecera);
	for (var i = 0; i < productos.length; i++) {
		/*formulario*/
		formu = crearFormulario("Eliminar", productos[i]['CodProd'], eliminarProductos);
		fila = crear_fila([productos[i]['CodProd'], productos[i]['Nombre'], productos[i]['Descripcion'], productos[i]['unidades']], "td");
		celda_form = document.createElement("td");
		celda_form.appendChild(formu);
		fila.appendChild(celda_form);
		tabla.appendChild(fila);
	}
	return tabla;
}

function crearTablaProductos(productos) {
	var tabla = document.createElement("table");
	var cabecera = crear_fila(["Código", "Nombre", "Descripción", "Stock", "Comprar"], "th");
	tabla.appendChild(cabecera);
	for (var i = 0; i < productos.length; i++) {
		/*formulario*/
		formu = crearFormulario("Añadir", productos[i]['CodProd'], anadirProductos);
		fila = crear_fila([productos[i]['CodProd'], productos[i]['Nombre'], productos[i]['Descripcion'], productos[i]['Stock']], "td");
		celda_form = document.createElement("td");
		celda_form.appendChild(formu);
		fila.appendChild(celda_form);
		tabla.appendChild(fila);
	}
	return tabla;
}

function crearVinculoCategorias(nom, cod) {
	var vinculo = document.createElement("a");
	var ruta = "productos_json.php?categoria=" + cod;
	vinculo.href = ruta;
	vinculo.innerHTML = nom;
	vinculo.onclick = function () { return cargarProductos(this); }
	return vinculo;
}

function eliminarProductos(formulario) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			alert("Producto eliminado con éxito");
			cargarCarrito();
		}
	};
	var params = "cod=" + formulario.elements['cod'].value + "&unidades=" + formulario.elements['unidades'].value;
	xhttp.open("POST", "eliminar_json.php", true);
	//Send the proper header information along with the request
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(params);
	return false;
}

function procesarPedido() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var contenido = document.getElementById("contenido");
			contenido.innerHTML = "";
			var titulo = document.getElementById("titulo");
			titulo.innerHTML = "Estado del pedido";
			if (this.responseText == "TRUE") {
				contenido.innerHTML = "Pedido realizado";
			} else {
				contenido.innerHTML = "Error al procesar el pedido";
			}
		}
	};
	xhttp.open("GET", "procesar_pedido_json.php", true);
	xhttp.send();
	return false;
}

function cargarValidarEnvios(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var titulo = document.getElementById('titulo');
			var contenido = document.getElementById('contenido');
			titulo.innerHTML="Busca un pedido";
			var formulario = document.createElement('form');
			formulario.setAttribute('method', 'post');
			var select =document.createElement('select');
			var input=document.createElement('option');
			input.setAttribute('value','');
			input.innerHTML='Selecciona uno';
			select.appendChild(input);
			var  pedidos=JSON.parse(this.responseText)
			for (let i = 0; i < pedidos.length; i++) {
				var opcion = document.createElement('option');
				opcion.setAttribute('value',pedidos[i].CodPed);
				opcion.innerHTML=`${pedidos[i].Correo} -> ${pedidos[i].Fecha}`;
				select.appendChild(opcion);
			}
			var boton=document.createElement('input');
			boton.setAttribute('type','submit');
			boton.setAttribute('value','Validar Envío');
			formulario.appendChild(select);
			formulario.appendChild(document.createElement('br'));
			formulario.appendChild(document.createElement('br'));
			formulario.appendChild(boton);
			contenido.innerHTML='<p> Pedidos aún no enviados</p>';
			contenido.appendChild(formulario);
			formulario.addEventListener('submit', function(event) {
				event.preventDefault();  // Prevenir la recarga de la página
				var selectedValue = select.value;
				validarEnvios(selectedValue);
			});
		}
	};
	xhttp.open("GET", "pedidos_json.php", false);
	xhttp.send();
	return false;
}

function cargarBuscador(){
	var titulo = document.getElementById('titulo');
	var contenido = document.getElementById('contenido');
	titulo.innerHTML="Buscador de productos";
	var formulario = document.createElement('form');
	formulario.setAttribute('method', 'post');
	var input =document.createElement('input');
	input.setAttribute('type','text');
	input.setAttribute('name','busqueda');
	input.setAttribute('id','buscar');
	input.setAttribute('placeholder','Producto...');
	input.setAttribute('required','true');
	var boton=document.createElement('input');
	boton.setAttribute('type','submit');
	boton.setAttribute('value','Buscar');
	formulario.appendChild(input);
	formulario.appendChild(document.createElement('br'));
	formulario.appendChild(document.createElement('br'));
	formulario.appendChild(boton);
	contenido.innerHTML='<p>Escribe el nombre de un producto</p>';
	contenido.appendChild(formulario);
	formulario.addEventListener('submit', function(event) {
		event.preventDefault();  // Prevenir la recarga de la página
		var inputValue = input.value;
		buscarProducto(inputValue);
		});
}

function cargarValidarEnvios(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var titulo = document.getElementById('titulo');
			var contenido = document.getElementById('contenido');
			titulo.innerHTML="Validador de pedidos";
			var formulario = document.createElement('form');
			formulario.setAttribute('method', 'post');
			var select =document.createElement('select');
			var input=document.createElement('option');
			input.setAttribute('value','');
			input.innerHTML='Selecciona uno';
			select.appendChild(input);
			var  pedidos=JSON.parse(this.responseText)
			for (let i = 0; i < pedidos.length; i++) {
				var opcion = document.createElement('option');
				opcion.setAttribute('value',pedidos[i].CodPed);
				opcion.innerHTML=`${pedidos[i].Correo} -> ${pedidos[i].Fecha}`;
				select.appendChild(opcion);
			}
			var boton=document.createElement('input');
			boton.setAttribute('type','submit');
			boton.setAttribute('value','Validar Envío');
			formulario.appendChild(select);
			formulario.appendChild(document.createElement('br'));
			formulario.appendChild(document.createElement('br'));
			formulario.appendChild(boton);
			contenido.innerHTML='<p> Pedidos aún no enviados</p>';
			contenido.appendChild(formulario);
			formulario.addEventListener('submit', function(event) {
				event.preventDefault();  // Prevenir la recarga de la página
				var selectedValue = select.value;
				validarEnvios(selectedValue);
			});
		}
	};
	xhttp.open("GET", "pedidos_json.php", false);
	xhttp.send();
	return false;
}