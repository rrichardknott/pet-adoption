const template = document.getElementById("pet-card-template");
const wrapper = document.createDocumentFragment();

const start = async () => {
  const weatherPromise = await fetch(
    "https://api.weather.gov/gridpoints/LOX/161,41/forecast"
  );
  const weatherData = await weatherPromise.json();
  const theTemperature = weatherData.properties.periods[0].temperature;
  document.getElementById("temperature-output").textContent = theTemperature;
};

start();

const petsArea = async () => {
  const petsPromise = await fetch(
    "https://effervescent-basbousa-b673c4.netlify.app/.netlify/functions/pets"
  );
  const petsData = await petsPromise.json();
  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".pet-card").dataset.species = pet.species;
    clone.querySelector("h3").textContent = pet.name;
    clone.querySelector(".pet-description").textContent = pet.description;
    clone.querySelector(".pet-birth-year").textContent = getAge(pet.birthYear);

    pet.photo && pet.photo.trim() !== ""
      ? ((clone.querySelector(".pet-card-photo img").src = pet.photo),
        (clone.querySelector(
          ".pet-card-photo img"
        ).alt = `A ${pet.species} named ${pet.name}`))
      : ((clone.querySelector(".pet-card-photo img").src =
          "https://www.robohash.org/animal"),
        (clone.querySelector(
          ".pet-card-photo img"
        ).alt = ` A ${pet.species} named ${pet.name}`));

    wrapper.appendChild(clone);
  });
  document.querySelector(".list-of-pets").appendChild(wrapper);
};

petsArea();

const getAge = (birthYear) => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  if (age == 1) return "1 Year Old";
  if (age == 0) return "Less than a year old";
  return `${age} years old`;
};

//============ pet filter code ==============//
const allButtons = document.querySelectorAll(".pet-filter button");

const handleButtonClick = (e) => {
  const currentFilter = e.target.dataset.filter;
  document.querySelectorAll(".pet-card").forEach((el) => {
    if (currentFilter == el.dataset.species || currentFilter == "all") {
      el.style.display = "flex";
    } else {
      el.style.display = "none";
    }
  });
};

allButtons.forEach((btn) => {
  btn.addEventListener("click", handleButtonClick);
});
