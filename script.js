let showMaxPokemon = 30;
let foundedPokemons = [];
let pokeStats = [];
let pokeStatsName = [];


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
            console.error(`Fehler beim Abrufen von Pokemon mit ID ${i}`);
        }
    }
}

function catchEmAllImage(type) {
    switch (type.toLowerCase()) {
        case 'grass':
            return 'url(./img/grass.jpg)';
        case 'electric':
            return 'url(./img/electric.jpg)';
        case 'fire':
            return 'url(./img/fire.jpg)';
        case 'normal':
            return 'url(./img/normal.jpg)';
        case 'water':
            return 'url(./img/water.jpg)';
        case 'ground':
            return 'url(./img/ground.jpg)';
        case 'poison':
            return 'url(./img/poisen.jpg)';
        case 'bug':
            return 'url(./img/bug.jpg)';
        case 'fighting':
            return 'url(./img/fighting.jpg)';
        default:
            return 'url(./img/default-img.jpg)';
    }
}

function renderPokemon(i, type1, type2) {
    for (let i = 0; i < foundedPokemons.length; i++) {
        const pokemons = foundedPokemons[i];    

        let name = pokemons['species']['name'];
        let pokemonImage = pokemons['sprites']['other']['official-artwork']['front_default'];
        let type1 = pokemons['types'][0]['type']['name'];
        let type2 = pokemons['types'][1] ? pokemons['types'][1]['type']['name'] : null;
        let card = document.getElementById('pokeCards');
        let backgroundImage = catchEmAllImage(type1)

        card.innerHTML += `
        <div onclick="openPopup(${i})" 
             data-name="${name}" 
             data-image="${pokemonImage}" 
             class="designed-cards" 
             style="background-image: ${backgroundImage};"
             data-type="${type1}"> 
            <div class="pokemon-name">
                <span>${name}</span>
            </div>
            <div class="type-info-small-card">
                <div class="card-formantion">              
                    <span class="info-letter-style">${type1}</span>
                    ${type2Check(type2)}
                </div>
                <img class="poke-image" src="${pokemonImage}">
            </div>
        </div>
    `;
    }
}

function type2Check(type2) {
    if (type2) {
        return `<span class="info-letter-style">${type2}</span>`;
    }
    return '';
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

function openPopup(i) {
    const pokemon = foundedPokemons[i];
    let name = pokemon['species']['name'];
    let pokemonImage = pokemon['sprites']['other']['official-artwork']['front_default'];
    let type = pokemon['types'][0]['type']['name'];

    let popupContent = `
        <div id="popupOverlay">
            <div id="popupContent" style="background-image: ${catchEmAllImage(type)};">
                <div class="name-edit-popup">
                    <span>${name}</span>
                </div>
                <div class="setup-popup-image">
                    <img src="${pokemonImage}" class="popup-image">
                </div>
                <div class="navbar">
                    <ul class="sub-navbar">
                        <li class="text-decorations">Information</li>
                        <li class="text-decorations" onclick="pokemonStats(${i})">Statistics</li>
                        <li class="text-decorations">Moves</li>
                    </ul>        
                </div>
                <div class="info-field">
                    <div id="popupStatistics" class="popup-section"></div>
                    <div id="popupInformation" class="popup-section-info"></div>
                    <div id="popupMoves" class="popup-section-moves"></div>
                </div>
                <span onclick="closePopup()" class="close-button">&times;</span>
            </div>
        </div>
    `;

    document.getElementById('openBigCard').innerHTML = popupContent;


}

function pokemonInfo(i, type1, type2) {
    const pokemon = foundedPokemons[i];
}


function closePopup() {
    document.getElementById('openBigCard').innerHTML = '';
}
