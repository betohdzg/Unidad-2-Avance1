function saludar() {
    let salida = document.getElementById("salida_boton");

    salida.innerText = "Hola desde la funcion saludar"
}

let otro_boton = document.getElementById("otro_boton");
otro_boton.addEventListener("click", function() {
    let salida = document.getElementById("salida_otro");
    salida.innerText = "Otro saludo fachero";
});

otro_boton.addEventListener("mouseenter", function() {
this.innerText = "Entro el mouse"
})

otro_boton.addEventListener("mouseleave", function() {
this.innerText = "Salió el mouse"
})

let nombreTxt = document.getElementById("nombre");
let salida_input = document.getElementById("salida_teclado");

nombreTxt.addEventListener("keydown", function(event) {
    salida_teclado.innerHTML = `
    Se presionó <kbd>${event.key}</kbd>`
    ;
});

let miForm = document.getElementById("miForm");
miForm.addEventListener("submit", function(event){
    event.preventDefault();
    //alert("Se intento procesar el formulario");
    let aTxt = document.getElementById("a");
    let bTxt = document.getElementById("b");
   //console.log(aTxt, bTxt);
    let salida = document.getElementById("salida_suma");

let a = parseInt(aTxt.value);
let b = parseInt(bTxt.value);
let resultado = a + b;
salida.innerText = resultado;
});
