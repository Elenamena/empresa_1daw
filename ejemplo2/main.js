
$(document).ready(function() {
    $("#cargar").click(function() {
        $.ajax ( {
            url: "https://jsonplaceholder.typicode.com/todos",
            type: "GET",
            success: function(data) {
                $("#lista").empty(); 

                for(let i = 0; i < 10; i++) {
                    const tarea = data[i];
                    const estado = tarea.completed ? "Completada" : "Pendiente";

                  $("#lista").append(
                    `<li class="${estado}"><strong>ID:</strong> ${tarea.id} - <strong>Título:</strong> ${tarea.title}(${estado})</li>`
                  );
                }
            },
            error: function(error) {
                $("#lista").html("Error: " + error);
            }
        });
    });
});


