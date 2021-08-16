const menu = {
    espresso: {
        agua: 50,
        leche: 0,
        cafe: 18,
        costo: 55,
    },
    latte: {
        agua: 200,
        leche: 150,
        cafe: 24,
        costo: 80,
    },
    cappuccino: {
        agua: 250,
        leche: 100,
        cafe: 24,
        costo: 150,
    }
};

const recursos = {
    agua: 300,
    leche: 200,
    cafe: 100,
};

let dineroMaquina = 0;

//CLASE PARA CREAR NUEVAS BEBIDAS
class Bebida {
    constructor(agua, leche, cafe, costo){
        this.agua = agua;
        this.leche = leche;
        this.cafe = cafe;
        this.costo = costo;
    };
    //METODO PARA AGREGAR LA BEBIDA AL MENU
    agregar(){
        menu[Bebida]["agua"] = Bebida[this.agua];
        menu[Bebida]["leche"] = Bebida[this.leche];
        menu[Bebida]["cafe"] = Bebida[this.cafe];
        menu[Bebida]["costo"] = Bebida[this.costo];
        return menu[Bebida] = Bebida;
        }
    };


// FUNCIONES
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
    let pregunta = prompt(`Indique su pedido: Espresso: $${menu["espresso"]["costo"]}, Latte: $${menu["latte"]["costo"]}, Cappuccino: $${menu["cappuccino"]["costo"]}`).toLowerCase();
    let pedido = menu.indexOf(pregunta);
    return pedido
};


function cobrar(pedido) {
    let precio = menu[pedido]["costo"];
    alert(`Debe abonar $${precio}`);
    monedaCinco = cinco();
    monedaDiez = diez();
    billeteVeinte = veinte();
    billeteCincuenta = cincuenta();

    function descontarRecurso(pedido) {
        let descuentoAgua = menu[pedido]["agua"];
        let descuentoCafe = menu[pedido]["cafe"];
        let descuentoLeche = menu[pedido]["leche"];
        recursos["agua"] -= descuentoAgua;
        recursos["cafe"] -= descuentoCafe;
        recursos["leche"] -= descuentoLeche;
    };

    let dineroIngresado = monedaCinco + monedaDiez + billeteCincuenta + billeteVeinte;
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

function comprobarRecursos(pedido){
    
    for (const recurso in recursos) {
        if (menu[pedido][recurso] > recursos[recurso]) {
            alert("Es imposible entregar su pedido por falta de recursos.");
            return false;
        };
    };

};

// INSTRUCCIONES
alert("Descripción de funcionamiento:\n Además de los comandos señalados al iniciar la cafetera, se puede ingresar 'apagar' para apagar la cafetera, 'recursos' para conocer la cantidad de recursos disponibles y 'dinero' para conocer la cantidad de dinero al interior de la maquina.")
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
    else if (pedido == "dinero"){
        alert("Cantidad de dinero recaudado: $" + dineroMaquina)
    }
    else {
        if ((pedido in menu) == false) {
            alert("El pedido no se encuentra en el menu")
        }
        else {
            if(comprobarRecursos(pedido) == false){
                continue
            }
            else {
            cobrar(pedido)
        };
        };
    };
};