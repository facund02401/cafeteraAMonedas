const recursos = {
    agua: 300,
    leche: 200,
    cafe: 100,
};

let dineroMaquina = 0;

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
var menu;
// si no hay nada almacenado, va a crear solo las tres bebidas mencionadas
if (localStorage.getItem('menu') == null) {
    menu = [];
    let cappuccino = new Bebida("cappuccino", 100, 150, 28, 150);
    agregar(cappuccino);
    let espresso = new Bebida("espresso", 50, 0, 14, 55);
    agregar(espresso);
    let latte = new Bebida("latte", 50, 100, 14, 120);
    agregar(latte);
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

const divDinero = document.querySelector('.dinero');
// FUNCIONES
function agregar(bebida) {
    menu.push(bebida);
};

function mostrarMenu() {
    const ulMenu = document.getElementById('menu');
    ulMenu.innerHTML = 'Menu:';
    const divMenu = document.getElementById("menuGeneral");

    for (bebida of menu) {
        console.log(bebida.nombre[0].toUpperCase() + bebida.nombre.slice(1));
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
            
            divDinero.classList.toggle('escondido');
            let pedido = menu.find(bebida => bebida.nombre == nuevoBoton.id);
            //comprueba recursos
            if (comprobarRecursos(pedido) == false) {
                for (cadaLi of document.getElementsByTagName('li')) {
                    if (cadaLi.innerText.includes(pedido["nombre"].slice(1))) {
                        //saca el elemento del menu
                        cadaLi.parentNode.removeChild(cadaLi)
                        //elimina el elemento del array menu para que no se muestre en el siguiente ciclo
                        for (let aEliminar of menu) {
                            if (aEliminar === pedido)
                                menu.splice(aEliminar, 1);
                            console.log(menu)
                        }

                    }
                };

            }
            else {
                cobrar(pedido)
            };

        })

    }

};

function cinco() {
    let monto = parseInt(prompt("¿Cuántas monedas de $5 ingresa? "));
    return monto * 5
};

function diez() {
    let monto = parseInt(prompt("¿Cuántas monedas de $10 ingresa? "));
    return monto * 10
};

function veinte() {
    let monto = parseInt(prompt("¿Cuántos billetes de $20 ingresa? "));
    return monto * 20
};

function cincuenta() {
    let monto = parseInt(prompt("¿Cuántos billetes de $50 ingresa? "));
    return monto * 50
};

function preguntarPedido() {
    let pregunta = prompt(`Indique su pedido: `).toLowerCase();
    if (pregunta == "recursos") {
        return pregunta
    }
    else if (pregunta == "apagar") {
        return pregunta
    }
    else if (pregunta == "ordenar") {
        return pregunta
    }
    else if (pregunta == "dinero") {
        return pregunta
    }
    else if (pregunta == "agregar") {
        return pregunta
    }
    else {
        let pedido = menu.find(bebida => bebida.nombre == pregunta);
        // va a devolver el objeto entero
        return pedido
    }
};
 



function cobrar(pedido) {
    let precio = pedido.costo;
    const precioCobro = document.createElement('p');
precioCobro.innerText = `Debe abonar $${precio}. Agregue su dinero con los botones.`;  
document.body.append(precioCobro)  
   // monedaCinco = cinco();
   // monedaDiez = diez();
   // billeteVeinte = veinte();
   // billeteCincuenta = cincuenta();

    function descontarRecurso(pedido) {
        let descuentoAgua = pedido.agua;
        let descuentoCafe = pedido.cafe;
        let descuentoLeche = pedido.leche;
        recursos["agua"] -= descuentoAgua;
        recursos["cafe"] -= descuentoCafe;
        recursos["leche"] -= descuentoLeche;
    };

         



let montoTotal = 0;
let mostrarDinero = document.createElement('p');
divDinero.appendChild(mostrarDinero)
mostrarDinero.innerText = `Monto total ingresado es de: $${montoTotal}`;
function actualizarDinero(){
    mostrarDinero.innerText = `Monto total ingresado es de: $${montoTotal}`
};

const dineroCinco = document.getElementById('cinco');
dineroCinco.addEventListener('click', function(){ 
    montoTotal += 5;
    actualizarDinero()
});

const dineroDiez = document.getElementById('diez');
dineroDiez.addEventListener('click', function(){ 
    montoTotal += 10;
    actualizarDinero()
});
const dineroVeinte = document.getElementById('veinte');
dineroVeinte.addEventListener('click', function(){ 
    montoTotal += 20;
    actualizarDinero()
});
const dineroCincuenta = document.getElementById('cincuenta');
dineroCincuenta.addEventListener('click', function(){ 
    montoTotal += 50;
    actualizarDinero()
});

//};
const entregarDinero = document.getElementById('entregarDinero');
entregarDinero.addEventListener('click', function(){
    if (montoTotal < precio) {
        const avisoNoAlcanza = document.createElement('p');
        avisoNoAlcanza.innerText = "La cantidad de dinero ingresada no es suficiente para completar el pedido.";
        document.body.append(avisoNoAlcanza)
    }
    else {
        let vuelto = montoTotal - precio;
        dineroMaquina = dineroMaquina + precio;
        const avisoVuelto = document.createElement('p');
        avisoVuelto.innerText = `Su vuelto es de $${vuelto}. Se le entregara su pedido`;
        document.body.append(avisoVuelto)
        descontarRecurso(pedido);
    };


})
};



function comprobarRecursos(pedido) {

    for (const recurso in recursos) {
        if (pedido[recurso] > recursos[recurso]) {
            const avisoFaltaRecurso = document.createElement('p');
            avisoFaltaRecurso.innerText = "Es imposible entregar su pedido por falta de recursos.";
            document.body.append(avisoFaltaRecurso)

            return false;
        };
    };
}

//function crearBebida() {
//    const formNB = document.getElementById('formNuevaBebida');
//    formNB.classList.toggle('escondido');
//    const botonNb = document.getElementById('listoNB');
//    botonNb.addEventListener('submit', function (e) {
//        let nombreNuevaBebida = formNB.elements.nombreNB.value.toLowerCase();
//        let aguaNuevaBebida = parseInt(formNB.elements.aguaNB.value)
//        let lecheNuevaBebida = parseInt(formNB.elements.lecheNB.value)
//        let cafeNuevaBebida = parseInt(formNB.elements.cafeNB.value)
//        let costoNuevaBebida = parseInt(formNB.elements.costoNB.value)
//        let bebidaAgregada = new Bebida(nombreNuevaBebida, aguaNuevaBebida, lecheNuevaBebida, cafeNuevaBebida, costoNuevaBebida)
//        agregar(bebidaAgregada)
//        let almacenarBebidaLS = localStorage.setItem('menu', JSON.stringify(menu));
//        const divNB = document.getElementById('puedeTomar');
//        let textoNB = document.createElement('p');
//        textoNB.innerText = `Ahora puede tomar ${nombreNuevaBebida} en esta maquina.` 
//        divNB.appendChild(textoNB)
//        location.reload();
//    })
//};

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



// BOTONES
//const formOrdenes = document.getElementById("formOrdenes");
//formOrdenes.addEventListener("submit", function (e) {
//    e.preventDefault();
//    const orden = formOrdenes.elements.orden.value;
//});
const formNB = document.getElementById('formNuevaBebida');
const botonNb = document.getElementById('listoNB');
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
        const divNB = document.getElementById('puedeTomar');
        let textoNB = document.createElement('p');
        textoNB.innerText = `Ahora puede tomar ${nombreNuevaBebida} en esta maquina.` 
        divNB.appendChild(textoNB)
        location.reload();
    })

//MAQUINA
//const funcionando = true;
//while (funcionando) {
mostrarMenu()

//  let pedido = preguntarPedido();
const formOrdenes = document.getElementById("formOrdenes");
formOrdenes.addEventListener("submit", function (e) {
    e.preventDefault();
    let orden = formOrdenes.elements.orden.value;
    if (orden == "recursos") {
        for (const elemento in recursos) {
            alert(elemento + ": " + recursos[elemento])
        };
    }
    else if (orden == "ordenar") {
        ordenar();
    }
    else if (orden == "dinero") {
        alert("Cantidad de dinero recaudado: $" + dineroMaquina)
    }
    else if (orden == "agregar") {
        
    formNB.classList.toggle('escondido');
    

    };
    formOrdenes.elements.orden.value = '';

});
