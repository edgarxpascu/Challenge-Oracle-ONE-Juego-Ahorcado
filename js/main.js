var botonJugar = document.querySelector("#boton-jugar");
var botonAgregar = document.querySelector("#boton-agregar");
document.getElementById('areajuego').style.display = 'none';
document.getElementById('agregarpalabra').style.display = 'none';

// Para poder jugar 
botonJugar.addEventListener("click", function(event){
    event.preventDefault();
    var x = document.getElementById('areajuego');
    if (x.style.display === 'none') {  
        x.style.display = 'block';
        iniciarJuego();
    } else {
        x.style.display = 'none';
    }
});

// Para agregar palabra 
botonAgregar.addEventListener("click", function(event){
    event.preventDefault();
    var x = document.getElementById('agregarpalabra');
    if (x.style.display === 'none') {  
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
});

/*
//Entrada
entrada.onkeyup = function(event) {
    if (this.value.length === 0) {
        document.getElementById("salida").value = "";
        var mensajesErrores = document.querySelector("#mensajes-errores");
        mensajesErrores.innerHTML = ""; 
    }
}
*/