import {formatDate} from "./clock"

const articleEquipment = document.querySelector('.equipment') as HTMLElement
const container = document.createElement('div')
let sliderNumber: number = 0 
const now = new Date()
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
        addDate(container, sliderNumber)
        articleEquipment.appendChild(arrowDown)
    }
}
//отрисовка новых элементов слайда и удаление старых
function addDate(selector: any, num: number) {
    selector.innerHTML = ''

    // const divs: HTMLDivElement[] = []
    for (let i = 0; i < 7; i++) {
        selector[i] = document.createElement('div')
        selector[i].textContent = `${i + 1}`      
        selector.appendChild(selector[i])
    }
}
//логика отображения элементов
articleEquipment.addEventListener('click', (e) => {
    const target = e.target as HTMLImageElement

    if (target.alt === 'up') {
        sliderNumber += 7
        console.log(getLastWeekDates(sliderNumber));
        addDate(container, sliderNumber)
    }
    if (target.alt === 'down') {
        sliderNumber -= 7
        addDate(container, sliderNumber)
    }
})




function getLastWeekDates(num: number) {

    const dates = [];
    const today = new Date();
    const dayOfWeek = today.getDay(); // Получаем день недели от 0 (воскресенье) до 6 (суббота)
  
    // Перебираем последние 7 дней
    for (let i = num; i < 7 + num; i++) {
      // Копируем текущую дату
      const date = new Date(today);
      // Вычитаем нужное количество дней, чтобы получить дату за прошлую неделю
      date.setDate(date.getDate() - (dayOfWeek + i));
      // Форматируем дату и добавляем в массив
      dates.push(formatDate(date, false));
    }  
    return dates.reverse(); // Переворачиваем массив, чтобы даты шли по порядку
  }
  

  
//   Использование функции
  console.log(getLastWeekDates(sliderNumber));
  