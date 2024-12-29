document.addEventListener("DOMContentLoaded", () => {
    const contenedorItems = document.querySelector(".items");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarCantidadDeLibros();

    // Si el carrito está vacío, mostrar mensaje
    

    carrito.forEach((producto) => {
        const libro = `
            <div class="libro" data-id="${producto.id}">
                <img src="${producto.imagen}" alt="${producto.titulo}" class="portada-libro" height="135" width="105">
                <div class="informacion">
                    <p>Titulo: <b>${producto.titulo}</b></p>
                    <p>Autor: <b>${producto.autor}</b></p>
                    <p>Genero: <b>${producto.genero}</b></p>
                    <p>Precio: <b>$${producto.precio}</b></p>
                    <div class="cantidad-del-libro">
                        <button class="btn-disminuir" onclick="quitarProducto('${producto.id}')">-</button>
                        <span class="cantidad-producto">${producto.cantidad}</span>
                        <button class="btn-aumentar" onclick="agregarProducto('${producto.id}')">+</button>
                    </div>
                </div>
            </div>`;

        contenedorItems.innerHTML += libro;
    });

    mostrarTotal();
    const contenedorBotones = document.createElement("div");
    contenedorBotones.classList.add("button-container");

    const botonFinalizar = document.createElement("button");
    botonFinalizar.textContent = "Finalizar Compra";
    botonFinalizar.classList.add("btn", "btn-finalizar");
    botonFinalizar.addEventListener("click", finalizarCompra);

    const botonVaciar = document.createElement("button");
    botonVaciar.textContent = "Vaciar Carrito";
    botonVaciar.classList.add("btn", "btn-vaciar");
    botonVaciar.addEventListener("click", vaciarCarrito);

    contenedorItems.appendChild(contenedorBotones);
    contenedorBotones.appendChild(botonFinalizar);
    contenedorBotones.appendChild(botonVaciar);



    // Actualiza el total al cargar
    
   
    if (carrito.length === 0) {
        contenedorItems.innerHTML = '<p class="sin-items">El carrito está vacío.</p>';
        return;
    }
});

function finalizarCompra() {
    const contenedorItems = document.querySelector(".items");
    localStorage.removeItem("carrito");
    contenedorItems.innerHTML = '<p class="agradecimiento">Gracias por su compra! :)</p>';
    actualizarCantidadDeLibros();
    setTimeout(() => {
        // Eliminar el total si existe
        eliminarTotal();

        // Vaciar el contenedor de productos
        contenedorItems.innerHTML = '<p class="sin-items">El carrito está vacío.</p>';
        
        // Actualizar la cantidad de libros (que ahora será 0)
        actualizarCantidadDeLibros();
    }, 10000000);  // 1000 ms de retraso (1 segundo)
}



function vaciarCarrito() {
    localStorage.removeItem("carrito");
    const contenedorItems = document.querySelector(".items");
    contenedorItems.innerHTML = '<p class="sin-items">El carrito está vacío.</p>';
    actualizarCantidadDeLibros();
    eliminarTotal();
}

function actualizarCantidadDeLibros() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidadDeLibros = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    const cantidadDeLibrosElements = document.querySelectorAll(".cantidad-libros");

    cantidadDeLibrosElements.forEach((element) => {
        element.innerText = cantidadDeLibros;
    });
}

function mostrarTotal() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const precioTotal = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);

    const contenedorItems = document.querySelector(".items");

    const totalElemento = document.createElement("div");
    totalElemento.classList.add("total-container");
    totalElemento.innerHTML = `<p><strong>Total: $${precioTotal}</strong></p>`;

    const totalExistente = contenedorItems.querySelector(".total-container");
    if (!totalExistente) {
        contenedorItems.appendChild(totalElemento);
    } else {
        totalExistente.innerHTML = `<p><strong>Total: $${precioTotal}</strong></p>`;
    }
}

function eliminarTotal() {
    const contenedorItems = document.querySelector(".items");
    const totalExistente = contenedorItems.querySelector(".total-container");
    if (totalExistente) {
        totalExistente.remove();
    }
}

function agregarProducto(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = carrito.find((producto) => producto.id == id);
    if (producto) {
        producto.cantidad++;
        producto.precio = producto.precio / (producto.cantidad - 1) * producto.cantidad; // Recalcular precio

        // Guarda el carrito actualizado en el localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Actualiza la cantidad en el DOM
        const cantidadElemento = document.querySelector(`[data-id="${id}"] .cantidad-producto`);
        cantidadElemento.innerHTML = `${producto.cantidad}`;

        actualizarCantidadDeLibros();
        mostrarTotal();
    }
}

function quitarProducto(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = carrito.find((producto) => producto.id == id);
    if (producto) {
        if (producto.cantidad > 1) {
            producto.cantidad--;
            producto.precio = producto.precio / (producto.cantidad + 1) * producto.cantidad; // Recalcular precio
        } else {
            eliminarProductoSiCantidadCero(id);
            return;
        }

        // Guarda el carrito actualizado en el localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Actualiza la cantidad en el DOM
        const cantidadElemento = document.querySelector(`[data-id="${id}"] .cantidad-producto`);
        cantidadElemento.innerHTML = `${producto.cantidad}`;

        actualizarCantidadDeLibros();
        mostrarTotal();
    }
}

function eliminarProductoSiCantidadCero(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoIndex = carrito.findIndex((producto) => producto.id == id);
    if (productoIndex !== -1) {
        carrito.splice(productoIndex, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        const productoElemento = document.querySelector(`[data-id="${id}"]`);
        if (productoElemento) {
            productoElemento.remove();
        }

        actualizarCantidadDeLibros();
        mostrarTotal();
    }
}
