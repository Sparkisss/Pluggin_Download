// берем данные из прибора по SerialPort и выводим на страницу
import { io } from "socket.io-client"

export const socket = io("http://localhost:8000")

const ARRAY_SIZE = 12; // Размер массива
let data: number[] = new Array(ARRAY_SIZE).fill(0) // Создаем и инициализируем массив

// Функция для обработки полученных данных
export function processData(receivedData: string): void {
    let newData = receivedData.split(' ').map(Number)
    if (newData.length === ARRAY_SIZE) {
        if(JSON.stringify(data) != JSON.stringify(newData)) {
            data = newData
            renderValue()
        } 
    } else {
        console.log('Ошибка: Некорректное количество данных' + newData.length)
    }
}
// отображение данных на экране
function renderValue() {
    const deviceValue = document.querySelectorAll('.device .value')
    const deviceSetpoint = document.querySelectorAll('.device .setpoint')
    const setpointListValue = document.querySelectorAll('.data_now .data_now-value')
    
    if (deviceValue[0]) deviceValue[0].innerHTML = `${data[1]}&#8451`
    if (deviceValue[1]) cnangeValue(data[2], deviceValue[1])
    
    if (deviceValue[2]) cnangeValue(data[5], deviceValue[2])
    if (deviceValue[3]) cnangeValue(data[4], deviceValue[3])
    if (deviceValue[4]) cnangeValue(data[3], deviceValue[4])
    if (deviceValue[5]) deviceValue[5].innerHTML = `${data[6]}&#37`

    if (deviceSetpoint[0]) deviceSetpoint[0].innerHTML = `${data[0]}&#8451`
    if (deviceSetpoint[1]) cnangeValue(data[5], deviceSetpoint[1])
    if (deviceSetpoint[2]) cnangeValue(data[4], deviceSetpoint[2])
    if (deviceSetpoint[3]) cnangeValue(data[3], deviceSetpoint[3])
    if (deviceSetpoint[4]) deviceSetpoint[4].innerHTML = `${data[7]}&#37`

    if (setpointListValue[0])setpointListValue[0].innerHTML = `${data[1]}&#8451`
    if (setpointListValue[1]) setpointListValue[1].innerHTML = `${data[8]}`
    if (setpointListValue[2]) setpointListValue[2].innerHTML = `${data[9]}`
    if (setpointListValue[3]) setpointListValue[3].innerHTML = `${data[10]}`
} 
// меняем 0 на off и 1 на on
function cnangeValue(data: number, selector: Element) {
    if (data === 0) {
        selector.innerHTML = 'Off'
    } else if (data === 1) {
        selector.innerHTML = 'On'
    } else selector.innerHTML = 'Error'
}
// получаем данные
socket.on('data', (data) => {
    processData(data)
});