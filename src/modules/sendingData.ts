// отправляем данные по SerialPort
import { io } from "socket.io-client"

const socket = io("http://localhost:8000")

const sendButton = document.querySelector('.sendBtn') as HTMLElement

sendButton?.addEventListener('click', (e) => {
    // Здесь можно задать разные значения для каждого светодиода
    const ledCommands = [
        { pin: 0, value: 1 }, // pump 1
        { pin: 1, value: 1 }, // pump 2
        { pin: 2, value: 1 }, // solenoid valve
        { pin: 3, value: 1 }, // set temp
        { pin: 4, value: 1 }, // set P
        { pin: 5, value: 1 }, // set I
        { pin: 6, value: 1 }, // set D
    ];

    // Отправляем команды на сервер
    ledCommands.forEach(command => {
        socket.emit('LED_CONTROL', command);
    });
})

