import {formatDate} from "./clock"
import {checkForecastWeather} from "./APIForecast"
import { renderTable } from "./forecastTable"

const articleEquipment = document.querySelector('.error_list') as HTMLElement
const container = document.createElement('div')
let sliderNumber: number = 0;

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
        articleEquipment.appendChild(arrowDown)
    }
}
//отрисовка новых элементов слайда и удаление старых
export function addDate(selector: HTMLElement, dates: any, clean: boolean): void {
    if(clean)selector.innerHTML = ''; // Очищаем содержимое контейнера    
    // Проходим по всем датам в массиве
    let dateDiv: HTMLDivElement = document.createElement('div'); // Создаем новый элемент div для даты
    dateDiv.textContent = dates; // Устанавливаем текстовое содержимое div равным текущей дате
    const dayOfWeek = dates.split(' ')[1]; // Получаем название дня недели
    dateDiv.innerHTML += `<br>${dayOfWeek}`; // Добавляем перенос строки и название дня недели в контейнер
    selector.appendChild(dateDiv); // Добавляем div с датой в контейнер
}
//логика отображения элементов
articleEquipment.addEventListener('click', (e) => {
    const target = e.target as HTMLImageElement;

    const updateSlider = (increment: number) => {
        sliderNumber += increment;
        sliderNumber = Math.max(0, Math.min(4, sliderNumber));

        const dates = getLastWeekDates(sliderNumber);
        addDate(container, dates, true);

        const getDate = document.querySelector('.error_list div div') as HTMLElement;
        renderTable(checkForecastWeather(getDate.innerText), getDate.innerText);
    };

    if (target.alt === 'up') {
        updateSlider(1);
    } else if (target.alt === 'down') {
        updateSlider(-1);
    }
});

export function getLastWeekDates(num: number) {
    const today = new Date(); 
    // Копируем текущую дату
    const date = new Date(today);
    // Вычитаем нужное количество дней, чтобы получить дату за прошлую неделю
    date.setDate(date.getDate() + (num + 1));
    // Форматируем дату
    return formatDate(date, 'dayOfWeek')
}

  