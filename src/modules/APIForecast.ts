import { apiKey } from "./APIweather"

const apiForecastKeyUrl = 
    `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=brest&appid=${apiKey}`

export async function checkForecastWeather(fileDate:string): Promise<number[]> {
    const cacheKey = `forecast-${fileDate}`
    const cachedData = localStorage.getItem(cacheKey)
    if (cachedData) {
        return JSON.parse(cachedData)
    }
    try {
        const response = await fetch(apiForecastKeyUrl)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const forecastData = getTableForecast(fileDate, data.list) || []
        localStorage.setItem(cacheKey, JSON.stringify(forecastData))
        return forecastData
    }catch (error) {
        console.error('There was a problem with the fetch operation:', error)
        return []
    }    
}

interface WeatherData {
    dt_txt: string;
    main: MainData;
    wind: MainWind;
    weather: MainWeather[];
}
interface MainData {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
}
interface MainWind {
    speed: number
}
interface MainWeather {
    0: MainWeatherDescriprion
}
interface MainWeatherDescriprion {
    description: string
}
function getTableForecast(selectorDate: string, arr: WeatherData[]): number[] {
    return arr
        .filter(arrItem => arrItem.dt_txt.startsWith(selectorDate.split(' ')[0]))
        .map(arrItem => arrItem.main.temp);
}
