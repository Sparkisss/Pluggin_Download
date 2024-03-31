import {formatDate} from "./clock"
import {checkForecastWeather} from "./APIForecast"
import { renderTable } from "./forecastTable"

const articleEquipment = document.querySelector('.error_list') as HTMLElement
const articleObjectData = document.querySelector('.data_now') as HTMLElement
const container = document.createElement('div')
let sliderNumber: number = 0;
let selectorDate: string = ''

//создаем элементы для отображения дней недели и стрелки для управления
export function chancheInnerEquipment() {    
    const arrowUp = document.createElement('img')
    const arrowDown = document.createElement('img')

    arrowUp.src = "/assets/arrow-up.svg"        
    arrowUp.alt = 'up'
    arrowUp.classList.add('image')

    arrowDown.src = "/assets/arrow-down.svg"        
    arrowDown.alt = 'down'
    arrowDown.classList.add('image')

    if(articleEquipment) {
        articleEquipment.innerHTML = ''
        articleEquipment.appendChild(arrowUp)
        articleEquipment.appendChild(container)
        addDate(container, getLastWeekDates(sliderNumber), true)
        addDate(articleObjectData, getLastWeekDates(sliderNumber), true)
        articleEquipment.appendChild(arrowDown)
    }
}
//отрисовка новых элементов слайда и удаление старых
export function addDate(selector: HTMLElement, dates: any, clean: boolean): void {
    if(clean)selector.innerHTML = ''; // Очищаем содержимое контейнера    
    // Проходим по всем датам в массиве
    let dateDiv: HTMLDivElement = document.createElement('div'); // Создаем новый элемент div для даты
    dateDiv.textContent = dates; // Устанавливаем текстовое содержимое div равным текущей дате
    selector.appendChild(dateDiv); // Добавляем div с датой в контейнер
}
//логика отображения элементов
articleEquipment.addEventListener('click', (e) => {
    const target = e.target as HTMLImageElement
    let flag: boolean = false

    if (target.alt === 'up') {
        sliderNumber += 1
        if (sliderNumber > 4) {
            sliderNumber = 4
            flag = true
        } else flag = false
        console.log(flag)
        console.log(sliderNumber)
        if (!flag) {
            addDate(container, getLastWeekDates(sliderNumber), true)
            addDate(articleObjectData, getLastWeekDates(sliderNumber), true)
            selectorDate = articleObjectData.innerText
            renderTable(checkForecastWeather(selectorDate), selectorDate)
        }
    }
    if (target.alt === 'down') {
        sliderNumber -= 1
        if (sliderNumber < 0 ){
            sliderNumber = 0
            flag = true
        } else flag = false
        console.log(flag)
        console.log(sliderNumber)
        if (!flag) {
            addDate(container, getLastWeekDates(sliderNumber), true)
            addDate(articleObjectData, getLastWeekDates(sliderNumber), true)
            selectorDate = articleObjectData.innerText
            renderTable(checkForecastWeather(selectorDate), selectorDate)
        }
    }
})

export function getLastWeekDates(num: number) {
    const today = new Date(); 
    // Копируем текущую дату
    const date = new Date(today);
    // Вычитаем нужное количество дней, чтобы получить дату за прошлую неделю
    date.setDate(date.getDate() + (num + 1));
    // Форматируем дату
    return formatDate(date, false)
}

  