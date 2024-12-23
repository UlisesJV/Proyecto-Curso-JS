// Simulación de datos de libros obtenidos desde un archivo JSON
let libros = [];

fetch("json/productos.json")
  .then((response) => response.json()) // Convertimos la respuesta en JSON
  .then((data) => {
    libros = data; // Guardamos los datos en la variable global

    // Detectar si estamos en la página de detalles
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "detalles.html") {
      // Obtener el parámetro de la URL
      const params = new URLSearchParams(window.location.search);
      const idLibro = parseInt(params.get("id"));

      // Buscar el libro con el ID correspondiente
      const libro = libros.find((libro) => libro.id === idLibro);

      if (libro) {
        document.getElementById("titulo").textContent = libro.titulo;
        document.getElementById("autor").textContent = libro.autor;
        document.getElementById("precio").textContent = libro.precio;
        
        // Crear un nuevo párrafo y asignar la descripción
        const descripcionP = document.createElement("p");
        descripcionP.textContent = libro.descripcion; // Asigna el texto de la descripción al párrafo
    
        // Reemplazar el contenido del div de descripción por el nuevo párrafo
        document.getElementById("descripcion").innerHTML = ''; // Limpiar cualquier contenido anterior
        document.getElementById("descripcion").appendChild(descripcionP); // Añadir el párrafo al contenedor
    
        document.querySelector(".descripcion-ampliada img").src = libro.imagen;
    }
    
    
      else {
        // Mostrar mensaje de error si no se encuentra el libro
        document.body.innerHTML = "<p>Libro no encontrado.</p>";
      }
    }
  })
  .catch((error) => {
    console.error("Error al cargar los datos:", error);
    document.body.innerHTML = "<p>Error al cargar los datos del libro.</p>";
  });
