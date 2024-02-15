let showMaxPokemon = 30;
let foundedPokemons = [];
let pokeStats = [];
let pokeStatsName = [];
let moveAttack = [];


async function init() {
    await foundInGrass();
    renderPokemon();
}

async function foundInGrass() {
    for (let i = 1; i <= showMaxPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);

        if (response.ok) {
            let currentPokemon = await response.json();
            foundedPokemons.push(currentPokemon);
            console.log('Zeige mir', currentPokemon);
        } else {
            console.error(`Cant find ${i} in the high Grass`);
        }
    }
}

function catchEmAllImage(type) {
    const imagePath = `./img/${type.toLowerCase()}.jpg`;
    return `url(${imagePath})`;
}

function renderPokemon() {
    const card = document.getElementById('pokeCards');
    
    for (let i = 0; i < foundedPokemons.length; i++) {
        const pokemons = foundedPokemons[i];
        const name = pokemons['species']['name'];
        const pokemonImage = pokemons['sprites']['other']['official-artwork']['front_default'];
        const type1 = pokemons['types'][0]['type']['name'];
        const type2 = pokemons['types'][1] ? pokemons['types'][1]['type']['name'] : null;

        const pokemonCardHTML = createPokemonCard(i, name, pokemonImage, type1, type2);
        card.innerHTML += pokemonCardHTML;
    }
}

function openPopup(i) {
    const pokemon = foundedPokemons[i];
    let name = pokemon['species']['name'];
    let pokemonImage = pokemon['sprites']['other']['official-artwork']['front_default'];
    let type = pokemon['types'][0]['type']['name'];
    let nextPokemon = nextPopup(i);
    let previousPokemon = previousPopup(i);

    const popupContent = generatePopupContent(i, name, pokemonImage, type, nextPokemon, previousPokemon);

    document.getElementById('openBigCard').innerHTML = popupContent;
    document.body.classList.add('popup-open');

    pokemonInfo(i);
    showTab('popupInformation', i);
}

function nextPopup(i) {
    let nextPokemon = i + 1;
    if (nextPokemon >= foundedPokemons.length) {
        nextPokemon = 0;
    }
    return nextPokemon;
}

function previousPopup(i) {
    let previousPokemon = i - 1;
    if (previousPokemon < 0) {
        previousPokemon = foundedPokemons.length - 1;
    }
    return previousPokemon;
}

function showTab(tabId, i) {
    document.getElementById('popupStatistics').classList.add('d-none');
    document.getElementById('popupInformation').classList.add('d-none');
    document.getElementById('popupMoves').classList.add('d-none');

    document.getElementById(tabId).classList.remove('d-none');

    if (tabId === 'popupInformation') {
        pokemonInfo(i);
    } else if (tabId === 'popupStatistics') {
        pokemonStats(i);
    } else if (tabId === 'popupMoves') {
        pokemonMoves(i);
    }
  }

function pokemonStats(i) {
    const pokemon = foundedPokemons[i];
    const stats = pokemon['stats'];
    let statsHTML = '';

    pokeStats = [];
    pokeStatsName = [];

    for (let j = 0; j < stats.length; j++) {
        const stat = stats[j];
        let statNumber = stat['base_stat'];
        let statName = stat['stat']['name'];

        statName = statName.charAt(0).toUpperCase() + statName.slice(1);
 
        pokeStats.push(statNumber);
        pokeStatsName.push(statName);
    }

    statsHTML += `
        <canvas id="myChart"></canvas>
    `;

    document.getElementById('popupStatistics').innerHTML = statsHTML;

    renderPokeStatsChart();
}

function collectMoves(i) {
    const pokemon = foundedPokemons[i];
    const moves = pokemon['moves'];
    let moveAttack = [];

    for (let m = 0; m < Math.min(moves.length, 20); m++) {
        const attack = moves[m];
        moveAttack.push(attack);
    }

    return moveAttack;
}

function renderMoves(moveAttack) {
    let movesHTML = `<div class="moves-section">`;

    for (let a = 0; a < moveAttack.length; a++) {
        movesHTML += `
            <span class="moves-edit">${moveAttack[a]['move']['name']}</span>
        `;
    }

    movesHTML += `</div>`;
    return movesHTML;
}

function pokemonMoves(i) {
    const moveAttack = collectMoves(i);
    const movesHTML = renderMoves(moveAttack);

    document.getElementById('popupMoves').innerHTML = movesHTML;
}



function pokemonInfo(i) {
    const pokemon = foundedPokemons[i];
    let frontGif = pokemon['sprites']['other']['showdown']['back_default'];
    let defaultGif = pokemon['sprites']['other']['showdown']['front_default'];
    let frontGifShiny = pokemon['sprites']['other']['showdown']['front_shiny'];
    let defaultGifShiny = pokemon['sprites']['other']['showdown']['back_shiny'];
    let informationHTML ='';

    informationHTML += `

    <div>
        <span class="more-images-title"><b>Usual Version:</b></span>
        <div class="more-images-container">
            <img class="gif-edit" src="${frontGif}" alt="Front GIF">
            <img class="gif-edit" src="${defaultGif}" alt="Default GIF">
        </div>
        <span class="more-images-title-shiny"><b>Shiny Version:</b></span>
        <div class="more-images-container">
            <img class="gif-edit" src="${defaultGifShiny}" alt="Default GIF Shiny">
            <img class="gif-edit" src="${frontGifShiny}" alt="Front GIF Shiny">
        </div>
    </div>
`;

    document.getElementById('popupInformation').innerHTML = informationHTML;
}


function closePopup() {
    document.getElementById('openBigCard').innerHTML = '';
    document.body.classList.remove('popup-open');
}
