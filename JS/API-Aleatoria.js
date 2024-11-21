let buscarBtn = document.getElementById('buscar-btn');
let buscador = document.getElementById('RickyMorty-buscador');
let listaPersonajes = document.getElementById('lista-personajes');

// Referencias dentro del modal de detalles
let detalleImagen = document.getElementById('detalle-imagen');
let detalleNombre = document.getElementById('detalle-nombre');
let detalleEstado = document.getElementById('detalle-estado');
let detalleEspecie = document.getElementById('detalle-especie');
let detalleGenero = document.getElementById('detalle-genero');
let detalleOrigen = document.getElementById('detalle-origen');
let detalleUbicacion = document.getElementById('detalle-ubicacion');
let botonDetalles = document.createElement('button');
botonDetalles.innerText = 'Ver Detalles';
botonDetalles.className = 'ver-detalles-btn';

// Función para obtener personajes desde la API
function obtenerPersonajes(query = '') {
    let url = 'https://rickandmortyapi.com/api/character/';

    if (query) {
        url += `?name=${query}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontraron personajes.');
            }
            return response.json();
        })
        .then(data => {
            mostrarPersonajes(data.results);
        })
        .catch(error => {
            alert(error.message);
            listaPersonajes.innerHTML = '';
        });
}

// Función para mostrar personajes en la página
function mostrarPersonajes(personajes) {
    listaPersonajes.innerHTML = ''; 

    personajes.forEach(personaje => {
       
        let col = document.createElement('div');
        col.classList.add('col-md-4');

        let card = document.createElement('div');
        card.classList.add('card');

        // Imagen del personaje
        let img = document.createElement('img');
        img.src = personaje.image || 'assets/placeholder.png'; // Usar imagen del API 
        img.classList.add('card-img-top');
        img.alt = personaje.name;

        // Cuerpo de la tarjeta
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Título del personaje
        let title = document.createElement('h5');
        title.classList.add('card-title');
        title.innerText = personaje.name;

        // Botón para ver detalles
        let btnDetalles = document.createElement('button');
        btnDetalles.classList.add('btn', 'btn-primary');
        btnDetalles.innerText = 'Ver Detalles';
        btnDetalles.setAttribute('data-bs-toggle', 'modal');
        btnDetalles.setAttribute('data-bs-target', '#detalleModal');

        // Event Listener para mostrar detalles
        btnDetalles.addEventListener('click', () => {
            mostrarDetalles(personaje);
        });

        // Agregar elementos al DOM
        cardBody.appendChild(title);
        cardBody.appendChild(btnDetalles);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        listaPersonajes.appendChild(col);
    });
}

// Función para mostrar detalles en el modal
function mostrarDetalles(personaje) {
    detalleImagen.src = personaje.image || 'assets/placeholder.png';
    detalleImagen.alt = personaje.name;
    detalleNombre.innerText = personaje.name;
    detalleEstado.innerText = personaje.status;
    detalleEspecie.innerText = personaje.species;
    detalleGenero.innerText = personaje.gender;
    detalleOrigen.innerText = personaje.origin.name;
    detalleUbicacion.innerText = personaje.location.name;
}

// Función para manejar la búsqueda
function buscarPersonaje() {
    let query = buscador.value.trim().toLowerCase();
    obtenerPersonajes(query);
}

// Event Listeners
buscarBtn.addEventListener('click', buscarPersonaje);


buscador.addEventListener('keydown', (e) => { 
    if (e.key === 'Enter') {
        buscarPersonaje();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    obtenerPersonajes(); 
});
