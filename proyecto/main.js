
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

});


