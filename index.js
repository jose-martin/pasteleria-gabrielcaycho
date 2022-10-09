const claveLocalStorage = "carrito";

const obtenerJSON = async () => {
  const response = await fetch('assest/json/bocaditos.json')
  const data = await response.json()
  return data
}

const obtenerBocaditosJSON = async () => {
  const { bocaditos } = await obtenerJSON()
  return bocaditos
}
const obtenerTortasJSON = async () => {
  const { tortas } = await obtenerJSON()
  return tortas
}

async function mostrarBocaditos() {
  const contenedorBocaditos = document.getElementById("contenedor-bocaditos");

  if (!contenedorBocaditos) return;

  const plantillaHtml = `<div class="contenedor-bocaditos1">
        <div class="contenedor-bocaditos-imagen">
          <img src="urlBocadito" alt="" />
          <button
            type="button"
            onclick="verDetalleProducto(idProducto,tipo)"
            data-bs-toggle="modal"
            data-bs-target="#modalProducto"
          >
            Ver detalle
          </button>
        </div>
        <p>nombreBocadito S/. precioBocadito c/u</p>
      </div>`;

  const bocaditosAMostrar = [];

  const bocaditos = await obtenerBocaditosJSON()

  for (const bocadito of bocaditos) {
    let bocaditoAux = plantillaHtml;
    bocaditoAux = bocaditoAux.replace("urlBocadito", bocadito.imagen);
    bocaditoAux = bocaditoAux.replace("nombreBocadito", bocadito.name);
    bocaditoAux = bocaditoAux.replace(
      "idProducto",
      bocadito.id
    );
    bocaditoAux = bocaditoAux.replace(
      "tipo",
      `'B'`
    );
    bocaditoAux = bocaditoAux.replace(
      "precioBocadito",
      bocadito.precio.toFixed(2)
    );
    bocaditosAMostrar.push(bocaditoAux);
  }

  contenedorBocaditos.innerHTML = bocaditosAMostrar.join("");
}

mostrarBocaditos();

async function mostrarTortas() {
  const contenedorTortas = document.getElementById("contenedor-tortas");

  if (!contenedorTortas) return;

  const plantillaHtml = `<div class="contenedor-tortas1">
        <div class="contenedor-tortas-imagen">
          <img src="urlTorta" alt="" />
          <button
            type="button"
            onclick="verDetalleProducto(idProducto,tipo)"
            data-bs-toggle="modal"
            data-bs-target="#modalProducto"
          >
            Ver detalle
          </button>
        </div>
        <p>nombreTorta S/. precioTorta c/u</p>
      </div>`;

  const tortasAMostrar = [];

  const tortas = await obtenerTortasJSON()

  for (const torta of tortas) {
    let tortaAux = plantillaHtml;
    tortaAux = tortaAux.replace("urlTorta", torta.imagen);
    tortaAux = tortaAux.replace("nombreTorta", torta.name);
    tortaAux = tortaAux.replace(
      "idProducto",
      torta.id
    );
    tortaAux = tortaAux.replace(
      "tipo",
      `'T'`
    );
    tortaAux = tortaAux.replace(
      "precioTorta",
      torta.precio.toFixed(2)
    );
    tortasAMostrar.push(tortaAux);
  }

  contenedorTortas.innerHTML = tortasAMostrar.join("");
}
mostrarTortas()

// Evento para cerrar el carrito
document.addEventListener("keyup", (event) => {

  if (event.key === "Escape") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡¡¡Ud. cerro el carrito de compras¡¡¡¡',

    });
    cerrarCarrito()
  }
}
);

//usando la libreria

let cerrado = document.getElementById("cerrado");
cerrado.addEventListener("click", () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "Seguro que quiere cerrar el carrito",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si,cerrar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Cerrado!',
      )
      cerrarCarrito();
    } else {
      return;
    }
  })
});

function obtenerCarritoHtml() {
  return document.getElementById("carrito");
}

function abrirCarrito() {
  const carrito = obtenerCarritoHtml();
  if (!carrito) {
    return;
  }

  if (carrito.className.includes("carrito-abierto")) {
    return;
  }

  carrito.className = `${carrito.className} carrito-abierto`;
}

function cerrarCarrito() {
  const carrito = obtenerCarritoHtml();
  if (!carrito) {
    return;
  }
  carrito.className = "carrito";
}

async function verDetalleProducto(idProducto, tipo = "B") {
  const titleModal = document.getElementById("modalProductoLabel");
  const bodyModal = document.getElementById("modalProductoBody");

  const plantillaHtml = `<div class="contenedor-modal-body">
                          <img src="imagenProducto" />
                          <div class="contenedor-modal-descripcion">
                            <div class="contenedor-modal-opciones">
                              <span>Precio S/precioProducto</span>
                              <button onclick="agregarAlCarrito(idProducto,tipo)" id="agregarProducto">Agregar al Carrito</button>
                            </div>
                            <p>
                              descripcionProducto
                            </p>
                          </div>
                        </div>`;



  if (tipo === "B") {
    const bocaditos = await obtenerBocaditosJSON()
    const bocadito = bocaditos.find((x) => x.id === idProducto);
    titleModal.innerHTML = bocadito.name;
    bodyModal.innerHTML = plantillaHtml
      .replace("imagenProducto", bocadito.imagen)
      .replace("precioProducto", bocadito.precio.toFixed(2))
      .replace("idProducto", bocadito.id)
      .replace("tipo", `'${tipo}'`)
      .replace("descripcionProducto", bocadito.descripcion);
  } else if (tipo == "T") {
    const tortas = await obtenerTortasJSON()
    const torta = tortas.find((x) => x.id === idProducto);
    titleModal.innerHTML = torta.name;
    bodyModal.innerHTML = plantillaHtml
      .replace("imagenProducto", torta.imagen)
      .replace("precioProducto", torta.precio.toFixed(2))
      .replace("idProducto", torta.id)
      .replace("tipo", `'${tipo}'`)
      .replace("descripcionProducto", torta.descripcion);
  }

}

function obtenerCarrito() {
  let carrito = localStorage.getItem(claveLocalStorage);

  if (!carrito) {
    carrito = { productos: [], total: 0 };
  } else {
    carrito = JSON.parse(carrito);
  }
  return carrito;
}

function validarCarrito(carritoObj) {
  const carrito = carritoObj || obtenerCarrito();

  const textoCantidadCarrito = document.getElementById("carrito-cantidad-text");
  textoCantidadCarrito.innerHTML = carrito.productos.reduce(
    (a, b) => a + b.cantidad,
    0
  );
  // Mostrar aca los items del carrito
  const itemsCarrito = document.getElementById("itemCarrito");
  const totalCarrito = document.getElementById("totalCarrito");
  itemsCarrito.innerHTML = ""
  let div = document.createElement("div");
  const items = []

  const template = `<div class="carrito-body-titles">
    <div class="carrito-item-imagen">
      <img src="imagenSrc" />
    </div>
    <div class="carrito-item-detalle">
      <div class="carrito-item-descripcion">
        <span>Items</span>
        <span>Cantidad</span>
      </div>
      <span onclick="eliminarItem(idProducto)" class="eliminarItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-x"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z" />
          <path
            d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
        </svg>
      </span>
    </div>
  </div>`;


  for (const producto of carrito.productos) {
    let item = template;
    item = item
      .replace('imagenSrc', producto.imagen)
      .replace('Items', producto.name)
      .replace('Cantidad', producto.cantidad)
      .replace('idProducto', producto.id)
    items.push(item)
  }

  div.innerHTML = items.join('')
  totalCarrito.innerText = carrito.total.toFixed(2)
  itemsCarrito.append(div);
}

validarCarrito();

async function agregarAlCarrito(idProducto, tipo = "B") {


  const bocaditos = await obtenerBocaditosJSON()
  const tortas = await obtenerTortasJSON()

  Swal.fire({
    title: '¿Esta seguro de agregar el producto?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Agregar',
    denyButtonText: "No agregar",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

      const carrito = obtenerCarrito();
      if (tipo === "B") {
        const bocadito = bocaditos.find((x) => x.id == idProducto);
        const existeBocadito = carrito.productos.find((x) => x.id == bocadito.id);
        if (existeBocadito) {
          existeBocadito.cantidad += 1;
        } else {
          carrito.productos.push({
            id: bocadito.id,
            name: bocadito.name,
            cantidad: 1,
            precio: bocadito.precio,
            imagen: bocadito.imagen,
          });
        }
      } else if (tipo === "T") {
        const torta = tortas.find((x) => x.id == idProducto);
        const existetorta = carrito.productos.find((x) => x.id == torta.id);
        if (existetorta) {
          existetorta.cantidad += 1;
        } else {
          carrito.productos.push({
            id: torta.id,
            name: torta.name,
            cantidad: 1,
            precio: torta.precio,
            imagen: torta.imagen,
          });
        }
      }
      carrito.total = 0
      for (const producto of carrito.productos) {
        carrito.total += producto.precio * producto.cantidad;
      }

      localStorage.setItem(claveLocalStorage, JSON.stringify(carrito));
      validarCarrito(carrito);

      Swal.fire('Producto agregado al carrito!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('El producto no se agregó', '', 'info')
    }
  })
}



async function eliminarItem(idProducto) {
  Swal.fire({
    title: '¿Está seguro de eliminar el producto del carrito?',
    icon: "warning",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Sí',
    denyButtonText: "No",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      const carrito = obtenerCarrito();
      if (!carrito.productos || carrito.productos.length === 0) return;

      carrito.productos = carrito.productos.filter(x => x.id != idProducto)
      carrito.total = 0
      for (const producto of carrito.productos) {
        carrito.total += producto.precio * producto.cantidad;
      }

      localStorage.setItem(claveLocalStorage, JSON.stringify(carrito));
      validarCarrito(carrito);

      Swal.fire('Producto eliminado del carrito', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('El producto no se eliminó', '', 'info')
    }
  })
}

