
import * as Carousel from "./Carousel.js";

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");
const progressBar = document.getElementById("progressBar");

axios.defaults.baseURL = "https://api.thecatapi.com/v1";

axios.defaults.headers.common["x-api-key"] =
  'ENTER_API_KEY;

axios.interceptors.request.use((config) => {
  config.metadata = { startTime: new Date() };
  console.log("Axios request started:", config.url);
  return config;
});

axios.interceptors.response.use((response) => {
  const endTime = new Date();
  const duration = endTime - response.config.metadata.startTime;
  console.log(`Axios response received (${duration} ms):`, response.config.url);
  return response;
});

async function initialLoadAxios() {
  const { data: breeds } = await axios.get("/breeds");

  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  if (breeds.length > 0) {
    loadBreedDataAxios(breeds[0].id);
  }
}
async function loadBreedDataAxios(breedId) {
  Carousel.clear();
  infoDump.innerHTML = "";
  progressBar.style.width = "20%";

  const { data: images } = await axios.get("/images/search", {
    params: {
      breed_ids: breedId,
      limit: 8,
    },
  });

  progressBar.style.width = "60%";

  let infoRendered = false;

  images.forEach((img) => {
    const item = Carousel.createCarouselItem(
      img.url,
      img.breeds[0]?.name || "Cat",
      img.id
    );

    Carousel.appendCarousel(item);

    if (!infoRendered && img.breeds?.length) {
      infoRendered = true;
      const breed = img.breeds[0];

      const card = document.createElement("div");
      card.className = "breed-info";
      card.innerHTML = `
        <h3>${breed.name}</h3>
        <p><strong>Origin:</strong> ${breed.origin}</p>
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
        <p>${breed.description}</p>
      `;

      infoDump.appendChild(card);
    }
  });

  Carousel.start();
  progressBar.style.width = "100%";
  setTimeout(() => (progressBar.style.width = "0%"), 500);
}

//initialLoadAxios();
