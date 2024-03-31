import {fetchDataFromServer} from './postData'

export function renderErrorsList() {
    const errorsList = document.querySelector('.error_list') as HTMLElement
    errorsList.innerHTML = ''
    const errors = [
        { name: 'E1', description: 'disconnection with t1', extra: "extra information1"},
        { name: 'E2', description: 'dry running of pumps', extra: "extra information2"},
        { name: 'E3', description: 'high temperature', extra: "extra information3" },
        { name: 'E4', description: 'low temperature', extra: "extra information4" },
        { name: 'E5', description: 'disconnection with t2', extra: "extra information5" }
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
        li.textContent = `${error.name}-${error.description}`
        ul.appendChild(li)
    });
}

export function renderListOfEquipments() {
    const equipments = document.querySelector('.equipment') as HTMLElement
    equipments.innerHTML = ''

    const thLabel = [
        {name: 'Name'},
        {name: 'Mark'},
        {name: 'State'},
    ]
    const tbl = document.createElement('table')
    const capt = document.createElement('caption')
    const tHeader = document.createElement('thead')
    const tr = document.createElement('tr')
    const tblBody = document.createElement('tbody')

    capt.innerText = 'List of equipments:'

    equipments.appendChild(tbl)
    tbl.appendChild(capt)
    tbl.appendChild(tHeader)
    tHeader.appendChild(tr)

    thLabel.forEach(label => {
        const th = document.createElement('th')
        th.textContent = `${label.name}`
        tr.appendChild(th)
    })

    tblBody.classList.add('listOfEquipments')
    tbl.appendChild(tblBody)

    fetchDataFromServer()
}