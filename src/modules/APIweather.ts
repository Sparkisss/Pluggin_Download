const apiKey = 'c3ce5c27c2eab8287f2be14870b310cb'

const apiUrl = 
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=brest&appid=${apiKey}`

async function checkWeather() {
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
}

checkWeather()