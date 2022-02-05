var palabras;
var categoria;
var palabra;
var palabraEscondida;
var vidas = 10;
var letras = [];
var letrasIncorrectas = [];

var canvas = document.getElementById("canvas0");
var context = canvas.getContext("2d");

var canvas1 = document.getElementById("canvas1");
var context1 = canvas1.getContext("2d");
context1.font = "30px Arial";
context1.textAlign = "center";
context1.fillStyle  = "#DAA26C";

var canvas2 = document.getElementById("canvas2");
var context2 = canvas2.getContext("2d");
context2.font = "30px Comic Sans MS";
context2.textAlign = "center";

var getVidas = document.getElementById("vidas");
var getLetras = document.getElementById("letras");
var getLetrasUsadas = document.getElementById("letrasUsadas");
var getLetrasIncorrectas = document.getElementById("letrasIncorrectas");
var getMensajeGanador =document.getElementById("mensajeganador");
var getJuegoNuevo = document.getElementById("juegoNuevo");
var getPalabraEscondida = document.getElementById("palabraEscondida");
var getCategoria = document.getElementById("categoria");

palabras = [
    ["México", "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica","Cuba", "Ecuador", "El Salvador", "Guatemala", "Haití", "Honduras", 
    "Nicaragua","Panamá","Paraguay","Perú","República Dominicana","Uruguay","Venezuela"],
    ["Ciudad de México", "San Pablo", "Buenos Aires", "Río de Janeiro", "Lima", "Bogotá","Santiago","Guadalajara","Belo Horizonte","Monterrey"],
    ["Peso Argentino", "Boliviano", "Real brasileño", "Peso chileno", "Peso colombiano","Colón costarricense", "Peso cubano", "Peso mexicano", "Dólar estadounidense",
    "Quetzal","Gourde haitiano","Lempira","Córdoba nicaragüense","Guaraní paraguayo","Nuevo sol","Peso dominicano","Peso uruguayo","Bolívar"]
];

function iniciarJuego(){
    limpiar();
    seleccionarPalabra();
    rifa();
    console.log(palabra)
    document.addEventListener("keydown", teclado);
}

function limpiar() {
    vidas = 10;
    getVidas.innerText  = 'Actualmente cuentas con: ' + vidas + ' vidas';
    letras = [];
    letrasIncorrectas = [];
    getLetras.innerText  = "";
    getLetrasUsadas.innerText  = '';
    getMensajeGanador.innerText  = "";
    getJuegoNuevo.innerText  = "";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context1.clearRect(0, 0, canvas.width, canvas.height);
    context2.clearRect(0, 0, canvas.width, canvas.height);
}

function seleccionarPalabra() {
    categoria = palabras[Math.floor(Math.random() * palabras.length)];
    palabra = categoria[Math.floor(Math.random() * categoria.length)].toUpperCase();
    palabraEscondida = palabra.replace(/[a-zñÁÉÍÓÚ]/gi,"_ ");
    context1.fillText(palabraEscondida, canvas1.width/2, canvas1.height/2); 
    getVidas.innerText  = 'Actualmente cuentas con: ' + vidas + ' vidas';
}

function teclado() {
    var keyCode = event.keyCode; 
    var letra = event.key.toUpperCase();

    if ((keyCode>=65  &&  keyCode<= 90) | keyCode ==192 ) {
        revisarLetra(letra,palabra,palabraEscondida);
    }
}

function revisarLetra(l,p,pE) {
    if (vidas <= 1) {
        vidas--;
        canvasAnimado();
        perdedor();
        return;
    }
    
    conteoLetras(l);
    var posicion = [];
    for (var i = 0; i <= p.length; i++) {
        if (p[i] === l){
            posicion.push(i);
        }
    }
    
    if (posicion.length > 0) {
        const vector = pE.split(' ');
        for (var v = 0; v < posicion.length; v++) {
            vector.splice(posicion[v], 1, l);
        }
        var result = vector.join(" ");
        palabraEscondida = result;
        context1.clearRect(0, 0, canvas.width, canvas.height);
        context1.fillText(palabraEscondida, canvas1.width/2, 380); 
    }

    if (palabraEscondida.indexOf('_') === -1) {
        ganador();
        return;
    }

    if(palabra.indexOf(l) === -1){
        vidas--;
        canvasAnimado();
        getVidas.innerText  = 'Te quedan: ' + vidas + ' intentos';
    }

}

function conteoLetras(l) {
    if (letras.includes(l)) {
        getLetras.innerText  = l + ' ya fue ocupada anteriormente';
    }else{
        letras.push(l);
        getLetras.innerText  = '';
        if (palabra.indexOf(l) === -1) {
            letrasIncorrectas.push(l);
        } 
    }
    getLetrasUsadas.innerText  = 'Letras incorrectas: ' + letrasIncorrectas.sort();
}

function ganador() {
    context2.fillStyle = "#6A9B59";
    context1.clearRect(0, 0, canvas.width, canvas.height);
    context2.fillText("Ganaste, ¡felicidades!", canvas.width/2, canvas.height/2);  
    getMensajeGanador.innerText  = ' La palabra secreta era: ' + palabra ;
    getCategoria.innerHTML  = '';
    getLetras.innerText  = '';
    getLetrasUsadas.innerText  = '';
    getVidas.innerText  = '';
    getJuegoNuevo.innerText  = 'Para volver a jugar, presiona dos veces el botón jugar o la tecla enter';
}

function perdedor() {
    context2.fillStyle = "#D62839";
    context1.clearRect(0, 0, canvas.width, canvas.height);
    context2.fillText("Fin del juego", canvas.width/2, canvas.height/2); 
    getVidas.innerText  = 'Perdiste todas tus vidas :(';
    getMensajeGanador.innerText  = ' La palabra secreta era: ' + palabra ;
    getJuegoNuevo.innerText  = 'Para volver a jugar, presiona dos veces el botón jugar o la tecla enter';
    getLetras.innerText  = '';
    getLetrasUsadas.innerText  = '';
    getCategoria.innerHTML  = '';
}

function canvasAnimado() {
    context.lineWidth = 2;
    
    dibujarAhorcado = [
        [300,   235,    225,    364],   //0
        [300,   235,    375,    364],   //1
        [300,   110,    229,    206],   //2
        [300,   110,    371,    206],   //3
        [300,   85,     300,    235],   //4
        [300,   60,     25,     0,      2 * Math.PI],  //5
        [300,   10,     300,    35],    //6
        [200,   10,     300,     10],   //7
        [200,   390,     200,    10],   //8
        [180,   390,    400,    390]    //9
    ]
    context.fillStyle = 'rgb(255, 0, 0)';
    dibujar(dibujarAhorcado[vidas]);
}

function dibujar(array){
    lista = array;
    context.strokeStyle = '#000000';

    if (lista.length > 4) {
        context.beginPath();
        context.arc(lista[0],lista[1],lista[2],lista[3],lista[4]);
        context.strokeStyle = "#fffacd";
        context.stroke();
        context.closePath();
    } else {
        context.beginPath();
        context.moveTo(lista[0],lista[1]);
        context.lineTo(lista[2],lista[3]);
        context.strokeStyle = "#fffacd";
        context.stroke();
        context.closePath();
    }    
}

function rifa() {
    if (categoria === palabras[0]) {
      getCategoria.innerHTML    = "La palabra es algún país de América Latina ";
    } else if (categoria === palabras[1]) {
      getCategoria.innerHTML    = "La palabra es una de las ciudades más pobladas de América Latina";
    } else if (categoria === palabras[2]) {
      getCategoria.innerHTML    = "La palabra es alguna de las monedas usadas en América Latina";
    }
}