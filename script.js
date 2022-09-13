const pantalla = document.querySelector("canvas");
const pincel = pantalla.getContext("2d");
const adivinar_letra = document.querySelector("#adivinar_letra");
const nueva_palabra = document.querySelector("#nueva_palabra");
const texto_acertado = document.querySelector("#texto_acertado");
const texto_error = document.querySelector("#texto_error");
const agregar = document.querySelector(".agregar");
const menu_agregar_palabra = document.querySelector(".menu_agregar_palabra");
const cancelar = document.querySelector(".cancelar");
const confirmar = document.querySelector(".confirmar");
const div_campo_vacio = document.querySelector(".div_campo_vacio");
const div_caracter_incorrecto = document.querySelector(".div_caracter_incorrecto");
const div_ganaste = document.querySelector(".div_ganaste");
const div_perdiste = document.querySelector(".div_perdiste");
const div_palabra_repetida = document.querySelector(".div_palabra_repetida");
const btn_ok_uno = document.querySelector(".btn_ok_uno");
const btn_ok_dos = document.querySelector(".btn_ok_dos");
const btn_ok_tres = document.querySelector(".btn_ok_tres");
const btn_ok_cuatro = document.querySelector(".btn_ok_cuatro");
const btn_ok_cinco = document.querySelector(".btn_ok_cinco");
var array_palabras = new Array();
array_palabras = ["perro", "gatoe", "remache", "piedra", "oveja", "abeja", "documentales"];
var i = 1;
const aceptar = document.querySelector(".aceptar");
const posicion =  Math.round(Math.random()*(array_palabras.length - 1));
var palabra = array_palabras[posicion]; 
var contador = 0;
var registro_letras =[];

/*LINEA DE LA BASE*/
pincel.beginPath();
pincel.strokeStyle="black";
pincel.lineWidth= 5;
pincel.moveTo(15, 400);
pincel.lineTo(300, 400);
pincel.stroke();

dibujarLineas(palabra);

adivinar_letra.addEventListener("keyup", (e) =>{
    e.preventDefault();
    let key = e.keyCode;
    if((key>=0 && key <=7) || (key>=10 && key <=12) || (key>=14 && key <=15) || (key==19) || (key>=21 && key <=26) || (key>=28 && key <=31) || (key>=33 && key <=36) || (key>=41 && key <=43) || (key>=47 && key <=64) || (key >=92 && key <=96) || (key >=123 && key <=126) || (key>=128 && key <=163) || (key >=166 && key <=172) || (key>=176 && key <=191) || (key>=193 && key<=255)){
        div_caracter_incorrecto.style.display = "block";
        agregar.disabled=true;
        adivinar_letra.value = "";
    }
});

//Evento cuando se ingresa un caracter no permitido
btn_ok_uno.addEventListener("click", () =>{
    div_caracter_incorrecto.style.display = "none";
    agregar.disabled = false;
});


//Evento cuando no se ingresa valores en el campo de texto
btn_ok_dos.addEventListener("click", () =>{
    div_campo_vacio.style.display = "none";
    agregar.disabled = false;
});

//Evento cuando se gana en el juego del ahorcado
btn_ok_tres.addEventListener("click", () =>{
    div_ganaste.style.display = "none";
    agregar.disabled = false;
    pincel.clearRect(0, 0, 400, 397);
    pincel.clearRect(0 ,440, 400, 460);
    pincel.clearRect(0, 450, 400, 520)
    i = 1;
    let posicion =  Math.round(Math.random()*(array_palabras.length - 1));
    palabra = array_palabras[posicion];
    registro_letras =[];
    dibujarLineas(palabra);
});

//Evento cuando se pierde en el juego del ahorcado
btn_ok_cuatro.addEventListener("click", () =>{
    div_perdiste.style.display = "none";
    agregar.disabled = false;
    pincel.clearRect(0, 0, 400, 397);
    pincel.clearRect(0, 450, 400, 520)
    i = 1;
    let posicion =  Math.round(Math.random()*(array_palabras.length - 1));
    palabra = array_palabras[posicion];
    dibujarLineas(palabra);
    registro_letras =[];
});

//Evento cuando no se ingresa valores en el campo de agregar nueva palabra
btn_ok_cinco.addEventListener("click", () =>{
    div_palabra_repetida.style.display = "none";
    agregar.disabled = false;
});

//Eventos cuando se da click en boton aceptar
aceptar.addEventListener("click", ()=>{
    if(adivinar_letra.value == ""){
        div_campo_vacio.style.display = "block";
        agregar.disabled = true;       
    }
    else{
        let letra_ingresada = adivinar_letra.value;
        dibujoAhorcado(letra_ingresada); 
        if (contador == palabra.length){
            div_ganaste.style.display = "block";  
            contador =0;    
        }
    }
    adivinar_letra.value = "";
});

//Eventos cuando se da click en boton agregar
agregar.addEventListener("click", () =>{
    menu_agregar_palabra.style.display = "block";
    nueva_palabra.value ="";
});

//Eventos cuando se da click en boton cancelar
cancelar.addEventListener("click", () =>{
    menu_agregar_palabra.style.display = "none";
    nueva_palabra.value ="";
});

//Eventos cuando se da click en boton confirmar
confirmar.addEventListener("click", () =>{
    if (nueva_palabra.value == ""){
        div_campo_vacio.style.display ="block";
        menu_agregar_palabra.style.display = "none";
        agregar.disabled = true;
    }
    else{
        let palabra = nueva_palabra.value;
        ingresarNuevaPalabra(palabra);
        menu_agregar_palabra.style.display = "none"; 
    }

});

//Evento para ingresar nueva palabra al arreglo
function ingresarNuevaPalabra(palabra){
array_palabras.push(palabra);
}

//Eventos de dibujar lineas dependiendo la cantidad de palabras
function dibujarLineas(palabra){
    pincel.beginPath();
    pincel.strokeStyle ="red";
    pincel.lineWidth = 4;
    pincel.font="bold 20px arial";
    for (let index = 0; index < palabra.length; index++) {
        pincel.moveTo(5+(22*index), 470);
    pincel.lineTo(20+(22*index), 470);
    pincel.stroke();   
    }
}

function letraAcertada(adivinar_letra){
    pincel.beginPath();
    pincel.fillStyle="black";
    for (let index = 0; index < palabra.length; index++) {
        if(palabra[index]==adivinar_letra){
            pincel.fillText(palabra[index], 5+(22*index), 460); 
        }    
    }
}

function letraErrada(adivinar_letra){
    let index = i;
    pincel.beginPath();
    pincel.fillStyle="black";
    pincel.fillText(adivinar_letra, 5+(22*index), 500);  
}
    
function dibujoAhorcado(adivinar_letra){
// var posicion =  Math.round(Math.random()*(array_palabras.length - 1));
// let palabra = array_palabras[posicion];

    if(palabra.includes(adivinar_letra) ){
        if(registro_letras.includes(adivinar_letra)){
            div_palabra_repetida.style.display = "block";
            agregar.disabled = true;
        }
        else{
            letraAcertada(adivinar_letra)
            let regstring = adivinar_letra;
            let regexp = new RegExp(regstring, "gi");
            var contar = palabra.match(regexp).length;
            if(contar>1){
                contador = contador+contar;
            }else{
                contador++;
            }
            adivinar_letra.value = "";
        }
    }
    else{
        if(i==1){
        // LINEA DEL POSTE
        pincel.beginPath();
        pincel.strokeStyle="black";
        pincel.lineWidth= 5;
        pincel.moveTo(15, 0);
        pincel.lineTo(15, 390);
        pincel.stroke();
        letraErrada(adivinar_letra);
            i=2;   
        }
        else if(i==2){
        //LINEA HORIZONTAL DEL POSTE
        pincel.beginPath();
        pincel.strokeStyle="black";
        pincel.lineWidth= 10;
        pincel.moveTo(15, 0);
        pincel.lineTo(250, 0);
        pincel.stroke();
        letraErrada(adivinar_letra);
        i=3;
        }
        else if(i==3){
        //SOGA DEL POSTE
        pincel.beginPath();
        pincel.strokeStyle="black";
        pincel.lineWidth= 5;
        pincel.moveTo(250, 0);
        pincel.lineTo(250, 35);
        pincel.stroke();
        letraErrada(adivinar_letra);
        i=4;
        }
        else if(i==4){
        //CABEZA DEL MUÑECO
        pincel.fillStyle ="black";
        pincel.beginPath();
        pincel.arc(250, 80, 40, 0, 2*3.14);
        pincel.fill();

        pincel.fillStyle ="white";
        pincel.beginPath();
        pincel.arc(250, 80, 35, 0, 2*3.14);
        pincel.fill();
        letraErrada(adivinar_letra);
    
        i=5;
        }
        else if(i==5){
        //CUERPO DEL MUÑECO
        pincel.beginPath();
        pincel.strokeStyle="black";
        pincel.lineWidth= 5;
        pincel.moveTo(250, 125);
        pincel.lineTo(250, 240);
        pincel.stroke();  
        letraErrada(adivinar_letra); 
        i=6;        
        }
        else if(i==6){
        //BRAZO DERECHO
        pincel.beginPath();
        pincel.strokeStyle="black";
        pincel.lineWidth= 5;
        pincel.moveTo(240, 125);
        pincel.lineTo(180, 180);
        pincel.stroke(); 
        letraErrada(adivinar_letra);
        i=7;           
        }
        else if(i==7){
        //BRAZO IZQUIERDO
        pincel.beginPath();
        pincel.strokeStyle="black";
        pincel.lineWidth= 5;
        pincel.moveTo(260, 125);
        pincel.lineTo(320, 180);
        pincel.stroke(); 
        letraErrada(adivinar_letra);
        i=8;           
        }
        else if(i==8){
        //PIERNA DERECHA
        pincel.beginPath();
        pincel.strokeStyle="black";
        pincel.lineWidth= 5;
        pincel.moveTo(240, 240);
        pincel.lineTo(180, 340);
        pincel.stroke();  
        letraErrada(adivinar_letra); 
        i=9;        
        }
        else if(i==9){
        //PIERNA IZQUIERDA
        pincel.beginPath();
        pincel.strokeStyle="black";
        pincel.lineWidth= 5;
        pincel.moveTo(260, 240);
        pincel.lineTo(320, 340);
        pincel.stroke(); 
        letraErrada(adivinar_letra); 
        div_perdiste.style.display ="block";
        contador =0;
        }      
    }
    registro_letras.push(adivinar_letra);   
}
























