// import './style.css'

let videoPrincipal = document.getElementById('video-1')
let tieneAudio = true;
const cambiarVideo = ({target}) => {
    const videoPrincipalSrc = document.getElementById('video-1');
    const videoActivo = videoPrincipalSrc.getAttribute('src');
    const siguienteVideo = target.getAttribute('src');
    videoPrincipal.setAttribute('src', siguienteVideo);
    target.setAttribute('src', videoActivo);
    const botonDeReproduccion = document.getElementById('reproducir');
    botonDeReproduccion.innerText = `Play ►`
}

const videoDos = document.getElementById('video-2');
videoDos.addEventListener('click', cambiarVideo);
const videoTres = document.getElementById('video-3');
videoTres.addEventListener('click', cambiarVideo);

const botonDeReproduccion = document.getElementById('reproducir');
botonDeReproduccion.addEventListener('click', () => {
    const {ended, paused} = videoPrincipal;
    if (paused || ended) {
        videoPrincipal.play();
        botonDeReproduccion.innerText = `Pause ||`
    } else {
        videoPrincipal.pause();
        botonDeReproduccion.innerText = `Play ►`
    }
});

const botonDeMute = document.getElementById('mute');
botonDeMute.addEventListener('click', () => {
    if (tieneAudio) {
        videoPrincipal.muted = true;
        botonDeMute.innerText = `Mute  🚫`;
        tieneAudio = false;
    } else {
        videoPrincipal.muted = false;
        botonDeMute.innerText = `Mute  🔇`;
        tieneAudio = true;
    }
});

const tamanioDeReproductor = document.getElementById('tamanio');
tamanioDeReproductor.addEventListener('change', () => {
    videoPrincipal.style.width = `${tamanioDeReproductor.value}%`;
    videoPrincipal.style.flex = tamanioDeReproductor.value < 70 ? `none` : `2`;
});

const barraDeVolumen = document.getElementById('volumen');
barraDeVolumen.addEventListener('change', () => {
    videoPrincipal.volume = barraDeVolumen.value;
});

const barraDeVelocidad = document.getElementById('velocidad');
barraDeVelocidad.addEventListener('change', () => {
    videoPrincipal.playbackRate = barraDeVelocidad.value;
});

const botonDeRetroceder = document.getElementById('retroceder');
botonDeRetroceder.addEventListener('click', () => {
    videoPrincipal.currentTime += -10;
});

const botonDeAdelantar = document.getElementById('adelantar');
botonDeAdelantar.addEventListener('click', () => {
    videoPrincipal.currentTime += 10;
});

const botonDeSubtitulos = document.getElementById('subtitulos');
botonDeSubtitulos.addEventListener('click', () => {
    const subtitulosElemento = document.getElementById('subtitulos-control');
    const mostrarSubtitulos = subtitulosElemento.getAttribute('default');
    if (mostrarSubtitulos === '') {
        botonDeSubtitulos.innerText = `Mostrar Subtitulos`;
        subtitulosElemento.removeAttribute('default')
        videoPrincipal.textTracks[0].mode = 'hidden'
    } else {
        videoPrincipal.textTracks[0].mode = 'showing'
        botonDeSubtitulos.innerText = `Ocultar Subtitulos`;
        subtitulosElemento.setAttribute('default', '');
    }
});


const botonDeCaptura = document.getElementById('capturar');
botonDeCaptura.addEventListener('click', () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoPrincipal.videoWidth;
    canvas.height = videoPrincipal.videoHeight;
    canvas.getContext('2d').drawImage(videoPrincipal, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL();
    const link = document.createElement('a');
    link.download = `imagen-reproductor-${new Date()}`;
    link.href = dataURL;
    link.click();
});