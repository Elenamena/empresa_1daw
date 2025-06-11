
let productosBuscados = [];

$(document).ready(function() {
    
    $("#busqueda").on('click', function() { 
        $("#form").removeClass("d-none");
        $("#camara").addClass("d-none");
        $("#resultado").addClass("d-none");
        $("#error").addClass("d-none").text("");    
    });

});


