const FUEGO = 'Fuego 🔥'
const AGUA = 'Agua 💧'
const TIERRA = 'Tierra 🌱'

const sectionSelecionarAtaque = document.getElementById('Seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonPersonajeJugador = document.getElementById('boton-personaje')
const botonReiniciar = document.getElementById('boton-reiniciar')


const sectionPersonaje = document.getElementById('Seleccionar-personaje')
const spanPersonajeJugador = document.getElementById('personaje-jugador')

const spanPersonajeEnemigo = document.getElementById('personaje-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensaje = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')
const contenedorTarjetas =document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')


let jugadorId = null
let enemigoId = null
let mokepones =[]
let mokeponesEnemigos =[]
let ataqueJugador =[]
let ataqueEnemigo =[]
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let personajeJugador
let personajeJugadorObjeto
let ataquesMokepon
let ataquesPersonajeEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones =[]
let indexAtaqueJuagador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.PNG'
let alturaMapa
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 700

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
    
}

alturaMapa = anchoDelMapa * 500 / 700

mapa.width = anchoDelMapa
mapa.height = alturaMapa


class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = 0) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques =[]
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge (1).webp')

let Capipepo = new Mokepon('Capipepo', './assets/capipepo.png', 5, './assets/capipepo.webp')

let Ratigueya = new Mokepon('Ratigueya', './assets/ratigueya.webp', 5, './assets/ratigueya (1).webp')

const HIPODOGE_ATAQUES = [
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🔥', id:'boton-fuego'}
]

Hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: "💧", id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'}
]

Capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🌱', id:"boton-tierra"},
    {nombre:"💧", id:'boton-agua'}
]

Ratigueya.ataques.push(...RATIGUEYA_ATAQUES)
    
mokepones.push(Hipodoge,Capipepo,Ratigueya)

function iniciarJuego(){
    sectionSelecionarAtaque.style.display ='none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((Mokepon) => {
        opcionDeMokepones = `
        <label class="lista-personaje">${Mokepon.nombre}
            <input type="radio" id=${Mokepon.nombre} name="personaje">
            <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')

    })
    sectionReiniciar.style.display = 'none'

    botonPersonajeJugador.addEventListener('click',SeleccionarPersonajeJugador) 
   
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}
function unirseAlJuego() {
    fetch(`http://192.168.1.1:8080/unirse`)
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                         console.log(respuesta)
                         jugadorId = respuesta
                     })
            }
       })    
}

function SeleccionarPersonajeJugador(){
    
    if(inputHipodoge.checked){
        spanPersonajeJugador.innerHTML = inputHipodoge.id
        personajeJugador = inputHipodoge.id
    }else if(inputCapipepo.checked){
        spanPersonajeJugador.innerHTML = inputCapipepo.id
        personajeJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanPersonajeJugador.innerHTML = inputRatigueya.id
        personajeJugador = inputRatigueya.id
    }else {
        alert("seleciona una mascota")
        return
    }

    sectionPersonaje.style.display = 'none'

    seleccionarMokepon(personajeJugador)

    extraerAtaques(personajeJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(personajeJugador) {
    fetch(`http://192.168.1.1:8080/mokepon/${jugadorId}`,{
        method: "post",
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify({
            Mokepon: personajeJugador
        })
    })
}

function extraerAtaques(personajeJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
       if (personajeJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
       }
        
    }
   
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="bonton-de-ataque   Bataque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.Bataque')


}

function secuenciaAtaque(){
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push(FUEGO)
                console.log(ataqueJugador)
                boton.style.background = '#224B0C'
                boton.disabled = true
            }else if(e.target.textContent === '💧'){
                ataqueJugador.push(AGUA)
                console.log(ataqueJugador)
                boton.style.background = '#224B0C'
                boton.disabled = true
            }else{
                ataqueJugador.push(TIERRA)
                console.log(ataqueJugador)
                boton.style.background = '#224B0C'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })

    
}

function enviarAtaques(){
    fetch(`http://192.168.1.1:8080/mokepon/${jugadorId}/ataques`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })  
    })

    intervalo = setInterval(obtenerAtaques, 50)
}


function obtenerAtaques() {
    fetch(`http://192.168.1.1:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function ({ataques}) {
                        if(ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarPersonajeEnemigo(enemigo) {
    spanPersonajeEnemigo.innerHTML = enemigo.nombre
    ataquesPersonajeEnemigo = enemigo.ataques
    secuenciaAtaque()
}
    

//function ataqueAleatorioEnemigo(){
    //console.log('ataque enemigo', ataquesPersonajeEnemigo);
    //let ataqueAleatorio = aleatorio(0,ataquesPersonajeEnemigo.length -1)

    //if(ataqueAleatorio == 0 || ataqueAleatorio ==1){
       // ataqueEnemigo.push(FUEGO)
    //}else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        //ataqueEnemigo.push (AGUA)
    //}else{
        //ataqueEnemigo.push(TIERRA)
    //}

    //console.log(ataqueEnemigo)
    //iniciarPelea()
//}

//function iniciarPelea(){
    //if (ataqueJugador.length === 5) {
      //  combate()
   // }
//}

function indexAmbosOponente(jugador, enemigo){
    indexAtaqueJuagador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo) 

    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE 😐")
        }else if(ataqueJugador[index] === FUEGO && ataqueEnemigo[index] === TIERRA){
            indexAmbosOponente(index, index)
            crearMensaje('GANASTE 😎')
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[index] === AGUA && ataqueEnemigo[index] === FUEGO){
            indexAmbosOponente(index, index)
            crearMensaje('GANASTE 😎')
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[index] === TIERRA && ataqueEnemigo[index] === AGUA){
            indexAmbosOponente(index, index)
            crearMensaje('GANASTE 😎')
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponente(index,index)
            crearMensaje('PERDISTE 🤬')
            victoriasEnemigo ++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
     contadorVidas()
}


function contadorVidas(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("¡EMPATE!")
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("¡GANASTE! 😎")
    }else{
        crearMensajeFinal('¡PERDISTE, visaje de loca!')
    }
}

function crearMensaje(resultado){
    

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJuagador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    sectionMensaje.innerHTML=resultadoFinal

   

    sectionReiniciar.style.display='block'
}

function reiniciarJuego(){
    location.reload()
}
function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    personajeJugadorObjeto.x = personajeJugadorObjeto.x + personajeJugadorObjeto.velocidadX
    personajeJugadorObjeto.y = personajeJugadorObjeto.y + personajeJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    personajeJugadorObjeto.pintarMokepon()

    enviarPosicion(personajeJugadorObjeto.x, personajeJugadorObjeto.y)


    
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}
   

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.1:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({enemigos}) {
                    console.log(enemigos)
                  
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        
                        const mokeponNombre = enemigo.mokepon.nombre || ''

                        if (mokeponNombre === 'Hipodoge') {
                               mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge (1).webp', enemigo.id)
                        } else if(mokeponNombre === 'Capipepo'){
                               mokeponEnemigo = new Mokepon('Capipepo', './assets/capipepo.png', 5, './assets/capipepo.webp', enemigo.id)
                        } else if (mokeponNombre === 'Ratigueya'){
                                mokeponEnemigo = new Mokepon('Ratigueya', './assets/ratigueya.webp', 5, './assets/ratigueya (1).webp', enemigo.id)
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y


                        return mokeponEnemigo
                    })

                })
            }
        })
}     

function moverDerecha() {
    personajeJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    personajeJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    personajeJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    
    personajeJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    personajeJugadorObjeto.velocidadX = 0
    personajeJugadorObjeto.velocidadY = 0
}
 
function precionarTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break;
    }
}

function iniciarMapa() {
    personajeJugadorObjeto = obtenerObjetoPersonaje(personajeJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', precionarTecla)

    window.addEventListener('keyup', detenerMovimiento)

}

function obtenerObjetoPersonaje(){
    for (let i = 0; i < mokepones.length; i++) {
        if (personajeJugador === mokepones[i].nombre) {
             return mokepones[i]
        }
         
     }
    
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaPersonaje = personajeJugadorObjeto.y
    const abajoPersonaje = personajeJugadorObjeto.y + personajeJugadorObjeto.alto
    const derechaPersonaje = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho
    const izquierdaPersonaje = personajeJugadorObjeto.x
    if (
        abajoPersonaje < arribaEnemigo ||
        arribaPersonaje > abajoEnemigo ||
        derechaPersonaje < izquierdaEnemigo ||
        izquierdaPersonaje > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('se detecto una colision')

    enemigoId = enemigo.id
    sectionSelecionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarPersonajeEnemigo(enemigo)
    
}
window.addEventListener('load', iniciarJuego)