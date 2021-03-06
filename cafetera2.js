$(document).ready(function () {

    // RECURSOS
    let recursoAlmacenado = JSON.parse(localStorage.getItem("recursos"));
    let recursos = {
        agua: 500,
        leche: 400,
        cafe: 100,
    };
    if (localStorage.getItem('recursos') == null) {
        recursos = {
            agua: 500,
            leche: 400,
            cafe: 100,
        };
    }
    else {
        recursos = recursoAlmacenado
    }

    // CONSTRUCTOR DE BEBIDAS
    class Bebida {
        constructor(nombre, agua, leche, cafe, costo) {
            this.nombre = nombre;
            this.agua = agua;
            this.leche = leche;
            this.cafe = cafe;
            this.costo = costo;
        };
    };

    // F U N C I O N E S

    //FUNCION PARA AGREGAR COSAS AL MENU
    function agregar(bebida) {
        menu.push(bebida)
    };
    //---------------------------------------------------------------------------------
    //FUNCION buscar MENU
    //let menuAlmacenado = JSON.parse(localStorage.getItem("menu"))
    let elementoAlmacenado;
    let menu;

    function buscarMenu() {
        let menuAlmacenado = JSON.parse(localStorage.getItem("menu"))
        // si no hay nada almacenado, va a crear solo las tres bebidas mencionadas
        if (localStorage.getItem('menu') == null) {
            menu = [];
            let Cappuccino = new Bebida("Cappuccino", 100, 150, 28, 150);
            agregar(Cappuccino);
            let Espresso = new Bebida("Espresso", 50, 0, 14, 55);
            agregar(Espresso);
            let Latte = new Bebida("Latte", 50, 100, 14, 120);
            agregar(Latte);
        }
        // si hay elementos guardados, los va a recuperar, parsear y mostrar en menu
        else {
            menu = []
            for (elementoAlmacenado of menuAlmacenado) {
                agregar(new Bebida(elementoAlmacenado.nombre, elementoAlmacenado.agua, elementoAlmacenado.leche, elementoAlmacenado.cafe, elementoAlmacenado.costo))
            };
        };
    };
    //------------------------------------------------------------------------------

    // FUNCION INICIAR CAFETERA
    function iniciarCafetera() {
        buscarMenu();
        $('#menu').empty();
        $('#menuGeneral button').remove();
        $('#menu').html('Menu:');
        for (let bebida of menu) {
            // crear li de menu
            $('#menu').append(`<li class="elementoMenu" id="elementoMenu${bebida.nombre}"> ${bebida.nombre}: $${bebida.costo} </li>`)
            //crear botones
            $('#menuGeneral').append(`<button class='botonMenu' id='${bebida.nombre}'>${bebida.nombre}</button> `)
            //addEventListener a cada boton
            $(`#${bebida.nombre}`).click(function () {
                $('#formNuevaBebida').hide()
                $('#mostrarDinero').hide();
                $('#mostrarRecursos').hide();
                $('#vuelto').hide();
                $('#ordenar').hide();
                responderPedido($(`#${bebida.nombre}`));
            })
        };
    };
    //-----------------------------------------------------------------------

    // FUNCION RESPONDER PEDIDO
    let pedido;

    function responderPedido(boton) {
        pedido = menu.find(bebida => bebida.nombre == boton.attr('id'));
        //comprueba recursos
        if (comprobarRecursos(pedido) == false) {
            $(`#${pedido.nombre}`).prop('disabled', true)
            $('#botonDeshabilitado').fadeIn();
            setTimeout(() => {
                $('#botonDeshabilitado').fadeOut();
            }, 3000);
            $('#entregarDinero').hide();
            for (let cadaLi of $('#menuGeneral li')) {
                if (cadaLi.textContent.includes(pedido.nombre)) {
                    //saca el elemento del menu
                    cadaLi.remove();

                };
            };
        }
        else {
            cobrar(pedido);
        };
    };
    //----------------------------------------------------------------------
    // FUNCION COMPROBAR RECURSOS

    function comprobarRecursos(pedido) {
        for (const recurso in recursos) {
            if (pedido[recurso] > recursos[recurso]) {
                $('#avisoFaltaRecurso').text("Es imposible entregar su pedido por falta de recursos.");
                $('#precioCobro').hide();
                return false;
            };
        };
    };
    //------------------------------------------------------------------------
    // FUNCION COBRAR
    let precio;

    function cobrar(pedido) {
        precio = pedido.costo;
        $('.dinero').fadeIn();
        $('#entregarDinero').fadeIn();
        actualizarDinero();
        $('#precioCobro').text(`Debe abonar $${precio}. Agregue su dinero con los botones.`);
        $('#precioCobro').show()
        $('#entregarDinero').show();
    };
    //----------------------------------------------------------------------------
    //FUNCION DESCONTAR RECURSO (SE ACTIVA CON CLICK EN ENTREGARDINERO)
    function descontarRecurso(pedido) {
        let descuentoAgua = pedido.agua;
        let descuentoCafe = pedido.cafe;
        let descuentoLeche = pedido.leche;
        recursos["agua"] -= descuentoAgua;
        recursos["cafe"] -= descuentoCafe;
        recursos["leche"] -= descuentoLeche;
    };
    //-------------------------------------------------------------------------------
    // FUNCION ACTUALIZAR MONTO INGRESADO
    let montoTotal = 0;
    function actualizarDinero() {
        $('#mostrarDineroIngresado').empty();
        $('#mostrarDineroIngresado').append(`Monto total ingresado es de: <br> $${montoTotal}`);
    };
    //--------------------------------------------------------------------------------
    // FUNCION MOSTRAR DINERO en maquina
    function mostrarDineroMaquina() {
        if (localStorage.getItem('dinero') == null) {
            $('.texto-dinero').append(`${dineroMaquina}`);
        }
        else {
            $('.texto-dinero').append(JSON.parse(localStorage.getItem('dinero')));
        }
    };
    //------------------------------------------------------------------------------------
    // FUNCION MOSTRAR RECURSOS
    function mostrarRecursos() {
        $('#mostrarRecursos').show();
        $('#mostrarRecursos').empty();
        $('#mostrarRecursos').append(`<ul><li id="agua">Agua: ${recursos.agua}</li><li id="leche">Leche: ${recursos.leche}</li><li id="cafe">Caf??: ${recursos.cafe}</li></ul>`);
    };
    //---------------------------------------------------------------------------------
    // FUNCION ORDENAR
    function ordenar() {
        let ordenado = menu.sort((a, b) => a[$('#ordenarPorInput').val()] - b[$('#ordenarPorInput').val()])
        for (let i = 0; i < ordenado.length; i++) {
            $('#ordenado').append(`${ordenado[i]["nombre"]}:  ${ordenado[i][$('#ordenarPorInput').val()]} <br>`);
        };
    };
    //--------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------
    // B O T O N E S

    // BOTONES DINERO

    $('#cinco').on('click', function () {
        montoTotal += 5;
        actualizarDinero()
    });

    $('#diez').on('click', function () {
        montoTotal += 10;
        actualizarDinero()
    });

    $('#veinte').on('click', function () {
        montoTotal += 20;
        actualizarDinero()
    });

    $('#cincuenta').on('click', function () {
        montoTotal += 50;
        actualizarDinero()
    });
    //------------------------------------------------------
    // BOTON ENTREGAR DINERO
    let dineroMaquina = 0;
    $('#entregarDinero').on('click', function (e) {
        let vuelto = montoTotal - precio;
        $('#vuelto').show();
        $('#precioCobro').hide();
        if (montoTotal < precio) {
            pedido = '';
            $('#avisoDineroNoAlcanza').fadeIn();
            setTimeout(() => {
                $('#avisoDineroNoAlcanza').fadeOut();
                setTimeout(() => {
                    $('#vuelto').hide();
                }, 2000)
            }, 3000);
            $(".dinero").hide()
            montoTotal = 0;
        }
        else {
            dineroMaquina = dineroMaquina + precio;
            $('#avisoVuelto').text(`Su vuelto es de $${vuelto}. Se le entregara su pedido`);
            descontarRecurso(pedido);
            montoTotal = 0;
            actualizarDinero()
            $('.dinero').hide()
            pedido = '';
            localStorage.setItem('recursos', JSON.stringify(recursos))
            localStorage.setItem('dinero', dineroMaquina);
            const URLGET = "https://jsonplaceholder.typicode.com/posts";
            $.post(URLGET, recursos, (respuesta, estado) => {
                if (estado === 'success') {
                    console.log(respuesta)
                }
            })



        };
        $('#entregarDinero').fadeOut();
    });
    //----------------------------------------------------------------------------------------------
    // BOTON MOSTRAR RECURSOS OK
    $('#mostrarRecursos button').on('click', function () {
        $('#mostrarRecursos').hide();
    });
    //-------------------------------------------------------------------------------------------------
    // BOTON ORDENAR
    $('#ordenarBoton').on('click', function (e) {
        e.preventDefault();
        $('#ordenarForm').hide();
        $('#ordenado').empty();
        ordenar();
        $('#ordenado').show();
        $('#ordenadoBoton').show();
    });

    $('#ordenadoBoton').on('click', () => {
        $('#ordenado').empty();
        $('#ordenadoBoton').hide()
    })
    //--------------------------------------------------------------------------------------------------
    // BOTON NUEVA BEBIDA
    $('#listoNB').on('click', function (e) {
        e.preventDefault();
        let nombreNuevaBebida = $('#nombreNB').val();
        let aguaNuevaBebida = parseInt($('#aguaNB').val())
        let lecheNuevaBebida = parseInt($('#lecheNB').val())
        let cafeNuevaBebida = parseInt($('#cafeNB').val())
        let costoNuevaBebida = parseInt($('#costoNB').val())
        let bebidaAgregada = new Bebida(nombreNuevaBebida, aguaNuevaBebida, lecheNuevaBebida, cafeNuevaBebida, costoNuevaBebida)
        agregar(bebidaAgregada)
        localStorage.setItem('menu', JSON.stringify(menu));
        $('#puedeTomar p').prepend(`Ahora puede tomar ${nombreNuevaBebida} en esta maquina.`);
        $('#botonPuedeTomar').slideDown();
    });

    // BOTON NUEVA BEBIDA PUEDE TOMAR
    $('#botonPuedeTomar').on('click', function (e) {
        e.preventDefault();
        $('#nombreNB').val('');
        $('#aguaNB').val('');
        $('#lecheNB').val('');
        $('#cafeNB').val('');
        $('#costoNB').val('');
        $('#formNuevaBebida').slideUp();
        $('#botonPuedeTomar').hide()
        $('#puedeTomar p').text('')
        iniciarCafetera();
    });
    //--------------------------------------------------------------------------------------
    // Boton ok mostrar dinero
    $('#mostrarDinero button').click(() => {
        $('#mostrarDinero').slideUp("slow");
    });

    //----------------------------------------------------------------------------------------
    // Boton Mostrar Recursos
    $('#mostrarRecursos button').click(() => {
        $('#mostrarRecursos').hide();
    });

    //----------------------------------------------------------------------------------------
    // Boton euros - pesos
    $('input[type=radio][name="UYU-EUR"]').change(function () {
        
        let EURO = 0;
        if ($('input[name="UYU-EUR"]:checked').val() == 'EUR') {
            $.ajax({
                url: 'http://data.fixer.io/api/latest?access_key=aaee95f4359b70536d622d85338dbbab',
                method: 'GET',
                dataType: 'JSON',
                success: function (data) {
                    EURO = data.rates.UYU;
                    for (let beb of menu) {
                        beb.costo = (beb.costo / EURO).toFixed(2)
                    }
                    localStorage.setItem('menu', JSON.stringify(menu));
                    iniciarCafetera()
                }
            });
        }
        else if ($('input[name="UYU-EUR"]:checked').val() == 'UYU') {
                        $.ajax({
                url: 'http://data.fixer.io/api/latest?access_key=aaee95f4359b70536d622d85338dbbab',
                method: 'GET',
                dataType: 'JSON',
                success: function (data) {
                    EURO = data.rates.UYU;
                    menu = []
                    let menuAlmacenado = JSON.parse(localStorage.getItem('menu'))
                    for (elementoAlmacenado of menuAlmacenado) {
                        elementoAlmacenado.costo = Math.round(parseFloat(elementoAlmacenado.costo) * EURO)
                        agregar(new Bebida(elementoAlmacenado.nombre, elementoAlmacenado.agua, elementoAlmacenado.leche, elementoAlmacenado.cafe, elementoAlmacenado.costo))
                    };
                    localStorage.setItem('menu', JSON.stringify(menu));
                    iniciarCafetera()
                }
            })
            iniciarCafetera()
        };
    });
    //-----------------------------------------------------------------------------------------
    //Boton Ordenes

    $('#formOrdenes button').on("click", function (e) {
        e.preventDefault();
        switch ($('#orden').val().toLowerCase()) {
            case "recursos":
                $('.dinero').hide()
                $('#formNuevaBebida').hide();
                $('#cobro').hide();
                $('#mostrarDinero').hide();
                $('#vuelto').hide()
                $('#ordenar').hide()
                $('#mostrarRecursos').show();
                mostrarRecursos()
                break;
            case "ordenar":
                $('.dinero').hide()
                $('#formNuevaBebida').hide();
                $('#cobro').hide();
                $('#mostrarDinero').hide();
                $('#vuelto').hide();
                $('#mostrarRecursos').hide();
                $('#ordenar').show();
                ordenar();
                break;
            case "dinero":
                $('.dinero').hide()
                $('#formNuevaBebida').hide();
                $('#cobro').hide();
                $('#mostrarDinero').slideDown();
                $('#vuelto').hide();
                $('#mostrarRecursos').hide();
                $('#ordenar').hide();
                mostrarDineroMaquina();
                break;
            case "agregar":
                $('.dinero').hide()
                $('#formNuevaBebida').slideDown();
                $('#cobro').hide();
                $('#mostrarDinero').hide();
                $('#vuelto').hide();
                $('#mostrarRecursos').hide();
                $('#ordenar').hide();
                break;
            case "ordenar":
                $('.dinero').hide()
                $('#formNuevaBebida').hide();
                $('#cobro').hide();
                $('#mostrarDinero').hide();
                $('#vuelto').hide();
                $('#mostrarRecursos').hide();
                $('#ordenar').show();
                break;
            default:
                $('.dinero').hide()
                $('#formNuevaBebida').hide();
                $('#cobro').hide();
                $('#mostrarDinero').hide();
                $('#vuelto').hide();
                $('#mostrarRecursos').hide();
                $('#ordenar').hide();
                $('#formOrdenes').after('<p id="ingreseOrdenAlert" class="alerta">Ingrese una orden valida</p>');
                setTimeout(() => {
                    $('#ingreseOrdenAlert').remove();
                }, 2000);
        };
        $('#orden').val('');
    });
    //-----------------------------------------------------------------------------------------
    // I N I C I O  C A F E T E R A
    iniciarCafetera()
});

