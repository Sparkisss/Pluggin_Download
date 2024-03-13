// отправляем данные по SerialPort
import { io } from "socket.io-client"

document.addEventListener("DOMContentLoaded", () => {
    const socket = io("http://localhost:8000")
    const sendButton = document.querySelector('.sendBtn') as HTMLElement
    const radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"]')

    type CoreCommand = {
        stand: number
        value: number | string
    }
    sendButton?.addEventListener('click', () => {
        // Здесь можно задать разные значения для каждого светодиода
        const coreCommands: CoreCommand[] = [
            { stand: 0, value: 1 }, // pump 1
            { stand: 1, value: 1 }, // pump 2
            { stand: 2, value: 1 }, // solenoid valve
            { stand: 3, value: 18 }, // set temp
            { stand: 4, value: 11 }, // set P
            { stand: 5, value: 8 }, // set I
            { stand: 6, value: 1 }, // set D
            { stand: 7, value: 1}, // set work mode
        ];

        // Отправляем команды на сервер
        coreCommands.forEach(command => {
            socket.emit('LED_CONTROL', command);
        });
    })

    // Пишем код режимов работы устройства

    function auto() {
        sendButton.style.display = 'none';
    }

    function manual() {
        sendButton.style.display = 'block';
    }

    function adjustment() {
        sendButton.style.display = 'block';
    }


    radioButtons.forEach((radioButton: HTMLInputElement) => {
        radioButton.addEventListener('change', function(this: HTMLInputElement) {
            if(this.checked) {
                switch (this.value) {
                    case 'auto': auto(); break;
                    case 'manual': manual(); break;
                    case 'adjustment': adjustment(); break;
                }
            }
        })
    })

    auto();

});