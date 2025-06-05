
$(document).ready(function() {
    $("#cargar").click(function() {
        $.ajax ( {
            type: "GET",
            url: "https://jsonplaceholder.typicode.com/todos",
            contentType: 'application/json',
            async: true,
            success: function(data) {
                $("#listaTareas").empty(); 

                for(let i = 0; i < 10; i++) {
                    const tarea = data[i];
                    const estado = tarea.completed ? "Tarea completada" : "Tarea pendiente";

                  $("#listaTareas").append(
                    `<li><strong>ID:</strong> ${tarea.id} - <strong>Título:</strong> ${tarea.title} (${estado})</li>`
                  );
                }
            },
            error: function(error) {
                $("#listaTareas").html("Error: " + error);
            }
        });
    });
});


