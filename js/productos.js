let nItem = 0;
fetch("json/productos.json")
    .then((response) => response.json()) // Convierte la respuesta en JSON
    .then((data) => {
        const productos = data; // Asignamos el JSON a la variable productos
        console.log(productos); // Esto ahora funcionará correctamente

        // Seleccionamos el contenedor donde queremos insertar los productos
        const mercContainer = document.querySelector(".merc-container");

        // Iteramos sobre cada producto en el JSON
        productos.forEach((producto) => {
            if(nItem == 8){
                nItem = 0;
            }
            // Usamos innerHTML para insertar el contenido dinámicamente
            mercContainer.innerHTML += `
                    <div class= "item">
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
                                <td><a class="compra" href="${producto.linkCompra}">Agregar</a></td>
                            </tr>
                        </table>
                    </div>
            `;
        });
    })
    .catch((error) => {
        console.error('Error al cargar el archivo JSON:', error);
    });
