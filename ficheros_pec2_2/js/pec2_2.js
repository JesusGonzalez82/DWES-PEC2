function validarEnvios(valor){
    alert(`Pedido seleccionado: ${valor}`);
// return false;
};
function buscarProducto(valor){
    let xhttp = new XMLHttpRequest();
    // Llamamos a buscar con json
    let params = "valor=" + encodeURIComponent(valor);
    xhttp.open("GET", "buscador_json.php?" + params, true);

    // Funcion que ejecutamos cuando la solicitud se complete

    xhttp.onload = function(){
        if (xhttp.status === 200){
            // Obtenemos la respuesta y la mostramos
            alert(xhttp.responseText);
        }else {
            alert("Error al obtener los datos " + xhttp.status);
        }
    };
    xhttp.send();
    }
// return false;