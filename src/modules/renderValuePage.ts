import {fetchDataFromServer} from './postData'

const thLabelEquipment = [
    {name: 'Name'},
    {name: 'Mark'},
    {name: 'State'},
]

const thLabelDevice = [
    {name: 'Device'},
    {name: 'Value'},
    {name: 'Setpoint'},
]

const dataDeviceStatus: string[][] = [
    ['Temp. sensor - supply', '...init', '...init'],
    ['Sensor - pressure', '...init', '-'],
    ['Main pump', '...init', '...init'],
    ['Standby pump', '...init', '...init'],
    ['Solenoid valve', '...init', '...init'],
    ['Control valve', '...init', '...init'],
]
export function renderErrorsList() {
    const errorsList = document.querySelector('.error_list') as HTMLElement
    errorsList.innerHTML = ''
    const errors = [
        { name: 'E1', description: 'disconnection with t1', 
        extra:`
            1. Check wire;<br>
            2. Check the resistance of the sensor and compare with the control table;<br>
            3. Check controller compatibility with sensor;<br>
        `},
        { name: 'E2', description: 'dry running of pumps', 
        extra:`
            1. Check the presence of water in the pipe;<br>
            2. Check sensor charter;<br>
            3. Check sensor performance;<br>
        `},
        { name: 'E3', description: 'high temperature', 
        extra:`
            1. Check the presence of water in the pipe;<br>
            2. Check the operation of the control valve;<br>
            3. Check controller performance;<br>
        `},
        { name: 'E4', description: 'low temperature', 
        extra:`
            1. Check the presence of water in the pipe;<br>
            2. Check the operation of the control valve;<br>
            3. Check controller performance;<br>
        `},
        { name: 'E5', description: 'disconnection with t2', 
        extra:`
            1. Check wire;<br>
            2. Check the resistance of the sensor and compare with the control table;<br>
            3. Check controller compatibility with sensor;<br>
        `},
    ];
    const ul = document.createElement('ul')
    errorsList.appendChild(ul)
    const h2 = document.createElement('h2')
    h2.innerText = 'Error list:'
    ul.appendChild(h2);
    // Создаем элементы списка ошибок
    errors.forEach(error => {
        const li = document.createElement('li')
        li.setAttribute('data-tooltip', `${error.extra}`)
        li.innerHTML = `${error.name}-${error.description}`
        ul.appendChild(li)
    });
}

export function renderListOfEquipments(selector: HTMLElement) {
    selector.innerHTML = ''

    const tbl = document.createElement('table')
    const capt = document.createElement('caption')
    const tHeader = document.createElement('thead')
    const tr = document.createElement('tr')
    const tblBody = document.createElement('tbody')

    if (selector.classList.contains('equipment')) {
        capt.innerText = 'List of equipments:'
        thLabelEquipment.forEach(label => {
            const th = document.createElement('th')
            th.textContent = `${label.name}`
            tr.appendChild(th)
        })
    
        tblBody.classList.add('listOfEquipments')
        tbl.appendChild(tblBody)
    
        fetchDataFromServer()
    }else if (selector.classList.contains('device')) {
        capt.innerText = 'Device status:'

        thLabelDevice.forEach(label => {
            const th = document.createElement('th')
            th.textContent = `${label.name}`
            tr.appendChild(th)
        })

        dataDeviceStatus.forEach((item: any, i) => {
            const tr = document.createElement('tr')

            if(tr && i === 0 || i === 5) {
                tr.innerHTML = `                
                    <td>${item[0]}</td>
                    <td class="value">${item[1]}</td>
                    <td class="setpoint">${item[2]}</td>                  
                `
            } else if (tr && i === 1) {
                tr.innerHTML = `                
                    <td>${item[0]}</td>
                    <td class="value">${item[1]}</td>
                    <td>${item[2]}</td>                  
                `
            } else if (tr && i >=2 && i <=4) {
                tr.innerHTML = `                
                    <td>${item[0]}</td>
                    <td class="value">${item[1]}</td>
                    <td class="setpoint" id="${i - 2}">${item[2]}</td>                  
                `
            }
            tbl.appendChild(tr)
        })

    }
    
    selector.appendChild(tbl)
    tbl.appendChild(capt)
    tbl.appendChild(tHeader)
    tHeader.appendChild(tr)
}