const apiKey = "656f173395c28506763a3e9d15a312ad";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const weatherInfo = document.getElementById("weather-info");
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
      const { name, main, weather } = data;
      const { temp, humidity } = main;
      const { description, icon } = weather[0];
      weatherInfo.innerHTML = `
        <h2>Current Weather in ${name}</h2>
        <div>
          <img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}">
          <p>${description}</p>
        </div>
        <p>Temperature: ${temp} &deg;C</p>
        <p>Humidity: ${humidity}%</p>
      `;
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
      daily.slice(1, 6).forEach((day) => {
        const { dt, weather, temp } = day;
        const { description, icon } = weather[0];
        const date = new Date(dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
        forecastHTML += `
          <div class="forecast-item">
            <h3>${date}</h3>
            <img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}">
            <p>${description}</p>
            <p>High: ${temp.max} &deg;C</p>