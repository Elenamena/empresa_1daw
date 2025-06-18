
$(document).ready(function() {

    let productos = [];

    $("#info").hide();


    $.getJSON("json.json", function(data) {
        productos = data;
    });


    $("#busqueda").click(function() {
        buscarProducto();
    });


    $("#codigo").keypress(function(event) {
        if (event.which === 13) { 
            buscarProducto();
        }
    });


    $("#codigo").on("input", function() {
        $("#info").hide("d-none");
    });


    function buscarProducto() {
        const codigoIntr = $("#codigo").val().trim();

        if (codigoIntr === "") {
            mostrarError("Error");
            return;
        }

        const num = parseInt(codigoIntr);

        if (isNaN(num) || num <= 0 || num > 10) {
            mostrarError("Error");
            return;
        } 

        const producto = productos.find(p => p.codigo === codigoIntr);

        if (producto) {
            mostrarProducto(producto);
        } else {
            mostrarError("Producto no encontrado");
        }
    }


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


