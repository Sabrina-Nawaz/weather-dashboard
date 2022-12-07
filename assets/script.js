//Variable Declaration
let currentWeather = document.querySelector(".current-weather");
let currentTemp = document.querySelector(".current-temp");
let currentWind = document.querySelector(".current-wind");
let currentHumidity = document.querySelector(".current-humid");
let currentWeatherImg = document.querySelector(".current-weatherImg");
let searchInput = document.querySelector(".searchInput");
let searchButton = document.querySelector(".searchButton");
let currentCityName = document.querySelector(".current-cityName");
let forecast = document.querySelector(".forecast");
let cityHistory = JSON.parse(localStorage.getItem("cities")) || [];
let ulHistory = document.querySelector("#ulhistory");

//API Variables
let APIKey = "04a4868d28d9f806b949555cd53bedb7";
let weatherAPI =
  "https://api.openweathermap.org/data/2.5/forecast?appid=" +
  APIKey +
  "&units=metric&q=";

//Function to display the Weather Dashboard
function renderWeatherDashboard(cityName) {
  fetch(weatherAPI + cityName)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.city.name);
      currentCityName.textContent = "City: " + data.city.name;
      currentTemp.textContent = "Temperature: " + data.list[0].main.temp + "°C";
      currentWind.textContent =
        "Wind Speed: " + data.list[0].wind.speed + "Km/h";
      currentHumidity.textContent =
        "Humidity: " + data.list[0].main.humidity + "%";

      currentWeatherImg.src = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    });
}


