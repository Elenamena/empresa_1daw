
$(document).ready(function() {
    $("#cargar").click(function() {
        $.ajax ( {
            url: "datos.php",
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


