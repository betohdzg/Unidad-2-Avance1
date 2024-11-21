let pantallaPrincipal = document.getElementById('pantalla-principal');
let pantallaDetalles = document.getElementById('pantalla-detalles');
let buscarBtn = document.getElementById('buscar-btn');
let homeBtn = document.getElementById('home-btn');
let pokemonBuscador = document.getElementById('pokemon-buscador');

let image = document.getElementById('pokemon-imagen');
let nombreTxt = document.getElementById('pokemon-nombre');
let typesList = document.getElementById('pokemon-tipos');
let altura = document.getElementById('pokemon-altura');
let peso = document.getElementById('pokemon-peso');
let habilidadesList = document.getElementById('pokemon-habilidades');
let statsList = document.getElementById('pokemon-estadisticas');
let sonidoBtn = document.getElementById('pokemon-sonido');

// Función para alternar pantallas (mostrar/ocultar)
function cambiarPantalla(mostrarPrincipal) {
  pantallaPrincipal.style.display = mostrarPrincipal ? 'block' : 'none';
  pantallaDetalles.style.display = mostrarPrincipal ? 'none' : 'block';
}

// Función para buscar Pokémon
function buscarPokemon() {
  let nombre = pokemonBuscador.value.trim().toLowerCase();

  // Evitar la búsqueda si el campo está vacío
  if (!nombre) {
    alert("Por favor, ingresa el nombre de un Pokémon.");
    return;
  }

  // Llamada a la API de PokeAPI
  fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then((response) => {
      if (!response.ok) throw new Error(`El Pokémon "${nombre}" no fue encontrado.`);
      return response.json();
    })
    .then((pokemon) => {
      mostrarPokemon(pokemon);
      cambiarPantalla(false); // Cambiar a la pantalla de detalles
    })
    .catch((error) => {
      limpiarPantalla(); // Limpiar la pantalla de detalles
      alert(error.message); // Mostrar error si no se encuentra el Pokémon
      cambiarPantalla(true); // Volver a la pantalla principal
    });
}

// Función para mostrar los detalles del Pokémon
function mostrarPokemon(pokemon) {
  // Limpiar contenido previo
  typesList.innerHTML = '';
  habilidadesList.innerHTML = '';
  statsList.innerHTML = '';

  // Asignar datos al HTML
  nombreTxt.innerText = pokemon.name.toUpperCase();
  image.setAttribute('src', pokemon.sprites.front_default);
  image.setAttribute('alt', pokemon.name);
  altura.innerText = `Altura: ${pokemon.height / 10} m`;
  peso.innerText = `Peso: ${pokemon.weight / 10} kg`;

  // Listar tipos
  pokemon.types.forEach((tipo) => {
    let item = document.createElement('li');
    item.innerText = tipo.type.name;
    typesList.appendChild(item);
  });

  // Listar habilidades
  habilidadesList.innerHTML = '<strong>Habilidades:</strong>';
  pokemon.abilities.forEach((habilidad) => {
    let item = document.createElement('li');
    item.innerText = habilidad.ability.name;
    habilidadesList.appendChild(item);
  });

  // Listar estadísticas
  statsList.innerHTML = '<strong>Estadísticas Base:</strong>';
  pokemon.stats.forEach((stat) => {
    let item = document.createElement('li');
    item.innerText = `${stat.stat.name}: ${stat.base_stat}`;
    statsList.appendChild(item);
  });

  // Botón de sonido
  sonidoBtn.onclick = () => {
    const nombrePokemon = pokemon.name.toLowerCase(); // Nombre del Pokémon en minúsculas.
    const sonidoURL = `https://pokemoncries.com/cries/${nombrePokemon}.mp3`; // URL dinámica del sonido.
    
    // Crear el objeto de audio
    const audio = new Audio(sonidoURL);

    // Intentar reproducir el sonido
    audio.play()
      .then(() => {
        console.log(`Reproduciendo sonido de: ${nombrePokemon}`);
      })
      .catch((error) => {
        console.error(`No se pudo reproducir el sonido de ${nombrePokemon}: ${error.message}`);
        alert(`El sonido de ${nombrePokemon} no está disponible.`);
      });
  };
}

// Función para limpiar la pantalla de detalles
function limpiarPantalla() {
  nombreTxt.innerText = '';
  image.setAttribute('src', '');
  image.setAttribute('alt', '');
  typesList.innerHTML = '';
  altura.innerText = '';
  peso.innerText = '';
  habilidadesList.innerHTML = '';
  statsList.innerHTML = '';
}

buscarBtn.addEventListener('click', buscarPokemon);
homeBtn.addEventListener('click', () => cambiarPantalla(true));
pokemonBuscador.addEventListener('keydown', (e) => {
  // Permitir búsqueda presionando "Enter"
  if (e.key === 'Enter') {
    buscarPokemon();
  }
});
