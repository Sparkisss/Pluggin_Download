import { updateDateTime } from "./clock"
export const apiKey = 'c3ce5c27c2eab8287f2be14870b310cb'

const apiUrl = 
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=brest&appid=${apiKey}`

const articleWeatherNow = document.querySelector('.equipment') as HTMLElement
//получаем данные
export async function checkWeather() {
    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error (`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const entries = [
            {
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                pressure: data.main.pressure,
                humidity: data.main.humidity
            }
        ]
        const windEntries = [{
            speed: data.wind.speed
        }]
        renderWeatherNow (entries, windEntries)
    }catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}
//отрисовка данных на страницу и времени
function renderWeatherNow (dataOfWeather: any[], dataOfWind: unknown[]) {
    articleWeatherNow.innerHTML = ''
    console.log(dataOfWeather[0])
    const data = [
        {name: 'Temp:', value: dataOfWeather[0], sign: '°C'},
        {name: 'Fells like:', value: dataOfWeather[1], sign: '°C'},
        {name: 'Pressure:', value: dataOfWeather[4], sign: 'Pa'},
        {name: 'Humidity:', value: dataOfWeather[5], sign: '%'},
        {name: 'Wind speed', value: dataOfWind[0], sign: 'm/s'},     
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

    data.forEach(data => {
        const div = document.createElement('div')
        div.textContent = `${data.name} - ${data.value}${data.sign}`
        div.classList.add('wraps')
        articleWeatherNow.appendChild(div)
    })
}
