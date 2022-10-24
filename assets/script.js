//Defined API Key
const API_KEY_OPENWEATHERMAP = "04a4868d28d9f806b949555cd53bedb7"
// Retrieves the result from the requested URL
async function getApi(requestUrl) {
    let result = await fetch(requestUrl)
    result = await result.json()
    console.log(result)
    return result
}
