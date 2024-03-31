import {chancheInnerEquipment} from './weatherSlide';
import {checkWeather} from './APIweather'
import {renderTable} from './forecastTable'
import {checkForecastWeather} from './APIForecast';
import { renderErrorsList, renderListOfEquipments } from './renderValuePage';

document.addEventListener("DOMContentLoaded", () => {    
    const btnList = document.querySelector('.sidebar') as HTMLElement
    const value = document.querySelector('.value') as HTMLElement   

    value.classList.add('btnStyle')
    renderErrorsList()
    renderListOfEquipments()
    
    btnList.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        if (target.textContent === 'Value') {
            removeBtnStyle()
            btnStyle(target)
            renderErrorsList()
            renderListOfEquipments()           
        } else if (target.textContent === 'Weather') {
            chancheInnerEquipment()
            checkWeather()
            removeBtnStyle()
            btnStyle(target)
            const articleObjectData = document.querySelector('.data_now div') as HTMLElement
            renderTable(checkForecastWeather(articleObjectData.innerText), articleObjectData.innerText)         
        }
    })
//стили нажатой кнопки
    function removeBtnStyle() {
        const btn = document.querySelectorAll('.sidebar ul li')
        btn.forEach(button => {
            button.classList.remove('btnStyle')
        })
    }
    function btnStyle(target: HTMLElement) {
        target.classList.add('btnStyle')
    }
});