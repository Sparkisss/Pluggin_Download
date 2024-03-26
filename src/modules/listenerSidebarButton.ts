import {chancheInnerEquipment} from './weatherSlide';

document.addEventListener("DOMContentLoaded", () => {    
    const btnList = document.querySelector('.sidebar') as HTMLElement    

    btnList.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        if (target.textContent === 'Value') {
            console.log('Value')            
        } else if (target.textContent === 'Weather') {
            chancheInnerEquipment()            
        }
    })
});