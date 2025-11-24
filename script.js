// ------------------- Variables -------------------
let productos = [];
let paginaActual = 1;
const porPagina = 8;

// Carrito global guardado
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ------------------- Cargar JSON -------------------
function cargarJSON() {
    fetch("productos.json")
        .then(res => res.json())
        .then(data => {
            productos = data;
            mostrarPagina(paginaActual);
            generarBotones();
            actualizarBurbuja(); // Actualiza icono flotante al cargar
        });
}

// ------------------- Mostrar productos -------------------
function mostrarPagina(num) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    const inicio = (num - 1) * porPagina;
    const fin = inicio + porPagina;

    const items = productos.slice(inicio, fin);

    items.forEach(prod => {
        contenedor.innerHTML += `
        <div class="card">
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>${prod.desc}</p>
            <span class="precio">$${prod.precio}</span>
            <button class="btn btn-agregar"
                    data-nombre="${prod.nombre}"
                    data-precio="${prod.precio}">
            Agregar
            </button>
        </div>`;
    });

    activarBotonesCarrito();
}

// ------------------- Paginación -------------------
function generarBotones() {
    const totalPaginas = Math.ceil(productos.length / porPagina);
    const paginacion = document.getElementById("paginacion");

    paginacion.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
        paginacion.innerHTML += `
        <button class="pagina-btn" onclick="cambiarPagina(${i})">${i}</button>`;
    }
}

function cambiarPagina(num) {
    paginaActual = num;
    mostrarPagina(num);
}

// ------------------- Carrito -------------------
function actualizarBurbuja() {
    const burbuja = document.getElementById("burbujaCantidad");
    if (burbuja) burbuja.textContent = carrito.length;
}

function activarBotonesCarrito() {
    document.querySelectorAll(".btn-agregar").forEach(btn => {
        btn.addEventListener("click", () => {
            const nombre = btn.dataset.nombre;
            const precio = parseFloat(btn.dataset.precio);

            carrito.push({ nombre, precio });

            // Guardar en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            actualizarBurbuja();

            alert(nombre + " agregado al carrito!");
        });
    });
}

// ------------------- Iniciar -------------------
cargarJSON();
