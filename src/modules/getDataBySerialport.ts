// берем данные из прибора по SerialPort и выводим на страницу
import { io } from "socket.io-client"

export const socket = io("http://localhost:8000")
const ARRAY_SIZE = 12; // Размер массива
let data: number[] = new Array(ARRAY_SIZE).fill(0) // Создаем и инициализируем массив

// Функция для обработки полученных данных
export function processData(receivedData: string): void {
    let newData = receivedData.split(' ').map(Number)
    if (newData.length === ARRAY_SIZE) {
        if(!data.every((value, index) => value === newData[index])) {
            data = newData
            renderValue()
        } 
    } else {
        throw new Error(`Ошибка: Некорректное количество данных ${newData.length}`)
    }
}
// отображение данных на экране
function renderValue() {
    const deviceValue = document.querySelectorAll('.device .value')
    const deviceSetpoint = document.querySelectorAll('.device .setpoint')
    const setpointListValue = document.querySelectorAll('.data_now .data_now-value')
    
    if (deviceValue[0]) (deviceValue[0] as HTMLElement).innerText = `${data[1]}°C`
    if (deviceValue[1]) changeValue(data[2], deviceValue[1])
    
    if (deviceValue[2]) changeValue(data[5], deviceValue[2])
    if (deviceValue[3]) changeValue(data[4], deviceValue[3])
    if (deviceValue[4]) changeValue(data[3], deviceValue[4])
    if (deviceValue[5]) (deviceValue[5] as HTMLElement).innerText = `${data[6]}%`

    if (deviceSetpoint[0]) deviceSetpoint[0].innerHTML = `${data[0]}°C`
    if (deviceSetpoint[1]) changeValue(data[5], deviceSetpoint[1])
    if (deviceSetpoint[2]) changeValue(data[4], deviceSetpoint[2])
    if (deviceSetpoint[3]) changeValue(data[3], deviceSetpoint[3])
    if (deviceSetpoint[4]) (deviceSetpoint[4] as HTMLElement).innerText = `${data[7]}%`

    if (setpointListValue[0]) (setpointListValue[0] as HTMLElement).innerText = `${data[1]}°C`
    if (setpointListValue[1]) (setpointListValue[1] as HTMLElement).innerText = `${data[8]}`
    if (setpointListValue[2]) (setpointListValue[2] as HTMLElement).innerText = `${data[9]}`
    if (setpointListValue[3]) (setpointListValue[3] as HTMLElement).innerText = `${data[10]}`
} 
// меняем 0 на off и 1 на on
function changeValue(data: number, selector: Element) {
    const statusMap: {[key: number]: string} = {
        0: 'Off',
        1: 'On'
    };
    selector.textContent = statusMap[data] || 'Error';
}
// получаем данные
socket.on('data', (data) => {
    processData(data)
});