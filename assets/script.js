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
