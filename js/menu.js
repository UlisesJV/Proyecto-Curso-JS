const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const body = document.querySelector("body");

abrir.addEventListener("click", () => {
    nav.classList.add("nav-visible"); // Muestra el menú
    body.classList.add("no-scroll"); // Desactiva el scroll de la página
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("nav-visible"); // Oculta el menú
    body.classList.remove("no-scroll"); // Reactiva el scroll de la página
});
