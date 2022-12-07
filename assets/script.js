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

// Function to show the five day forecast
function fiveDayForecast(cityName) {
  fetch(weatherAPI + cityName)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      forecast.innerHTML = " ";
      days = [0, 7, 15, 23, 31];
      days.forEach(function (i) {
        let divEl = document.createElement("div");
        let forecastDate = document.createElement("p");
        let forecastTemp = document.createElement("p");
        let forecastWind = document.createElement("p");
        let forecastHumidity = document.createElement("p");
        let forecastPicture = document.createElement("img");
        forecastDate.textContent = "Date: " + data.list[i].dt_txt.split(" ")[0];
        forecastTemp.textContent =
          "Temperature: " + data.list[i].main.temp + "°C";
        forecastWind.textContent =
          "Wind Speed: " + data.list[i].wind.speed + "Km/h";
        forecastHumidity.textContent =
          "Humidity: " + data.list[i].main.humidity + "%";
        divEl.setAttribute("class", "fiveDayForecastCard");
        forecastPicture.src = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
        divEl.appendChild(forecastDate);
        divEl.appendChild(forecastPicture);
        divEl.appendChild(forecastTemp);
        divEl.appendChild(forecastWind);
        divEl.appendChild(forecastHumidity);
        forecast.appendChild(divEl);
      });
    });
}

//Function for local storage
function localStorageCity() {
  //Empty the html element container of the button list items
  let ulHistory = document.querySelector("#ulhistory");
  ulHistory.innerHTML = " ";
  for (let i = 0; i < cityHistory.length; i++) {
    let historyList = document.createElement("li");
    historyList.textContent = cityHistory[i];
    historyList.setAttribute("class", "historyList");
    ulHistory.appendChild(historyList);
  }
}

//Click event function for the search button
searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  let city = searchInput.value;
  if (cityHistory.indexOf(city) == -1) {
    cityHistory.push(city);
  }

  localStorage.setItem("cities", JSON.stringify(cityHistory));
  //Call on Functions
  renderWeatherDashboard(city);
  fiveDayForecast(city);
  localStorageCity();
});

//Uses local store when the page loads
localStorageCity();

//Displays city history as the search result
ulHistory.addEventListener("click", function (event) {
  let city = event.target.textContent;
  renderWeatherDashboard(city);
  fiveDayForecast(city);
});
