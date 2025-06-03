
const listUsers = () => {
    $.ajax( {
        type: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
        contentType: 'application/json',
        async: true,
        success: function(data) {
            $('#userList').empty();

            data.forEach(usuario => {
                $('#userList').append(
                    `<li><strong>${usuario.name}</strong> (${usuario.email})</li>`
                );
            });
        },
        error: function(error) {
            alert('Error al obtener los usuarios');
            console.error('Error:', error);
        }

    });
};



