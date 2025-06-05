
const cargar = () => {

    $.ajax( {
        type: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
        contentType: 'application/json',
        async: true,
        success: function(usuarios) {
            $('#usuarios').empty();

            $('#usuarios').append('<option value="">Selecciona un usuario</option>');

            usuarios.forEach(function(usuario) {
                $('#usuarios').append(`<option value="${usuario.id}">${usuario.name}</option>`);
            });
        },
        error: function(error) {
            alert('Error al cargar los usuarios'); 
        }
 
    });

};

$(document).ready(function() {

    $('#usuarios').change(function() {
        const usuarioId = $(this).val();

        if (usuarioId === '') {
            $('#posts').empty();
            $('#ocultar').hide();
            return;
        }

        $.ajax({
            type: 'GET',
            url: `https://jsonplaceholder.typicode.com/posts?userId=${usuarioId}`,
            contentType: 'application/json',
            async: true,
            success: function(posts) {
                $('#posts').empty();

                posts.forEach(function(post) {
                    $('#posts').append(`<li><strong>${post.title}</strong><br>${post.body}</li>`);
                });
            },
            error: function(error) {
                alert('Error al cargar los posts'); 
            }

        });

    });

});

const ocultar = () => {
    $('#posts').empty();
    $('#ocultar').hide();
    $('#usuarios').val('');
}


