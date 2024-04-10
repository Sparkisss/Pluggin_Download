import { updateDateTime } from "./clock"
export const apiKey = 'c3ce5c27c2eab8287f2be14870b310cb'

const apiUrl = 
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=brest&appid=${apiKey}`

const articleWeatherNow = document.querySelector('.equipment') as HTMLElement

interface WeatherData {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
}
interface WindData {
    speed: number;
}
//получаем данные
export async function checkWeather() {
    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error (`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const weatherData = {
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                pressure: data.main.pressure,
                humidity: data.main.humidity
        }
        const windEntries = {
            speed: data.wind.speed
        }
        renderWeatherNow (weatherData, windEntries)
    }catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}
//отрисовка данных на страницу и времени
function renderWeatherNow (dataOfWeather: WeatherData, dataOfWind: WindData) {
    articleWeatherNow.innerHTML = ''
    const data = [
        {name: 'Temp:', value: dataOfWeather.temp, sign: '°C'},
        {name: 'Fells like:', value: dataOfWeather.feels_like, sign: '°C'},
        {name: 'Pressure:', value: dataOfWeather.pressure, sign: 'Pa'},
        {name: 'Humidity:', value: dataOfWeather.humidity, sign: '%'},
        {name: 'Wind speed', value: dataOfWind.speed, sign: 'm/s'},     
    ]
    const clock: HTMLDivElement = document.createElement('div')
    const screen = document.createElement('div')    
    const time = document.createElement('div')

    clock.classList.add('wrap')
    screen.classList.add('display')
    time.id = 'time'

    updateDateTime(time)
    setInterval(()=>updateDateTime(time), 60000);

    articleWeatherNow.appendChild(clock)
    clock.appendChild(screen)
    screen.appendChild(time)

    const fragment = document.createDocumentFragment()

    data.forEach(data => {
        const div = document.createElement('div')
        div.textContent = `${data.name} - ${data.value}${data.sign}`
        div.classList.add('wraps')
        fragment.appendChild(div)
    })
    articleWeatherNow.appendChild(fragment)
}
