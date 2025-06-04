
$(document).ready(function() {
    $("#cargar").click(function() {
        $.ajax ( {
            url: "https://jsonplaceholder.typicode.com/todos",
            type: "GET",
            success: function(respuesta) {
                $("#resultado").html(respuesta);
            },
            error: function(error) {
                $("#resultado").html("Error: " + error);
            }
        });
    });
});


