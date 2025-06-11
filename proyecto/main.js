
let productosBuscados = [];

let productos = [];


fetch("productos.json")
    .then(response => response.json())
    .then(data => productos = data)
    .catch(error => console.error("Error al cargar productos: ", error));


    $(document).ready(function () {

      const vid = new ZXing.BrowserMultiFormatReader();

      let escaneando = false;

        $("#busqueda").click(() => {
            $("#form").removeClass("d-none");
            $("#camara, #resultado, #error, #opcionesIniciales").addClass("d-none");
        });

        $("#escanear").click(() => {
            $("#form, #resultado, #error, #opcionesIniciales").addClass("d-none");
          $("#camara").removeClass("d-none");

          if (!escaneando) {
            escaneando = true;
            vid.listVideoInputDevices()
                .then(videoInputDevices => {
                    const selectedDeviceId = videoInputDevices[0].deviceId;
                    vid.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
                        if (result) {
                            vid.reset();
                            escaneando = false;
                            buscarProducto(result.text);
                        }
                    });
                })
                .catch(err => mostrarError("Error al acceder a la cámara"));
            }
        });

        $("#form").submit(function (e) {
            e.preventDefault();
            const codigo = $("#codigo").val().trim();
            buscarProducto(codigo);
        });

        $("#detener").click(() => detenerEscaneo());

        $("#recargar").click(() => {
            $("#codigo").val("");
            ocultarTodo();
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


