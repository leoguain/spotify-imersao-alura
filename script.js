const searchInput = document.getElementById("search-input");
const resultArtists = document.getElementById("result-artists");
const resultPlaylists = document.getElementById("result-playlists");

function loadPlaylists() {
  const urlApi = `http://localhost:3000/playlists`;

  fetch(urlApi)
    .then((response) => response.json())
    .then((results) => displayPlaylists(results));
}

function displayPlaylists(results) {
  resultPlaylists.innerHTML = "";
  resultPlaylists.classList.remove("hidden");

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

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => displayArtists(results));
}

function displayArtists(results) {
  resultArtists.innerHTML = "";
  resultArtists.classList.remove("hidden");

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

document.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();

  if (searchTerm === "") {
    resultPlaylists.classList.remove("hidden");
    resultArtists.classList.add("hidden");
    return;
  }

  requestApi(searchTerm);
});

loadPlaylists();
