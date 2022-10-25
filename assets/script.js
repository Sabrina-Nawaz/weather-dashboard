//Defined API Key
const API_KEY_OPENWEATHERMAP = "04a4868d28d9f806b949555cd53bedb7"
// Retrieves the result from the requested URL
async function getApi(requestUrl) {
    let result = await fetch(requestUrl)
    result = await result.json()
    console.log(result)
    return result
}
// Gets city coordinates
function getCoordinatesByCity(city) {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY_OPENWEATHERMAP}`
}
// gets the weather by city coordinates 
function getWeatherByCoordinates(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY_OPENWEATHERMAP}&units=metric`
}
// Function retrieves results for the weather by the city 
async function getWeatherByCity(city) {
    const results = await getApi(getCoordinatesByCity(city))
    const result = results[0]
    if (!result) return;
    const weather = await getApi(getWeatherByCoordinates(result.lat, result.lon))
    return weather;
}
// Function to get an icon image
function getIconById (id) {
    return `http://openweathermap.org/img/wn/${id}@2x.png`
}
const button = document.getElementById("search-city")

button.addEventListener('click', async function inputValue() {
    //Press button will get the value from the input
    const city = document.getElementsByTagName("input")[0].value
    //The input value is passed into the function getWeatherByCity
    const weatherConditions = await getWeatherByCity(city)
    //Show the weather results on the right column for current weather
    console.log(weatherConditions)
    const cityDate = weatherConditions.list[0].dt_txt
    const cityTemp =  weatherConditions.list[0].main.temp
    const cityWind = weatherConditions.list[0].wind.speed
    const cityHumid = weatherConditions.list[0].main.humidity
    const weatherImg = getIconById(weatherConditions.list[0].weather[0].icon)
    //Show the weather results on the right column for the forecast 
    var weatherResults = document.querySelector("#current-weather", options)
        .then(function (response) {
            return response.json();
        })
        
    //Create elements, append values to the element and then append it to the current-weather in html 
    
})

//Right column is split between two rows; current weather and future weather 
//Future weather we want split into 5 days 
//Left column save the city as a button with longitude and latitude in local storage 