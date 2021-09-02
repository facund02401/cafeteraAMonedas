const recursos = {
    agua: 300,
    leche: 200,
    cafe: 100,
};
// VARIABLES DEFINIDAS
let dineroMaquina = 0;
const divDinero = document.querySelector('.dinero');
const ulMenu = document.getElementById('menu');
const divMenu = document.getElementById("menuGeneral");
const ulRecursos = document.createElement('ul');
const divMostrarRecursos = document.getElementById('mostrarRecursos');
const entregarDinero = document.getElementById('entregarDinero');
const divVuelto = document.getElementById("vuelto")
const avisoVuelto = document.createElement('p');
const divCobro = document.getElementById('cobro');
var menu;
let montoTotal = 0;
let mostrarDinero = document.createElement('p');
const formNB = document.getElementById('formNuevaBebida');
const botonNb = document.getElementById('listoNB');
const divMostrarDinero = document.getElementById('mostrarDinero');
const dineroRecuperado = localStorage.getItem('dinero');
const dineroParseado = JSON.parse(dineroRecuperado);
const pMostrarDinero = document.createElement('p');
const formOrdenes = document.getElementById("formOrdenes");
const precioCobro = document.createElement('p');
var pedido;
var pepe;
var precio;
let recursoAgua = document.getElementById('agua');
let recursoLeche = document.getElementById('leche');
let recursoCafe = document.getElementById('cafe');
const botonPuedeTomar = document.getElementById('botonPuedeTomar');
const divNB = document.getElementById('puedeTomar');

//CLASE PARA CREAR NUEVAS BEBIDAS
class Bebida {
    constructor(nombre, agua, leche, cafe, costo) {
        this.nombre = nombre;
        this.agua = agua;
        this.leche = leche;
        this.cafe = cafe;
        this.costo = costo;
    };
};
// AGREGANDO BEBIDAS

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
    let menuAlmacenado = JSON.parse(localStorage.getItem("menu"))
    for (elementoAlmacenado of menuAlmacenado) {
        agregar(new Bebida(elementoAlmacenado.nombre, elementoAlmacenado.agua, elementoAlmacenado.leche, elementoAlmacenado.cafe, elementoAlmacenado.costo))
    }

}
;
function iniciarCafetera() {
    ulMenu.innerHTML = 'Menu:';
    for (bebida of menu) {
        //console.log(bebida.nombre[0].toUpperCase() + bebida.nombre.slice(1));
        let nuevoElemento = document.createElement('li');
        nuevoElemento.innerText = `${bebida.nombre[0].toUpperCase() + bebida.nombre.slice(1)}: $${bebida.costo}`;
        ulMenu.append(nuevoElemento);
        //crear botones
        let nuevoBoton = document.createElement('button');
        nuevoBoton.innerText = `${bebida.nombre[0].toUpperCase() + bebida.nombre.slice(1)}`;
        nuevoBoton.setAttribute("id", `${bebida.nombre}`);
        divMenu.append(nuevoBoton);
        //addEventListener a cada boton
        nuevoBoton.addEventListener('click', function (e) {
            e.preventDefault();
            limpiarDivs(divMostrarDinero);
            limpiarDivs(divMostrarRecursos);
            limpiarDivs(divVuelto);
            let revisarBoton = nuevoBoton;
            responderPedido(nuevoBoton);
        })
    };
};

function responderPedido(boton) {
    var pedido2
    pepe = boton;
    //console.dir(boton);
    divDinero.classList.remove('escondido');
    entregarDinero.classList.remove('escondido')
    pedido = menu.find(bebida => bebida.nombre == boton.id);
    //console.log(pedido);
    //comprueba recursos
    if (comprobarRecursos(pedido) == false) {
        boton.disabled = true;
        entregarDinero.classList.add('escondido');
        for (cadaLi of document.getElementsByTagName('li')) {
            if (cadaLi.innerText.includes(pedido["nombre"].slice(1))) {
                //saca el elemento del menu
                cadaLi.parentNode.removeChild(cadaLi)

            };
        };

    }
    else {
        pedido2 = pedido
        cobrar(pedido2);
    };
};

function cobrar(pedido) {
    //console.log(pedido)
    pedido = menu.find(bebida => bebida.nombre == pepe.id);
    precio = pedido.costo;
    precioCobro.innerText = `Debe abonar $${precio}. Agregue su dinero con los botones.`;
    divCobro.prepend(precioCobro)
    entregarDinero.classList.remove('escondido');

};

function descontarRecurso(pedido) {
    let descuentoAgua = pedido.agua;
    let descuentoCafe = pedido.cafe;
    let descuentoLeche = pedido.leche;
    recursos["agua"] -= descuentoAgua;
    recursos["cafe"] -= descuentoCafe;
    recursos["leche"] -= descuentoLeche;
};

// FUNCIONES
// pushea a menu
function agregar(bebida) {
    menu.push(bebida);
};

function mostrarRecursos() {
    divMostrarRecursos.classList.remove('escondido');
    recursoAgua.innerText += `: ${recursos.agua}`
    recursoLeche.innerText += `: ${recursos.leche}`
    recursoCafe.innerText += `: ${recursos.cafe}`

    const botonMostrarRecursos = document.createElement('button');
    botonMostrarRecursos.innerText = 'Limpiar';
    divMostrarRecursos.appendChild(botonMostrarRecursos);
    botonMostrarRecursos.addEventListener('click', function () {
        divMostrarRecursos.classList.add('escondido');
    })
};



function limpiarDivs(nombreDiv) {
    nombreDiv.innerHTML = '';
};








divDinero.appendChild(mostrarDinero)
mostrarDinero.innerText = `Monto total ingresado es de: \n $${montoTotal}`;
function actualizarDinero() {
    mostrarDinero.innerText = `Monto total ingresado es de: $${montoTotal}`
};

const dineroCinco = document.getElementById('cinco');
dineroCinco.addEventListener('click', function () {
    montoTotal += 5;
    actualizarDinero()
});

const dineroDiez = document.getElementById('diez');
dineroDiez.addEventListener('click', function () {
    montoTotal += 10;
    actualizarDinero()
});
const dineroVeinte = document.getElementById('veinte');
dineroVeinte.addEventListener('click', function () {
    montoTotal += 20;
    actualizarDinero()
});
const dineroCincuenta = document.getElementById('cincuenta');
dineroCincuenta.addEventListener('click', function () {
    montoTotal += 50;
    actualizarDinero()
});

entregarDinero.addEventListener('click', function (e) {
    e.stopPropagation();
    if (montoTotal < precio) {
        const avisoNoAlcanza = document.createElement('p');
        avisoNoAlcanza.innerText = "La cantidad de dinero ingresada no es suficiente para completar el pedido.";
        divVuelto.append(avisoNoAlcanza)
    }
    else {

        let vuelto = montoTotal - precio;
        dineroMaquina = dineroMaquina + precio;
        avisoVuelto.innerText = `Su vuelto es de $${vuelto}. Se le entregara su pedido`;
        divVuelto.append(avisoVuelto)
        descontarRecurso(pedido);

        montoTotal = 0;
        actualizarDinero()
        divDinero.classList.toggle('escondido');
        entregarDinero.classList.toggle('escondido');
        //divCobro.innerHTML = '<button id="entregarDinero" class="escondido">Entregar Dinero</button>';
        entregarDinero
        // avisoVuelto.parentNode.removeChild(avisoVuelto);
        localStorage.setItem('dinero', dineroMaquina);
    };

});

//};

function comprobarRecursos(pedido) {

    for (const recurso in recursos) {
        if (pedido[recurso] > recursos[recurso]) {
            const avisoFaltaRecurso = document.createElement('p');
            avisoFaltaRecurso.innerText = "Es imposible entregar su pedido por falta de recursos.";
            precioCobro.innerText = '';
            divCobro.append(avisoFaltaRecurso)

            return false;
        };
    };
}

function ordenar() {
    let ordenarPor = prompt("¿Desea ordenarlo por cantidad de agua, leche, cafe o costo? ");
    let ordenado = menu.sort((a, b) => a[ordenarPor] - b[ordenarPor])
    let divMostrar = document.createElement('div')
    document.body.append(divMostrar);
    let paraMostrar = document.createElement('p')
    divMostrar.append(paraMostrar)
    paraMostrar.innerText = `Ordenado por ${ordenarPor}: \n `
    for (let i = 0; i < ordenado.length; i++) {
        paraMostrar.innerText += `${ordenado[i]["nombre"]}  ${ordenado[i][ordenarPor]} \n `;
    };
}

botonNb.addEventListener('click', function (e) {
    e.preventDefault();
    let nombreNuevaBebida = formNB.elements.nombreNB.value.toLowerCase();
    let aguaNuevaBebida = parseInt(formNB.elements.aguaNB.value)
    let lecheNuevaBebida = parseInt(formNB.elements.lecheNB.value)
    let cafeNuevaBebida = parseInt(formNB.elements.cafeNB.value)
    let costoNuevaBebida = parseInt(formNB.elements.costoNB.value)
    let bebidaAgregada = new Bebida(nombreNuevaBebida, aguaNuevaBebida, lecheNuevaBebida, cafeNuevaBebida, costoNuevaBebida)
    agregar(bebidaAgregada)
    localStorage.setItem('menu', JSON.stringify(menu));

    let textoNB = document.createElement('p');
    textoNB.innerText = `Ahora puede tomar ${nombreNuevaBebida} en esta maquina.`
    divNB.prepend(textoNB)
    botonPuedeTomar.classList.remove('escondido')

});

botonPuedeTomar.addEventListener('click', function (e) {
    e.preventDefault();
    formNB.elements.aguaNB.value = '';
    formNB.elements.lecheNB.value = '';
    formNB.elements.cafeNB.value = '';
    formNB.elements.costoNB.value = '';
    divNB.classList.add('escondido')


})


function mostrarDineroMaquina() {
    if (dineroRecuperado == null) {
        pMostrarDinero.innerText = "Cantidad de dinero recaudado: $" + dineroMaquina;
        divMostrarDinero.append(pMostrarDinero);
    }
    else {
        pMostrarDinero.innerText = "Cantidad de dinero recaudado: $" + dineroParseado;
        divMostrarDinero.append(pMostrarDinero);
    }


}

iniciarCafetera()


formOrdenes.addEventListener("submit", function (e) {
    e.preventDefault();
    let orden = formOrdenes.elements.orden.value;
    if (orden == "recursos") {
        divDinero.classList.add('escondido')
        formNB.classList.add('escondido');
        divCobro.classList.add('escondido');
        limpiarDivs(divVuelto);
        limpiarDivs(divMostrarDinero);
        mostrarRecursos()
    }
    else if (orden == "ordenar") {
        divDinero.classList.add('escondido')
        formNB.classList.add('escondido');
        ordenar();
    }
    else if (orden == "dinero") {
        formNB.classList.add('escondido');
        mostrarDineroMaquina()
        limpiarDivs(divCobro);
        limpiarDivs(divVuelto)
    }
    else if (orden == "agregar") {
        divDinero.classList.add('escondido')
        formNB.classList.toggle('escondido');
        limpiarDivs(divCobro);
        limpiarDivs(divVuelto);
        limpiarDivs(divMostrarDinero);


    };
    formOrdenes.elements.orden.value = '';

});

