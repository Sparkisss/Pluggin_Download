import {chancheInnerEquipment} from './weatherSlide';
import {checkWeather} from './APIweather'

document.addEventListener("DOMContentLoaded", () => {    
    const btnList = document.querySelector('.sidebar') as HTMLElement
    const value = document.querySelector('.value') as HTMLElement   

    value.classList.add('btnStyle')
    
    btnList.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        if (target.textContent === 'Value') {
            removeBtnStyle()
            btnStyle(target)            
        } else if (target.textContent === 'Weather') {            
            chancheInnerEquipment()
            checkWeather()
            removeBtnStyle()
            btnStyle(target)
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