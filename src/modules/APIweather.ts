import { updateDateTime } from "./clock"

const apiKey = 'c3ce5c27c2eab8287f2be14870b310cb'

const apiUrl = 
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=brest&appid=${apiKey}`

const articleWeatherNow = document.querySelector('.error_list') as HTMLElement
//получаем данные
export async function checkWeather() {
    const response = await fetch(apiUrl)
    const data = await response.json()
    const entries = Object.entries(data.main)
    const windEntries = Object.entries(data.wind)
    renderWeatherNow (entries, windEntries)
}
//отрисовка данных на страницу и времени
function renderWeatherNow (dataOfWeather: unknown[], dataOfWind: unknown[]) {
    articleWeatherNow.innerHTML = ''
    let clock: HTMLDivElement = document.createElement('div')
    let temp: HTMLDivElement = document.createElement('div')
    let feelsTemp: HTMLDivElement = document.createElement('div')
    let pressure: HTMLDivElement = document.createElement('div')
    let humidity: HTMLDivElement = document.createElement('div')
    let windSpeed: HTMLDivElement = document.createElement('div')
    updateDateTime(clock)
    setInterval(()=>updateDateTime(clock), 60000);
    if (Array.isArray(dataOfWeather)) {
        temp.textContent = (dataOfWeather[0] as (string | number)[]).join(' - ') + '°C';
        feelsTemp.textContent = (dataOfWeather[1] as (string | number)[]).join(' - ') + '°C'
        pressure.textContent = (dataOfWeather[4] as (string | number)[]).join(' - ') + 'Pa'
        humidity.textContent = (dataOfWeather[5] as (string | number)[]).join(' - ') + '%'
        windSpeed.textContent = (dataOfWind[0] as (string | number)[]).join(' - ') + 'm/s'
    }
    articleWeatherNow.appendChild(clock)    
    articleWeatherNow.appendChild(temp)
    articleWeatherNow.appendChild(feelsTemp)
    articleWeatherNow.appendChild(pressure)
    articleWeatherNow.appendChild(humidity)
    articleWeatherNow.appendChild(windSpeed)
}
