
$(document).ready(function() {

    $.ajax( {
        type: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
        contentType: 'application/json',
        async: true,
        success: function(usuarios) {
            $('#usuarios').empty();

            $('#usuarios').append('<option value="">-- Selecciona un usuario --</option>');

            usuarios.forEach(function(usuario) {
                $('#usuarios').append(`<option value="${usuario.id}">${usuario.name}</option>`);
            });
        },
        error: function(error) {
            alert('Error al cargar los usuarios'); 
        }
 
    });

    $('#usuarios').change(function() {
        const usuarioId = $(this).val();

        if (usuarioId === "") {
            $('#posts').empty();
            return;
        }

        $.ajax({
            type: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users',
            contentType: 'application/json',
            async: true,
            success: function(posts) {
                $('#posts').empty();

                $('#usuarios').append('<option value="">-- Selecciona un usuario --</option>');

                posts.forEach(function(posts) {
                    $('#posts').append(`<li><strong>${post.title}</strong><br>${post.body}</li>`);
                });
            },
            error: function(error) {
                alert('Error al cargar los posts'); 
            }

        });

    });

});


