import { apiKey } from "./APIweather"
import { addDate } from "./weatherSlide"

const forecastPlace = document.querySelector('.data_now') as HTMLElement

const apiForecastKeyUrl = 
    `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=brest&appid=${apiKey}`

export async function checkForecastWeather(fileDate:string) {
    const response = await fetch(apiForecastKeyUrl)
    const data = await response.json()
    const forecastDate = data.list
    let ourDate: any = getDayForecast(fileDate, forecastDate)
    for (const key in ourDate) {
        if (ourDate.hasOwnProperty(key)) {
            const value = ourDate[key];
            addDate(forecastPlace, value, false)
        }
    }
    
    return getTableForecast(fileDate, forecastDate)
}

interface WeatherData {
    dt_txt: string;
    main: MainData;
    wind: MainWind;
    weather: MainWeather;
    // Другие свойства, если есть
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
function getDayForecast(selectorDate: string, arr: WeatherData[]) {

    interface SetOfData {
        temp_morning: number;
        fells_like_morning: number;
        temp_afternoon: number;
        fells_like_afternoon: number;
        temp_night: number;
        fells_like_night: number;
        humidity: number;
        wind: number;
        pressure: number;
        weather: string;
    }

    const setOfData: SetOfData = {
        temp_morning: 0,
        fells_like_morning: 0,
        temp_afternoon: 0,
        fells_like_afternoon: 0,
        temp_night: 0,
        fells_like_night: 0,
        humidity: 0,
        wind: 0,
        pressure: 0,
        weather: 'cloud'
    };
    
    arr.forEach((arrItem) => {
        if (typeof arrItem.dt_txt === 'string' && selectorDate.split(' ')[0] === arrItem.dt_txt.split(' ')[0]) {
            let forecastTime = arrItem.dt_txt.split(' ')[1]
            if (forecastTime === '09:00:00') {
                setOfData.temp_morning = arrItem.main.temp
                setOfData.fells_like_morning = arrItem.main.feels_like                
            }
            if (forecastTime === '18:00:00') {
                setOfData.temp_afternoon = arrItem.main.temp
                setOfData.fells_like_afternoon = arrItem.main.feels_like
                setOfData.humidity = arrItem.main.humidity
                setOfData.pressure = arrItem.main.pressure
                setOfData.wind = arrItem.wind.speed
                setOfData.weather = arrItem.weather[0].description            
            }
            if (forecastTime === '21:00:00') {
                setOfData.temp_night = arrItem.main.temp
                setOfData.fells_like_night = arrItem.main.feels_like                
            }
        }
    });
    return setOfData
}

function getTableForecast(selectorDate: string, arr: WeatherData[]) {
    const arrTableForecastData: number[] = []
    arr.forEach(arrItem => {
        if (typeof arrItem.dt_txt === 'string' && selectorDate.split(' ')[0] === arrItem.dt_txt.split(' ')[0]) {
            arrTableForecastData.push(arrItem.main.temp)
        }
    })
    return arrTableForecastData
}