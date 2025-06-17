
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

        $("#opciones").removeClass("d-none"); // Mostrar opciones


        $("#busqueda").click(() => { // Formulario de búsqueda
            ocultarTodo();
            $("#formBusqueda").removeClass("d-none");
            $("#codigo").val("").prop("disabled", false).focus(); // Habilita el campo de búsqueda
        });


        $("#formBusqueda").submit(function (e) { // Búsqueda por código
            e.preventDefault();
            const codigo = $("#codigo").val().trim();
            buscarProducto(codigo);
        });


        $("#recargar").click(() => { // Recargar página
            ocultarTodo();
            $("#formBusqueda").removeClass("d-none");
            $("#codigo").val("").prop("disabled", false).focus();
        });


        $("#reiniciar").click(() => { // Reiniciar la página
            productosBuscados = [];
            $("#lista").empty();
            ocultarTodo();
            $("#opciones").removeClass("d-none");
        });


        $("#ver").click(() => {
            $("#listaProductos").toggleClass("d-none");
        }); 


        $("#escanear").click(() => { // Escaneo de código de barras
            ocultarTodo();
            const aceptar = confirm("¿Permitir acceso a la cámara?");
            if (aceptar) {
                $("#camara").modal("show");
                iniciarEscaneo();
            } else {
                $("#opciones").removeClass("d-none");
            }
        });


        $("#detener").click(() => {
            detenerEscaneo(); 
            $("#camara").modal("hide");
        });


        $("#camara").on("hidden.bs.modal", () => detenerEscaneo);

    });




    function ocultarTodo() {
        $("#formBusqueda").addClass("d-none");
        $("#info").addClass("d-none");
        $("#listaProductos").addClass("d-none");
        $("#error").addClass("d-none");
        $("#recargar").addClass("d-none");
        $("reiniciar").addClass("d-none");
        $("#ver").addClass("d-none");
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
        $("#recargar, #ver, #reiniciar").removeClass("d-none");
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
    }


    function iniciarEscaneo() {
        if (escaneando) return;

        escaneando = true;

        lector.listVideoInputDevices().then(devices => {
            if (devices.length === 0) {
                mostrarError("No se ha encontrado la cámara");
                return;
            }

            const idCamara = devices[0].deviceId; // Se usa la primera cámara disponible

            lector.decodeFromVideoDevice(idCamara, 'video', (result, err) => {
                if (result) {
                    detenerEscaneo();
                    $("camara").modal("hide");
                    buscarProducto(result.text); // Buscar producto al escanear
                }
            });
                    
            
        })  .catch(err => mostrarError("Error al acceder a la cámara"));
    }


    function detenerEscaneo() {
        lector.reset();
        escaneando = false;
    }


