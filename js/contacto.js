const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");
const form = document.getElementById("contacto");
const parrafo = document.getElementById("warnings");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let warnings = "";
    let entrar = false;
    let expresionesRegularesEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    parrafo.innerHTML = "";
    if(nombre.value.length < 5){
        warnings += "El nombre no es valido.<br>";
        entrar = true;
    }
    if(!expresionesRegularesEmail.test(email.value)){
        warnings +="El email no es válido.<br>";
        entrar = true;
    }
    if(entrar){
        parrafo.innerHTML = warnings;
    }
    else {
        parrafo.innerHTML = "Formulario enviado correctamente.";
        form.submit();
    }
});