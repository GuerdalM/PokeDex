function createPokemonCard(i, name, pokemonImage, type1, type2) {
    let backgroundImage = catchEmAllImage(type1);

    return `
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

function generatePopupContent(i, name, pokemonImage, type, nextPokemon, previousPokemon) {
    return `
        <div id="popupOverlay">
            <span onclick="closePopup()" class="close-button">&times;</span>
            <div id="popupContent" style="background-image: ${catchEmAllImage(type)};">
                <div class="name-edit-popup">
                    <span>${name}</span>
                </div>
                <div class="arrow-and-image-section">
                    <span class="arrow left" onclick="openPopup(${previousPokemon})">&lt;</span>
                    <div class="setup-popup-image">
                        <img src="${pokemonImage}" class="popup-image">
                    </div>
                    <span class="arrow right" onclick="openPopup(${nextPokemon})">&gt;</span>   
                </div>
                <div class="navbar">
                    <ul class="sub-navbar">
                        <li class="text-decorations" onclick="showTab('popupInformation', ${i})">More Images</li>
                        <li class="text-decorations" onclick="showTab('popupStatistics', ${i})">Statistics</li>
                        <li class="text-decorations" onclick="showTab('popupMoves', ${i})">Moves</li>
                    </ul>     
                </div>
                <div class="info-field">
                    <div id="popupStatistics" class="popup-section d-none"></div>
                    <div id="popupInformation" class="popup-section-info d-none"></div>
                    <div id="popupMoves" class="popup-section-moves d-none"></div>
                </div>
            </div>
        </div>
    `;
}

function type2Check(type2) {
    if (type2) {
        return `<span class="info-letter-style">${type2}</span>`;
    }
    return '';
}




function generateImageSection(frontGif, defaultGif, title) {
    return `
        <div>
            <span class="more-images-title"><b>${title}:</b></span>
            <div class="more-images-container">
                <img class="gif-edit" src="${frontGif}" alt="Front GIF">
                <img class="gif-edit" src="${defaultGif}" alt="Default GIF">
            </div>
        </div>
    `;
}
