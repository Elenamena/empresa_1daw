
let productosBuscados = [];

let productos = [];

let escaneando = false;

const lector = new ZXing.BrowserMultiFormatReader();

 
fetch("datos.json") // Datos desde JSON
    .then(response => response.json())
    .then(data => productos = data)
    .catch(error => console.error("Error : ", error));


    $(document).ready(function () {

        ocultarTodo(); // Ocultar todo al inicio

        $("#busqueda").click(() => { // Formulario de búsqueda
            ocultarTodo();
            $("#formBusqueda").removeClass("d-none");
        });


        $("#escanear").click(() => { // Escaneo de código de barras
            ocultarTodo();
            $("#camara").modal("show");
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
            $("#opciones").removeClass("d-none");
        });


        $("#reiniciar").click(() => { // Reiniciar la página
            productosBuscados = [];
            $("#lista").empty();
            ocultarTodo();
            $("#opciones").removeClass("d-none");
        });


        $("#camara").on("hidden.bs.modal", () => detenerEscaneo()); // Cerrar cámara

    });




    function ocultarTodo() {
        $("#formBusqueda").addClass("d-none");
        $("#info").addClass("d-none");
        $("#listaProductos").addClass("d-none");
        $("#error").addClass("d-none");
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
        $("#info").removeClass("d-none");
        $("#error").addClass("d-none");
    }


    function mostrarError(msg) {
        $("#error").removeClass("d-none").text(msg);
        $("#info").addClass("d-none");
    }


    function agregarLista(producto) {
        productosBuscados.push(producto);
        $("#lista").append(`<li class="list-group-item">
            <strong>${producto.nombre}</strong> - ${producto.precio} - ${producto.descripcion}
        </li>`);
        $("#listaProductos").removeClass("d-none");
    }



    function iniciarEscaneo() {
        if (escaneando) return;

        escaneando = true;

        lector.listVideoInputDevices()
            .then(devices => {
            if (devices.length === 0) {
                mostrarError("No se encontró la cámara");
                return;
            }

            const idCamara = devices[0].deviceId; // Se usa la primera cámara disponible

            lector.decodeFromVideoDevice(idCamara, 'video', (result, err) => {
                if (result) {
                    detenerEscaneo();
                    $("#modalCamara").modal("hide");
                    buscarProducto(result.text); // Buscar producto al escanear
                }
            });
                    
            
        })  .catch(err => mostrarError("Error al acceder a la cámara"));
    }


    function detenerEscaneo() {
        lector.reset();
        escaneando = false;
    }


