console.log("javascript connected!");

const carousel = new bootstrap.Carousel("#homeCarousel", {
  interval: 2000,
  pause: false,
});

const carouselButton = document.getElementById("carouselButton");
const faIcon = document.getElementById("faButton");

carouselButton.addEventListener("click", function () {
  if (faIcon.classList.contains("fa-pause")) {
    faIcon.classList.remove("fa-pause");
    faIcon.classList.add("fa-play");
    carousel.pause();
  } else {
    faIcon.classList.remove("fa-play");
    faIcon.classList.add("fa-pause");
    carousel.cycle();
  }
});

async function fetchWeather() {
  try {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = "New York";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (error) {
    console.error(`There was an error!`, error);
  } finally {
    console.log("Fetched response");
  }
}

fetchWeather();

function displayWeather(weatherData) {
  const weatherIcon = document.querySelector("#weather-icon");
  const weatherTemp = document.querySelector("#weather-temp");
  const weatherDescription = document.querySelector("#weather-description");
  const cityWeather = document.querySelector("#city-weather");

  const icon = document.createElement("img");
  icon.src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  weatherIcon.appendChild(icon);

//    temp in fahrenheit
  // const temp = document.createElement("h6");
  // temp.textContent = `${weatherData.main.temp.toFixed(1)}\u00B0F`;
  // weatherTemp.appendChild(temp);

//   temp in celsius 
  const tempFahrenheit = weatherData.main.temp;
  const tempCelsius = (((tempFahrenheit - 32) * 5) / 9).toFixed(1);
  const temp = document.createElement("h6");
  temp.textContent = `${tempCelsius}\u00B0C`;
  weatherTemp.appendChild(temp);

  const description = document.createElement("h6");
  description.textContent = `${weatherData.weather[0].description}`;
  weatherDescription.appendChild(description);

  const cityName = document.createElement("h6")
  cityName.textContent = `-- ${weatherData.name}`;
  cityWeather.appendChild(cityName);

}
