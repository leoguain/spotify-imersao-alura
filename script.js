var searchTerm = "";
const searchInput = document.getElementById("search-input");

const artistsContainer = document.getElementById("artists-container");
const playlistsContainer = document.getElementById("playlists-container");

const resultArtists = document.getElementById("result-artists");
const resultPlaylists = document.getElementById("result-playlists");

/*EXECUÇÃO DA FUNÇÃO DE CARREGAMENTO INICIAL*/
loadPlaylists("");

/*EVENTO LISTENER DO INPUT*/
document.addEventListener("input", function () {
  searchTerm = searchInput.value.toLowerCase();

  if (searchTerm === "") {
    artistsContainer.classList.add("hidden");
    loadPlaylists("");
    return;
  }

  artistsContainer.classList.remove("hidden");
  loadArtists(searchTerm);
  loadPlaylists(searchTerm);
});

/* FUNÇÕES DE CARREGAMENTO DA API */
function loadPlaylists(searchTerm) {
  const urlApi =
    searchTerm !== ""
      ? `http://localhost:3000/playlists?name_like=${searchTerm}`
      : `http://localhost:3000/playlists`;

  fetch(urlApi)
    .then((response) => response.json())
    .then((results) => displayPlaylists(results));
}

function loadArtists(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => displayArtists(results));
}

/* FUNÇÕES DE EXIBIÇÃO DOS DADOS */
function displayPlaylists(results) {
  var errorContainer = document.getElementById("playlists-not-found");
  var errorMessage = document.getElementById("error-title-playlist");

  resultPlaylists.innerHTML = "";

  if (results.length === 0) {
    errorMessage.textContent = `Nenhuma playlist encontrada para "${searchTerm}"`;
    errorContainer.classList.remove("hidden");
  } else {
    errorContainer.classList.add("hidden");

    results.forEach((element) => {
      var itemContainer = document.createElement("div");
      var itemThumb = document.createElement("img");
      var itemTitle = document.createElement("span");
      var itemDescription = document.createElement("span");
      var playIcon = document.createElement("span");

      var description = element.description;

      if (description.length > 40) {
        description = description.substring(0, 40) + "...";
      }

      itemContainer.classList.add("playlist__card");
      itemThumb.classList.add("playlist__img");
      itemTitle.classList.add("playlist__title");
      itemDescription.classList.add("playlist__description");
      playIcon.classList.add("fa");
      playIcon.classList.add("fa-play");

      itemThumb.src = element.urlImg;
      itemTitle.textContent = element.name;
      itemDescription.textContent = description;

      itemContainer.appendChild(itemThumb);
      itemContainer.appendChild(playIcon);
      itemContainer.appendChild(itemTitle);
      itemContainer.appendChild(itemDescription);

      resultPlaylists.appendChild(itemContainer);
    });
  }
}

function displayArtists(results) {
  var errorContainer = document.getElementById("artists-not-found");
  var errorMessage = document.getElementById("error-title-artist");

  resultArtists.innerHTML = "";

  if (results.length === 0) {
    errorMessage.textContent = `Nenhum artista encontrado para "${searchTerm}"`;
    errorContainer.classList.remove("hidden");
  } else {
    errorContainer.classList.add("hidden");

    results.forEach((element) => {
      var itemContainer = document.createElement("div");
      var itemThumb = document.createElement("img");
      var itemTitle = document.createElement("span");
      var itemDescription = document.createElement("span");
      var playIcon = document.createElement("span");

      itemContainer.classList.add("playlist__card");
      itemThumb.classList.add("artist__img");
      itemTitle.classList.add("playlist__title");
      itemDescription.classList.add("playlist__description");
      playIcon.classList.add("fa");
      playIcon.classList.add("fa-play");

      itemThumb.src = element.urlImg;
      itemTitle.textContent = element.name;
      itemDescription.textContent = "Artista";

      itemContainer.appendChild(itemThumb);
      itemContainer.appendChild(playIcon);
      itemContainer.appendChild(itemTitle);
      itemContainer.appendChild(itemDescription);
      resultArtists.appendChild(itemContainer);
    });
  }
}
