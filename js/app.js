const auth = "563492ad6f917000010000012df21d030c674a959b3066df36cea450";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

// Event Listeners
searchInput.addEventListener("input", updateInput);
searchInput.focus();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

// Function that updates the Input value
function updateInput(e) {
  searchValue = e.target.value;
}

// Function that clears the Input value and the Gallery from prev Imgs
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

// Generic fetch function
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

// Function that creates content from API data
function generateImages(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class= gallery-img-container>
    <div class= gallery-info> 
    <a href=${photo.photographer_url} target= "_blank">${photo.photographer}</a>
    <a href=${photo.src.original} target= "_blank">Open Image</a> 
    </div>
    <img src=${photo.src.large}> </img>
    </div>
    `;
    gallery.appendChild(galleryImg);
  });
}

// Function that fetches curated pictures
async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generateImages(data);
}

// Function that fetches API data with a search
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);

  generateImages(data);
}

// Function that fetches more data when we click the More btn
async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generateImages(data);
}

curatedPhotos();
