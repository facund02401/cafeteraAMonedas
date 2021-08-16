let menu = [];

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
let espresso = new Bebida("espresso", 50, 0, 14, 55);
agregar(espresso);
let latte = new Bebida("latte", 50, 100, 14, 120);
agregar(latte);
let cappuccino = new Bebida("cappuccino", 100, 150, 28, 150);
agregar(cappuccino);

// FUNCIONES

function agregar(bebida) {
    menu.push(bebida);
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

function preguntarPedido() { // ARREGLAR EL ACCESO A LO QUE IMPRIME
    let pregunta = prompt(`Indique su pedido: Espresso: $${espresso.costo}, Latte: $${latte.costo}, Cappuccino: $${cappuccino.costo}`).toLowerCase();
    if (pregunta == "recursos") {
        return pregunta
    }
    else if (pregunta == "apagar") {
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
        if (dineroIngresado < precio){
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
            return false;
        };
    };
};

function crearBebida() {
    let nuevaBebida = prompt("Para crear una nueva bebida indique sus datos en el siguiente orden y con el formato indicado: \n nombre de la bebida, cantidad de ml de agua en numeros, cantidad de ml de leche en numeros, cantidad de gr de cafe en numeros")
    let dividiendoPrompt = nuevaBebida.split(",")
    let nombreNuevaBebida = dividiendoPrompt[0]
    let aguaNuevaBebida = parseInt(dividiendoPrompt[1])
    let lecheNuevaBebida = parseInt(dividiendoPrompt[2])
    let cafeNuevaBebida = parseInt(dividiendoPrompt[3])
    let costoNuevaBebida = parseInt(dividiendoPrompt[4])
    let bebidaAgregada = new Bebida(nombreNuevaBebida, aguaNuevaBebida, lecheNuevaBebida, cafeNuevaBebida, costoNuevaBebida)
    agregar(bebidaAgregada)
    alert(`Ahora puede tomar ${nombreNuevaBebida} en esta maquina.`)
};


// INSTRUCCIONES
alert("Descripción de funcionamiento:\n Además de los comandos señalados al iniciar la cafetera, se puede ingresar 'APAGAR' para apagar la cafetera, 'RECURSOS' para conocer la cantidad de recursos disponibles, 'DINERO' para conocer la cantidad de dinero al interior de la maquina y 'AGREGAR' para agregar una nueva bebida a la cafetera.")
//MAQUINA
const funcionando = true;
while (funcionando) {
    let pedido = preguntarPedido();
    if (pedido == "recursos") {
        for (const elemento in recursos) {
            alert(elemento + ": " + recursos[elemento])
        };
    }
    else if (pedido == "apagar") {
        break;
    }
    else if (pedido == "dinero") {
        alert("Cantidad de dinero recaudado: $" + dineroMaquina)
    }
    else if (pedido == "agregar") {
        crearBebida();
        continue;
    }
    else {
        if (pedido == false) {
            alert("El pedido no se encuentra en el menu")
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