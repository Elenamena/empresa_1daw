
$(document).ready(function() {

    let productos = [];

    $("#info").hide("d-none");


    $.getJSON("json.json", function(data) {
        productos = data;
    });


    $("#busqueda").click(function() {
        const codigoIntr = $("#codigo").val().trim();

        if (codigoIntr === "") {
            mostrarError("Error");
            return;
        }

        const producto = productos.find(p => p.codigo === codigoIntr);

        if (codigo) {
            mostrarProducto(producto);
        } else {
            mostrarError("Producto no encontrado");
        }
    });

    $("#codigo").keypress(function(event) {
        if (event.which === 13) { 
            mostrarProducto();
        }
    });


    function mostrarProducto(producto) {
        $("#info").show("d-none");
        $("#nombre").text(producto.nombre);
        $("#precio").text(producto.precio);
        $("#descripcion").text(producto.descripcion);
        $("#error").addClass("d-none");
    }


    function mostrarError(mensaje) {
        $("#error").text(mensaje);
        $("#error").hide("d-none");
    }

});


