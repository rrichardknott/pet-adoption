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
    "https://learnwebcode.github.io/bootcamp-pet-data/pets.json"
  );
  const petsData = await petsPromise.json();
  petsData.forEach((pet) => {
    console.log(pet.name);
  });
};

petsArea();
