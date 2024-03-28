import { apiKey } from "./APIweather"
// import { getLastWeekDates, addDate } from "./weatherSlide"

const forecastPlace = document.querySelector('.data_now') as HTMLElement
let selectorDate: string = '2024-03-29'

const apiForecastKeyUrl = 
    `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=brest&appid=${apiKey}`

export async function checkForecastWeather() {
    const response = await fetch(apiForecastKeyUrl)
    const data = await response.json()
    const forecastDate = data.list
    console.log(data.list[1])
    getDayForecast(selectorDate, forecastDate)
}

function forecastRender() {
    const d = document.createElement('div');
    d.textContent = 'd';
    // Вставляем элемент d после forecastPlace
    forecastPlace.insertAdjacentElement('afterend', d);
}

function getDayForecast(selectorDate: string, arr: string[]) {
    arr.forEach((item, i) => {
        if (selectorDate === item) {
            console.log('successes')
        }else console.log('fail')
    }) 
}


checkForecastWeather()