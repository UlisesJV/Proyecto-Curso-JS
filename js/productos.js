let productos = []; // Declaramos productos como variable global

// Cargar productos desde JSON
fetch("json/productos.json")
    .then((response) => response.json()) // Convertimos la respuesta en JSON
    .then((data) => {
        productos = data; // Guardamos productos en la variable global
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const mercContainer = document.querySelector(".merc-container");
        const loMejorDeTerror = document.querySelector(".libros-terror");
        const loMejorDeLaCienciaFiccion = document.querySelector(".libros-ciencia-ficcion");
        const loMejorDeLaInfancia = document.querySelector(".libros-infancia");

        // Renderizamos los productos dinámicamente
        productos.forEach((producto) => {
            if (document.title === "Inicio") {
                if (producto.genero === "Infantil") {
                    if (producto.titulo === "El Principito" || producto.titulo === "Alicia en el país de las maravillas" || producto.titulo === "Peter Pan") {
                        loMejorDeLaInfancia.innerHTML += `
                        <div class="item" data-id="${producto.id}">
                            <table>
                                <tr>
                                    <th>
                                        <img src="${producto.imagen}" alt="${producto.titulo}" height="225" width="160">
                                    </th>
                                </tr>
                                <tr>
                                    <td><b>${producto.titulo}</b></td>
                                </tr>
                                <tr>
                                    <td style="color:orangered">$${producto.precio}</td>
                                </tr>
                                <tr>
                                   <td><a class="detalles" href ="detalles.html?id=${producto.id}">Detalles</a></td>
                                </tr>
                                <tr>
                                    <td><span class="compra">Agregar</span></td>
                                </tr>
                            </table>
                        </div>`;
                    }
                }
                if (producto.genero === "Terror") {
                    if (producto.titulo === "Dracula" || producto.titulo === "Frankenstein" || producto.titulo === "La llamada de Cthulhu") {
                        loMejorDeTerror.innerHTML += `
                        <div class="item" data-id="${producto.id}">
                            <table>
                                <tr>
                                    <th>
                                        <img src="${producto.imagen}" alt="${producto.titulo}" height="225" width="160">
                                    </th>
                                </tr>
                                <tr>
                                    <td><b>${producto.titulo}</b></td>
                                </tr>
                                <tr>
                                    <td style="color:orangered">$${producto.precio}</td>
                                </tr>
                                <tr>
                                   <td><a class="detalles" href ="detalles.html?id=${producto.id}">Detalles</a></td>
                                </tr>
                                <tr>
                                    <td><span class="compra">Agregar</span></td>
                                </tr>
                            </table>
                        </div>`;
                    }
                }
                if (producto.genero === "Ciencia Ficción") {
                    if (producto.titulo === "La máquina del tiempo" || producto.titulo === "La guerra de los mundos" || producto.titulo === "El hombre invisible") {
                        loMejorDeLaCienciaFiccion.innerHTML += `
                        <div class="item" data-id="${producto.id}">
                            <table>
                                <tr>
                                    <th>
                                        <img src="${producto.imagen}" alt="${producto.titulo}">
                                    </th>
                                </tr>
                                <tr>
                                    <td><b>${producto.titulo}</b></td>
                                </tr>
                                <tr>
                                    <td style="color:orangered">$${producto.precio}</td>
                                </tr>
                                <tr>
                                    <td><a class="detalles" href ="detalles.html?id=${producto.id}">Detalles</a></td>
                                </tr>
                                <tr>
                                    <td><span class="compra">Agregar</span></td>
                                </tr>
                            </table>
                        </div>`;
                    }
                }
            } else {
                mercContainer.innerHTML += `
                <div class="item" data-id="${producto.id}">
                    <table>
                        <tr>
                            <th>
                                <img src="${producto.imagen}" alt="${producto.titulo}" height="250" width="160">
                            </th>
                        </tr>
                        <tr>
                            <td><b>${producto.titulo}</b></td>
                        </tr>
                        <tr>
                            <td style="color:orangered">$${producto.precio}</td>
                        </tr>
                        <tr>
                            <td><a class="detalles" href ="detalles.html?id=${producto.id}">Detalles</a></td>
                        </tr>
                        <tr>
                            <td><span class="compra">Agregar</span></td>
                        </tr>
                    </table>
                </div>`;
            }
        });

        // Manejar el evento para agregar al carrito
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("compra")) {
                event.preventDefault();

                const id = event.target.closest(".item").dataset.id;
                const producto = productos.find((p) => p.id == id);

                if (producto) {
                    const { titulo, autor, imagen, genero, id, precio,descripcion } = producto;
                    const nuevoProducto = {
                        genero: genero,
                        imagen: imagen,
                        id: id,
                        titulo: titulo,
                        autor: autor,
                        cantidad: 1,
                        precio: precio,
                        descripcion :descripcion,
                    };

                    carrito.push(nuevoProducto);
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    console.log("Producto agregado al carrito:", nuevoProducto);

                    actualizarCantidadDeLibros();
                } else {
                    console.error("Producto no encontrado.");
                }
            }
        });


        actualizarCantidadDeLibros();
        
    })
    .catch((error) => {
        console.error("Error al cargar los productos:", error);
    });

function actualizarCantidadDeLibros() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidadDeLibros = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    const cantidadDeLibrosElements = document.querySelectorAll(".cantidad-libros");

    cantidadDeLibrosElements.forEach((element) => {
        element.innerText = cantidadDeLibros;
    });
}

