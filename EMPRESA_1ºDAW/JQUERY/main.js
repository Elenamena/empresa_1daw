
const listUsers=()=> {
    $.ajax( {
        type: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
        contentType: 'application/json',
        async: true,
        success: function(data) {},
        error: function(error) {}
    })
};


$(document).ready(function() {
    listUsers();
});


