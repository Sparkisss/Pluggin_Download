const articleEquipment = document.querySelector('.equipment') as HTMLElement
const container = document.createElement('div')
let sliderNumber: number = 0 
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
        addDate(container, 0)
        articleEquipment.appendChild(arrowDown)
    }
}
//отрисовка новых элементов слайда и удаление старых
function addDate(selector: Element, num: number) {
    selector.innerHTML = ''

    const divs: HTMLDivElement[] = []
    for (let i = num; i < 7 + num; i++) {
        divs[i] = document.createElement('div')
        divs[i].textContent = `${i + 1}`
        selector.appendChild(divs[i])
    }
}
//логика отображения элементов
articleEquipment.addEventListener('click', (e) => {
    const target = e.target as HTMLImageElement

    if (target.alt === 'up') {
        sliderNumber += 7
        addDate(container, sliderNumber)
    }
    if (target.alt === 'down') {
        sliderNumber -= 7
        addDate(container, sliderNumber)
    }
})