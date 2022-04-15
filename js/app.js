const auth = "563492ad6f917000010000012df21d030c674a959b3066df36cea450";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");

let searchValue;

// Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

function updateInput(e) {
  searchValue = e.target.value;
}

async function curatedPhotos() {
  const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();

  data.photos.forEach((photo) => {
    console.log(data);
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <p><a href="${photo.photographer_url}">${photo.photographer}</a></p>
    <img src=${photo.src.large}> </img>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function searchPhotos(query) {
  const dataFetch = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <p><a href="${photo.photographer_url}">${photo.photographer}</a></p>
    <img src=${photo.src.large}> </img>
    `;
    gallery.appendChild("galleryImg");
  });
}

curatedPhotos();
