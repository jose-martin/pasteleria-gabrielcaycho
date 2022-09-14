// const promptPreguntaBocaditos = "Desea agregar bocaditos a su orden? (S = Sí | N = No)"
// const promtTipoBocadito = "Ingrese los tipo de bocaditos que desea ordenar (separado por comas (,)): (1 = S/ 10.00 | 2 = S/ 20.00 | 3 = S/ 30.00)";
// const promtBocaditos = (nombreBocadito, precioBocadito) => `Ingrese la cantidad de bocaditos de ${nombreBocadito} (Precio: S/${precioBocadito.toFixed(2)}) (Mínimo 50 bocaditos)`
// const promptPreguntaTortas = "Desea agregar tortas a su orden? (S = Sí | N = No)"
// const promtTipoTorta = "Ingrese tipo de torta (separado de comas(,)): (1 = s/. 50.00 | 2 = s/. 65.00 | 3 = s/. 85.00)";
// const promtTortas = (nombreTorta, precioTorta) => `Ingrese cantidad de tortas de ${nombreTorta} (precio: s/.${precioTorta.toFixed(2)}) (Minimo 1 Torta)`

// const bocaditos = [{
//     tipo: 1,
//     nombre: "Bocadito 1",
//     precio: 10
// },
// {
//     tipo: 2,
//     nombre: "Bocadito 2",
//     precio: 20
// }, {
//     tipo: 3,
//     nombre: "Bocadito 3",
//     precio: 30
// }]

// const tortas = [{
//     tipo: 1,
//     nombre: "Torta 1",
//     precio: 50
// },
// {
//     tipo: 2,
//     nombre: "torta 2",
//     precio: 65
// },
// {
//     tipo: 3,
//     nombre: "torta 3",
//     precio: 85

// }]

// let sinValor = "N"

// function calcularPedido() {
//     /**
//      * @type {{
//         bocadito:{
//             tipo:number,
//             nombre:string,
//             precio:number
//         }
//         cantidadEscogida: number
//       }[]}
//      */
//     const bocaditosEscogidos = []
//     /**
//      * @type {{
//         torta:{
//             tipo:number,
//             nombre:string,
//             precio:number
//         }
//         cantidadEscogida: number
//       }[]}
//      */
//     const tortasEscogidas = []

//     let preguntaBocaditos = prompt(promptPreguntaBocaditos).trim().toUpperCase();
//     while (preguntaBocaditos !== "S" && preguntaBocaditos !== "N") {
//         alert("Opción incorrecta. Escoja nuevamente");
//         preguntaBocaditos = prompt(promptPreguntaBocaditos).trim().toUpperCase();
//     }

//     if (preguntaBocaditos === "S") {
//         let tipoBocadito = prompt(promtTipoBocadito); // 1,2
//         let tiposBocaditosEscogidos = tipoBocadito.split(",") // [1,2]

//         while (tiposBocaditosEscogidos.length === 0) {
//             alert("Opción incorrecta. Escoja nuevamente");
//             tipoBocadito = prompt(promtTipoBocadito);
//             tiposBocaditosEscogidos = tipoBocadito.split(",")
//         }

//         for (const tipoBocaditosEscogido of tiposBocaditosEscogidos) {
//             const bocaditoEscogido = bocaditos.find((bocadito) => bocadito.tipo == tipoBocaditosEscogido);
//             let cantidadBocaditos = prompt(promtBocaditos(bocaditoEscogido.nombre, bocaditoEscogido.precio));
//             while (parseInt(cantidadBocaditos) < 50) {
//                 alert("Cantidad minima es 50");
//                 cantidadBocaditos = prompt(promtBocaditos(bocaditoEscogido.nombre, bocaditoEscogido.precio));
//             }
//             bocaditosEscogidos.push({
//                 bocadito: bocaditoEscogido,
//                 cantidadEscogida: cantidadBocaditos
//             })

//         }
//     }
//     // pedidos de tortas
//     let PreguntaTortas = prompt(promptPreguntaTortas).trim().toUpperCase();

//     while (PreguntaTortas !== "S" && PreguntaTortas !== "N") {
//         alert("opcion incorrecta. Escoja nuevamente");
//         PreguntaTortas = prompt(promptPreguntaTortas).trim().toUpperCase();
//     }
//     if (PreguntaTortas === "S") {
//         let tipoTorta = prompt(promtTipoTorta);
//         let tiposTortasEscogidas = tipoTorta.split(",");

//         while (tiposTortasEscogidas.length === 0) {
//             alert("opcion incorrecta. Escoja nuevamente");
//             tipoTorta = prompt(promtTipoTorta);
//             tiposTortasEscogidas = tipoTorta.split(",")
//         }
//         for (const tiposTortasEscogida of tiposTortasEscogidas) {
//             const tortaEscogida = tortas.find((torta) => torta.tipo == tiposTortasEscogida);
//             let cantidadTortas = prompt(promtTortas(tortaEscogida.nombre, tortaEscogida.precio));
//             while (parseInt(cantidadTortas) < 1) {
//                 alert("Cantidad nimina es 1");
//                 cantidadTortas = prompt(promtTortas(tortaEscogida.nombre, tortaEscogida.precio));
//             }
//             tortasEscogidas.push({
//                 torta: tortaEscogida,
//                 cantidadEscogida: cantidadTortas
//             })
//         }
//     }

//     if (bocaditosEscogidos.length === 0 && tortasEscogidas.length === 0) {
//         alert("No ha escogido ningun bocadito ni torta. Gracias.")
//         return;
//     }

//     let precioTotal = 0;

//     for (const bocaditoEscogido of bocaditosEscogidos) {
//         precioTotal += (bocaditoEscogido.cantidadEscogida * bocaditoEscogido.bocadito.precio);
//     }

//     for (const tortaEscogidas of tortasEscogidas) {
//         precioTotal += (tortaEscogidas.cantidadEscogida * tortaEscogidas.torta.precio);
//     }
//     alert(`Su pedido sale S/ ${precioTotal.toFixed(2)}`);

// }

// calcularPedido();
