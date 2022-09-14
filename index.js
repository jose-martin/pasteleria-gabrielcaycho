const { bocaditos } = {
  bocaditos: [
    {
      id: 1,
      name: "Bocadito de Matrimonio",
      precio: 2,
      imagen: "./assest/bocadito3.webp",
      descripcion: "descripcion",
    },
    {
      id: 2,
      name: "Bocaditos dulces variados",
      precio: 0.8,
      imagen: "./assest/bocadito4.jpg",
      descripcion: "descripcion",
    },
    {
      id: 3,
      name: "Empanada dulce",
      precio: 1,
      imagen: "./assest/bocadito5.jpg",
      descripcion: "descripcion",
    },
    {
      id: 4,
      name: "Beso de moza",
      precio: 1,
      imagen: "./assest/bocadito6.jpg",
      descripcion: "descripcion",
    },
    {
      id: 5,
      name: "Minis alfajores",
      precio: 0.8,
      imagen: "./assest/bocadito7.jpg",
      descripcion: "descripcion",
    },
    {
      id: 6,
      name: "Chupetines en vaso",
      precio: 1.5,
      imagen: "./assest/bocadito8.jpg",
      descripcion: "descripcion",
    },
  ],
};

const claveLocalStorage = "carrito";

function mostrarBocaditos() {
  const contenedorBocaditos = document.getElementById("contenedor-bocaditos");

  if (!contenedorBocaditos) return;

  const plantillaHtml = `<div class="contenedor-bocaditos1">
        <div class="contenedor-bocaditos-imagen">
          <img src="urlBocadito" alt="" />
          <button
            type="button"
            onclick="funcionBocadito"
            data-bs-toggle="modal"
            data-bs-target="#modalProducto"
          >
            Ver detalle
          </button>
        </div>
        <p>nombreBocadito S/. precioBocadito c/u</p>
      </div>`;

  const bocaditosAMostrar = [];

  for (const bocadito of bocaditos) {
    let bocaditoAux = plantillaHtml;
    bocaditoAux = bocaditoAux.replace("urlBocadito", bocadito.imagen);
    bocaditoAux = bocaditoAux.replace("nombreBocadito", bocadito.name);
    bocaditoAux = bocaditoAux.replace(
      "funcionBocadito",
      `verDetalleProducto(${bocadito.id})`
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

function verDetalleProducto(idProducto) {
  const titleModal = document.getElementById("modalProductoLabel");
  const bodyModal = document.getElementById("modalProductoBody");

  const bocadito = bocaditos.find((x) => x.id === idProducto);

  const plantillaHtml = `<div class="contenedor-modal-body">
                          <img src="imagenProducto" />
                          <div class="contenedor-modal-descripcion">
                            <div class="contenedor-modal-opciones">
                              <span>Precio S/precioProducto</span>
                              <button onclick="agregarAlCarrito(idProducto)">Agregar al Carrito</button>
                            </div>
                            <p>
                              descripcionProducto
                            </p>
                          </div>
                        </div>`;

  titleModal.innerHTML = bocadito.name;
  bodyModal.innerHTML = plantillaHtml
    .replace("imagenProducto", bocadito.imagen)
    .replace("precioProducto", bocadito.precio.toFixed(2))
    .replace("idProducto", bocadito.id)
    .replace("descripcionProducto", bocadito.descripcion);
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
}

validarCarrito();

function agregarAlCarrito(idProducto) {
  const carrito = obtenerCarrito();
  const bocadito = bocaditos.find((x) => x.id === idProducto);

  const existeBocadito = carrito.productos.find((x) => x.id === bocadito.id);
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

  for (const producto of carrito.productos) {
    carrito.total += producto.precio * producto.cantidad;
  }

  localStorage.setItem(claveLocalStorage, JSON.stringify(carrito));
  validarCarrito(carrito);
}
