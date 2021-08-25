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
if (localStorage.getItem('menu') == null) {
    menu = [];
    let cappuccino = new Bebida("cappuccino", 100, 150, 28, 150);
    agregar(cappuccino);
    let espresso = new Bebida("espresso", 50, 0, 14, 55);
    agregar(espresso);
    let latte = new Bebida("latte", 50, 100, 14, 120);
    agregar(latte);
}
else {
    menu = []
    menuAlmacenado = JSON.parse(localStorage.getItem("menu"))
    for (elementoAlmacenado of menuAlmacenado) {
        agregar(new Bebida(elementoAlmacenado.nombre, elementoAlmacenado.agua, elementoAlmacenado.leche, elementoAlmacenado.cafe, elementoAlmacenado.costo))
    }

}
;


// FUNCIONES
function agregar(bebida) {
    menu.push(bebida);
};

function mostrarMenu() {
    const ulMenu = document.getElementById('menu');
    ulMenu.innerHTML = 'Menu:';

    for (bebida of menu) {
        console.log(bebida.nombre[0].toUpperCase() + bebida.nombre.slice(1));
        let nuevoElemento = document.createElement('li');
        nuevoElemento.innerText = `${bebida.nombre[0].toUpperCase() + bebida.nombre.slice(1)}: $${bebida.costo}`;
        ulMenu.append(nuevoElemento);
    }

}

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
    alert(`Debe abonar $${precio}`);
    monedaCinco = cinco();
    monedaDiez = diez();
    billeteVeinte = veinte();
    billeteCincuenta = cincuenta();

    function descontarRecurso(pedido) {
        let descuentoAgua = pedido.agua;
        let descuentoCafe = pedido.cafe;
        let descuentoLeche = pedido.leche;
        recursos["agua"] -= descuentoAgua;
        recursos["cafe"] -= descuentoCafe;
        recursos["leche"] -= descuentoLeche;
    };

    let dineroIngresado = monedaCinco + monedaDiez + billeteCincuenta + billeteVeinte;
    if (isNaN(dineroIngresado)) {
        alert("El dinero no ingreso correctamente")
    }
    else {
        if (dineroIngresado < precio) {
            alert("La cantidad de dinero ingresada no es suficiente para completar el pedido.");
        }
        else {
            let vuelto = dineroIngresado - precio;
            dineroMaquina = dineroMaquina + precio;
            alert(`Su vuelto es de $${vuelto}. Se le entregara su pedido`);
            descontarRecurso(pedido);
        };

    };
};

function comprobarRecursos(pedido) {

    for (const recurso in recursos) {
        if (pedido[recurso] > recursos[recurso]) {
            alert("Es imposible entregar su pedido por falta de recursos.");
            for (cadaLi of document.getElementsByTagName('li')) {
                if (cadaLi.innerText.includes(pedido["nombre"].slice(1))) {
                    cadaLi.parentNode.removeChild(cadaLi)
                }
            };
            return false;
        };
    };
}

function crearBebida() {
    let nuevaBebida = prompt("Para crear una nueva bebida indique sus datos en el siguiente orden y con el formato indicado: \n nombre de la bebida, cantidad de ml de agua en numeros, cantidad de ml de leche en numeros, cantidad de gr de cafe en numeros, costo")
    let dividiendoPrompt = nuevaBebida.split(",")
    let nombreNuevaBebida = dividiendoPrompt[0].toLowerCase();
    let aguaNuevaBebida = parseInt(dividiendoPrompt[1])
    let lecheNuevaBebida = parseInt(dividiendoPrompt[2])
    let cafeNuevaBebida = parseInt(dividiendoPrompt[3])
    let costoNuevaBebida = parseInt(dividiendoPrompt[4])
    let bebidaAgregada = new Bebida(nombreNuevaBebida, aguaNuevaBebida, lecheNuevaBebida, cafeNuevaBebida, costoNuevaBebida)
    agregar(bebidaAgregada)
    let almacenarBebidaLS = localStorage.setItem('menu', JSON.stringify(menu))
    alert(`Ahora puede tomar ${nombreNuevaBebida} en esta maquina.`)
};

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



// INSTRUCCIONES

alert("Descripción de funcionamiento:\n Además de los comandos señalados al iniciar la cafetera, se puede ingresar 'APAGAR' para apagar la cafetera, 'RECURSOS' para conocer la cantidad de recursos disponibles, 'DINERO' para conocer la cantidad de dinero al interior de la maquina, 'AGREGAR' para agregar una nueva bebida a la cafetera y 'ORDENAR' para ver un listado de las bebidas ordenadas segun la caracteristica que se indique.")
//MAQUINA
const funcionando = true;
while (funcionando) {
    mostrarMenu()
    let pedido = preguntarPedido();
    if (pedido == "recursos") {
        for (const elemento in recursos) {
            alert(elemento + ": " + recursos[elemento])
        };
    }
    else if (pedido == "apagar") {
        break;
    }
    else if (pedido == "ordenar") {
        ordenar();
    }
    else if (pedido == "dinero") {
        alert("Cantidad de dinero recaudado: $" + dineroMaquina)
    }
    else if (pedido == "agregar") {
        crearBebida();
        continue;
    }
    else {
        if (pedido == undefined) {
            alert("El pedido no se encuentra en el menu. Para salir escriba APAGAR.")
        }
        else {
            if (comprobarRecursos(pedido) == false) {
                continue
            }
            else {
                cobrar(pedido)
            };
        };
    };
};