const toggleAlbums = (e) => {
    let cardSection = e.target.parentNode.childNodes[5]
    if(Array.from(cardSection.childNodes[1].classList).includes('d-none')) {
        cardSection.childNodes[1].classList.remove('d-none')
        cardSection.childNodes[3].classList.add('d-none')
    } else {
        cardSection.childNodes[1].classList.add('d-none')
        cardSection.childNodes[3].classList.remove('d-none')
    }
}

const generateSection = (data) => {
    let cardRow = document.createElement('div')
    cardRow.classList.add('row')
    
    for(x of data) {
        let card = document.createElement('div')
        card.classList.add('col-sm-6', 'col-md-3', 'col-lg-2')
        card.innerHTML = `
            <a href="artist-page/artist.html">
            <div class="card">
            <img class="card-img-top" src=${x.album.cover} alt="Card image cap">
            <div class="card-play-btn"><i class="fas fa-play"></i></div>
            </div>
            <p class="card-text">${x.title}</p>
            </a>
        `
        cardRow.appendChild(card)
    }

    let cardRowAlbums = document.createElement('div')
    cardRowAlbums.classList.add('row', 'd-none')

    let uniqueAlbums = {}
    for(x of data) {
        uniqueAlbums[x.album.id] = x.album
    }

    for(album in uniqueAlbums) {
        album = uniqueAlbums[album]
        let card = document.createElement('div')
        card.classList.add('col-sm-6', 'col-md-3', 'col-lg-2')
        card.innerHTML = `
            <a href="artist-page/artist.html">
            <div class="card">
            <img class="card-img-top" src=${album.cover} alt="Card image cap">
            <div class="card-play-btn"><i class="fas fa-play"></i></div>
            </div>
            <p class="card-text">${album.title}</p>
            </a>
        `
        cardRowAlbums.appendChild(card)
    }


    let section = document.createElement('div')
    section.classList.add('container', 'cards_cont')
    section.innerHTML = `
        <div class="heading d-inline-block">${data[0].artist.name}</div>
        <button type="button" onclick="toggleAlbums(event)" class="btn btn-outline-light show-albums text-white fw-bold d-inline-block mx-3 mb-2">Show Albums</button>
        <div class="container">
            ${cardRow.outerHTML}
            ${cardRowAlbums.outerHTML}
        </div>
    `

    document.getElementById('body').appendChild(section)
}

const search = (searchString) => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchString}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0750e50bdfmsh5caa63f730b70d9p1a24d2jsn08753afd75e9",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data => generateSection(data['data']))
    .catch(err => {
        console.error(err)
        search(searchString)
    });
}

search('eminem')
search('metallica')
search('behemoth')