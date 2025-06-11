
let productosBuscados = [];

$(document).ready(function() {
    
    $("#busqueda").on('click', function() { 
        $("#form").removeClass("d-none");
        $("#camara").addClass("d-none");
        $("#resultado").addClass("d-none");
        $("#error").addClass("d-none").text("");    
    });

    $("#escanear").on('click', function() { 
        $("#form").removeClass("d-none");
        $("#camara").addClass("d-none");
        $("#resultado").addClass("d-none");
        $("#error").addClass("d-none").text("");    
    });

    $("#form").submit(function(event) {
        event.preventDefault();
        let codigo = $("#codigo").val().trim();
        buscarProducto(codigo);
    });

    $("#simularCodigo").click(function() {
        const codigo = "1234";
        buscarProducto(codigo);
    });

    $("#reiniciar").click(function() {
        productosBuscados = [];
        $("#lista").empty();
    });

    $("#recargar").click(function() {
        $("#codigo").val("");
        $("#resultado").addClass("d-none");
        $("#error").addClass("d-none").text("");
    });

});


function buscarProducto(codigo) {
    $.ajax({
        type: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
        contentType: 'application/json',
        async: true,
        success: function(data) {
            const producto = data.productos.find(item => item.id == codigo);
            if(producto) {
                mostrarProducto(producto);
                agregarLista(producto);
            } else {
                mostrarError("Producto no encontrado");
            }
        },
        error: function() {
            mostrarError("Error al buscar el producto");
        }
    });
}


function mostrarProducto(producto) {
    $("#nombre").text(producto.nombre);
    $("#precio").text(producto.precio);
    $("#descripcion").text(producto.descripcion);
    $("#resultado").removeClass("d-none");
    $("#error").addClass("d-none").text("");
}


function mostrarError(mensaje) {
    $("#error").removeClass("d-none").text(mensaje);
    $("#resultado").addClass("d-none");
}


function agregarLista(producto) {
    productosBuscados.push(producto);
    $("#lista").append(`
        <li class="list-group-item">
            <strong>${producto.nombre}</strong> - ${producto.precio} - ${producto.descripcion}
        </li>
    `);
}


