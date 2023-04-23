const apiKey = "656f173395c28506763a3e9d15a312ad";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const forecastContainer = document.getElementById("forecast-container");
const currentLocationBtn = document.getElementById("current-location-btn");

// Search for a city
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = searchInput.value;
  if (city) {
    getWeatherData(city);
  }
});

// Get weather data for a city
const getWeatherData = (city) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      const { name, main, weather, wind } = data;
      const { temp, humidity } = main;
      const { description, icon } = weather[0];
      const { speed } = wind;
      cityName.textContent = `Current Weather in ${name}`;
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}">`;
      temperature.textContent = `Temperature: ${temp} \u00B0C`;
      description.textContent = `Weather: ${description}`;
      humidity.textContent = `Humidity: ${humidity}%`;
      windSpeed.textContent = `Wind Speed: ${speed} m/s`;
      getForecastData(data.coord);
    })
    .catch((error) => console.log(error));
};

// Get forecast data for a city
const getForecastData = (coord) => {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      const { daily } = data;
      let forecastHTML = "";
      daily.slice(1, 6
