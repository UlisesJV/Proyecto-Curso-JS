document.addEventListener("DOMContentLoaded", () => {
    const contenedorItems = document.querySelector(".items");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        contenedorItems.innerHTML = '<p class="sin-items">El carrito está vacío.</p>';
        return;
    }

    carrito.forEach((producto) => {
        let bandera = false; 
        let acumular = 0;  
        let elementoExistente; 
        let aux = producto.precio;
        carrito.forEach((item) => {
            if (item.id === producto.id) {
                bandera = true;
            }

            if (bandera && item.id === producto.id) {
                acumular++;
                producto.cantidad = acumular;  
                producto.precio = aux * acumular;
                elementoExistente = document.querySelector(`[data-id="${producto.id}"]`); 
            }
        });

        if (bandera && elementoExistente) {
            const parrafoCantidad = elementoExistente.querySelector('.informacion p:nth-child(4)');
            parrafoCantidad.innerHTML = `Cantidad: <b>${producto.cantidad}</b>`;
        } else {
            const libro = `
                <div class="libro" data-id="${producto.id}">
                    <img src="${producto.imagen}" alt="${producto.titulo}" class="portada-libro" height="135" width="105">
                    <div class="informacion">
                        <p>Titulo: <b>${producto.titulo}</b></p>
                        <p>Autor: <b>${producto.autor}</b></p>
                        <p>Genero: <b>${producto.genero}</b></p>
                        <p>Cantidad: <b>${producto.cantidad}</b></p>
                        <p>Precio: <b>$${producto.precio}</b></p>
                    </div>
                </div>`;

            contenedorItems.innerHTML += libro;
            actualizarCantidadDeLibros();
        }
    });

    const contenedorBotones = document.createElement("div");
    contenedorBotones.classList.add("button-container");

    const botonFinalizar = document.createElement("button");
    botonFinalizar.textContent = "Finalizar Compra";
    botonFinalizar.classList.add("btn", "btn-finalizar");
    botonFinalizar.addEventListener("click", finalizarCompra);
    mostrarTotal();

    const botonVaciar = document.createElement("button");
    botonVaciar.textContent = "Vaciar Carrito";
    botonVaciar.classList.add("btn", "btn-vaciar");
    botonVaciar.addEventListener("click", vaciarCarrito);

    contenedorBotones.appendChild(botonFinalizar);
    contenedorBotones.appendChild(botonVaciar);

    contenedorItems.appendChild(contenedorBotones);
});

function finalizarCompra() {
    localStorage.removeItem("carrito");
    const contenedorItems = document.querySelector(".items");
    contenedorItems.innerHTML = '<p class="agradecimiento">Gracias por su compra! :)</p>';
    actualizarCantidadDeLibros();
    eliminarTotal();
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
