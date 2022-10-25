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
