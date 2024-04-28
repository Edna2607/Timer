/* */
/*Se llaman las etiquetas y botones de html para el javascript : 
'etiqueta'
.clases
#id */
const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo =  document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const iconosDelBoton = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer'); 

/*---------Boton empezar--------- */
const botoniniciarPausar = document.querySelector('#start-pause'); /*Boton iniciar */
const tonoPausa = new Audio('./sonidos/pause.mp3');
const tonoPlay = new Audio('./sonidos/play.wav');
const tonoFinal = new Audio('./sonidos/beep.mp3');
const textoIniciarPausar = document.querySelector('#start-pause span'); 

let tiempoTranscurridoEnSegundos = 1500; /*1500 es igual  a 25 minutos */
let idIntervalo = null


/*---------------------------------- */

/*----------Audio del modo Enfoque---------*/ 
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3')

musica.loop = true; /*Puede escuchar el audio de forma indefnida */

inputEnfoqueMusica.addEventListener('change', function(){
   if(musica.paused){ 
    musica.play()
   }else{
    musica.pause()
   }
});

/*-------------------------------------------*/

/*
/*Cambia el color de acuerdo al click en el boton indicado 
botonCorto.addEventListener('click', () => {
   html.setAttribute('data-contexto', 'descanso-corto') /*Cambia el color 
   banner.setAttribute('src','./imagenes/descanso-corto.png'); /*Cambia la imagen 
});

botonEnfoque.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'enfoque') /*Cambia el color 
    banner.setAttribute('src','./imagenes/enfoque.png'); /*Cambia la imagen 
});

botonLargo.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-largo') /*Cambia el color 
    banner.setAttribute('src','./imagenes/descanso-largo.png'); /*Cambia la imagen 
}); */

/*----------------SIMPLIFICAR EL CODIGO ANTERIOR utilizando una funcion----------------- */

    botonCorto.addEventListener('click', () => {
        tiempoTranscurridoEnSegundos = 300;
        cambiarContexto('descanso-corto')
        botonCorto.classList.add('active')
    });
    
    botonEnfoque.addEventListener('click', () => {
        tiempoTranscurridoEnSegundos = 1500;
        cambiarContexto('enfoque')
        botonEnfoque.classList.add('active')
    });
    
    botonLargo.addEventListener('click', () => {
        tiempoTranscurridoEnSegundos = 900;
        cambiarContexto('descanso-largo')
        botonLargo.classList.add('active')
    }); 

 function cambiarContexto(contexto){
    mostrarTiempo() /*Cambia la hora de acuerdo al boton,  llama la funcion  */
    /*De esta manera los botones se desactivan cuando estan en cada interfaz */
    botones.forEach(function(contexto){
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto) /*Cambia el color */
    banner.setAttribute('src', `./imagenes/${contexto}.png`); /*Cambia la imagen */

    switch (contexto) { /*Cambio de Texto */
        case "enfoque": 
            titulo.innerHTML = 
            `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
                break;

        case "descanso-corto" : 
            titulo.innerHTML = 
            ` ¿Qué tal tomar un Respiro¿? 
            <strong class="app__title-strong">¡Has una pausa corta!</strong>`
                break;
            
        case "descanso-largo":
            titulo.innerHTML = 
            `Hora de volver a la superficie 
            <strong class="app__title-strong">Haz una pausa larga</strong>`
                break;
    
        default:
            break;
    }
 };

 /*---------Funcion Boton empezar--------- */

 const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0){
        tonoFinal.play(); /*Cuando termina el conteo tiene este sonido*/
        alert('Tiempo final')
        reiniciar();
        return;
    }
 
    textoIniciarPausar.textContent = "Pausar" /*Cambia el texto de "comenzar" a "Pausar" */
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo();
 }


 botoniniciarPausar.addEventListener('click', iniciarPausar);

 function iniciarPausar(){
    if(idIntervalo){ /*se pausa el conteo y cuando se vuelve a dar click continua el conteo */
        tonoPausa.play(); /*Cuando se pausa tiene este sonido */
        reiniciar()
        return
      } else{
          tonoPlay.play();   /*si se despausa tiene el sonido del play */
         
        }
    iconosDelBoton.setAttribute('src', `./imagenes/pause.png`); /*Cambia el icono a pausa en el boton pausar */
    idIntervalo = setInterval(cuentaRegresiva, 1000);
 }


 function reiniciar(){
    clearInterval(idIntervalo) /*clearInterval  interrumpe el flujo de setInterval */
    idIntervalo = null
    textoIniciarPausar.textContent = "Empezar" /*Cambia el texto de "Pausar" a "Comenzar" */
    iconosDelBoton.setAttribute('src', `./imagenes/play_arrow.png`); /*Cambia el icono a la flecha del boton comenzar*/
 }

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos*1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute:'2-digit', second:'2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo();


