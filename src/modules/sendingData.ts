// отправляем данные по SerialPort
import { io } from "socket.io-client"

document.addEventListener("DOMContentLoaded", () => {
    const socket = io("http://localhost:8000")
    const sendButton = document.querySelector('.sendBtn') as HTMLElement
    const radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"]')
    const setpoint = document.querySelectorAll('.setpoint')
    const adjustmentSetpoint = document.querySelectorAll('.adjustment')

    type CoreCommand = {
        stand: number
        value: number | string
    }
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
    sendButton?.addEventListener('click', () => {      
        // Отправляем команды на сервер
        coreCommands.forEach(command => {
            socket.emit('LED_CONTROL', command)
        });        
    })
    // Пишем функции для режимов работы устройства
    function auto() {
        coreCommands[5].value = 11
        sendButton.style.display = 'none'
        pickStyle(false, setpoint)
        pickStyle(false, adjustmentSetpoint)
        setMode(0, 7)
    }

    function manual() {
        sendButton.style.display = 'block'
        pickStyle(true, setpoint)
        pickStyle(false, adjustmentSetpoint)
        setMode(2, 7)
    }

    function adjustment() {
        sendButton.style.display = 'block'
        pickStyle(true, adjustmentSetpoint)
        pickStyle(false, setpoint)
        setMode(1, 7)
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
    // вспомогательные функции
    // добавляем стили при изменении режима
    function pickStyle(act:boolean, selector: NodeListOf<Element>){
        selector.forEach((item, i) => {
            if (selector === setpoint) {
                if(act && i != 0 && i != setpoint.length - 1) {
                    item.classList.add('change')
                } else item.classList.remove('change')
            }else {
                if(act) {
                    item.classList.add('change')
                }else {
                    item.classList.remove('change')
                }
            }
       })
    }
    // отправляем данные об изменении режима работы устройства
    function setMode(num:number, index: number) {
        coreCommands[index].value = num
        coreCommands.forEach((command, i) => {
            if (i === index) {
                socket.emit('LED_CONTROL', command)
            }            
        });
    }
    // изменение данных в ручном режиме        
          
    auto()
    
});