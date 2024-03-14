// берем данные из прибора по SerialPort и выводим на страницу
import { io } from "socket.io-client"

const socket = io("http://localhost:8000")      

const deviceValue = document.querySelectorAll('.device .value')
const deviceSetpoint = document.querySelectorAll('.device .setpoint')
const setpointListValue = document.querySelectorAll('.data_now .data_now-value')

const ARRAY_SIZE = 12; // Размер массива
let data: number[] = new Array(ARRAY_SIZE).fill(0) // Создаем и инициализируем массив

// Функция для обработки полученных данных
function processData(receivedData: string): void {
    let newData = receivedData.split(' ').map(Number)

    if (newData.length === ARRAY_SIZE) {
        if(JSON.stringify(data) != JSON.stringify(newData)) {
            data = newData
            renderValue(0, 1, deviceValue)
            renderValue(1, 2, deviceValue)
            renderValue(2, 4, deviceValue)
            renderValue(3, 5, deviceValue)
            renderValue(4, 3, deviceValue)
            renderValue(5, 6, deviceValue)
            renderValue(0, 0, deviceSetpoint)
            renderValue(1, 4, deviceSetpoint)
            renderValue(2, 5, deviceSetpoint)
            renderValue(3, 3, deviceSetpoint)
            renderValue(4, 7, deviceSetpoint)
            renderValue(0, 0, setpointListValue)
            renderValue(1, 8, setpointListValue)
            renderValue(2, 9, setpointListValue)
            renderValue(3, 10, setpointListValue)
        } 
    } else {
        console.log('Ошибка: Некорректное количество данных' + newData.length)
    }
}

function renderValue(element:number, value:number, selector:any) {
    
    if (value === 0 || value === 1) {
        selector[element].innerHTML = `${data[value]}&#8451`
    }else if (value >= 2 && value <=5) {
        if (data[value] === 0) {
            selector[element].innerHTML = `Off`
        }else if (data[value] === 1) {
            selector[element].innerHTML = `On`
        }
    }else if (value === 6 || value === 7) {
        selector[element].innerHTML = `${data[value]}&#37`
    }else selector[element].innerHTML = `${data[value]}`
}

socket.on('data', (data) => {
    processData(data)
});