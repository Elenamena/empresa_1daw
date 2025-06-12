
let productosBuscados = [];

let productos = [];

let escaneando = false;

const lector = new ZXing.BrowserMultiFormatReader();


fetch("datos.json") // Datos desde JSON
    .then(response => response.json())
    .then(data => productos = data)
    .catch(error => console.error("Error : ", error));


    $(document).ready(function () {

        $("#busqueda").click(() => { // Formulario de búsqueda
            ocultarTodo();
            $("#form").removeClass("d-none");
        });


        $("#escanear").click(() => { // Escaneo de código de barras
            iniciarEscaneo();
        });


        $("#formBusqueda").submit(function (e) { // Búsqueda por código
            e.preventDefault();
            const codigo = $("#codigo").val().trim();
            if (codigo) buscarProducto(codigo);
        });


        $("#detener").click(() => detenerEscaneo()); // Detener escaneo


        $("#recargar").click(() => { // Recargar página
            ocultarTodo();
            $("#codigo").val("");
        });


        $("#reiniciar").click(() => {
            productosBuscados = [];
            $("#lista").empty();
            ocultarTodo();
        });
        
    });


    function ocultarTodo() {
        $("#form, #camara, #resultado, #error").addClass("d-none");
    }

    function buscarProducto(codigo) {
        const producto = productos.find(p => p.codigo.toString() === codigo);
        if (producto) {
            mostrarProducto(producto);
            agregarLista(producto);
        } else {
            mostrarError("Producto no encontrado");
        }
    }


    function mostrarProducto(producto) {
        $("#nombre").text(producto.nombre);
        $("#precio").text(producto.precio);
        $("#descripcion").text(producto.descripcion);
        $("#resultado").removeClass("d-none");
        $("#error").addClass("d-none");
    }

    function mostrarError(msg) {
        $("#error").removeClass("d-none").text(msg);
        $("#resultado").addClass("d-none");
    }

    function agregarLista(producto) {
        productosBuscados.push(producto);
        $("#lista").append(`<li class="list-group-item">
            <strong>${producto.nombre}</strong> - ${producto.precio} - ${producto.descripcion}
        </li>`);
    }



    function iniciarEscaneo() {
        if (escaneando) return;
        escaneando = true;

        codeReader.listVideoInputDevices().then(devices => {
            const deviceId = devices[0]?.deviceId;
            if (!deviceId) return mostrarError("No se encontró la cámara");

            codeReader.decodeFromVideoDevice(deviceId, 'video', (result, err) => {
                if (result) {
                    detenerEscaneo();
                    buscarProducto(result.text);
                }
            });
        }).catch(err => mostrarError("Error al acceder a la cámara"));
    }

    function detenerEscaneo() {
        codeReader.reset();
        escaneando = false;
        $("#camara").addClass("d-none");
    }


