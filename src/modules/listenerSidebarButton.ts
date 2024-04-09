import {chancheInnerEquipment} from './weatherSlide';
import {checkWeather} from './APIweather'
import {renderTable} from './forecastTable'
import {checkForecastWeather} from './APIForecast';
import { renderErrorsList, renderListOfEquipments, renderDeviceStatus} from './renderValuePage';

document.addEventListener("DOMContentLoaded", () => {    
    const btnList = document.querySelector('.sidebar') as HTMLElement
    const value = document.querySelector('.value') as HTMLElement
    const equipments = document.querySelector('.equipment') as HTMLElement
    const device = document.querySelector('.device') as HTMLElement   

    value.classList.add('btnStyle')
    renderErrorsList()
    renderListOfEquipments(equipments)
    renderDeviceStatus(device)
    
    btnList.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        if (target.textContent === 'Value') {
            removeBtnStyle()
            btnStyle(target)
            renderErrorsList()
            renderListOfEquipments(equipments)
            renderDeviceStatus(device)
        } else if (target.textContent === 'Weather') {
            chancheInnerEquipment()
            checkWeather()
            removeBtnStyle()
            btnStyle(target)
            const getDate = document.querySelector('.error_list div div') as HTMLElement
            renderTable(checkForecastWeather(getDate.innerText), getDate.innerText) 
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